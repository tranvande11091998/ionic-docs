import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthService] },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'ncd', loadChildren: './ncd/ncd.module#NcdPageModule' },
  { path: 'go1', loadChildren: './go1/go1.module#Go1PageModule' },
  { path: 'chitiet', loadChildren: './chitiet/chitiet.module#ChitietPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
];

// localhost/tabs

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }