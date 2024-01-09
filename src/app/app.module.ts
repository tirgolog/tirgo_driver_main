import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from "@ionic/storage-angular";
import {Drivers} from "@ionic/storage";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./services/api.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuPageModule} from "./menu/menu.module";
import {NgxMaskIonicModule} from "ngx-mask-ionic";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ChoiceCityPage} from "./choice-city/choice-city.page";
import {Geolocation} from '@awesome-cordova-plugins/geolocation/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {OrderPage} from "./order/order.page";
import {MainPipeModule} from "./pipes/main-pipe.module";
import ruLocale from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import {CallNumber} from "@ionic-native/call-number/ngx";
import {Push} from "@awesome-cordova-plugins/push/ngx";
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import {FileTransfer } from "@ionic-native/file-transfer/ngx";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {AddcontactPage} from "./addcontact/addcontact.page";
import {Network} from "@ionic-native/network/ngx";
import {LottieModule} from "ngx-lottie";
import player from 'lottie-web';
import {SetraitingPage} from "./setraiting/setraiting.page";
import {SelectstatusPage} from "./selectstatus/selectstatus.page";
import {FilterPage} from "./filter/filter.page";
import { FCM} from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx"
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

registerLocaleData(ruLocale);

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function playerFactory() {
    return player;
}
@NgModule({
    declarations: [
        AppComponent,
        SetraitingPage,
        OrderPage,
        AddcontactPage,
        SelectstatusPage,
        FilterPage,
        ChoiceCityPage,
    ],
    entryComponents: [
        ChoiceCityPage,
        SetraitingPage,
        AddcontactPage,
        SelectstatusPage,
        FilterPage,
        OrderPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot({mode: 'ios'}),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskIonicModule.forRoot(),
        LottieModule.forRoot({ player: playerFactory }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        IonicStorageModule.forRoot({
            name: '__tirgodriver',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        }),
        AppRoutingModule,
        MenuPageModule,
        MainPipeModule,
        ],
    providers: [
        Diagnostic,
        InAppBrowser,
        CallNumber,
        Geolocation,
        StatusBar,
        Camera,
        FileTransfer,
        Push,
        FCM,
        Diagnostic,
        Network,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}
