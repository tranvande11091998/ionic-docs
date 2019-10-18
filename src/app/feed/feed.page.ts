import { Component, OnInit } from '@angular/core';
import { Todo1Service, Todo1 } from '../services/todo1.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(private todoService1: Todo1Service) { }

  yudsegment: string;

  // tslint:disable-next-line: member-ordering
  customAlertOptions: any = {
    header: 'Tạ Thành Đạt. Giới tính: Nam, 21 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20033',
    translucent: true
  };

  customAlertOptions1: any = {
    header: 'Đàm Công Hiến. Giới tính: Nam, 20 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20035',
    translucent: true
  };

  customAlertOptions2: any = {
    header: 'Nguyễn Phú Quý. Giới tính: Nam, 19 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20023',
    translucent: true
  };

  customAlertOptions3: any = {
    header: 'Nguyễn Đức Lai. Giới tính: Nam, 18 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20034',
    translucent: true
  };

  customAlertOptions4: any = {
    header: 'Nguyễn Thọ Đặng. Giới tính: Nam, 17 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20022',
    translucent: true
  };

  todos1: Todo1[];

  ngOnInit() {
    this.todoService1.getTodos1().subscribe(res => {
      this.todos1 = res;
    });
  }

  ionViewWillEnter() {

    this.yudsegment = '1go';

  }
}
