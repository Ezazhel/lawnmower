(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{RfEK:function(e,n,t){"use strict";t.r(n),t.d(n,"AchievementsModule",(function(){return g}));var c=t("ofXK"),s=t("uJrj"),i=t("fXoL"),o=t("l7P3"),a=t("Wp6s"),r=t("Qu3c"),l=t("3z6g");function m(e,n){if(1&e&&(i.Rb(0,"mat-card",3),i.Rb(1,"mat-card-title"),i.Bc(2),i.Qb(),i.Qb()),2&e){const e=n.$implicit;i.ic("matTooltip",e.description)("ngClass",e.isUnlock?"unlocked":"notUnlocked"),i.Bb(2),i.Dc(" ",e.name," ")}}let u=(()=>{class e{constructor(e){this.store=e,this.achievements$=this.store.select(s.a)}getAchievementsBonus(e){return Math.pow(1.12,e.filter(e=>e.isUnlock).length)}ngOnInit(){}trackByFunction(e,n){return e}}return e.\u0275fac=function(n){return new(n||e)(i.Lb(o.h))},e.\u0275cmp=i.Fb({type:e,selectors:[["app-achievements"]],decls:7,vars:9,consts:[[1,"achievementBonusCurrencies"],[1,"achievements"],["class","achievement",3,"matTooltip","ngClass",4,"ngFor","ngForOf","ngForTrackBy"],[1,"achievement",3,"matTooltip","ngClass"]],template:function(e,n){1&e&&(i.Rb(0,"span",0),i.Bc(1),i.ec(2,"exponential"),i.ec(3,"async"),i.Qb(),i.Rb(4,"div",1),i.Ac(5,m,3,3,"mat-card",2),i.ec(6,"async"),i.Qb()),2&e&&(i.Bb(1),i.Dc("Achievements increase all currencies gains by : ",i.fc(2,3,n.getAchievementsBonus(i.fc(3,5,n.achievements$)))," "),i.Bb(4),i.ic("ngForOf",i.fc(6,7,n.achievements$))("ngForTrackBy",n.trackByFunction))},directives:[c.j,a.a,r.a,c.i,a.c],pipes:[l.a,c.b],styles:[".achievements[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-flow:row wrap}.achievements[_ngcontent-%COMP%]   .achievement[_ngcontent-%COMP%]{cursor:unset;margin:4px;flex:0 1 calc(20% - 40px)}.achievements[_ngcontent-%COMP%]   .achievement.unlocked[_ngcontent-%COMP%]{background:#78e08f}.achievements[_ngcontent-%COMP%]   .achievement.notUnlocked[_ngcontent-%COMP%]{background-color:rgba(60,99,130,.6)}.achievementBonusCurrencies[_ngcontent-%COMP%]{display:grid;place-items:center}"]}),e})();var p=t("tyNb"),h=t("PCNd");let g=(()=>{class e{}return e.\u0275mod=i.Jb({type:e}),e.\u0275inj=i.Ib({factory:function(n){return new(n||e)},imports:[[c.c,h.a,p.e.forChild([{path:"",component:u}])]]}),e})()}}]);