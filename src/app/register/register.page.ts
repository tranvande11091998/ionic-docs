import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  username = '';
  password = '';
  cpassword = '';
  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  async register() {
    const { username, password, cpassword } = this;
    if (password !== cpassword) {
      return console.error('Password don\'t math');
    }

    try {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password);

    this.afstore.doc(`users/${res.user.uid}`).set({
      username
    });

    this.user.setUser(
      {
        username,
        uid: res.user.uid
    });

    this.presentAlert('Success', 'You are registered!');
    this.router.navigate(['/tabs']);

    } catch (error) {
      console.dir(error);
    }
  }
}
