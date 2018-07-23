import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SprintsComponent } from '../app/sprints/sprints.component';
import { HomeComponent } from '../app/home/home.component';
import { NewSprintWorkingComponent } from '../app/new-sprint-working/new-sprint-working.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  { path: 'home', component: HomeComponent},
  { 
    path: 'sprints', 
    component: SprintsComponent,
    canActivate: [AuthGuardService],
  },
  { 
    path: 'running', 
    component: NewSprintWorkingComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]
})

export class AppRoutingModule { }
