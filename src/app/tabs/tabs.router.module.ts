import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';
import { from } from 'rxjs';

const routes: Routes = [

    {
        path: '',
        component: TabsPage,
        children:
        [
            { path: 'person', loadChildren: '../person/person.module#PersonPageModule' },
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'},
            { path: 'post/:id', loadChildren: '../post/post.module#PostPageModule' },
            { path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' },
            { path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarPageModule' },
            { path: 'calendar/:id', loadChildren: '../calendar/calendar.module#CalendarPageModule' },
            { path: 'thongbao', loadChildren: '../thongbao/thongbao.module#ThongbaoPageModule' },
        ]
    }
 ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TabRoutingModule { }
