import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: MainMenuComponent },
    { path: 'searcher',         component: SearcherComponent },
    { path: 'shedule_selection', component: ScheduleSelectionComponent },
    { path: 'course_selection/:id', component: CourseSelectionComponent },
    { path: 'enrollment/:id',       component: EnrollmentFormComponent },
    {path: 'login', component:LoginComponent},
    { path: 'admin', component: AdminComponent,
    children:[
      {path: 'student', component:StudentComponentComponent},
      {path: 'teacher', component:TeacherComponentComponent},
      {path: 'course', component:CourseComponentComponent}
    ]
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
