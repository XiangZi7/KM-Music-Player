var h=(_,n,o)=>new Promise((v,c)=>{var l=e=>{try{a(o.next(e))}catch(s){c(s)}},m=e=>{try{a(o.throw(e))}catch(s){c(s)}},a=e=>e.done?v(e.value):Promise.resolve(e.value).then(l,m);a((o=o.apply(_,n)).next())});import{m as y,b as x,c as g}from"./index-dc1f86a5.js";import{b as k}from"./vue-router-6e50d621.js";import{Z as D,a7 as L,e as U,o as d,c as u,a as t,u as r,a6 as p,W as i,P as b,a8 as B}from"./@vue-b6763d16.js";import"./element-plus-aaf5bffe.js";import"./@element-plus-3d5ed1a4.js";import"./@vueuse-ae6f4f55.js";import"./lodash-es-9cc69f4e.js";import"./@ctrl-86a38320.js";import"./@popperjs-7c8154ca.js";import"./escape-html-19374969.js";import"./dayjs-39b5b250.js";import"./normalize-wheel-es-ed76fb12.js";import"./pinia-358b124a.js";import"./pinia-plugin-persist-4bd0ee57.js";import"./axios-e76ab20a.js";const V={class:"content-section menuBar-mv"},M=["src"],N={class:"content-section-title"},R=t("span",{style:{margin:"0px 10px"}},"-",-1),S={class:"content-section-title comstitle"},j={class:"content-section",style:{"margin-top":"0"}},q={class:"apps-card"},w=["src"],E={class:"app-card__subtext"},F={class:"com-time"},P={class:"usercountlike"},tt={__name:"[id]",setup(_){const n=k(),o=D({list:[],mvUrls:"",commList:{},mvDetails:{artists:[{name:""}]}}),{list:v,mvUrls:c,commList:l,mvDetails:m}=L(o);return U(()=>h(this,null,function*(){y({id:n.params.id}).then(({data:a})=>{o.mvUrls=a.data.url}),x(n.params.id).then(({data:a})=>{o.mvDetails=a.data}),g({id:n.params.id,limit:30,offset:0}).then(({data:a})=>{o.commList=a})})),(a,e)=>(d(),u("div",V,[t("video",{controls:"",loop:"",autoplay:"",src:r(c),style:{width:"100%","border-radius":"10px"}},null,8,M),t("div",N,[t("h2",null,[p(i(r(m).artists.map(s=>s.name).join())+" ",1),R,t("span",null,i(r(m).name),1)]),p(" "+i(r(n).query.id)+" ",1),t("div",S,[t("h2",null,[p(" 评论"),t("span",null,"共"+i(r(l).total)+"条 ",1)])]),t("div",j,[t("div",q,[(d(!0),u(b,null,B(r(l).comments,(s,f)=>(d(),u("div",{class:"app-card usercom",key:f},[t("span",null,[t("img",{class:"useravatar",src:s.user.avatarUrl+"?param=32y32",alt:""},null,8,w),p(" "+i(s.user.nickname),1)]),t("div",E,i(s.content),1),t("div",F,[t("span",null,i(s.ipLocation.location),1),t("span",P,i(s.timeStr),1)])]))),128))])])])]))}};export{tt as default};