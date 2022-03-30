(function(){var e={8747:function(e,t,s){"use strict";var r=s(144),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("router-view")},o=[],i={name:"App"},a=i,l=s(1001),d=(0,l.Z)(a,n,o,!1,null,null,null),c=d.exports,u=s(8345),m=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-app",{staticStyle:{"padding-left":"56px"}},[s("side-menu",{attrs:{drawer:e.drawer,items:e.navs}}),s("router-view")],1)},h=[],p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{height:"100%"},attrs:{id:"terminal"}})},f=[],v=s(2300),g=s(2320),b=s(2617),w=s(7511),y=s(747);const _=new g.Terminal;_.loadAddon(new w.WebLinksAddon);const k={foreground:"#ffffff",background:"#1b212f",cursor:"#ffffff",selection:"rgba(255, 255, 255, 0.3)",black:"#000000",brightBlack:"#808080",red:"#ce2f2b",brightRed:"#f44a47",green:"#00b976",brightGreen:"#05d289",yellow:"#e0d500",brightYellow:"#f4f628",magenta:"#bd37bc",brightMagenta:"#d86cd8",blue:"#1d6fca",brightBlue:"#358bed",cyan:"#00a8cf",brightCyan:"#19b8dd",white:"#e5e5e5",brightWhite:"#ffffff"};var x={props:{url:String,bidirectional:{type:Boolean,default:!0}},data(){return{isFullScreen:!1,searchKey:"",ws:null,term:null,fitAddon:new b.FitAddon,webLinkAddon:new w.WebLinksAddon,searchAddon:new y.SearchAddon,rows:35,cols:100,heartBeatTimer:null,messageBuffer:null,bufferedTime:-1}},mounted(){this.initTerm()},methods:{onTermResize(e){this.rows=e.rows,this.cols=e.cols,console.log("resize",e),this.ws&&(console.log("resize1",e),this.ws.send(JSON.stringify({type:"resize",rows:e.rows,cols:e.cols})))},onWindowResize(){console.log("onWindowResize"),this.fitAddon.fit()},startHeartBeat(){this.heartBeatTimer=setInterval((()=>{this.ws&&(console.log("heartbeat"),this.ws.send(JSON.stringify({type:"hbt",cmd:""})))}),3e4)},handleWebSocketMessage(e){this.bufferedTime&&this.bufferedTime>0?this.messageBuffer?this.messageBuffer+=e.data:(this.messageBuffer=e.data,setTimeout((()=>{this.term.write(this.messageBuffer)}),this.bufferedTime)):this.term.write(e.data)},handleTerminalData(e){this.term.socket&&this.ws.send(JSON.stringify({type:"cmd",cmd:v.DS.encode(e)}))},doClose(){window.removeEventListener("resize",this.onWindowResize),this.ws&&this.ws.close(),this.term&&this.term.dispose()},termOnWsClose(){this.term.setOption("cursorBlink",!1),delete this.term.socket,clearInterval(this.heartBeatTimer)},initTerm(){this.term=new g.Terminal({rendererType:"canvas",rows:this.rows,cols:this.cols,convertEol:!0,scrollback:10,disableStdin:!1,fontSize:18,cursorBlink:!0,cursorStyle:"bar",bellStyle:"sound",theme:k}),this.term.loadAddon(this.webLinkAddon),this.term.loadAddon(this.searchAddon),this.term.loadAddon(this.fitAddon),this.term._initialized=!0,this.term.prompt=()=>{this.term.write("\r\n")},this.term.writeln("Welcome to [1;3;31mxterm.js[0m"),this.term.writeln("This is a local terminal emulation, without a real terminal in the back-end."),this.term.writeln("Type some keys and commands to play around."),this.term.prompt(),this.term.open(document.getElementById("terminal")),this.term.onResize(this.onTermResize),this.term.onSelectionChange((()=>{this.term.hasSelection()&&navigator.clipboard.writeText(this.term.getSelection())})),window.addEventListener("resize",this.onWindowResize),this.fitAddon.fit(),this.initWs(),this.term.socket=this.ws,this.bidirectional&&this.term.onData(this.handleTerminalData)},initWs(){this.ws=new WebSocket(`${this.url}?cols=${this.cols}&rows=${this.rows}`),this.ws.onmessage=this.handleWebSocketMessage,this.startHeartBeat(),this.ws.onerror=()=>{this.$message.error("ws has no token, please login first"),this.$router.push({name:"login"})},this.ws.onclose=()=>{this.ws.removeEventListener("message",this.handleWebSocketMessage),this.term.writeln("[1;3;31mConnection lost. Please close the page and reconnect it.[0m"),this.term.prompt(),this.termOnWsClose()}}},beforeDestroy(){console.log("beforeDestroy"),this.doClose()}},I=x,S=(0,l.Z)(I,p,f,!1,null,null,null),C=S.exports,A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-dialog",{attrs:{value:e.dialog,persistent:"","max-width":"500px"}},[s("v-card",[s("v-card-title",[s("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),s("v-card-text",[s("v-container",[s("v-row",[s("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[s("v-text-field",{attrs:{label:"Server name"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),s("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[s("v-text-field",{attrs:{label:"IP"},model:{value:e.editedItem.host,callback:function(t){e.$set(e.editedItem,"host",t)},expression:"editedItem.host"}})],1),s("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[s("v-text-field",{attrs:{type:"number",label:"Port"},model:{value:e.editedItem.port,callback:function(t){e.$set(e.editedItem,"port",t)},expression:"editedItem.port"}})],1),s("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[s("v-text-field",{attrs:{label:"User"},model:{value:e.editedItem.user,callback:function(t){e.$set(e.editedItem,"user",t)},expression:"editedItem.user"}})],1),s("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[s("v-text-field",{attrs:{type:e.displayPassword?"text":"password","append-icon":e.displayPassword?"mdi-eye":"mdi-eye-off",label:"Password"},on:{"click:append":function(t){e.displayPassword=!e.displayPassword}},model:{value:e.editedItem.password,callback:function(t){e.$set(e.editedItem,"password",t)},expression:"editedItem.password"}})],1),s("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[s("v-text-field",{attrs:{label:"Key"},model:{value:e.editedItem.key,callback:function(t){e.$set(e.editedItem,"key",t)},expression:"editedItem.key"}})],1),s("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[s("v-text-field",{attrs:{label:"Description"},model:{value:e.editedItem.ip,callback:function(t){e.$set(e.editedItem,"ip",t)},expression:"editedItem.ip"}})],1)],1),e.tip?s("v-alert",{attrs:{type:e.tip}},[e._v(" "+e._s(e.message)+" ")]):e._e()],1)],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.close(null)}}},[e._v(" Cancel ")]),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v(" Save ")])],1)],1)],1)},E=[],T=s(9669),Z=s.n(T),O={props:{dialog:{type:Boolean,default:!1},newMode:{type:Boolean,default:!1},item:{type:Object,default:null},api:{type:String,default:""}},data(){return{tip:"",message:"",displayPassword:!1,editedItem:this.item}},methods:{close(e){this.$emit("close",e),this.$nextTick((()=>{this.editedItem={}}))},save(){var e=this.newMode?this.api:this.api+"/"+this.editedItem.id;Z().post(e,this.editedItem).then((e=>{this.close(e.data)})).catch((e=>{this.tip="error",this.message=e.response.data.message}))}},computed:{formTitle(){return this.newMode?"New Item":"Edit Item"}},watch:{item(e){this.editedItem=e}}},D=O,P=s(3453),B=s.n(P),N=s(1234),V=s(680),$=s(3237),L=s(7118),j=s(2102),M=s(9846),z=s(4497),U=s(2877),W=s(9762),R=s(5978),F=(0,l.Z)(D,A,E,!1,null,null,null),H=F.exports;B()(F,{VAlert:N.Z,VBtn:V.Z,VCard:$.Z,VCardActions:L.h7,VCardText:L.ZB,VCardTitle:L.EB,VCol:j.Z,VContainer:M.Z,VDialog:z.Z,VRow:U.Z,VSpacer:W.Z,VTextField:R.Z});var J=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ssh-terminal-tab",{attrs:{url:e.wsurl}})},K=[],q={mounted(){this.fetchServerDetail()},methods:{fetchServerDetail(){Z().get("/api/v1/ssh-servers/"+this.$route.params.token).then((e=>{var t=e.data;t&&t.success&&(document.title=t.data)}))}},computed:{wsurl(){var e=this.$route.params.token;return`ws://127.0.0.1:8199/ws/${e}`}},beforeRouteLeave(e,t,s){const r=window.confirm("Do you really want to leave? The ssh connection will be closed.");r?s():s(!1)}},Y=q,G=(0,l.Z)(Y,J,K,!1,null,null,null),Q=G.exports,X=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-toolbar",{attrs:{dense:""}},[s("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[s("v-btn",e._g(e._b({on:{click:function(t){return t.stopPropagation(),e.editItem({})}}},"v-btn",n,!1),r),[s("v-icon",[e._v("mdi-server-plus mdi-rotate-90")])],1)]}}])},[s("span",[e._v("Add Server")])]),s("v-spacer")],1),s("ssh-server-edit-dialog",{attrs:{api:e.api,item:e.editedItem,dialog:e.dialogEdit,"new-mode":-1===e.editedIndex},on:{close:e.closeDialog}}),s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[s("v-card",[s("v-card-title",{staticClass:"text-h5"},[e._v("Are you sure you want to delete this item?")]),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),s("v-spacer")],1)],1)],1),s("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.servers,search:e.search,"items-per-page":-1},scopedSlots:e._u([{key:"top",fn:function(){return[s("v-text-field",{staticClass:"mx-4",attrs:{label:"Search"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})]},proxy:!0},{key:"item.actions",fn:function(t){var r=t.item;return[s("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(r)}}},[e._v(" mdi-delete ")]),s("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(r)}}},[e._v(" mdi-pencil ")]),s("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.sshconnect(r)}}},[e._v(" mdi-connection ")]),s("router-link",{attrs:{to:{name:"system.sshterminal",params:{token:r.id}},target:"_blank"}},[e._v(" Connect ")])]}},{key:"no-data",fn:function(){return[e._v(" Data not found ")]},proxy:!0}],null,!0)})],1)},ee=[],te={data(){return{api:"/api/v1/ssh-servers",dialogEdit:!1,dialogDelete:!1,displayPassword:!1,search:"",servers:[],headers:[{text:"Name",align:"start",sortable:!0,value:"name"},{text:"Host",align:"start",sortable:!0,value:"host"},{text:"Port",align:"start",sortable:!0,value:"port"},{text:"Description",align:"start",sortable:!0,value:"ip"},{text:"Actions",value:"actions",sortable:!1}],editedIndex:-1,editedItem:{id:0,name:"",host:"",ip:"",port:"",user:"",key:"",type:""},defaultItem:{id:0,name:"",host:"",ip:"",port:"",user:"",key:"",type:""}}},mounted(){this.navByRoute()},methods:{navByRoute(){Z().get(this.api).then((e=>{var t=e.data;t&&t.success&&(this.servers=t.data)}))},sshconnect(e){console.log("connect",e),this.$router.push({name:"system.sshterminal",params:{token:e.id}})},editItem(e){this.displayPassword=!1,this.editedIndex=this.servers.indexOf(e),this.editedItem=Object.assign({},e),this.dialogEdit=!0},deleteItem(e){this.editedIndex=this.servers.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm(){this.desserts.splice(this.editedIndex,1),Z()["delete"](this.api+"/"+this.editedItem.id).then((e=>{var t=e.data;console.log("response",t)})),this.closeDelete()},closeDialog(){this.dialogEdit=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},save(){this.editedIndex>-1?Object.assign(this.desserts[this.editedIndex],this.editedItem):this.desserts.push(this.editedItem),this.close()}},computed:{formTitle(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialogDelete(e){e||this.closeDelete()}}},se=te,re=s(3366),ne=s(6428),oe=s(6656),ie=s(9330),ae=(0,l.Z)(se,X,ee,!1,null,null,null),le=ae.exports;B()(ae,{VBtn:V.Z,VCard:$.Z,VCardActions:L.h7,VCardTitle:L.EB,VDataTable:re.Z,VDialog:z.Z,VIcon:ne.Z,VSpacer:W.Z,VTextField:R.Z,VToolbar:oe.Z,VTooltip:ie.Z});var de={components:{"ssh-terminal-tab":C,"ssh-server-edit-dialog":H},routes:[{name:"system.sshservers",path:"/ssh-servers",component:le,meta:{title:"SSH Servers",breadcrumb:"SSH Servers",baseUrl:"/ssh-servers"}},{name:"system.sshterminal",path:"/ssh-servers/sshterminal/:token",component:Q,meta:{title:"SSH Servers",breadcrumb:"SSH Servers",baseUrl:"/ssh-servers"}}],nav:[{icon:"mdi-view-dashboard",title:"SSH Servers",to:"/ssh-servers"},{divider:!0}]},ce=[],ue=[];const me=[de];console.log("asm.js");for(var he=0;he<me.length;he++){const e=me[he];if(e.routes&&(ce=ce.concat(e.routes)),e.nav&&(ue=ue.concat(e.nav)),e.components)for(const[t,s]of Object.entries(e.components))r.Z.component(t,s)}var pe={routes:ce,navs:ue},fe={components:{SideMenu:()=>s.e(773).then(s.bind(s,3773))},data:()=>({drawer:!0,expandOnHover:!1,navs:pe.navs})},ve=fe,ge=s(7524),be=(0,l.Z)(ve,m,h,!1,null,null,null),we=be.exports;B()(be,{VApp:ge.Z});var ye=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e._v("this is the dashboard")])},_e=[],ke={},xe=(0,l.Z)(ke,ye,_e,!1,null,null,null),Ie=xe.exports,Se=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"d-flex align-center justify-center fill-height"},[r("div",{staticClass:"text-center"},[r("img",{attrs:{src:s(9574),alt:"Vuetify Admin",width:"300",height:"300"}}),r("div",{staticClass:"display-4"},[e.error?r("span",[e._v(" "+e._s(e.error.status)+" "+e._s(e.error.message)+" ")]):r("span",[e._v("404 "+e._s(e.$t("routes.not_found").toLowerCase()))])])])])},Ce=[],Ae={props:["error"]},Ee=Ae,Te=(0,l.Z)(Ee,Se,Ce,!1,null,null,null),Ze=Te.exports,Oe=s(7152);function De(){const e=s(3631),t={};return e.keys().forEach((s=>{const r=s.match(/([A-Za-z0-9-_]+)\./i);if(r&&r.length>1){const n=r[1];t[n]=e(s)}})),t}r.Z.use(Oe.Z);var Pe=new Oe.Z({locale:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_I18N_LOCALE||"en",fallbackLocale:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_I18N_FALLBACK_LOCALE||"en",messages:De()});r.Z.use(u.Z),r.Z.component("ErrorPage",Ze);const Be=[{path:"",component:we,meta:{title:Pe.t("routes.home")},children:[{path:"/dashboard",name:"dashboard",component:Ie,meta:{title:Pe.t("routes.dashboard")}}]}];Be[0].children=Be[0].children.concat(pe.routes),Be[0].children.push({path:"*",component:Ze,meta:{title:Pe.t("routes.not_found")}}),console.log("routes",Be);var Ne=new u.Z({mode:"history",base:"/",routes:Be}),Ve=s(629);r.Z.use(Ve.ZP);var $e=new Ve.ZP.Store({state:{},mutations:{},actions:{},modules:{}}),Le=s(9132);r.Z.use(Le.Z);var je=new Le.Z({});r.Z.config.productionTip=!1,window._init_location_href=window.location.href,window.messageQueue=new r.Z,r.Z.component("App",c),new r.Z({router:Ne,store:$e,vuetify:je,i18n:Pe,render:e=>e(c)}).$mount("#app")},3631:function(e,t,s){var r={"./en.json":790,"./zh.json":6538};function n(e){var t=o(e);return s(t)}function o(e){if(!s.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=o,e.exports=n,n.id=3631},9574:function(e,t,s){"use strict";e.exports=s.p+"img/logo.4d6033c9.svg"},790:function(e){"use strict";e.exports=JSON.parse('{"translations":{"en":"English","fr":"French"},"routes":{"home":"Home","login":"Login","profile":"Profile","dashboard":"Dashboard","not_found":"Not found"},"auth":{"username":"Username","password":"Password","remember":"Remember","sign_in":"Sign in"},"profile":{"account":"Account","password":"Password","name":"Name","email":"Email","old_password":"Old password","new_password":"New password","confirm_password":"Confirm password","update":"Update","account_updated":"Account updated","password_changed":"Password changed"},"users":{"impersonate":"Impersonate","stop_impersonate":"Stop impersonate","logged_as":"You are actually logged as {0}, click {1} link in order to stop impersonate mode."},"menu":{"login":"Login","profile":"Profile","dashboard":"Dashboard"}}')},6538:function(e){"use strict";e.exports=JSON.parse('{"translations":{"en":"Anglais","fr":"Français"},"routes":{"home":"Accueil","login":"Login","profile":"Compte","dashboard":"Tableau de bord","not_found":"Non trouvé"},"auth":{"username":"Utilisateur","password":"Mot de passe","remember":"Se souvenir","sign_in":"Se connecter"},"profile":{"account":"Mon compte","password":"Mot de passe","name":"Nom","email":"Email","old_password":"Ancien mot de passe","new_password":"Nouveau mot de passe","confirm_password":"Confirmation du mot de passe","update":"Mettre à jour","account_updated":"Compte mis à jour","password_changed":"Mot de passe changé"},"users":{"impersonate":"Usurper","stop_impersonate":"Arrêter usurpation","logged_as":"Vous êtes actuellement connecté en tant que {0}, cliquer {1} pour arrêter le mode d\'usurpation."},"menu":{"login":"Login","profile":"Compte","dashboard":"Tableau de bord"},"resources":{"users":{"name":"Utilisateur | Utilisateurs","fields":{"name":"Nom","email":"Email","password":"Mot de passe","password_confirmation":"Confirmation du Mot de passe"}}}}')}},t={};function s(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,s),o.exports}s.m=e,function(){var e=[];s.O=function(t,r,n,o){if(!r){var i=1/0;for(c=0;c<e.length;c++){r=e[c][0],n=e[c][1],o=e[c][2];for(var a=!0,l=0;l<r.length;l++)(!1&o||i>=o)&&Object.keys(s.O).every((function(e){return s.O[e](r[l])}))?r.splice(l--,1):(a=!1,o<i&&(i=o));if(a){e.splice(c--,1);var d=n();void 0!==d&&(t=d)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,n,o]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(t,r){return s.f[r](e,t),t}),[]))}}(),function(){s.u=function(e){return"js/"+e+"."+{773:"2a4a32c5",898:"83e5240f",924:"7d63d7d5"}[e]+".js"}}(),function(){s.miniCssF=function(e){return"css/"+e+"."+{773:"e6594ce6",898:"7d2019f3"}[e]+".css"}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="ws-terminal:";s.l=function(r,n,o,i){if(e[r])e[r].push(n);else{var a,l;if(void 0!==o)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+o){a=u;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.setAttribute("data-webpack",t+o),a.src=r),e[r]=[n];var m=function(t,s){a.onerror=a.onload=null,clearTimeout(h);var n=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((function(e){return e(s)})),t)return t(s)},h=setTimeout(m.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=m.bind(null,a.onerror),a.onload=m.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){s.p="/"}(),function(){var e=function(e,t,s,r){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var o=function(o){if(n.onerror=n.onload=null,"load"===o.type)s();else{var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=a,n.parentNode.removeChild(n),r(l)}};return n.onerror=n.onload=o,n.href=t,document.head.appendChild(n),n},t=function(e,t){for(var s=document.getElementsByTagName("link"),r=0;r<s.length;r++){var n=s[r],o=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===e||o===t))return n}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){n=i[r],o=n.getAttribute("data-href");if(o===e||o===t)return n}},r=function(r){return new Promise((function(n,o){var i=s.miniCssF(r),a=s.p+i;if(t(i,a))return n();e(r,a,n,o)}))},n={143:0};s.f.miniCss=function(e,t){var s={773:1,898:1};n[e]?t.push(n[e]):0!==n[e]&&s[e]&&t.push(n[e]=r(e).then((function(){n[e]=0}),(function(t){throw delete n[e],t})))}}(),function(){var e={143:0};s.f.j=function(t,r){var n=s.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise((function(s,r){n=e[t]=[s,r]}));r.push(n[2]=o);var i=s.p+s.u(t),a=new Error,l=function(r){if(s.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}};s.l(i,l,"chunk-"+t,t)}},s.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,o,i=r[0],a=r[1],l=r[2],d=0;if(i.some((function(t){return 0!==e[t]}))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(l)var c=l(s)}for(t&&t(r);d<i.length;d++)o=i[d],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(c)},r=self["webpackChunkws_terminal"]=self["webpackChunkws_terminal"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=s.O(void 0,[998],(function(){return s(8747)}));r=s.O(r)})();
//# sourceMappingURL=app.f6ac5ed4.js.map