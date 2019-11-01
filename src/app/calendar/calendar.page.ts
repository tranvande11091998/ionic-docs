import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { from, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { formatDate, WeekDay } from '@angular/common';
import { Todo, TodoService } from '../services/todo.service';
import { Todo2, Todo2Service } from '../services/todo2.service';
import { Todo1Service } from '../services/todo1.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import {Daychoose} from './Daychoose'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  mainuser: AngularFirestoreDocument;
  [x: string]: any;
  test: any;
  show = '';
  show1 = '';
  buttonName = 'Show';
  hide: any;
  count: any;
  Reference: AngularFirestoreDocument;

  private todosCollection: AngularFirestoreCollection<Todo>;
  // private todos: Observable<Todo[]>;
  private todos2: Observable<Todo2[]>;
  todo2: Todo2 = {
    cv: 'Công việc',
    ndcd: '',
    cvat: 'Công việc an toàn',
    ndcdcvat: '',
    startTime: '',
    endTime: '',
    allDay: false,
    // TotalDay: 0,
    check: Date(),
   
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };


  viewTitle = '';
  SHOW : boolean = true;
  choose= [
   new Daychoose(25),
   new Daychoose(26)
  ];
  getPostEntry(){
    this.todo2.cvat = (Number(this.todo2.cv) +1).toString();
    }
  public isToggle :boolean = true;
  change(e){
    if(this.var1 == false){
           e.isToggle = true;
    }
}


   Notify(){
    this.isToggle=!this.isToggle;
  }
  signup(){
    state:0;
  }
  statelist=[
    {}
  ]
  
 


  @ViewChild(CalendarComponent, {static: true}) myCal: CalendarComponent;

  // tslint:disable-next-line: max-line-length
  constructor(private todo2Service: Todo2Service, private alertCtrl: AlertController, private loadingController: LoadingController, private nav: NavController, @Inject(LOCALE_ID) private locale: string, db: AngularFirestore, private afs: AngularFirestore, private user: UserService) {
    this.todosCollection = db.collection<Todo>('todos');
    this.mainuser = afs.doc(`users/${user.getUID()}`);
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.mainuser.valueChanges().subscribe(data => {
      console.log('todos2 cua lai: ', data.todos2);
      this.test = data.todos2;
      if(this.test) {
      for ( this.count = 0; this.count < this.test.length; this.count++) {
        const eventCopy = {
          cv: this.test[this.count].cv,
          ndcd: this.test[this.count].ndcd,
          cvat: this.test[this.count].cvat,
          ndcdcvat: this.test[this.count].ndcdcvat,
          startTime: new Date(this.test[this.count].startTime),
          endTime: new Date(this.test[this.count].endTime),
          allDay: this.test[this.count].allDay,
          check:  new Date(this.test[this.count].check),
        };
        console.log(eventCopy.startTime);
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
      }
    }
    });
    console.log('construct: ', this.eventSource);
    console.log('construct len: ', this.eventSource.length);

}

  ngOnInit() {
    console.log('init: ', this.eventSource.length);
  }

  toggle() {

    if (this.show) {
    this.buttonName = 'Hide';
    console.log(this.show);
    } else {
    this.buttonName = 'Show';
    }
    }


  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });

    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async addEvent() {

    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });

    await loading.present();
    const eventCopy = {
      cv: this.todo2.cv,
      ndcd: this.todo2.ndcd,
      cvat: this.todo2.cvat,
      ndcdcvat: this.todo2.ndcdcvat,
      startTime: this.todo2.startTime,
      endTime: this.todo2.endTime,
      allDay: this.todo2.allDay,
      check: this.todo2.check,
    };
    console.log('event chek: ', eventCopy);
    if (this.todos2) {
      this.todo2Service.updateTodo2(this.todo2, this.todoId2).then(() => {
        loading.dismiss();
        console.log('14');
        this.eventSource.push(eventCopy);
        // PHAI GOI DUOC CALENDAR THI CA MOI UPDATE

      });
      this.mainuser.update({
        todos2: firestore.FieldValue.arrayUnion(eventCopy),
      });
  } else {
    console.log('19');
    this.todo2Service.addTodo2(this.todo2).then(() => {
      loading.dismiss();
      if (eventCopy.allDay) {
        console.log('12');
     
       var  start = eventCopy.startTime;
       var  end = eventCopy.endTime;
        console.log(start);
        console.log(end);
        console.log(this.todo2);
       
        // console.log(eventCopy.check);
      //  parseInt(start.slice(4,6));
  //    const Start = Number(start.slice(8,10));
  //     const End = Number(end.slice(8,10));
  //     Daylength=0;
  //    if(End>=Start){
  //     var Daylength = (End-Start)/86400000;
  //  //   console.log(Daylength);
  //    }
     console.log("50");
     console.log(end);
  //  var    Start = start.parse("MM/DD/YYYY");
  //      end = Date.parse("MM/DD/YYYY");
    
     console.log("mmmmmmmmmmmmm", start);
   //  var end = new Date().toLocaleDateString("en-US");
     console.log("mmmmmmmmmmmmbggtgtgtm", end);
     var date1 = new Date(start);
     var date2 = new Date("11/04/2019");
    var Difference_In_Time = (date2.getTime() - date1.getTime())/86400000 +1; 
    console.log(Difference_In_Time);


     
    

       
      }
      this.mainuser.update({
        todos2: firestore.FieldValue.arrayUnion(eventCopy),
      });
     

        });
  }
    this.myCal.loadEvents();
    
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
     
      header: this.todo2.cv,
      
      subHeader: this.todo2.cvat,
      message: 'From: ' + start+ '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(ndcd) {
    this.viewTitle = ndcd;
  }

  onTimeSelected(ev) {
    const selected = new Date(ev.selectedTime);
    this.todo2.startTime = selected.toISOString();

    selected.setHours(selected.getHours() + 1);
    this.todo2.endTime = (selected.toISOString());
  }
  
  clickDay() {
    this.SHOW=true;
    this.SHOW=!this.SHOW;
    console.log(this.SHOW);
    // console.log(this.choose);
  
    }
  clickMonth() {
    this.SHOW=false;
    this.SHOW=!this.SHOW;
    console.log(this.SHOW);
  }
    
}
