import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument;
  sub;
  username: string;
  profilePic: string;

  password: string;
  newpassword: string;

  // tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

  @ViewChild('fileBtn', {static: true}) fileBtn: {
    nativeElement: HTMLInputElement
  };

  constructor(private http: Http,
              private afs: AngularFirestore,
              private router: Router,
              private alertController: AlertController,
              private user: UserService) {
    this.mainuser = afs.doc(`users/${user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.username = event.username;
      this.profilePic = event.profilePic;
    });
   }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateProfilePic() {
    this.fileBtn.nativeElement.click();
  }

  uploadPic(event) {
    const files = event.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'c2a6204c8af746726c23');

    this.http.post('https://upload.uploadcare.com/base/', data)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(event => {
        const uuid = event.json().file;
        this.mainuser.update({
          profilePic: uuid
        });
      });
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
  }

  async updateDetails() {
    this.busy = true;

    if (!this.password) {
      this.busy = false;
      return this.presentAlert('Error!', 'You have to enter a password');
    }

    try {
    // tslint:disable-next-line: semicolon
    await this.user.reAuth(this.user.getUsername(), this.password)}
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: one-line
    catch (err) {
      this.busy = false;
      return this.presentAlert('Error', 'Wrong password!');
    }

    if (this.newpassword) {
      await this.user.updatePassword(this.newpassword);
    }

    if (this.username !== this.user.getUsername()) {
      await this.user.updateEmail(this.username);
      this.mainuser.update({
        username: this.username
      });
    }

    this.password = '';
    this.newpassword = '';
    this.busy = false;

    await this.presentAlert('Done!', 'Your profile was update');

    this.router.navigate(['/tabs/feed']);

  }

}
