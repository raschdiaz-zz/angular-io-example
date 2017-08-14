import { Component, OnInit } from '@angular/core'
import { Hero } from '../heroes/shared/hero.model'
import { HeroService } from '../heroes/shared/hero.service'


@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  heroes: Hero[] = []

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    
    this.heroService.getAll().then(heroes => 
      this.heroes = heroes.slice(1, 5)
    )
    
  }

}