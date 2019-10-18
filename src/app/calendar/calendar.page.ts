import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { from } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Todo, TodoService } from '../services/todo.service';
import { Todo2 } from '../services/todo2.service';
import { Todo1Service } from '../services/todo1.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  [x: string]: any;

  todos: Todo[];

  todo2: Todo2 = {
    cv: '',
    ndcd: '',
    cvat: '',
    ndcdcvat: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };


  viewTitle = '';

  @ViewChild(CalendarComponent, {static: true}) myCal: CalendarComponent;

  // tslint:disable-next-line: max-line-length
    /* tslint:disable:no-unused-variable */
  constructor(private todoService: Todo1Service, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {
    this.resetEvent();
  }

  ngOnInit() {}

  resetEvent() {
    this.todo2 = {
      cv: '',
      ndcd: '',
      cvat: '',
      ndcdcvat: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent() {
    const eventCopy = {
      cv: this.event.cv,
      ndcd: this.event.ndcd,
      cvat: this.event.cvat,
      ndcdcvat: this.event.ndcdcvat,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
    };

    if (eventCopy.allDay) {
      const start = eventCopy.startTime;
      const end = eventCopy.endTime;
      // 2019 9 9
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-string-literal
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-string-literal
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelected() {
    // tslint:disable-next-line: deprecation
    const start = formatDate(this.todo2.startTime, 'medium', this.locale);
    // tslint:disable-next-line: deprecation
    const end = formatDate(this.todo2.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      // tslint:disable-next-line: deprecation
      header: this.todo2.cv,
      // tslint:disable-next-line: deprecation
      subHeader: this.todo2.cvat,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(cv) {
    this.viewTitle = cv;
  }

  onTimeSelected(ev) {
    const selected = new Date(ev.selectedTime);
    this.todo2.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.todo2.endTime = (selected.toISOString());
  }
}
