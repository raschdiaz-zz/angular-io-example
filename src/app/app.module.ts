//Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms' //NgModel
import { HttpModule }    from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'

//Components
import { AppComponent } from './app.component' //Add component to app
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroesComponent } from './heroes/heroes/heroes.component'
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component'
import { HeroesSearchComponent } from './heroes/heroes-search/heroes-search.component'
import { TemplateSyntaxComponent } from './template-syntax/template-syntax.component'
import { PipeComponent } from './pipe/pipe.component'
import { FormsComponent } from './forms/forms.component'

//Services
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService }  from './shared/in-memory-data.service'
import { HeroService } from './heroes/shared/hero.service'
import { RandomDataService } from './template-syntax/shared/random-data.service'


@NgModule({
  imports: [ //Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true //Consume external api's
    } ),
    BrowserAnimationsModule
  ],
  declarations: [ //Components, Directives, Pipes
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroesSearchComponent,
    TemplateSyntaxComponent,
    PipeComponent,
    FormsComponent
  ],
  providers: [ //Services
    HeroService,
    RandomDataService
  ],
  bootstrap: [  //Root/Entry component (Not referenced in any template)
    AppComponent
  ]
})

export class AppModule { }

//Dependency Injection = Coding pattern in which a class receives its dependencies from external sources rather than creating them itself.