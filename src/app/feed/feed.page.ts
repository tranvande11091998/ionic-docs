import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor() { }

  yudsegment: string;

  // tslint:disable-next-line: member-ordering
  customAlertOptions: any = {
    header: 'Tạ Thành Đạt',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.yudsegment = '1go';

  }
}
