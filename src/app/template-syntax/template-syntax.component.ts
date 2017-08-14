import { Component, OnInit } from '@angular/core'
import { Post } from './shared/post.model'
import { RandomDataService } from './shared/random-data.service'


@Component({
  selector: 'app-template-syntax',
  templateUrl: './template-syntax.component.html',
  styleUrls: ['./template-syntax.component.css']
})
export class TemplateSyntaxComponent implements OnInit { // Lifecycle Hook

  myName = "Hans Smüller Rasch Diaz"
  angularPicUrl = "assets/pic_angular.jpg"
  posts: Post[]


  constructor(
    private randomDataService: RandomDataService
  ) {}

  
  ngOnInit() {
    this.getData()
  }

  getData(): void {

    this.posts = null
    this.randomDataService.getAll().then(posts => 
      this.posts = posts
    )

  }

  trackByPosts(index: number, post: Post): number {
    return post.id
  }

  showSelectedPost(post: Post): void {
    alert(JSON.stringify(post))
    //alert("Title's Post Selected: " + post.title)
  }

}
