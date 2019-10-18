import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.page.html',
  styleUrls: ['./ncd.page.scss'],
})
export class NcdPage implements OnInit {
  [x: string]: any;

  todo: Todo = {
    ten: '',
    gioitinh: '',
    age: '',
    congviec: '',
    noilamviec: '',
    chucvu: '',
  };

  todoId = null;

  // tslint:disable-next-line: max-line-length
  constructor(private todoService: TodoService, private route: ActivatedRoute, private loadingController: LoadingController, private nav: NavController) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
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

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });

    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/person');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/person');
      });
    }
  }

}
