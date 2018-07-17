import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule } from '@angular/common/http';
import { ProgressbarModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeCardComponent } from './welcome-card/welcome-card.component';
import { TermsConditionModalComponent } from './terms-condition-modal/terms-condition-modal.component';
import { AppRoutingModule } from './/app-routing.module';
import { SprintsComponent } from './sprints/sprints.component';
import { HomeComponent } from './home/home.component';
import { TabviewComponent } from './tabview/tabview.component';
import { PastSprintsComponent } from './past-sprints/past-sprints.component';
import { NewSprintCardComponent } from './new-sprint-card/new-sprint-card.component';
import { NewSprintWorkingComponent } from './new-sprint-working/new-sprint-working.component';
import { FilterSprintPipe } from './filter-sprint.pipe';
import { SortSprintPipe } from './sort-sprint.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeCardComponent,
    TermsConditionModalComponent,
    SprintsComponent,
    HomeComponent,
    TabviewComponent,
    PastSprintsComponent,
    NewSprintCardComponent,
    NewSprintWorkingComponent,
    FilterSprintPipe,
    SortSprintPipe
  ],
  imports: [
    BrowserModule,
    OAuthModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
