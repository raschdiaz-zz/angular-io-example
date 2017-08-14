import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { trigger, state, style, animate, transition } from '@angular/animations'

import { Hero } from '../shared/hero.model'
import { HeroService } from '../shared/hero.service'


@Component({
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  //template: ``,//multi line strings
  //styles: [],
  providers: [HeroService],
  animations: [
    trigger('heroListItem', [
      state('no-click', style({
        left: '0em'
      })),
      state('click', style({
        left: '1.5em'
      })),
      transition('no-click => click', animate('200ms ease-in')),
      transition('click => no-click', animate('200ms ease-out'))
    ])
  ]
})

export class HeroesComponent implements OnInit {
  
  //Create instance of service / Injection dependency
  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  //Vars
  title = 'Tour of Heroes'
  state = 'no-click'
  heroesModified: HeroModified[] = [] //Declare empty array of type 'HeroModified'
  selectedHero: HeroModified
  /*hero: Hero = {  //Instance class Hero
    id: 1,
    name: 'Windstorm',
  }*/
  //heroes: Hero[]
  
  
  //Methods
  ngOnInit(): void {  // OnInit interface

    this.getHeroes()

  }

  getHeroes(): void { //Receive promise

    var vm = this //Access to context
    this.heroService.getAll().then(function (heroes) {
      heroes.forEach(heroe => { //Format object to add property of animation
        vm.heroesModified.push({
          id: heroe.id,
          name: heroe.name,
          state: 'no-click'
        })
      })
    })

  }

  onSelect(hero: HeroModified): void {

    this.heroesModified.forEach(heroe => {
      heroe.state = 'no-click'
    })
    hero.state = (hero.state === 'no-click' || !hero.state ? 'click' : 'no-click')
    this.selectedHero = hero

  }

  delete(hero: HeroModified): void {

    this.heroService.delete(hero.id).then(() => {
      this.heroesModified = this.heroesModified.filter(h => h !== hero)
      if(this.selectedHero === hero) { this.selectedHero = null }
    })

  }

  gotoDetail(): void {

    this.router.navigate(['/heroes', this.selectedHero.id])
    
  }

}

export class HeroModified {
  id: number
  name: string
  state: string
}