import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { from } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  yudsegment: string;

  // tslint:disable-next-line: member-ordering
  customAlertOptions5: any = {
    header: 'Tạ Thành Đạt. Giới tính: Nam, 21 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20033',
    translucent: true
  };

  customAlertOptions6: any = {
    header: 'Đàm Công Hiến. Giới tính: Nam, 20 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20035',
    translucent: true
  };

  customAlertOptions7: any = {
    header: 'Nguyễn Phú Quý. Giới tính: Nam, 19 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20023',
    translucent: true
  };

  customAlertOptions8: any = {
    header: 'Nguyễn Đức Lai. Giới tính: Nam, 18 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20034',
    translucent: true
  };

  customAlertOptions9: any = {
    header: 'Nguyễn Thọ Đặng. Giới tính: Nam, 17 tuổi',
    subHeader: 'Làm việc tại: Hoàng Hưng Japan',
    message: 'Mã Sinh viên: 67DCHT20022',
    translucent: true
  };


  imageURL: string;
  desc: string;
  // tslint:disable-next-line: no-inferrable-types
  noFace: boolean = true;

  // tslint:disable-next-line: no-inferrable-types
  scaleCrop: string = '-/scale_crop/200x200/';

  effects = {
    effect1: '',
    effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
    effect3: '-/filter/vevera/150/',
    effect4: '-/filter/carris/150/',
    effect5: '-/filter/misiara/150/'
  };


  activeEffect: string = this.effects.effect1;
  // tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

  @ViewChild('fileButton', {static: false}) fileButton;

  // tslint:disable-next-line: deprecation
  // tslint:disable-next-line: max-line-length
  constructor(public navCtrl: NavController,
              public http: Http,
              public afstore: AngularFirestore,
              public user: UserService,
              private alertController: AlertController,
              private router: Router ) { }

  ngOnInit() {
  }

  async createPost() {
    this.busy = true;

    const image = this.imageURL;
    const desc = this.desc;
    const activeEffect = this.activeEffect;

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    });
    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUsername(),
      likes: [],
      effect: activeEffect
    });

    this.busy = false;
    this.imageURL = '';
    this.desc = '';

    const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your post was created',
      buttons: ['Cools!']
    });

    await alert.present();

    this.router.navigate(['/tabs/feed']);

  }

  setSelected(effect: string) {
    this.activeEffect = this.effects[effect];
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  fileChanged(event: { target: { files: any; }; }) {
    this.busy = true;
    const files = event.target.files;


    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'c2a6204c8af746726c23');

    this.http.post('https://upload.uploadcare.com/base/', data)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(event => {
      console.log(event);
      this.imageURL = event.json().file;
      this.busy = false;
      this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`).subscribe(event => {
        // tslint:disable-next-line: triple-equals
        this.noFace = event.json().faces == 0;
      });
    });
  }
}
