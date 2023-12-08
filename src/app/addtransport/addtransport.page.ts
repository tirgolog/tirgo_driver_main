import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";
import { FileTransferObject, FileUploadOptions } from "@ionic-native/file-transfer/ngx";

@Component({
  selector: 'app-addtransport',
  templateUrl: './addtransport.page.html',
  styleUrls: ['./addtransport.page.scss'],
})
export class AddtransportPage implements OnInit {
  file_url: string = 'https://admin.tirgo.io/file/';
  type: number = 0;
  maxweight: number = 21000;
  name: string = '';
  description: string = '';
  typetransport: any[] = [];
  adr: boolean = false
  cubature: string = '96';
  state_number: string = '';

  tech_passport_files: any[] = [];
  license_files: any[] = [];
  car_photos: any[] = [];

  loading: any;
  loadingAddTransport: boolean = false;

  constructor(
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.typetransport = this.authService.typetruck.map((item) => {
      return {
        label: item.name,
        type: 'radio',
        value: item.id,
      };
    });
  }
  async close() {
    await this.modalController.dismiss({
      accepted: true,
    })
  }
  returnNameTypeTransport(type: number) {
    const index = this.authService.typetruck.findIndex(e => +e.id === +type)
    if (index >= 0) {
      return this.authService.typetruck[index].name
    } else {
      return 'Не выбрано'
    }
  }
  returnMaxWeightTransport(type: number) {
    const index = this.authService.typetruck.findIndex(e => +e.id === +type)
    if (index >= 0) {
      return this.authService.typetruck[index].weight
    } else {
      return 0
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
            this.maxweight = this.returnMaxWeightTransport(data)
          }
        }
      ],
    });
    await alert.present();
  }
  async selectCubature() {
    if (this.type === 0) {
      this.authService.alert('Выберите тип', 'Для выбора кубатуры прицепа требуется выбрать тип прицепа')
    } else {
      const alert = await this.alertController.create({
        header: 'Выберите кубатуру',
        cssClass: 'customAlert',
        inputs: [
          {
            label: '82 m3',
            type: 'radio',
            value: 82
          },
          {
            label: '90 m3',
            type: 'radio',
            value: 90,
          },
          {
            label: '96 m3',
            type: 'radio',
            value: 96,
          },
          {
            label: '105 m3',
            type: 'radio',
            value: 105,
          },
          {
            label: '110 m3',
            type: 'radio',
            value: 110,
          },
          {
            label: '120 m3',
            type: 'radio',
            value: 120,
          }
        ],
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
              this.cubature = data;
            }
          }
        ],
      });
      await alert.present();
    }
  }
  async saveTransport() {
    this.loadingAddTransport = true;
    if (this.type === 0) {
      this.authService.alert('Ошибка', 'Требуется выбрать тип транспорта.')
      this.loadingAddTransport = false;
    }/*else if(!this.description.length){
      this.authService.alert('Ошибка','Требуется ввести описание транспорта. Это поможет клиенту понять подходит ли транспорт под его требования.')
      this.loadingAddTransport = false;
    }*/else if (!this.name.length) {
      this.authService.alert('Ошибка', 'Требуется ввести марку, модель транспорта')
      this.loadingAddTransport = false;
    } else if (this.maxweight < 1000) {
      this.authService.alert('Ошибка', 'Грузоподъемность не может быть менее 1 000 кг.')
      this.loadingAddTransport = false;
    } else if (this.maxweight > 35000) {
      this.authService.alert('Ошибка', 'Грузоподъемность не может быть более 35 000 кг.')
      this.loadingAddTransport = false;
    }/*else if(!this.license_files.length){
      this.authService.alert('Ошибка','Требуется добавить фото лицензии на перевозку грузов')
      this.loadingAddTransport = false;
    }*/
    // else if (!this.car_photos.length) {
    //   this.authService.alert('Ошибка', 'Требуется добавить фото транспорта')
    //   this.loadingAddTransport = false;
    // } 
    // else if (!this.tech_passport_files.length) {
    //   this.authService.alert('Ошибка', 'Требуется добавить фото технического транспорта на транспорт')
    //   this.loadingAddTransport = false;
    // } 
    else if (this.cubature === '') {
      this.authService.alert('Ошибка', 'Требуется указать кубатуру прицепа')
      this.loadingAddTransport = false;
    } else if (this.state_number === '') {
      this.authService.alert('Ошибка', 'Требуется указать гос. номер тягача')
      this.loadingAddTransport = false;
    } else {
      await this.authService.addTransport(this.name, this.description, this.maxweight, this.type, this.car_photos, this.license_files, this.tech_passport_files, this.adr, this.cubature, this.state_number).toPromise()
        .then(async (res: any) => {
          if (res.status) {
            this.authService.mytruck = await this.authService.getTruck().toPromise();
            this.authService.myorders = await this.authService.getMyOrders().toPromise();
            await this.close()
            await this.authService.alert('Отлично', 'Транспорт успешно добавлен')
          }
        })
        .catch(async (err: any) => {
          console.log(err)
        });
    }
  }
  async addFilesTechPassport() {
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'car-docks' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      if (res.status) {
        this.tech_passport_files.push(res.file)
        this.loading.dismiss();
      }
    })
  }
  async delFileTechTransport(file: string) {
    const alert = await this.alertController.create({
      header: 'Удаление фото',
      message: 'Вы уверены что хотите удалить изображение.',
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
            const index = this.tech_passport_files.findIndex(e => e.preview === file)
            if (index >= 0) {
              this.tech_passport_files.splice(index, 1)
            }
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'car-docks' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      if (res.status) {
        this.license_files.push(res.file)
        this.loading.dismiss();
      }
    })
  }

  async delFileLicense(file) {
    const alert = await this.alertController.create({
      header: 'Удаление фото',
      message: 'Вы уверены что хотите удалить изображение.',
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
            // const index = this.license_files.findIndex(e => e.preview === file)
            // if (index>=0){
            this.license_files.splice(file, 1)
            // }
          }
        }
      ],
    });
    await alert.present();
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
      uploadOpts.params = { typeUser: 'driver', typeImage: 'car-docks' };
      const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
      if (res.status) {
        this.car_photos.push(res.file)
        this.loading.dismiss();
      }
    })
  }
  async delFileCarPhoto(file) {
    const alert = await this.alertController.create({
      header: 'Удаление фото',
      message: 'Вы уверены что хотите удалить изображение.',
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
            // const index = this.license_files.findIndex(e => e.preview === file)
            // if (index>=0){
            this.license_files.splice(file, 1)
            // }
          }
        }
      ],
    });
    await alert.present();
  }
  async setAdrUser(ev: any) {
    this.adr = ev.target.checked
  }
}
