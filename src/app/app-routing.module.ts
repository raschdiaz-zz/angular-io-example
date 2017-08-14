import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
 
import { DashboardComponent }   from './dashboard/dashboard.component'
import { HeroesComponent }      from './heroes/heroes/heroes.component'
import { HeroDetailComponent }  from './heroes/hero-detail/hero-detail.component'
import { TemplateSyntaxComponent } from './template-syntax/template-syntax.component'
import { PipeComponent } from './pipe/pipe.component'
import { FormsComponent } from './forms/forms.component'
 

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: 'template-syntax', component: TemplateSyntaxComponent },
  { path: 'pipe', component: PipeComponent },
  { path: 'forms', component: FormsComponent },
  { path: '**', redirectTo: 'dashboard' } //Redirect if page does not exist (this routes must be in the end of the routes).
]
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}