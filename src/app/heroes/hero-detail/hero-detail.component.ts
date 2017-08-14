import { Component, Input, OnInit/*, Optional*/ } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Location } from '@angular/common'
import { Hero } from '../shared/hero.model'
import { HeroService } from '../shared/hero.service'
import 'rxjs/add/operator/switchMap'
import { HeroesComponent } from '../heroes/heroes.component'

@Component({
  selector: 'hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    /*Optional()*/private location: Location  //Set injection to null if the dependency its not found
  ) {}

  @Input() hero: Hero

  ngOnInit(): void {
    this.loadHeroDetail()
  }

  loadHeroDetail(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.heroService.getById(+params.get('id')))
    .subscribe(hero => this.hero = hero)
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack())
  }

  goBack(): void {
    this.location.back()
  }

}