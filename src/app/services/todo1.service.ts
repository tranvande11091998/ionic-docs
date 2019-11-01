import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../list/list';


export interface Todo1 {
  tn1: string;
  cv1: string;
  mcv1: string;
  nlv1: string;
  ncd: string;
}

@Injectable({
  providedIn: 'root'
})


export class Todo1Service {
  [x: string]: any;
  private todosCollection1: AngularFirestoreCollection<Todo1>;

  private todos1: Observable<Todo1[]>;

  constructor(db: AngularFirestore) {
    this.todosCollection1 = db.collection<Todo1>('todos1');

    this.todos1 = this.todosCollection1.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   getTodos1() {
     return this.todos1;
   }

   getTodo1(id) {
     return this.todosCollection1.doc<Todo1>(id).valueChanges();
   }

   updateTodo1(todo1: Todo1, id: string) {
    return this.todosCollection1.doc(id).update(todo1);
   }

   addTodo1(todo1: Todo1) {
     return this.todosCollection1.add(todo1);
   }

   removeTodo1(id) {
     return this.todosCollection1.doc(id).delete();
   }
}
