"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5371],{4930:(B,l,i)=>{i.r(l),i.d(l,{ActiveorderPageModule:()=>S});var c=i(9808),h=i(3075),n=i(8058),d=i(1216),s=i(7582),p=i(1847),t=i(5e3),A=i(7053),v=i(602),Z=i(2553),f=i(7281),T=i(2217),g=i(8995);function y(u,a){1&u&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA()()),2&u&&(t.xp6(2),t.Oqu(t.lcZ(3,2,"\u0411\u0435\u0437\u043d\u0430\u043b\u0438\u0447\u043d\u0430\u044f \u043e\u043f\u043b\u0430\u0442\u0430")),t.xp6(3),t.Oqu("\u0414\u0430"))}function q(u,a){1&u&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA()()),2&u&&(t.xp6(2),t.Oqu(t.lcZ(3,2,"ADR")),t.xp6(3),t.Oqu("\u0414\u0430"))}function C(u,a){1&u&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA()()),2&u&&(t.xp6(2),t.Oqu(t.lcZ(3,2,"\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0430\u044f \u0441\u0434\u0435\u043b\u043a\u0430")),t.xp6(3),t.Oqu("\u0414\u0430"))}const O=[{path:"",component:(()=>{class u{constructor(r,e,o,m,M,F,L,Y){this.authService=r,this.loadingCtrl=e,this.callNumber=o,this.alertController=m,this.platform=M,this.router=F,this.modalCtrl=L,this.geolocation=Y}ngOnInit(){this.item=this.authService.activeorder,console.log(this.item)}finishOrder(){return(0,s.mG)(this,void 0,void 0,function*(){const r=yield this.alertController.create({header:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",message:"\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437?",cssClass:"customAlert",buttons:[{text:"\u041d\u0435\u0442",role:"cancel",cssClass:"secondary",handler:()=>{console.log("Confirm Cancel")}},{text:"\u0414\u0430",handler:()=>(0,s.mG)(this,void 0,void 0,function*(){yield r.present(),this.loading=yield this.loadingCtrl.create({message:"\u0417\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043c \u0437\u0430\u043a\u0430\u0437"}),this.loading.present(),this.geolocation.getCurrentPosition().then(e=>(0,s.mG)(this,void 0,void 0,function*(){const o=yield this.authService.finishOrder(this.authService.activeorder.id,e.coords.latitude.toString(),e.coords.longitude.toString()).toPromise();yield(yield this.modalCtrl.create({component:p.b,swipeToClose:!0,showBackdrop:!0,breakpoints:[0,.6],initialBreakpoint:.6,presentingElement:yield this.modalCtrl.getTop(),backdropDismiss:!0,cssClass:"modalCss",mode:"ios",componentProps:{orderid:this.authService.activeorder.id,userid:this.authService.activeorder.user_id}})).present(),o.status?(this.loading.dismiss(),o.error&&(yield this.authService.alert("\u041e\u0448\u0438\u0431\u043a\u0430",o.error)),this.authService.activeorder=null,yield this.router.navigate(["/tabs/home"],{replaceUrl:!0})):(this.loading.dismiss(),yield this.authService.alert("\u041e\u0448\u0438\u0431\u043a\u0430",o.error))})).catch(e=>(0,s.mG)(this,void 0,void 0,function*(){this.loading.dismiss()}))})}]});yield r.present()})}callMan(r){console.log(r),this.callNumber.callNumber("+"+r,!0)}returnNameTypeTransport(r){const e=this.authService.typetruck.findIndex(o=>+o.id==+r);return e>=0?this.authService.typetruck[e].name:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u043e"}returnNameCargoType(r){const e=this.authService.typecargo.findIndex(o=>+o.id==+r);return e>=0?this.authService.typecargo[e].name:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u043e"}}return u.\u0275fac=function(r){return new(r||u)(t.Y36(A.$),t.Y36(n.HT),t.Y36(v.X),t.Y36(n.Br),t.Y36(n.t4),t.Y36(d.F0),t.Y36(n.IN),t.Y36(Z.b))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-activeorder"]],decls:69,vars:45,consts:[[1,"ion-padding"],[1,"order-item"],[1,"order-item-articul"],["src","assets/img/circle.svg","alt",""],[1,"table-info","table-img"],[1,"table-data"],[4,"ngIf"],[1,"get-order-btn","order-succes-btn",3,"click"],[1,"get-order-btn",3,"click"]],template:function(r,e){1&r&&(t._UZ(0,"app-header"),t.TgZ(1,"ion-content",0)(2,"div",1)(3,"div",2)(4,"span"),t._UZ(5,"img",3),t._uU(6),t.qZA()(),t.TgZ(7,"table",4)(8,"tbody")(9,"tr")(10,"td"),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"td"),t._uU(14),t.qZA()(),t.TgZ(15,"tr")(16,"td"),t._uU(17),t.ALo(18,"translate"),t.qZA(),t.TgZ(19,"td"),t._uU(20),t.qZA()()()(),t.TgZ(21,"table",5)(22,"tbody")(23,"tr")(24,"td"),t._uU(25),t.ALo(26,"translate"),t.qZA(),t.TgZ(27,"td"),t._uU(28),t.ALo(29,"formatTime"),t.qZA()(),t.TgZ(30,"tr")(31,"td"),t._uU(32),t.ALo(33,"translate"),t.qZA(),t.TgZ(34,"td"),t._uU(35),t.qZA()(),t.TgZ(36,"tr")(37,"td"),t._uU(38),t.ALo(39,"translate"),t.qZA(),t.TgZ(40,"td"),t._uU(41),t.qZA()(),t.YNc(42,y,6,4,"tr",6),t.YNc(43,q,6,4,"tr",6),t.YNc(44,C,6,4,"tr",6),t.TgZ(45,"tr")(46,"td"),t._uU(47),t.ALo(48,"translate"),t.qZA(),t.TgZ(49,"td"),t._uU(50),t.qZA()(),t.TgZ(51,"tr")(52,"td"),t._uU(53),t.ALo(54,"translate"),t.qZA(),t.TgZ(55,"td"),t._uU(56),t.qZA()(),t.TgZ(57,"tr")(58,"td"),t._uU(59),t.ALo(60,"translate"),t.qZA(),t.TgZ(61,"td"),t._uU(62),t.qZA()()()(),t.TgZ(63,"button",7),t.NdJ("click",function(){return e.callMan(e.item.userphoneorder)}),t._uU(64),t.ALo(65,"translate"),t.qZA(),t.TgZ(66,"button",8),t.NdJ("click",function(){return e.finishOrder()}),t._uU(67),t.ALo(68,"translate"),t.qZA()()()),2&r&&(t.xp6(6),t.hij(" \u2116",e.authService.addLeadingZeros(e.item.id),""),t.xp6(5),t.hij("",t.lcZ(12,22,"\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0438\u0437"),":"),t.xp6(3),t.Oqu(e.item.route.from_city),t.xp6(3),t.hij("",t.lcZ(18,24,"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0432"),":"),t.xp6(3),t.Oqu(e.item.route.to_city),t.xp6(5),t.Oqu(t.lcZ(26,26,"\u0412\u0440\u0435\u043c\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438")),t.xp6(3),t.Oqu(t.xi3(29,28,e.item.date_send,"DD MMMM YYYY \u0432 HH:mm")),t.xp6(4),t.Oqu(t.lcZ(33,31,"\u0422\u0438\u043f \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u0430")),t.xp6(3),t.Oqu(e.returnNameTypeTransport(e.item.transport_type)),t.xp6(3),t.Oqu(t.lcZ(39,33,"\u0422\u0438\u043f \u0433\u0440\u0443\u0437\u0430")),t.xp6(3),t.Oqu(e.returnNameCargoType(e.item.type_cargo)),t.xp6(1),t.Q6J("ngIf",e.item.no_cash),t.xp6(1),t.Q6J("ngIf",e.item.adr),t.xp6(1),t.Q6J("ngIf",e.item.secure_transaction),t.xp6(3),t.Oqu(t.lcZ(48,35,"\u0412\u0435\u0441 \u0433\u0440\u0443\u0437\u0430")),t.xp6(3),t.hij("",e.item.weight," \u043a\u0433."),t.xp6(3),t.Oqu(t.lcZ(54,37,"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c")),t.xp6(3),t.Oqu(e.item.usernameorder),t.xp6(3),t.Oqu(t.lcZ(60,39,"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b")),t.xp6(3),t.hij("+",e.item.userphoneorder,""),t.xp6(2),t.Oqu(t.lcZ(65,41,"\u041f\u043e\u0437\u0432\u043e\u043d\u0438\u0442\u044c")),t.xp6(3),t.Oqu(t.lcZ(68,43,"\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437")))},dependencies:[c.O5,n.W2,f.E,T.Q,g.X$],styles:[".table-info[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{width:50px;padding:0 0 0 15px!important}"]}),u})()}];let U=(()=>{class u{}return u.\u0275fac=function(r){return new(r||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[d.Bz.forChild(O),d.Bz]}),u})();var x=i(1059),P=i(1456);let S=(()=>{class u{}return u.\u0275fac=function(r){return new(r||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[c.ez,h.u5,n.Pc,U,x.HeaderPageModule,P.h,g.aw]}),u})()}}]);