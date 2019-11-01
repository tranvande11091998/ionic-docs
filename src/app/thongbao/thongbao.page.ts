import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../services/todo.service';

import { HttpClient } from 'selenium-webdriver/http';
import { JsonpModule } from '@angular/http';
import { Todo2Service, Todo2 } from '../services/todo2.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
///import data from '../../assets/js/company.json';


@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.page.html',
  styleUrls: ['./thongbao.page.scss'],
})
export class ThongbaoPage implements OnInit {
 // private companies = data;
  tableStyle = 'bootstrap';
  customRowClass = false;

  private todosCollection2: AngularFirestoreCollection<Todo2>;
  private todos2: Observable<Todo2[]>;
  constructor(db: AngularFirestore, private todoService2: Todo2Service) {
    this.todosCollection2 = db.collection<Todo2>('todos2');

    this.todos2 = this.todosCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          // tslint:disable-next-line: no-shadowed-variable
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );


  }

  ngOnInit() {
  }

  switchStyle() {
    if (this.tableStyle === 'dark') {
      this.tableStyle = 'bootstrap';
    } else {
      this.tableStyle = 'dark';
    }
  }

  getRowClass(row) {
    const isMale = row.gender === 'male';
    if (!this.customRowClass) {
      return {};
    }
    return {
      'male-row': isMale,
      'female-row': !isMale
    };
  }

  async open(row) {
    console.log(row);
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-female': value === 'female'
    };
  }
}
