import { Component, NgZone, OnInit } from '@angular/core';
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
  typetransport: any[] = [];
  type: number = 0;
  stepper: number = 0;
  brand_name_check = false;
  state_registration_truckNumber_check = false;
  type_check = false;
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
    techpassport_photo2: '',
    type: 0,
    brand_name: ''
  };
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private zone: NgZone,
    public alertController: AlertController) { }

  ngOnInit() {
    this.phone = this.authService.currentUser.phone;
    this.formData.phone = this.authService.currentUser.phone;
    this.formData.user_id = this.authService.currentUser.id;
    this.formData.state_registration_truckNumber = this.authService.mytruck[0].state_number;
    this.formData.type = this.authService.mytruck[0].type;
    this.formData.brand_name = this.authService.mytruck[0].brand_name;
    this.state_registration_truckNumber_check = this.authService.mytruck[0].state_number ? true : false;
    this.type_check = this.authService.mytruck[0].type ? true : false;
    this.brand_name_check = this.authService.mytruck[0].brand_name ? true : false;
    this.typetransport = this.authService.typetruck.map((item) => {
      return {
        label: item.name,
        type: 'radio',
        value: item.id,
      };
    });
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


  returnNameTypeTransport(type: number) {
    const index = this.authService.typetruck.findIndex(e => +e.id === +type)
    if (index >= 0) {
      return this.authService.typetruck[index].name
    } else {
      return 'Не выбрано'
    }
  }

  async selectTypeTransport() {
    const alert = await this.alertController.create({
      header: 'Выберите тип транспорта',
      cssClass: 'customAlert',
      inputs: this.typetransport,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Выбрать',
          handler: async (data) => {
            this.type = data;
            this.formData.type = data;
          }
        }
      ],
    });
    await alert.present();
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
      if (this.stepper == 0) {
        this.tech_passport_files.push(res?.file?.filename)
        this.formData.techpassport_photo1 = res?.file?.filename;
        this.stepper++;
      } else {
        this.formData.techpassport_photo2 = res?.file?.filename;
      }
      if (res.status) {
        this.loading.dismiss();
      }
    })
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

  async deleteFile(file: string, field: string) {
    const alert = await this.alertController.create({
      header: 'Удаление фото',
      message: 'Вы уверены что хотите удалить фото паспорта?',
      cssClass: 'customAlert',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Удалить',
          role: 'destructive',
          handler: async (data) => {
            const res = await this.authService.delPhotoUser(file).toPromise()
            if (res.status) {
              this.formData[field] = ''
            } else {
              this.authService.alert('Ошибка', res.error)
            }
          }
        }
      ],
    });
    await alert.present();
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
    } else if (!this.formData.selfies_with_passport) {
      this.authService.alert('Ошибка', 'Требуется фотографии паспорта обязательно.')
      this.loadingSubmit = false;
    } else if (!this.formData.bank_card) {
      this.authService.alert('Ошибка', 'Требуется номер банковской карты.')
      this.loadingSubmit = false;
    } else if (!this.formData.bank_cardname) {
      this.authService.alert('Ошибка', 'Требуется указать название банковской карты.')
      this.loadingSubmit = false;
    } else if (!this.formData.transport_front_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото спереди обязательно.')
      this.loadingSubmit = false;
    } else if (!this.formData.transport_back_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото сзади обязательно.')
      this.loadingSubmit = false;
    } else if (!this.formData.transport_side_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото сбоку обязательно.')
      this.loadingSubmit = false;
    }
    // else if (this.formData.adr_photo) {
    //   this.authService.alert('Ошибка', 'Требуется фотографии Фото  ADR обязательно.')
    //   this.loadingSubmit = false;
    // } 
    else if (!this.formData.transportation_license_photo) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото  Водительское удостоверение  обязательно.')
      this.loadingSubmit = false;
    } else if (!this.formData.driver_license) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото  Водительские права.')
      this.loadingSubmit = false;
    } else if (!this.formData.transport_registration_country) {
      this.authService.alert('Ошибка', 'Требуется   Страна регистрации транспорта обязательно.')
      this.loadingSubmit = false;
    }
    else if (!this.formData.state_registration_truckNumber) {
      this.authService.alert('Ошибка', 'Требуется Номер государственной регистрации ТС.')
      this.loadingSubmit = false;
    }
    else if (!this.formData.techpassport_photo1) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото техпаспорта 1.')
      this.loadingSubmit = false;
    }
    else if (!this.formData.techpassport_photo2) {
      this.authService.alert('Ошибка', 'Требуется фотографии Фото техпаспорта 2.')
      this.loadingSubmit = false;
    }

    else if (!this.formData.type) {
      this.authService.alert('Ошибка', 'Требуется Тип прицепа')
      this.loadingSubmit = false;
    }

    else if (!this.formData.brand_name) {
      this.authService.alert('Ошибка', 'Требуется Марка транспорта.')
      this.loadingSubmit = false;
    }

    else {
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
              try {
                const res: any = await this.authService.Verification(this.formData.full_name, this.formData.phone, this.formData.selfies_with_passport, this.formData.bank_card, this.formData.bank_cardname, this.formData.transport_front_photo, this.formData.transport_back_photo, this.formData.transport_side_photo, this.formData.adr_photo, this.formData.transport_registration_country, this.formData.state_registration_truckNumber, this.formData.driver_license, this.formData.transportation_license_photo, this.formData.techpassport_photo1, this.formData.techpassport_photo2, this.formData.type, this.formData.brand_name).toPromise()
                this.zone.runOutsideAngular(() => {
                  if (res.status) {
                    this.loadingSubmit = false;
                    this.zone.run(() => {
                      this.router.navigate(['/tabs/home']);
                    });
                  } else {
                    this.loadingSubmit = false;
                    this.authService.alert('Ошибка', res.error);
                  }
                });
              } catch (error) {
                console.error('Error during verification:', error);
                // Handle the error, e.g., show a message to the user.
              }
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