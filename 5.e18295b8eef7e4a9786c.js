(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{qBpB:function(t,n,e){"use strict";e.r(n),e.d(n,"BloggingModule",(function(){return S}));var c=e("ofXK"),o=e("PCNd"),i=e("sSeH"),s=e("fXoL"),a=e("3z6g");let r=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s.Fb({type:t,selectors:[["post"]],inputs:{post:"post"},decls:3,vars:3,template:function(t,n){1&t&&(s.Rb(0,"p"),s.Bc(1),s.ec(2,"exponential"),s.Qb()),2&t&&(s.Bb(1),s.Dc(" ",s.fc(2,1,n.post)," "))},pipes:[a.a],styles:[""]}),t})();var b=e("PH1f"),g=e("3SG3"),l=e("l7P3"),p=e("5dsi"),u=e("XiUz"),d=e("wZkO"),f=e("wgrW"),h=e("NCyP"),x=e("y3F+"),k=e("XNiG"),m=e("zp1y"),O=e("VW+A"),C=e("znSr"),y=e("Qu3c"),M=e("bTqV");const P=function(t,n){return{canGetIdea:t,cantGetIdea:n}};function _(t,n){if(1&t){const t=s.Sb();s.Rb(0,"div",3),s.Rb(1,"span"),s.Bc(2),s.Qb(),s.Rb(3,"span",4),s.Zb("click",(function(){return s.qc(t),s.dc().doGetIdea$.next()})),s.ec(4,"async"),s.ec(5,"async"),s.Bc(6),s.ec(7,"exponential"),s.Qb(),s.Qb()}if(2&t){const t=n.ngIf,c=s.dc();var e=null;s.Bb(2),s.Dc(" ",t.own," Ideas"),s.Bb(1),s.ic("ngClass",s.lc(9,P,(null==(e=s.fc(4,3,c.imagination$))?null:e.amount)>=t.price(),(null==(e=s.fc(5,5,c.imagination$))?null:e.amount)<=t.price())),s.Bb(3),s.Dc(" 1 Idea : ",s.fc(7,7,t.price())," I ")}}function v(t,n){if(1&t){const t=s.Sb();s.Rb(0,"div",5),s.Rb(1,"button",6),s.Zb("click",(function(){return s.qc(t),s.dc().create()})),s.Bc(2,"Create"),s.Qb(),s.Rb(3,"span",7),s.Bc(4),s.ec(5,"exponential"),s.ec(6,"async"),s.Qb(),s.Rb(7,"span",8),s.Bc(8,"5% to get creation point"),s.Qb(),s.Qb()}if(2&t){const t=s.dc();s.Bb(4),s.Dc("cost ",s.fc(5,1,s.fc(6,3,t.creation$).price())," idea")}}const w=function(t){return{think:!0,clicked:t}};let B=(()=>{class t{constructor(t,n){this.store=t,this._bloggingService=n,this.creation$=this.store.select(x.b),this.imagination$=this.store.select(x.c),this.isThinking$=this.store.select(b.d),this.idea$=this.store.select(b.c),this.doGetIdea$=new k.a,this.getIdeaSubscription=this.doGetIdea$.pipe(Object(m.a)(this.imagination$,this.idea$,(t,n,e)=>{var c;(null!==(c=null==n?void 0:n.amount)&&void 0!==c?c:0)<=e.price()||(this.store.dispatch(Object(f.b)()),this.store.dispatch(Object(h.earnCurrency)({currency:Object.assign(Object.assign({},n),{amount:-e.price()})})))})).subscribe()}ngOnInit(){}think(){this.store.dispatch(Object(f.g)())}create(){this._bloggingService.doGetCreatePoint.next()}}return t.\u0275fac=function(n){return new(n||t)(s.Lb(l.h),s.Lb(O.a))},t.\u0275cmp=s.Fb({type:t,selectors:[["blogging-actions"]],decls:8,vars:14,consts:[[3,"ngClass","matTooltip","click"],["fxLayout","column","fxFlexAlign","center","id","ideas",4,"ngIf"],["class","creation",4,"ngIf"],["fxLayout","column","fxFlexAlign","center","id","ideas"],["matTooltip","buff imagination generation, used to create",3,"ngClass","click"],[1,"creation"],["mat-button","","mat-fab","","color","primary","matTooltip","C % 2 = +0.05I",3,"click"],[1,"creation-idea-cost"],[1,"creation-chance"]],template:function(t,n){var e;1&t&&(s.Rb(0,"button",0),s.Zb("click",(function(){return n.think()})),s.ec(1,"async"),s.ec(2,"async"),s.Bc(3," Think\n"),s.Qb(),s.Ac(4,_,8,12,"div",1),s.ec(5,"async"),s.Ac(6,v,9,5,"div",2),s.ec(7,"async")),2&t&&(s.ic("ngClass",s.kc(12,w,s.fc(1,4,n.isThinking$)))("matTooltip",null==(e=s.fc(2,6,n.imagination$))?null:e.gain),s.Bb(4),s.ic("ngIf",s.fc(5,8,n.idea$)),s.Bb(2),s.ic("ngIf",void 0!==s.fc(7,10,n.creation$)))},directives:[c.i,C.a,y.a,c.k,u.d,u.a,M.a],pipes:[c.b,a.a],styles:["[_nghost-%COMP%]{display:flex;flex-direction:row;place-content:center space-evenly}[_nghost-%COMP%]   .mat-card[_ngcontent-%COMP%]{flex:1 1 100%;margin:5px}[_nghost-%COMP%]   .mat-card[_ngcontent-%COMP%]:hover{cursor:pointer}[_nghost-%COMP%]   button[_ngcontent-%COMP%]{border-radius:50%;width:56px;height:56px;border:none;outline:none}[_nghost-%COMP%]   button.think[_ngcontent-%COMP%]{box-shadow:0 2px 4px rgba(0,0,0,.26);background-color:rgba(120,224,143,.1);transition:.4s;cursor:pointer}[_nghost-%COMP%]   button.think.clicked[_ngcontent-%COMP%], [_nghost-%COMP%]   button.think[_ngcontent-%COMP%]:hover{box-shadow:inset 0 2px 4px rgba(0,0,0,.26);background-color:rgba(120,224,143,.3)}[_nghost-%COMP%]   button.think.clicked[_ngcontent-%COMP%]:hover{box-shadow:0 2px 4px rgba(0,0,0,.26);background-color:rgba(120,224,143,.1)}[_nghost-%COMP%]   #ideas[_ngcontent-%COMP%]{line-height:16px}[_nghost-%COMP%]   #ideas[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin:5px;text-align:center;padding:5px}[_nghost-%COMP%]   #ideas[_ngcontent-%COMP%]   span.canGetIdea[_ngcontent-%COMP%]{border-radius:10px;background-color:rgba(120,224,143,.05);box-shadow:0 1px 2px #78e08f;cursor:pointer}[_nghost-%COMP%]   #ideas[_ngcontent-%COMP%]   span.cantGetIdea[_ngcontent-%COMP%]{border-radius:10px;background-color:rgba(235,47,6,.05);box-shadow:0 1px 2px #eb2f06;cursor:not-allowed}[_nghost-%COMP%]   .creation[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;gap:10px;align-items:center;border-radius:5px;box-shadow:0 1px 5px rgba(0,0,0,.2);padding:.4rem}[_nghost-%COMP%]   .creation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px}"]}),t})(),I=(()=>{class t{constructor(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s.Fb({type:t,selectors:[["book"]],inputs:{book:"book"},decls:1,vars:1,template:function(t,n){1&t&&s.Bc(0),2&t&&s.Dc("",n.book.name," !")},encapsulation:2}),t})();function $(t,n){if(1&t&&(s.Rb(0,"p"),s.Mb(1,"book",1),s.Qb()),2&t){const t=n.$implicit;s.Bb(1),s.ic("book",t)}}let F=(()=>{class t{constructor(t){this.store=t,this.books$=this.store.select(b.b)}ngOnInit(){}trackByFunction(t,n){return n.id}}return t.\u0275fac=function(n){return new(n||t)(s.Lb(l.h))},t.\u0275cmp=s.Fb({type:t,selectors:[["books"]],decls:2,vars:4,consts:[[4,"ngFor","ngForOf","ngForTrackBy"],[3,"book"]],template:function(t,n){1&t&&(s.Ac(0,$,2,1,"p",0),s.ec(1,"async")),2&t&&s.ic("ngForOf",s.fc(1,2,n.books$))("ngForTrackBy",n.trackByFunction)},directives:[c.j,I],pipes:[c.b],styles:[""]}),t})();var Q=e("AY7x");function R(t,n){if(1&t&&(s.Rb(0,"section",6),s.Mb(1,"post",7),s.Qb()),2&t){const t=n.ngIf;s.Bb(1),s.ic("post",t.post.message)}}let T=(()=>{class t{constructor(t,n){this.store=t,this.idlingService=n,this.upgradeTab="blogging",this.blogging$=this.store.select(b.a),this.upgrades$=this.store.select(g.a)}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)(s.Lb(l.h),s.Lb(p.a))},t.\u0275cmp=s.Fb({type:t,selectors:[["blogging"]],decls:10,vars:4,consts:[["fxLayout","row","fxLayout.lt-lg","column","fxLayoutAlign","center start","fxLayoutAlign.lt-lg","center"],["fxFlex","60"],["label","Blog"],["class","blog",4,"ngIf"],["label","Books"],["fxFlex","",3,"upgradeTab"],[1,"blog"],[3,"post"]],template:function(t,n){1&t&&(s.Rb(0,"div",0),s.Rb(1,"div",1),s.Rb(2,"mat-tab-group"),s.Rb(3,"mat-tab",2),s.Mb(4,"blogging-actions"),s.Ac(5,R,2,1,"section",3),s.ec(6,"async"),s.Qb(),s.Rb(7,"mat-tab",4),s.Mb(8,"books"),s.Qb(),s.Qb(),s.Qb(),s.Mb(9,"upgrades",5),s.Qb()),2&t&&(s.Bb(5),s.ic("ngIf",s.fc(6,2,n.blogging$)),s.Bb(4),s.ic("upgradeTab",n.upgradeTab))},directives:[u.d,u.c,u.b,d.c,d.a,B,c.k,F,Q.a,r],pipes:[c.b],styles:[""],changeDetection:0}),t})();var L=e("tyNb"),A=e("YUcS");const G=[{path:"",component:T}];let S=(()=>{class t{}return t.\u0275mod=s.Jb({type:t}),t.\u0275inj=s.Ib({factory:function(n){return new(n||t)},imports:[[c.c,o.a,i.a,A.a,L.e.forChild(G)]]}),t})()}}]);