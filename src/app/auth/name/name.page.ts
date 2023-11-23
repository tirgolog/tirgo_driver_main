import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {ModalController} from "@ionic/angular";
import {ChoiceCityPage} from "../../choice-city/choice-city.page";

@Component({
    selector: 'app-name',
    templateUrl: './name.page.html',
    styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {
    name: string = '';

    country: string | undefined = 'Выберите';
    city: string | undefined = 'ород';
    constructor(
        private authService: AuthenticationService,
        private modalController: ModalController,
        private app: AppComponent,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    back() {

    }

    async regUser() {
        if (this.city && this.city !== 'ород' && this.name.length > 2){
            await this.authService.regUser(this.name).toPromise()
                .then(async (res) => {
                    if (res.status) {
                        await this.app.checkSession()
                        await this.router.navigate(['/tabs/home'], {replaceUrl: true});
                    }
                })
                .catch(async (err) => {

                });
        }else {
            this.authService.alert('Ошибка','Укажите Все данные для регистрации в приложении')
        }
    }
    async selectRegion() {
        const modal = await this.modalController.create({
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
                        this.country = data.city.data.country;
                        this.city = data.city.data.city ? data.city.data.city : data.city.data.region;
                        // @ts-ignore
                        this.authService.currentUser?.city = data.city.data.city ? data.city.data.city : data.city.data.region;
                        // @ts-ignore
                        this.authService.currentUser?.country = data.city.data.country;
                    }
                })
                .catch(async (err: any) => {
                    console.log(err)
                });
            //this.city = data.city.value;
        }
    }
}
