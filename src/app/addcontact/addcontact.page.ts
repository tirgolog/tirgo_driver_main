import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ModalController} from "@ionic/angular";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-addcontact',
    templateUrl: './addcontact.page.html',
    styleUrls: ['./addcontact.page.scss'],
})
export class AddcontactPage implements OnInit {
    flag:string = '🇺🇿';
    mask:string = ' (00) 000-00-00'
    prefix:string = '+998';
    phone:string = '';
    code:string = '';
    telegram:boolean = false;
    whatsapp:boolean = false;
    viber:boolean = false;
    verify:boolean = false;
    country_code:string = 'UZ'
    phonescodesOriginal:any;
    searchinput:string = '';
    phonescodes:any;
    constructor(
        public authService: AuthenticationService,
        private modalCtrl:ModalController,
        private httpClient: HttpClient,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.getJSONFromLocal().subscribe(
            data => {
                this.phonescodesOriginal = data;
                this.phonescodes = this.phonescodesOriginal;
            },
            error => console.error(`Failed because: ${error}`));
    }
    public getJSONFromLocal(): Observable<any> {
        return this.httpClient.get("./assets/json/phone.json");
    }

    async addContact() {
        await this.authService.addContact(this.prefix + '' +this.phone,this.telegram,this.whatsapp,this.viber).toPromise()
            .then(async (res: any) => {
                if (res.status) {
                    this.verify = true
                }else {
                    this.authService.alert('Ошибка',res.error)
                }
            })
            .catch(async (err: any) => {
                console.log(err)
            });
    }

    async verifyContact() {
        if (this.code.length === 5){
            await this.authService.verifyNewContact(this.prefix + '' + this.phone,this.code).toPromise()
                .then(async (res: any) => {
                    if (res.status) {
                        this.authService.contacts = await this.authService.getContacts().toPromise();
                        await this.authService.alert('Отлично','Контакт успешно добавлен')
                        await this.modalController.dismiss();
                    }else {
                        await this.authService.alert('Ошибка',res.text)
                    }
                })
                .catch(async (err: any) => {
                    console.log(err)
                });
        }else {
            await this.authService.alert('Ошибка','Код подтверждения должен состоять из 5 символов')
        }
    }


    setContactToTelegram(item: any, ev: any) {
        this.telegram = ev.target.checked
    }

    setContactToWhatsapp(item: any, ev: any) {
        this.whatsapp = ev.target.checked
    }

    setContactToViber(item: any, ev: any) {
        this.viber = ev.target.checked
    }

    findPhoneCode(ev:any){
        this.searchinput = ev.target.value
        this.phonescodes = this.phonescodesOriginal.filter((row:any) => {
            return !row.name ? row.name: row.name.toLowerCase().includes(this.searchinput.toLowerCase()) ||
            !row.code ? row.code: row.code.toLowerCase().includes(this.searchinput.toLowerCase()) ||
            !row.dial_code ? row.dial_code: row.dial_code.toLowerCase().includes(this.searchinput.toLowerCase());
        });
    }
    selectCode(item:any){
        this.modalCtrl.dismiss();
        this.prefix = item.dial_code;
        this.flag = item.flag;
        this.mask = item.mask ? item.mask:' (00) 000-00-00';
        this.country_code = item.code
    }
}
