import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fotgot-password',
  templateUrl: './fotgot-password.page.html',
  styleUrls: ['./fotgot-password.page.scss'],
})
export class FotgotPasswordPage implements OnInit {
  text=''
  m: any=[];
  gmail='';

  

  constructor(public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: UserService,
    private afs: AngularFirestore) { 
      afs.collection('users').valueChanges().subscribe(data=>{
    
         for(let i = 0;i<data.length;i++)
            this.m.push(data[i]['username']);
            console.log(this.m)
         });
    }

  ngOnInit() {
  }
async FoggotPassword(gmail){
  const n = this.m.length;
for (let i=0;i<n;i++){
  if(this.text==this.m[i]){
    gmail =this.m[i]+"@gmail.com";
    console.log(gmail)
  }
  
}
const res = await this.afAuth.auth.sendPasswordResetEmail(gmail).then( function() {
      
  console.log('Correct')
    
    }).catch( function() {
      console.log('Erorr')
    });
}
}