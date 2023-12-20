import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
} from "@angular/core";
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";
import { OrderPage } from "../order/order.page";
import { AddtransportPage } from "../addtransport/addtransport.page";
import { SocketService } from "../services/socket.service";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import axios from "axios";
import { log } from "console";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomePage implements OnInit {
  file_url = 'https://merchant.tirgo.io/api/v1/file/download/';
  modalAppendOrder: boolean = false;
  modalAppendOrderFull: boolean = false;
  filter: boolean = false;
  vieworder: number = 0;
  //order
  appendorderid: number = 0;
  appendorderdate: string = "";
  add_two_days: boolean = false;
  dates: any[] = [];
  price: string = "";
  selectedtruck: number = 0;
  items: any[] = [];
  localItems: any[] = [];
  worldItems: any[] = [];
  selectedType: string = "world";
  loading: any;
  loadingSendButton: boolean = false;
  filteredCityOut: string = "";
  myTruckTypeIds: any;

  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    private modalController: ModalController,
    private socketService: SocketService,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private routerOutlet: IonRouterOutlet
  ) {}

  async doRefresh(event: any) {
    this.allTruck(this.selectedtruck);

    // this.authService.myorders = await this.authService.getMyOrders().toPromise();
    // if (this.selectedtruck > 0) {
    //   this.allTruck(this.selectedtruck)
    // this.items = this.authService.myorders.filter((item) => {
    //   return +item.transport_type === +this.selectedtruck;
    // });
    // }
    setTimeout(() => {
      event.target.complete();
      this.filterOrderLocal();
    }, 1000);
  }
  selectType(type: string) {
    this.selectedType = type;
    this.filterOrderLocal();
  }
  filterOrderLocal() {
    for (let row of this.items) {
      if (row.route.from_city === row.route.to_city) {
        this.localItems.push({ id: row.id });
      } else {
        this.worldItems.push({ id: row.id });
      }
    }
  }
  localOrWorldIsset(id: number) {
    if (this.selectedType === "local") {
      const index = this.localItems.findIndex((e) => e.id === id);
      return index >= 0;
    } else if (this.selectedType === "world") {
      const index = this.worldItems.findIndex((e) => e.id === id);
      return index >= 0;
    } else {
      return false;
    }
  }
  returnNameTypeTransport(type: number) {
    const index = this.authService.typetruck.findIndex((e) => +e.id === +type);
    if (index >= 0) {
      return this.authService.typetruck[index].name;
    } else {
      return "Не выбрано";
    }
  }
  returnNameCargoType(id: number) {
    const index = this.authService.typecargo.findIndex((e) => +e.id === +id);
    if (index >= 0) {
      return this.authService.typecargo[index].name;
    } else {
      return "Не выбрано";
    }
  }
  async ionViewWillEnter() {
    // this.items = this.authService.myorders;
    this.getOrders();
    this.filterOrderLocal();
  }

  haveSameContents = (a, b) => {
    if (!a || !b) return false;
    a = a.slice(1, -1).split(",");
    for (const v of new Set([...a, ...b]))
      if (a.filter((e) => +e === v).length !== b.filter((e) => e === v).length)
        return false;
    return true;
  };

  getOrders() {
    if (this.selectedtruck == 0) {
      this.allTruck(0);
    } else {
      this.authService.getTruck().subscribe((res: any) => {
        this.myTruckTypeIds = res.map((el: any) => el.type);
        this.authService.getMyOrders().subscribe((order: any) => {
          this.items = order.filter((el: any) =>
            this.haveSameContents(el.transport_types, [this.selectedtruck])
          );
          this.items = this.items.sort(function (a, b) {
            return (
              Number(new Date(a.date_create)) - Number(new Date(b.date_create))
            );
          });
          // date_create
          this.items.forEach((v, k) => {
            // v.transport_types = JSON.parse(v.transport_types)
          });
        });
      });
    }
  }

  ngOnInit() {
    this.getOrders();
    this.routerOutlet.swipeGesture = false;
    this.socketService.updateAllOrders().subscribe(async (res: any) => {
      for (let row of this.authService.myorders) {
        const index = this.authService.myorders.findIndex(
          (e) => e.id === row.id && row.status !== 2
        );
        if (index >= 0) {
          const indexuser = this.authService.myorders[
            index
          ].orders_accepted.findIndex(
            (user: {
              status_order: Boolean | undefined;
              id: number | undefined;
            }) =>
              user.id === this.authService.currentUser?.id && user.status_order
          );
          if (indexuser >= 0) {
            this.authService.activeorder = this.authService.myorders[index];
            this.authService.myorders.splice(index, 1);
          }
        }
      }
      // this.items = this.authService.myorders;
      this.getOrders();
    });
    this.filterOrderLocal();
  }
  viewOrderInfo(id: number) {
    if (this.vieworder === id) {
      this.vieworder = 0;
    } else {
      this.vieworder = id;
    }
  }
  async acceptOrder(item: any) {
    const modal = await this.modalController.create({
      component: OrderPage,
      canDismiss: true,
      showBackdrop: true,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9,
      presentingElement: await this.modalController.getTop(),
      backdropDismiss: true,
      cssClass: "modalCss",
      mode: "ios",
      componentProps: {
        item,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.accepted) {
      this.authService.myorders = await this.authService
        .getMyOrders()
        .toPromise();
      // this.items = this.authService.myorders;
      this.getOrders();
    } else {
    }
  }
  findAcceptedOrders(id: number) {
    const index = this.items.findIndex((e) => e.id === id);
    if (index >= 0) {
      const indexuser = this.items[index].orders_accepted.findIndex(
        (user: { id: number }) => user.id === this.authService.currentUser?.id
      );
      return indexuser < 0;
    }
    return true;
  }
  findAcceptedOrdersAndAccepted(id: number) {
    const index = this.items.findIndex((e) => e.id === id);
    if (index >= 0) {
      const indexuser = this.items[index].orders_accepted.findIndex(
        (user: { status_order: Boolean | undefined; id: number | undefined }) =>
          user.id === this.authService.currentUser?.id && user.status_order
      );
      return indexuser < 0;
    }
    return false;
  }
  async appendOrder(item: any) {
    if (this.authService.activeorder) {
      await this.authService.alert(
        "Принятие заказа",
        "К сожалению Вы не можете принять заказ так как не завершили активный."
      );
      this.loading = false;
    } else if (this.authService.currentUser?.dirty === 3) {
      await this.authService.alert(
        "Принятие заказа",
        "К сожалению Вы не можете принять заказ так как ваш аккаунт заблокирован. Обратитесь в службу поддержки для дополнительно информации."
      );
      this.loading = false;
    } else {
      this.loading = false;
      await this.acceptOrder(item);
      /*const alert = await this.alertController.create({
        header: 'Вы уверены?',
        message: 'Вы действительно хотите принять заказ?',
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
              await this.acceptOrder(item)
            }
          }
        ]
      });
      await alert.present();*/
    }
  }
  openFilter(isOpen: boolean) {
    this.filter = isOpen;
  }
  openModalOrderFull() {
    this.closeModalAll();
    this.modalAppendOrderFull = true;
  }
  closeModalAll() {
    this.modalAppendOrder = false;
    this.modalAppendOrderFull = false;
    this.filter = false;
  }
  returnDay(date: string, num: number) {
    let number: string = (+date.split(".")[0] + +num).toString();
    if (+number < 10) {
      number = "0" + number;
    }
    return number.toString();
  }
  selectDay(ev: any, date: string, num: number) {
    let number: string = (+date.split(".")[0] + +num).toString();
    if (+number < 10) {
      number = "0" + number;
    }
    const index = this.dates.findIndex((e: string) => e === number);
    if (ev.target.checked) {
      if (index < 0) {
        this.dates.push(number);
      }
    } else {
      this.dates.splice(index, 1);
    }
  }

  async sendAcceptOrder() {
    this.loadingSendButton = true;
    this.loading = await this.loadingCtrl.create({
      message: "Проверяем геопозицию",
    });
    this.loading.present();
    this.geolocation
      .getCurrentPosition()
      .then(async (resp) => {
        const get =
          "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" +
          resp.coords.latitude.toString() +
          "," +
          resp.coords.longitude.toString() +
          "&apikey=" +
          this.authService.currentUser?.config.key_api_maps +
          "&lang=ru-RU";
        axios
          .get(get)
          .then(async (res) => {
            this.closeModalAll();

            if (res.status) {
              this.loading.dismiss();
              this.authService
                .acceptOrder(this.appendorderid, this.price, this.dates, false)
                .toPromise()
                .then((res) => {
                  if (res.data) {
                    this.loading.dismiss();
                    this.loadingSendButton = false;
                    this.closeModalAll();
                  }
                })
                .catch((err) => {
                  this.loading.dismiss();
                  this.loadingSendButton = false;
                  this.closeModalAll();
                });
            }
          })
          .catch(async (error) => {
            this.loading.dismiss();
            this.loadingSendButton = false;
            await this.authService.alert(
              "Ошибка",
              "Для завершения заказа нам нужно знать вашу геопозицию. Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver"
            );
          });
      })
      .catch(async (err) => {
        this.loading.dismiss();
        this.loadingSendButton = false;
        await this.authService.alert(
          "Ошибка",
          "Для завершения заказа нам нужно знать вашу геопозицию. Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver"
        );
      });
  }
  async cancelOrder(item: any) {
    const alert = await this.alertController.create({
      header: "Внимание",
      message: "Вы действительно хотите отменить заказ?",
      cssClass: "customAlert",
      buttons: [
        {
          text: "Нет",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Да",
          handler: async () => {
            if(item.isMerchant)
              item.id = item.id.split("M")[1];
            const res = await this.authService.cancelOrder(item).toPromise();
            if (res.status) {
              this.getOrders();
            }
          },
        },
      ],
    });
    await alert.present();
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
      cssClass: "modalCss",
      mode: "ios",
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }
  allTruck(id: number) {
    this.selectedtruck = id;
    if (this.selectedtruck > 0) {
      this.getOrders();
      this.items = this.items.filter((item) => {
        return +item.transport_type === +this.selectedtruck;
      });
    } else {
      this.authService.getMyOrders().subscribe((order: any) => {
        this.items = order;
        this.items.forEach((v, k) => {
          // v.transport_types = JSON.parse(v.transport_types)
        });
      });
    }
  }
  filterOrders() {
    this.getOrders();
    this.items = this.items.filter((item) => {
      return item.route.from_city
        .toLowerCase()
        .includes(this.filteredCityOut.toLowerCase());
    });
    this.filter = false;
  }
  filterClose() {
    // this.items = this.authService.myorders;
    this.getOrders();
    this.filter = false;
  }
}
