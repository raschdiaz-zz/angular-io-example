import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

import { Post } from './post.model'


@Injectable()

export class RandomDataService {

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.statusText || error)
  }

  constructor(private http: Http) { }

  getAll(): Promise<Post[]> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts')
      .toPromise()
      .then(response => response.json() as Post[] )
      .catch(this.handleError)
  }

}
