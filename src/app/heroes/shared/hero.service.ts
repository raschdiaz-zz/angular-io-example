import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import { Hero } from './hero.model'
import { Heroes } from './mock-heroes'

import 'rxjs/add/operator/toPromise'


@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes'
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }
  private headers = new Headers({'Content-Type': 'application/json'})

  constructor(private http: Http) { }


  getAll(): Promise<Hero[]> {  //Asynchronous function
    //return Promise.resolve(Heroes)
    /*return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(
        Heroes
      ), 1100)
    })*/
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError)
  }

  getById(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError)
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

}