import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SprintsComponent } from '../app/sprints/sprints.component';
import { HomeComponent } from '../app/home/home.component';
import { NewSprintWorkingComponent } from '../app/new-sprint-working/new-sprint-working.component';


const routes: Routes = [
  { path: 'sprints', component: SprintsComponent},
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'running', component: NewSprintWorkingComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]
})

export class AppRoutingModule { }
