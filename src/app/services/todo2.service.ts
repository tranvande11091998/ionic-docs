import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo2 {
  cv: string;
  ndcd: string;
  cvat: string;
  ndcdcvat: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Todo2Service {
  private todosCollection2: AngularFirestoreCollection<Todo2>;

  private todos2: Observable<Todo2[]>;

  constructor(db: AngularFirestore) {
    this.todosCollection2 = db.collection<Todo2>('todos2');

    this.todos2 = this.todosCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   getTodos2() {
     return this.todos2;
   }

   getTodo2(id) {
     return this.todosCollection2.doc<Todo2>(id).valueChanges();
   }

   updateTodo2(todo2: Todo2, id: string) {
    return this.todosCollection2.doc(id).update(todo2);
   }

   addTodo1(todo2: Todo2) {
     return this.todosCollection2.add(todo2);
   }

   removeTodo2(id) {
     return this.todosCollection2.doc(id).delete();
   }
}
