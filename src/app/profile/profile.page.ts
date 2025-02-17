import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument;
  userPosts;
  sub;
  posts;
  username: string;
  profilePic: string;

  constructor(private afs: AngularFirestore, private user: UserService, private router: Router) {
    this.mainuser = afs.doc(`users/${user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.posts = event.posts;
      this.username = event.username;
      this.profilePic = event.profile;
    });
   }

   // tslint:disable-next-line: use-lifecycle-interface
   ngOnDestroy() {
     this.sub.unsubscribe();
   }

  goTo(postID: string) {
    
    this.router.navigate(['/tabs/post/' + postID.split('/')[0]]);
  }

  ngOnInit() {
  }

}
