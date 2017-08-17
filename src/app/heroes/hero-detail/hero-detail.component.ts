import { Component, Input, OnInit/*, Optional*/ } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Location } from '@angular/common'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/switchMap'

import { Hero } from '../shared/hero.model'
//import { HeroService } from '../shared/hero.service'
import { HeroesComponent } from '../heroes/heroes.component'

@Component({
  selector: 'hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  constructor(
    //private heroService: HeroService,
    private route: ActivatedRoute,
    /*Optional()*/private location: Location,  //Set injection to null if the dependency its not found
    private http: Http
  ) {}


  @Input() hero = new Hero
  loadingHero = true
  savingHero = false
  existingHero = 'null'


  ngOnInit(): void {

    this.loadHeroDetail()

  }

  loadHeroDetail(): void {

    /*this.route.paramMap
    .switchMap((params: ParamMap) => this.heroService.getById(+params.get('id')))
    .subscribe(hero => this.hero = hero)*/
    
    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.http.get('api/heroes/'+params.get('id'))
    }).subscribe(response => {
      this.hero = response.json().data
      this.existingHero = 'true'
      this.loadingHero = false
    }, error => {
      if(error.status == 404) {
        this.existingHero = 'false'
        this.loadingHero = false
      }
    })

  }

  save(): void {

    /*this.heroService.update(this.hero)
      .then(() => this.goBack())*/
    this.savingHero = true
    this.http.put('api/heroes/'+this.hero.id, this.hero).subscribe(response => {
      this.savingHero = false
      this.goBack()
    })

  }

  goBack(): void {

    this.location.back()

  }

}