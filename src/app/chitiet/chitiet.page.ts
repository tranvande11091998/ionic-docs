import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.page.html',
  styleUrls: ['./chitiet.page.scss'],
})
export class ChitietPage implements OnInit {

  constructor() { }
// tslint:disable-next-line: member-ordering
customAlertOptions5: any = {
  header: 'Tạ Thành Đạt. Giới tính: Nam, 21 tuổi',
  subHeader: 'Làm việc tại: Hoàng Hưng Japan',
  message: 'Mã Sinh viên: 67DCHT20033',
  translucent: true
};

customAlertOptions6: any = {
  header: 'Đàm Công Hiến. Giới tính: Nam, 20 tuổi',
  subHeader: 'Làm việc tại: Hoàng Hưng Japan',
  message: 'Mã Sinh viên: 67DCHT20035',
  translucent: true
};

customAlertOptions7: any = {
  header: 'Nguyễn Phú Quý. Giới tính: Nam, 19 tuổi',
  subHeader: 'Làm việc tại: Hoàng Hưng Japan',
  message: 'Mã Sinh viên: 67DCHT20023',
  translucent: true
};

customAlertOptions8: any = {
  header: 'Nguyễn Đức Lai. Giới tính: Nam, 18 tuổi',
  subHeader: 'Làm việc tại: Hoàng Hưng Japan',
  message: 'Mã Sinh viên: 67DCHT20034',
  translucent: true
};

customAlertOptions9: any = {
  header: 'Nguyễn Thọ Đặng. Giới tính: Nam, 17 tuổi',
  subHeader: 'Làm việc tại: Hoàng Hưng Japan',
  message: 'Mã Sinh viên: 67DCHT20022',
  translucent: true
};
  ngOnInit() {
  }

}
