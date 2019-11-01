import { Component, OnInit } from '@angular/core';
import {List} from './list';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  today: number = Date.now();
  List =[
    new List('12-10-2019', 1, 'hello')
  ];
  constructor() { }

  ngOnInit() {
  }

}
