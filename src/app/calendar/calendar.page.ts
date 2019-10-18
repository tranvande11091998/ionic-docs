import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { from, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Todo, TodoService } from '../services/todo.service';
import { Todo2,Todo2Service } from '../services/todo2.service';
import { Todo1Service } from '../services/todo1.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  [x: string]: any;
  private todosCollection2: AngularFirestoreCollection<Todo2>;
  private todosCollection: AngularFirestoreCollection<Todo>;
  //private todos: Observable<Todo[]>;
  private todos2: Observable<Todo2[]>;
  
  


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

  constructor(private todoService: Todo1Service, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('todos');

    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.todosCollection2 = db.collection<Todo2>('todos2');
    this.todos2 = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
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
      cv: this.todo2.cv,
      ndcd: this.todo2.ndcd,
      cvat: this.todo2.cvat,
      ndcdcvat: this.todo2.ndcdcvat,
      startTime: new Date(this.todo2.startTime),
      endTime: new Date(this.todo2.endTime),
      allDay: this.todo2.allDay,
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
