import { Component, OnInit } from '@angular/core';
import { AlertController, IonicSafeString, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
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
  country_code: string = 'uz';
  timer: number = 59;
  code: string = '';
  fullName: string = '';
  bankNumber: string = '';
  bankName: string = '';
  codeon: boolean = true;
  verify: boolean = false;
  loading: any;
  loadingSubmit: any;
  error: boolean = false;
  passport_docks: any[] = [];
  driver_license: any[] = [];
  license_files: any[] = [];
  car_photos: any[] = [];
  tech_passport_files: any[] = [];
  formData = {
    user_id: 0,
    full_name: '',
    phone: '',
    selfies_with_passport: '',
    bank_card: '',
    bank_cardname: '',
    transport_front_photo: '',
    transport_back_photo: '',
    transport_side_photo: '',
    adr_photo: '',
    transport_registration_country: '',
    driver_license: '',
    transportation_license_photo: '',
    state_registration_truckNumber: '',
    techpassport_photo1: '',
    techpassport_photo2: ''
  };
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {
    // this.phone = this.authService.currentUser.phone;
    this.phone = '998935421324';
    // this.formData.phone = this.authService.currentUser.phone;
    this.formData.user_id = this.authService.currentUser.id;
    this.formData.state_registration_truckNumber = this.authService.mytruck[0].state_number;
    for (let row of this.authService.currentUser.files) {
      if (row.type_file === 'license_files') {
        this.license_files.push(row)
      } else if (row.type_file === 'tech_passport_files') {
        this.tech_passport_files.push(row)
      }
    }
    this.sendSms()
  }

  async sendSms() {
    await this.authService.driverVerification(this.phone, this.country_code).toPromise()
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

  async verifyCode() {
    await this.authService.verifyCodeDriver(this.phone, this.code).toPromise()
      .then(async (res) => {
        if (res.status) {
          this.loading = true;
          this.verify = true
        } else {
          await this.authService.alert('Ошибка', res.text)
          this.loading = false;
        }
        this.error = false;
      })
      .catch(async (err) => {
        this.loading = false;
        this.error = true;
      });
  }

  async addFilesLicense() {
    this.loading = await this.loadingCtrl.create({
      message: 'Отгружаем фото',
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      if (res.status) {
        this.formData.transportation_license_photo = res?.file?.filename
        this.license_files.push(res.file)
        this.loading.dismiss();
      }
    })
  }

  async addFilesCarPhoto() {
    this.loading = await this.loadingCtrl.create({
      message: 'Отгружаем фото',
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      if (res.status) {
        this.formData.techpassport_photo1 = res?.file?.filename;
        if (this.formData.techpassport_photo1) {
          this.formData.techpassport_photo2 = res?.file?.filename;
        }
        this.car_photos.push(res.file)
        this.loading.dismiss();
      }
    })
  }


  async addPassport() {
    this.loading = await this.loadingCtrl.create({
      message: 'Фото паспорта с вашим лицом селфи',
      cssClass: 'custom-loading'
    });
    console.log('Before calling getPicture');
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      this.formData.selfies_with_passport = res?.file?.filename
      if (res.status) {
        this.loading.dismiss();
      }
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      this.formData.transport_front_photo = res?.file?.filename
      if (res.status) {
        this.loading.dismiss();
      }
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      this.formData.transport_back_photo = res?.file?.filename
      if (res.status) {
        this.loading.dismiss();
      }
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      this.formData.transport_side_photo = res?.file?.filename
      if (res.status) {
        this.loading.dismiss();
      }
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      this.formData.adr_photo = res?.file?.filename
      if (res.status) {
        this.loading.dismiss();
      }
    })
  }
  async addPhotoLicence() {
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'verification' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      this.formData.driver_license = res?.file?.filename
      if (res.status) {
        this.loading.dismiss();
      }
    })
  }
  async submit() {
    if (!this.formData.full_name) {
      this.authService.alert('Ошибка', 'Требуется  ввести свое имя и фамилию')
      this.loadingSubmit = false;
    } else if (!this.formData.selfies_with_passport.length) {
      this.authService.alert('Ошибка', 'Требуется фотографии паспорта обязательно.')
      this.loadingSubmit = false;
    } else if (!this.formData.bank_card) {
      this.authService.alert('Ошибка', 'Требуется номер банковской карты.')
      this.loadingSubmit = false;
    } else if (this.formData.bank_cardname) {
      this.authService.alert('Ошибка', 'Требуется указать название банковской карты.')
      this.loadingSubmit = false;
    } else if (this.formData.transport_front_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото спереди обязательно.')
      this.loadingSubmit = false;
    } else if (this.formData.transport_back_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото сзади обязательно.')
      this.loadingSubmit = false;
    } else if (this.formData.transport_side_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото сбоку обязательно.')
      this.loadingSubmit = false;
    } 
    // else if (this.formData.adr_photo) {
    //   this.authService.alert('Ошибка', 'Требуется фотографии Фото  ADR обязательно.')
    //   this.loadingSubmit = false;
    // } 
    else if (this.formData.transportation_license_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото  Водительское удостоверение  обязательно.')
      this.loadingSubmit = false;
    } else if (this.formData.driver_license) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото  Водительские права.')
      this.loadingSubmit = false;
    } else if (this.formData.transport_registration_country) {
      this.authService.alert('Ошибка', 'Требуется   Страна регистрации транспорта обязательно.')
      this.loadingSubmit = false;
    }
    else if (this.formData.state_registration_truckNumber) {
      this.authService.alert('Ошибка', 'Требуется Номер государственной регистрации ТС.')
      this.loadingSubmit = false;
    }
    else if (this.formData.techpassport_photo1) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото техпаспорта 1.')
      this.loadingSubmit = false;
    }
    else if (this.formData.techpassport_photo2) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото техпаспорта 2.')
      this.loadingSubmit = false;
    } else {
      this.loadingSubmit = false;
      const actionSheet = await this.alertController.create({
        header: 'Ваша заявка принята на оброботку',
        message: `<img src="../../assets/truck/done.png" class="card-alert">`,
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'OK',
            cssClass: 'icon-alert-button',
            handler: async () => {
              await this.authService.Verification(this.formData.full_name, this.formData.selfies_with_passport, this.formData.bank_card, this.formData.bank_cardname, this.formData.transport_front_photo, this.formData.transport_back_photo, this.formData.transport_side_photo, this.formData.adr_photo, this.formData.transport_registration_country, this.formData.state_registration_truckNumber, this.formData.driver_license, this.formData.transportation_license_photo, this.formData.techpassport_photo1, this.formData.techpassport_photo2).toPromise()
                .then(async (res: any) => {
                  if (res.status) {
                    this.loadingSubmit = false;
                    await this.authService.alert('Отлично', 'Транспорт успешно изменен')
                    await this.router.navigate(['/tabs/home']);
                  } else {
                    this.loadingSubmit = false;
                    await this.authService.alert('Ошибка', res.error)
                  }
                })
                .catch(async (err: any) => {
                  this.loadingSubmit = false;
                  console.log(err)
                });
            }
          }
        ]
      });
      await actionSheet.present();
    }
  }

  back() {
    this.navCtrl.back()
  }
}
