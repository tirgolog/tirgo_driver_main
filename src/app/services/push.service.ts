import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Push, PushObject, PushOptions} from "@awesome-cordova-plugins/push/ngx";

@Injectable({
    providedIn: 'root'
})
export class PushService {
    pushObject: PushObject | undefined
    constructor(
        private router: Router,
        private push: Push,
        private authService: AuthenticationService,
    ) {
    }

    init() {
        try {
            this.push.hasPermission()
                .then((res: any) => {
                    if (res.isEnabled) {
                        console.log('We have permission to send push notifications');
                    } else {
                        console.log('We do not have permission to send push notifications');
                    }
                });
            const options: PushOptions = {
                android: {
                    senderID: '205895546665',
                    clearBadge: true,
                    forceShow: false
                },
                ios: {
                    alert: 'true',
                    badge: 'true',
                    clearBadge: true,
                    sound: 'true',
                },
                windows: {}
            };
            this.pushObject = this.push.init(options);
            this.pushObject.on('registration').subscribe((data: any) => {
                console.log('saveDeviceToken',data.registrationId);
                this.authService.saveDeviceToken(data.registrationId.toString()).subscribe();
            });
            this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
            this.pushObject.on('notification').subscribe((notify: any) => {
                console.log(notify)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
