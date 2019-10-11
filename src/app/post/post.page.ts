import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { from } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postID: string;
  post;
  effect: string;
  postReference: AngularFirestoreDocument;
  sub;
  // tslint:disable-next-line: no-inferrable-types
  heartType: string = 'hear-empty';

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private user: UserService) {

   }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id');
    this.postReference = this.afs.doc(`posts/${this.postID}`);
    this.sub = this.postReference.valueChanges().subscribe(val => {
      this.post = val;
      this.effect = val.effect;
      this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty';
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleHeart() {
    // tslint:disable-next-line: triple-equals
    if (this.heartType == 'heart-empty') {
      this.postReference.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID())
      });
    } else {
      this.postReference.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      });
    }
  }

}
