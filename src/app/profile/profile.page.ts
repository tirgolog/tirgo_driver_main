import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ActionSheetController, AlertController, LoadingController, ModalController, Platform} from "@ionic/angular";
import {ChoiceCityPage} from "../choice-city/choice-city.page";
import {AddtransportPage} from "../addtransport/addtransport.page";
import {EdittransportPage} from "../edittransport/edittransport.page";
import {FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer/ngx";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {AddcontactPage} from "../addcontact/addcontact.page";
import { log } from 'console';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    file_url: string = 'https://admin.tirgo.io/file/';
    name: string | undefined = '';
    phone: string | undefined = '';
    birthday = new Date().toISOString();
    country: string | undefined = '';
    city: string | undefined = '';
    adr: number | undefined = 0;

    selectedcartype: number = 0;
    selectedstatus: string = 'logist';
    modalupdateuser: boolean = false;
    number: string = '';
    model: string = '';
    brand: string = '';
    phone2: string = '';

    loading:any;

    passport_docks:any[]=[];
    driver_license:any[]=[];
    constructor(
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private storage: Storage,
        private router: Router,
        public platform: Platform,
        public actionSheetController: ActionSheetController,
        public alertController: AlertController,
        private modalController: ModalController
    ) {

    }

    ngOnInit() {
        this.name = this.authService.currentUser?.name;
        this.phone = this.authService.contacts[0].text;
        // @ts-ignore
        this.birthday = new Date(this.authService.currentUser?.birthday).toISOString();
        this.country = this.authService.currentUser?.country;
        this.city = this.authService.currentUser?.city;
        this.adr = this.authService.currentUser?.adr;
        for (let row of this.authService.currentUser?.files){
            if (row.type_file === 'passport'){
                this.passport_docks.push(row)
            }else if(row.type_file === 'driver-license'){
                this.driver_license.push(row)
            }
        }
    }
    async selectBirthday(date:any){
        await this.authService.setDateBirthday(date).toPromise()
            .then(async (res: any) => {
                if (res.status) {
                    this.birthday = date;
                }
            })
            .catch(async (err: any) => {
                console.log(err)
            });
    }
    detectEdit() {
        return true
    }

    selectType(ev: any) {
        this.selectedstatus = ev.target.value
    }

    selectNewCarType(id: number) {
        this.selectedcartype = id;
    }

    selectBirthDay() {

    }

    async selectRegion() {
        await this.authService.alert('Ошибка','Изменение региона временно недоступно')
        /*const modal = await this.modalController.create({
            component: ChoiceCityPage,
            swipeToClose: true,
            showBackdrop: true,
            breakpoints: [0, 0.9],
            initialBreakpoint: 0.9,
            presentingElement: await this.modalController.getTop(),
            backdropDismiss: true,
            cssClass: 'modalCss',
            mode: 'ios',
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data && data.city) {
            console.log(data.city.data)
            await this.authService.saveCityInfo(data.city.data).toPromise()
                .then(async (res: any) => {
                    if (res.status) {
                        // @ts-ignore
                        this.authService.currentUser?.city = data.city.data.city;
                        // @ts-ignore
                        this.authService.currentUser?.country = data.city.data.country;
                    }
                })
                .catch(async (err: any) => {
                    console.log(err)
                });
            //this.city = data.city.value;
        }*/
    }

    async addTransport() {
        const modal = await this.modalController.create({
            component: AddtransportPage,
            swipeToClose: true,
            showBackdrop: true,
            breakpoints: [0, 1],
            initialBreakpoint: 1,
            presentingElement: await this.modalController.getTop(),
            backdropDismiss: true,
            cssClass: 'modalCss',
            mode: 'ios',
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data) {

        }
    }

    async editTransport(item: any) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Выберите действие с транспортом',
            cssClass: 'custom-action-sheet',
            buttons: [{
                text: 'Редактировать',
                handler: async () => {
                    await actionSheet.present();
                    const modal = await this.modalController.create({
                        component: EdittransportPage,
                        swipeToClose: true,
                        showBackdrop: true,
                        breakpoints: [0, 1],
                        initialBreakpoint: 1,
                        presentingElement: await this.modalController.getTop(),
                        backdropDismiss: true,
                        cssClass: 'modalCss',
                        mode: 'ios',
                        componentProps: {
                            item,
                        }
                    });
                    await modal.present();
                    const {data} = await modal.onWillDismiss();
                    if (data) {

                    }
                }
            }, {
                text: 'Удалить',
                role: 'destructive',
                handler: async () => {
                    const alert = await this.alertController.create({
                        header: 'Вы уверены?',
                        message: 'Вы действительно хотите удалить транспорт?',
                        cssClass: 'customAlert',
                        buttons: [
                            {
                                text: 'Нет',
                                role: 'cancel',
                                cssClass: 'secondary',
                                handler: () => {
                                    console.log('Confirm Cancel');
                                }
                            }, {
                                text: 'Да',
                                handler: async () => {
                                    await this.authService.delTransport(item.id).toPromise()
                                        .then(async (res: any) => {
                                            if (res.status) {
                                                const index = this.authService.mytruck.findIndex(e => e.id === item.id)
                                                if (index >= 0) {
                                                    this.authService.mytruck.splice(index,1)
                                                }
                                            }
                                        })
                                        .catch(async (err: any) => {
                                            console.log(err)
                                        });
                                }
                            }
                        ]
                    });
                    await alert.present();
                }
            },{
                text: 'Отменить',
                role: 'cancel',
                cssClass: 'cancel-action-sheet',
                handler: () => {
                }
            }]
        });
        await actionSheet.present();
    }

    editUser() {
        this.modalupdateuser = true;
    }

    closeModal() {
        this.modalupdateuser = false;
    }

    closeModalBirthday(date: any) {
        console.log(date)
        /*this.modalController.dismiss({
          'dismissed': true
        });*/
    }


    async addContacts() {
        const modal = await this.modalController.create({
            component: AddcontactPage,
            swipeToClose: true,
            showBackdrop: true,
            breakpoints: [0, 1],
            initialBreakpoint: 1,
            presentingElement: await this.modalController.getTop(),
            backdropDismiss: true,
            cssClass: 'modalCss',
            mode: 'ios',
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data) {

        }
    }
    async changeAvatar(){
        this.loading = await this.loadingCtrl.create({
            message: 'Отгружаем фото',
            cssClass: 'custom-loading'
        });
        await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData:any) => {
            this.loading.present()
            const fileTransfer: FileTransferObject = await this.authService.transfer.create();
            const headers = {'Authorization': 'Bearer ' + AuthenticationService.jwt};
            const uploadOpts: FileUploadOptions = {
                headers: headers,
                fileKey: 'file',
                mimeType: "image/jpeg",
                chunkedMode: false,
                fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
            };
            uploadOpts.params = {typeUser:'driver',typeImage:'avatar'};
            const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
            if (res.status){
                // @ts-ignore
                this.authService.currentUser?.avatar = res.file.preview;
                this.loading.dismiss();
            }
        })
    }
    async addPassportDocks(){
        this.loading = await this.loadingCtrl.create({
            message: 'Отгружаем фото',
            cssClass: 'custom-loading'
        });
        await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData:any) => {
            this.loading.present()
            const fileTransfer: FileTransferObject = await this.authService.transfer.create();
            const headers = {'Authorization': 'Bearer ' + AuthenticationService.jwt};
            const uploadOpts: FileUploadOptions = {
                headers: headers,
                fileKey: 'file',
                mimeType: "image/jpeg",
                chunkedMode: false,
                fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
            };
            uploadOpts.params = {typeUser:'driver',typeImage:'passport'};
            const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
            if (res.status){
                this.passport_docks.push(res.file)
                this.loading.dismiss();
            }
        })
    }
    async addDriverLicense(){
        this.loading = await this.loadingCtrl.create({
            message: 'Отгружаем фото',
            cssClass: 'custom-loading'
        });
        await this.authService.camera.getPicture(this.authService.optionsCamera).then(async (imageData:any) => {
            this.loading.present()
            const fileTransfer: FileTransferObject = await this.authService.transfer.create();
            const headers = {'Authorization': 'Bearer ' + AuthenticationService.jwt};
            const uploadOpts: FileUploadOptions = {
                headers: headers,
                fileKey: 'file',
                mimeType: "image/jpeg",
                chunkedMode: false,
                fileName: imageData.substr(imageData.lastIndexOf('/') + 1)
            };
            uploadOpts.params = {typeUser:'driver',typeImage:'driver-license'};
            const res = JSON.parse((await fileTransfer.upload(imageData, this.authService.API_URL + '/users/uploadImage', uploadOpts)).response)
            if (res.status){
                this.driver_license.push(res.file)
                this.loading.dismiss();
            }
        })
    }
    async logOut(){
       const alert = await this.alertController.create({
            header: 'Выход из аккаунта',
            message:'Вы уверены что хотите выйти из аккаунта?',
            cssClass: 'customAlert',
            buttons: [
                {
                    text: 'Нет',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {

                    }
                }, {
                    text: 'Выйти',
                    role: 'destructive',
                    handler: async () => {
                        await alert.present();
                        await this.storage.clear();
                        await this.authService.logout();
                        this.authService.typetruck = [];
                        this.authService.typecargo = [];
                        this.authService.mytruck = [];
                        this.authService.contacts = [];
                        this.authService.myorders = [];
                        this.authService.currency = [];
                        this.authService.activeorder = [];
                        this.authService.notifications = [];
                        this.authService.messages = [];
                        await this.router.navigate(['selectlanguage'], {replaceUrl: true});
                    }
                }
            ],
        });
        await alert.present();
    }
    async deleteProfile(){
       const alert = await this.alertController.create({
            header: 'Удаление аккаунта',
            message:'Вы уверены что хотите удалить аккаунт? Модератор проверит Ваш аккаунт и удаление будет произведено в течении 30 дней.',
            cssClass: 'customAlert',
            buttons: [
                {
                    text: 'Нет',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {

                    }
                }, {
                    text: 'Удалить',
                    role: 'destructive',
                    handler: async () => {
                        await alert.present();
                        await this.storage.clear();
                        await this.authService.logout();
                        await this.router.navigate(['selectlanguage'], {replaceUrl: true});
                    }
                }
            ],
        });
        await alert.present();
    }
    async delPassportFile(file: string){
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
                    role:'destructive',
                    handler: async (data) => {
                        const res = await this.authService.delPhotoUser(file).toPromise()
                        if (res.status){
                            const index = this.passport_docks.findIndex(e => e.name === file)
                            if (index>=0){
                                this.passport_docks.splice(index,1)
                            }
                        }else {
                            this.authService.alert('Ошибка',res.error)
                        }
                    }
                }
            ],
        });
        await alert.present();
    }
    async delDriverLicenseFile(file: string){
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
                    role:'destructive',
                    handler: async (data) => {
                        const res = await this.authService.delPhotoUser(file).toPromise()
                        if (res.status){
                            const index = this.driver_license.findIndex(e => e.name === file)
                            if (index>=0){
                                this.driver_license.splice(index,1)
                            }
                        }else {
                            this.authService.alert('Ошибка',res.error)
                        }
                    }
                }
            ],
        });
        await alert.present();
    }
    async deleteContact(item: any) {
        if (this.authService.contacts.length>1){
            if (item.id > 0) {
                const alert = await this.alertController.create({
                    header: 'Вы уверены?',
                    message: 'Вы действительно хотите удалить контакт? Удаленный контакт потребуется заново подтвредить при добавлении.',
                    cssClass: 'customAlert',
                    buttons: [
                        {
                            text: 'Нет',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                console.log('Confirm Cancel');
                            }
                        }, {
                            text: 'Да',
                            handler: async () => {
                                await this.authService.delContact(item.id).toPromise()
                                    .then(async (res: any) => {
                                        if (res.status) {
                                            this.phone = this.authService.contacts[0].text;
                                            const index = this.authService.contacts.findIndex(e => e.id === item.id)
                                            if (index >= 0) {
                                                this.authService.contacts.splice(index, 1)
                                            }
                                        }
                                    })
                                    .catch(async (err: any) => {
                                        console.log(err)
                                    });
                            }
                        }
                    ]
                });
                await alert.present();
            }
        }else {
            this.authService.alert('Ошибка','Невозможно удалить единственный контакт')
        }
    }
}
