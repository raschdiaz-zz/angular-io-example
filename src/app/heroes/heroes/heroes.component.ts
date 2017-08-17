import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { Headers, Http } from '@angular/http'

import { RestangularModule, Restangular } from 'ngx-restangular'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'

import { Hero } from '../shared/hero.model'
//import { HeroService } from '../shared/hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  //template: ``,//multi line strings
  //styles: [],
  //providers: [HeroService],
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
    //private heroService: HeroService,
    private restangular: Restangular,
    private inMemoryWebApiModule: InMemoryWebApiModule,
    private http: Http
  ) {}

  //Vars
  headers = new Headers({'Content-Type': 'application/json'})
  title = 'Tour of Heroes'
  //state = 'no-click'
  heroesModified: HeroModified[] = [] //Declare empty array of type 'HeroModified'
  selectedHero: HeroModified
  /*hero: Hero = {  //Instance class Hero
    id: 1,
    name: 'Windstorm',
  }*/
  //heroes: Hero[]
  @Input() newHero = new Hero
  creatingHero = false
  deletingHero = false
  
  private handleError(error: any): Promise<any> {
    console.error('In memory API error:', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }
  
  //Methods
  ngOnInit(): void {  // OnInit interface

    this.getHeroes()

  }

  getHeroes(): void { //Receive promise

    /*var vm = this //Access to context
    this.heroService.getAll().then(function (heroes) {
      heroes.forEach(heroe => { //Format object to add property of animation
        vm.heroesModified.push({
          id: heroe.id,
          name: heroe.name,
          state: 'no-click'
        })
      })
    })*/

    //Get data from memory-data-service
    this.http.get('api/heroes').subscribe(response => {
      response.json().data.forEach(heroe => {
        this.heroesModified.push({
          id: heroe.id,
          name: heroe.name,
          state: 'no-click'
        })
      })
    }, error => {
      console.log(error)
    })

  }

  create(): void {

    this.creatingHero = true
    this.http.post('api/heroes', this.newHero).subscribe(response => {
      this.heroesModified.push(response.json().data)
      this.newHero = new Hero
      this.creatingHero = false
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

    /*this.heroService.delete(hero.id).then(() => {
      this.heroesModified = this.heroesModified.filter(h => h !== hero)
      if(this.selectedHero === hero) { this.selectedHero = null }
    })*/
    this.deletingHero = true
    this.http.delete('api/heroes/'+hero.id).subscribe(response => {
      this.heroesModified = this.heroesModified.filter(h => h !== hero)
      this.deletingHero = false
      alert("Heroe eliminado correctamente!.")
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