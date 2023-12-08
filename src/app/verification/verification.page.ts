import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, IonicSafeString, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { AppComponent } from '../app.component';
import { FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  alertButtons = ['Ok'];
  mask: string = '0000-0000-0000-0000';
  file_url: string = 'https://admin.tirgo.io/file/';
  prefix: string = '+998';
  phone: string = '';
  country_code: string = '';
  timer: number = 59;
  code: string = '';
  fullName: string = '';
  bankNumber: string = '';
  bankName: string = '';
  codeon: boolean = true;
  verify: boolean = false;
  loading: any;
  error: boolean = false;
  formData = {
    name: '',
    email: '',
    password: ''
  };
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    console.log(this.authService.currentUser)
    this.timer = 59;
    setInterval(() => {
      if (this.timer > 0) {
        this.timer = this.timer - 1
      }
    }, 1000);
  }


  async verifyCode() {
    this.loading = true;
    this.verify = true
    // await this.authService.verifyCode(this.prefix + '' + this.phone, this.code).toPromise()
    //   .then(async (res) => {
    //     if (res.status) {
    //       await this.authService.setJwt(res.token);
    //       await this.app.checkSession()
    //       this.loading = false;
    //     } else {
    //       await this.authService.alert('Ошибка', res.text)
    //       this.loading = false;
    //     }
    //     this.error = false;
    //   })
    //   .catch(async (err) => {
    //     this.loading = false;
    //     this.error = true;
    //   });
  }

  async addPassport() {
    this.loading = await this.loadingCtrl.create({
      message: 'Фото паспорта с вашим лицом селфи',
      cssClass: 'custom-loading'
    });
    await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData: any) => {
      this.loading.present()
      const fileTransfer: FileTransferObject = await this.authService.transfer.create();
      const headers = { 'Authorization': 'Bearer ' + AuthenticationService.jwt };
      const uploadOpts: FileUploadOptions = {
        headers: headers,
        fileKey: 'file',
        mimeType: "image/*",
        chunkedMode: false,
        fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
      };
      uploadOpts.params = { typeUser: 'driver', typeImage: 'driver-license' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      // if (res.status){
      //     this.driver_license.push(res.file)
      //     this.loading.dismiss();
      // }
    })
  }
  async addPhotoOpposite() {
    this.loading = await this.loadingCtrl.create({
      message: 'Фото паспорта с вашим лицом селфи',
      cssClass: 'custom-loading'
    });
    await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData: any) => {
      this.loading.present()
      const fileTransfer: FileTransferObject = await this.authService.transfer.create();
      const headers = { 'Authorization': 'Bearer ' + AuthenticationService.jwt };
      const uploadOpts: FileUploadOptions = {
        headers: headers,
        fileKey: 'file',
        mimeType: "image/*",
        chunkedMode: false,
        fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
      };
      uploadOpts.params = { typeUser: 'driver', typeImage: 'driver-license' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      // if (res.status){
      //     this.driver_license.push(res.file)
      //     this.loading.dismiss();
      // }
    })
  }
  async addPhotoBack() {
    this.loading = await this.loadingCtrl.create({
      message: 'Фото паспорта с вашим лицом селфи',
      cssClass: 'custom-loading'
    });
    await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData: any) => {
      this.loading.present()
      const fileTransfer: FileTransferObject = await this.authService.transfer.create();
      const headers = { 'Authorization': 'Bearer ' + AuthenticationService.jwt };
      const uploadOpts: FileUploadOptions = {
        headers: headers,
        fileKey: 'file',
        mimeType: "image/*",
        chunkedMode: false,
        fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
      };
      uploadOpts.params = { typeUser: 'driver', typeImage: 'driver-license' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      // if (res.status){
      //     this.driver_license.push(res.file)
      //     this.loading.dismiss();
      // }
    })
  }
  async addPhotoLeft() {
    this.loading = await this.loadingCtrl.create({
      message: 'Фото паспорта с вашим лицом селфи',
      cssClass: 'custom-loading'
    });
    await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData: any) => {
      this.loading.present()
      const fileTransfer: FileTransferObject = await this.authService.transfer.create();
      const headers = { 'Authorization': 'Bearer ' + AuthenticationService.jwt };
      const uploadOpts: FileUploadOptions = {
        headers: headers,
        fileKey: 'file',
        mimeType: "image/*",
        chunkedMode: false,
        fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
      };
      uploadOpts.params = { typeUser: 'driver', typeImage: 'driver-license' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      // if (res.status){
      //     this.driver_license.push(res.file)
      //     this.loading.dismiss();
      // }
    })
  }
  async addPhotoAdr() {
    this.loading = await this.loadingCtrl.create({
      message: 'Фото паспорта с вашим лицом селфи',
      cssClass: 'custom-loading'
    });
    await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData: any) => {
      this.loading.present()
      const fileTransfer: FileTransferObject = await this.authService.transfer.create();
      const headers = { 'Authorization': 'Bearer ' + AuthenticationService.jwt };
      const uploadOpts: FileUploadOptions = {
        headers: headers,
        fileKey: 'file',
        mimeType: "image/*",
        chunkedMode: false,
        fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
      };
      uploadOpts.params = { typeUser: 'driver', typeImage: 'driver-license' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      // if (res.status){
      //     this.driver_license.push(res.file)
      //     this.loading.dismiss();
      // }
    })
  }
  async submit() {
    await this.router.navigate(['/tabs/home']);
  }

  async presentActionSheet() {
    const actionSheet = await this.alertController.create({
      header: 'Ваша заявка принята на оброботку',
      message: `<img src="../../assets/truck/done.png" class="card-alert">`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'icon-alert-button',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }
  async signIn() {
    this.loading = true;
    await this.authService.loginUser(this.prefix + '' + this.phone, this.country_code).toPromise()
      .then(async (res) => {
        if (res.status) {
          this.codeon = true;
          this.loading = false;
          this.timer = 59;
          setInterval(() => {
            if (this.timer > 0) {
              this.timer = this.timer - 1
            }
          }, 1000);
        }
        this.error = false;
      })
      .catch(async (err) => {
        this.loading = false;
        this.error = true;
      });
  }
  back() {
    this.navCtrl.back()
  }

  submitForm() {
    console.log('Form submitted with data:', this.formData);
  }
}
