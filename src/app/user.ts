export class User {
    public id: number;
    public name: string = '';
    public phone: string = '';
    public email: string;
    public avatar: string;
    public birthday: string;
    public lat: number;
    public lng: number;
    public country: string;
    public city: string;
    public address: string;
    public raiting: string;
    public geo_id: any;
    public balance: number;
    public balance_off: number;
    public adr: number;
    public dirty: number;
    public busy: number;
    public files: any;
    public config: any;
    public driver_verification: any;
    constructor(user: any) {
        this.id = +user.id;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.avatar = user.avatar ? user.avatar : '/assets/img/user-empty.png';
        this.birthday = user.birthday;
        this.lat = +user.lat;
        this.lng = +user.lng;
        this.country = user.country;
        this.raiting = user.raiting;
        this.city = user.city;
        this.address = user.address;
        this.geo_id = +user.geo_id;
        this.balance = +user.balance;
        this.balance_off = +user.balance_off;
        this.adr = +user.adr;
        this.dirty = +user.dirty;
        this.busy = +user.busy;
        this.files = user.files;
        this.config = user.config;
        this.driver_verification = user.driver_verification
    }
}
