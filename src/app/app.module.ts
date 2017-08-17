//Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, ViewContainerRef } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms' //NgModel
import { HttpModule }    from '@angular/http' //Required to in-memory-web-api
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http' //Interceptor

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
//import { HeroService } from './heroes/shared/hero.service'
//import { RandomDataService } from './template-syntax/shared/random-data.service'
//--import { ToastrService } from './shared/toastr.service'
import { MyHttpLogInterceptor } from './shared/http.interceptor' //Angular's Interceptor

//Frameworks
import { RestangularModule, Restangular } from 'ngx-restangular'
import { ToastModule } from 'ng2-toastr/ng2-toastr'
import { ToastsManager } from 'ng2-toastr';
//--import { ToastrDirective } from './toastr.directive'


// Function for setting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {

  RestangularProvider.setBaseUrl('http://jsonplaceholder.typicode.com/')
  RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {
    console.log(data)
    console.log(operation)
    console.log(what)
    console.log(url)
    console.log(response)
    return data
  })
  //RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
}


@NgModule({
  imports: [ //Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true, //Consume external api's
      delay: 1000
    } ),
    BrowserAnimationsModule,
    //HttpClientModule,
    RestangularModule.forRoot(RestangularConfigFactory), //Restangular
    ToastModule.forRoot(),
  ],
  declarations: [ //Components, Directives, Pipes
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroesSearchComponent,
    TemplateSyntaxComponent,
    PipeComponent,
    FormsComponent,
    //--ToastrDirective
  ],
  providers: [ //Services
    //HeroService,
    //RandomDataService,
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }, //Angular's Interceptor
    //--ToastrService
  ],
  bootstrap: [  //Root/Entry component (Not referenced in any template)
    AppComponent
  ]
})

export class AppModule {}

//Dependency Injection = Coding pattern in which a class receives its dependencies from external sources rather than creating them itself.