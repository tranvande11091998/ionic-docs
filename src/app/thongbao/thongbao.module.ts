import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ThongbaoPage } from './thongbao.page';

import { JsonpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: ThongbaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
  
    // tslint:disable-next-line: deprecation
    JsonpModule,
    FormsModule,
    NgxDatatableModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ThongbaoPage]
})
export class ThongbaoPageModule {}
