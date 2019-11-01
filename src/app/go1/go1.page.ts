import { Component, OnInit } from '@angular/core';
import { Todo1, Todo1Service } from '../services/todo1.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Todo, TodoService } from '../services/todo.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-go1',
  templateUrl: './go1.page.html',
  styleUrls: ['./go1.page.scss'],
})
export class Go1Page implements OnInit {
  [x: string]: any;

  private todosCollection: AngularFirestoreCollection<Todo>;

  private todos: Observable<Todo[]>;

  isIndeterminate: boolean;
  masterCheck: boolean;
  checkBoxList: any;

  todo1: Todo1 = {
    tn1: '',
    cv1: '',
    mcv1: '',
    nlv1: '',
    ncd: '',
  };

  todoId1 = null;

  // tslint:disable-next-line: max-line-length
  constructor(private todoService: TodoService, private todoService1: Todo1Service, 
    // tslint:disable-next-line: align
    private route: ActivatedRoute, private loadingController: LoadingController, private nav: NavController,db: AngularFirestore) {
    this.checkBoxList = [
      {
        value: 'Tạ Thành Đạt',
        isChecked: false
      }, {
        value: 'Đàm Công Hiến',
        isChecked: false
      }, {
        value: 'Nguyễn Đức Lai',
        isChecked: false
      }, {
        value: 'Nguyễn Thọ Đặng',
        isChecked: false
      }, {
        value: 'Nguyễn Phú Quý',
        isChecked: false
      }
    ];
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
  }


  checkMaster() {
    setTimeout(() => {
      this.checkBoxList.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map(obj => {
      if (obj.isChecked) { checked++; }
    });
    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    // tslint:disable-next-line: triple-equals
    } else if (checked == totalItems) {
      // If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      // If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  ngOnInit() {

    // tslint:disable-next-line: no-string-literal
    this.todoId1 = this.route.snapshot.params['id'];
    if (this.todoId1) {
      this.loadTodo1();
    }

  }

  async loadTodo1() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });

    await loading.present();

    this.todoService1.getTodo1(this.todoId1).subscribe(res => {
      loading.dismiss();
      this.todo1 = res;
    });
  }

  async saveTodo1() {
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });

    await loading.present();

    if (this.todoId1) {
      this.todoService1.updateTodo1(this.todo1, this.todoId1).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/feed');
      });
    } else {
      this.todoService1.addTodo1(this.todo1).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/feed');
      });
    }
  }
  loadLists() {
    this.todoService.getMakeList().then(res => {
        this.todos = res.makes;
    });
 }


}
