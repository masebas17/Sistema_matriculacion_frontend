import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SearcherComponent } from './searcher/searcher.component';
import { ScheduleSelectionComponent } from './schedule-selection/schedule-selection.component';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { LoginComponent } from './admin/login/login.component';
import { SidebarComponentComponent } from './admin/sidebar-component/sidebar-component.component';
import { StudentComponentComponent } from './admin/student-component/student-component.component';
import { TeacherComponentComponent } from './admin/teacher-component/teacher-component.component';
import { CourseComponentComponent } from './admin/course-component/course-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    MainMenuComponent,
    SearcherComponent,
    ScheduleSelectionComponent,
    CourseSelectionComponent,
    EnrollmentFormComponent,
    LoginComponent,
    SidebarComponentComponent,
    StudentComponentComponent,
    TeacherComponentComponent,
    CourseComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
