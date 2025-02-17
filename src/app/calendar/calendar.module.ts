import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarPage } from './calendar.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { TreeviewModule } from 'ngx-treeview';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule,
    TreeviewModule.forRoot(),
  ]
  ,
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
