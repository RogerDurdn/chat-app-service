(function(){"use strict";var e={9791:function(e,n,t){var o=t(9242),r=t(3396);const s={id:"nav"},i=(0,r.Uk)("Chat"),a=(0,r.Uk)(" | "),l=(0,r.Uk)("Image"),c=(0,r.Uk)(" | ");function u(e,n){const t=(0,r.up)("router-link"),o=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",s,[(0,r.Wm)(t,{to:"/"},{default:(0,r.w5)((()=>[i])),_:1}),a,(0,r.Wm)(t,{to:"/tumb"},{default:(0,r.w5)((()=>[l])),_:1}),c,(0,r.Wm)(o)])}var d=t(89);const m={},h=(0,d.Z)(m,[["render",u]]);var p=h,f=t(678);const v=(0,r._)("div",{class:"row"},[(0,r._)("div",{class:"col-md-6 offset-md-3 py-5"},[(0,r._)("h1",null,"Home")])],-1),b=(0,r._)("div",null,[(0,r._)("p",null,"home teather ")],-1);function g(e,n){return(0,r.wg)(),(0,r.iD)(r.HY,null,[v,b],64)}const w={},_=(0,d.Z)(w,[["render",g]]);var k=_;const y={class:"container"},O={class:"row"},M={class:"col-md-6 offset-md-3 py-5"},U=(0,r._)("h1",null,"Generate change",-1),C={class:"form-group"},I=(0,r._)("div",{class:"form-group"},[(0,r._)("button",{class:"btn btn-primary"},"Generate in another place!")],-1),S=["src"];function x(e,n,t,s,i,a){return(0,r.wg)(),(0,r.iD)("div",y,[(0,r._)("div",O,[(0,r._)("div",M,[U,(0,r._)("form",{onSubmit:n[1]||(n[1]=(0,o.iM)(((...e)=>a.makeWebsiteThumbnail&&a.makeWebsiteThumbnail(...e)),["prevent"]))},[(0,r._)("div",C,[(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":n[0]||(n[0]=e=>i.websiteUrl=e),type:"text",id:"website-input",placeholder:"Enter a website",class:"form-control"},null,512),[[o.nr,i.websiteUrl]])]),I],32),(0,r._)("img",{src:i.thumbnailUrl},null,8,S)])])])}var T=t(6265),W=t.n(T),j={name:"App",data(){return{websiteUrl:"",thumbnailUrl:""}},methods:{makeWebsiteThumbnail(){let e=location.hostname;W().post("http://"+e+":9090/api/thumbnail",{url:this.websiteUrl}).then((e=>{this.thumbnailUrl=e.data.screenshot})).catch((e=>{window.alert(`The API returned an error: ${e}`)}))}}};const D=(0,d.Z)(j,[["render",x]]);var P=D,Z=t(7139);const z={class:"row"},V={class:"col-md-6 offset-md-3 py-5"},A=(0,r._)("h1",null,"Chat",-1),E=(0,r._)("br",null,null,-1),H={key:0},G=["action"],J=(0,r._)("br",null,null,-1),N={style:{}},q=(0,r._)("h3",null,"Messages",-1),F={style:{"white-space":"pre-line","background-color":"slategrey"}},Y=["action"],$=["disabled"];function B(e,n,t,s,i,a){return(0,r.wg)(),(0,r.iD)("div",z,[(0,r._)("div",V,[A,E,i.connectionOn?((0,r.wg)(),(0,r.iD)("div",H,[(0,r._)("h3",null,"Connected like: "+(0,Z.zw)(i.clientId),1)])):(0,r.kq)("",!0),(0,r._)("form",{action:a.connect,onClick:n[2]||(n[2]=(0,o.iM)(((...n)=>e.onSubmit&&e.onSubmit(...n)),["prevent"]))},[(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":n[0]||(n[0]=e=>i.clientId=e),type:"text",style:{width:"88px"}},null,512),[[o.nr,i.clientId]]),(0,r._)("input",{type:"submit",value:"Connect",onClick:n[1]||(n[1]=(...e)=>a.connect&&a.connect(...e))})],8,G),J,(0,r._)("div",N,[q,(0,r._)("button",{onClick:n[3]||(n[3]=(...e)=>a.clear&&a.clear(...e))},"Clear"),(0,r._)("p",F,(0,Z.zw)(i.rcvMessage),1),(0,r.Uk)(" >"+(0,Z.zw)(i.clientId)+" - "+(0,Z.zw)(i.message),1)]),(0,r._)("form",{action:a.sendMessage,onClick:n[6]||(n[6]=(0,o.iM)(((...n)=>e.onSubmit&&e.onSubmit(...n)),["prevent"]))},[(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":n[4]||(n[4]=e=>i.message=e),type:"textarea",name:""},null,512),[[o.nr,i.message]]),(0,r._)("input",{disabled:!i.connectionOn,type:"submit",value:"Send",onClick:n[5]||(n[5]=(...e)=>a.sendMessage&&a.sendMessage(...e))},null,8,$)],8,Y)])])}var K={name:"App",data(){return{clientId:"",message:"",socket:null,rcvMessage:"",showMessage:!1,connectionOn:!1,fullText:""}},mounted(){},methods:{sendMessage(){let e={clientId:"",message:this.message};this.message="",this.socket.send(JSON.stringify(e))},showMessages(e){let n=JSON.parse(e.data),t=n.clientId?">"+n.clientId:"";this.rcvMessage+=t+" - "+n.message+" \n ",this.showMessage=!0},connect(){console.log("Opening connection...");let e=location.hostname;this.socket=new WebSocket("ws://"+e+":9090/socket?clientId="+this.clientId),this.socket.onopen=()=>{console.log("Connection established!"),this.connectionOn=!0},this.socket.onmessage=e=>{this.showMessages(e)}},clear(){this.rcvMessage=""}}};const L=(0,d.Z)(K,[["render",B]]);var Q=L;function R(e,n){return(0,r.wg)(),(0,r.iD)("p",null,"Page not found")}const X={},ee=(0,d.Z)(X,[["render",R]]);var ne=ee;const te=[{path:"/some",name:"Home",component:k},{path:"/tumb",name:"Tumb",component:P},{path:"/",name:"WebSock",component:Q},{path:"/:pathMatch(.*)*",name:"ViewError",component:ne}],oe=(0,f.p7)({history:(0,f.PO)(),routes:te});var re=oe;(0,o.ri)(p).use(re).mount("#app")}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var s=n[o]={exports:{}};return e[o](s,s.exports,t),s.exports}t.m=e,function(){var e=[];t.O=function(n,o,r,s){if(!o){var i=1/0;for(u=0;u<e.length;u++){o=e[u][0],r=e[u][1],s=e[u][2];for(var a=!0,l=0;l<o.length;l++)(!1&s||i>=s)&&Object.keys(t.O).every((function(e){return t.O[e](o[l])}))?o.splice(l--,1):(a=!1,s<i&&(i=s));if(a){e.splice(u--,1);var c=r();void 0!==c&&(n=c)}}return n}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[o,r,s]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,s,i=o[0],a=o[1],l=o[2],c=0;if(i.some((function(n){return 0!==e[n]}))){for(r in a)t.o(a,r)&&(t.m[r]=a[r]);if(l)var u=l(t)}for(n&&n(o);c<i.length;c++)s=i[c],t.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return t.O(u)},o=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(9791)}));o=t.O(o)})();
//# sourceMappingURL=app.dfba2c9a.js.map