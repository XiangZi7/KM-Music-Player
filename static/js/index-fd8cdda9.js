var v=(u,l,t)=>new Promise((c,a)=>{var p=e=>{try{i(t.next(e))}catch(o){a(o)}},m=e=>{try{i(t.throw(e))}catch(o){a(o)}},i=e=>e.done?c(e.value):Promise.resolve(e.value).then(p,m);i((t=t.apply(u,l)).next())});import{a as w,k as B}from"./element-plus-aaf5bffe.js";import{Z as C,a7 as R,e as S,o as d,c as _,a as s,L as V,ak as E,u as r,a9 as K,z as N,U as x,S as f,a6 as P,P as T,a8 as D,W as I}from"./@vue-b6763d16.js";import{_ as L,v as M}from"./index-e27be7a5.js";import{u as U}from"./vue-router-6e50d621.js";import"./@element-plus-3d5ed1a4.js";import"./@vueuse-ae6f4f55.js";import"./lodash-es-9cc69f4e.js";import"./@ctrl-86a38320.js";import"./@popperjs-7c8154ca.js";import"./escape-html-19374969.js";import"./dayjs-39b5b250.js";import"./normalize-wheel-es-ed76fb12.js";import"./pinia-358b124a.js";import"./pinia-plugin-persist-4bd0ee57.js";import"./axios-e76ab20a.js";const $={class:"content-section"},b={class:"video"},j=["onKeyup"],z={class:"apps-card",style:{"margin-top":"20px"}},F=["onClick"],W={class:"app-card",style:{width:"239px",height:"300px"}},Z=["src"],q={class:"aniTile",href:"javascript:;"},A={__name:"index",setup(u){const l=U(),t=C({list:[],input:"境界的彼方",loading:!1,total:0,currentPage:1}),{list:c,input:a,loading:p,total:m,currentPage:i}=R(t);S(()=>{e()});const e=()=>v(this,null,function*(){t.loading=!0,M({name:t.input}).then(({data:o})=>{t.list=o.data,t.total=o.count,t.loading=!1})});return(o,h)=>{const g=w,y=B;return d(),_("div",null,[s("div",$,[s("div",b,[V(s("input",{type:"text",placeholder:"请输入动漫名称",onKeyup:K(e,["enter"]),"onUpdate:modelValue":h[0]||(h[0]=n=>N(a)?a.value=n:null)},null,40,j),[[E,r(a)]]),x(g,{type:"primary",round:"",onClick:e},{default:f(()=>[P("搜索")]),_:1})]),x(y,{rows:5,animated:"",loading:r(p)},{default:f(()=>[s("div",z,[(d(!0),_(T,null,D(r(c),(n,k)=>(d(),_("div",{class:"apps-item mv-text",onClick:G=>r(l).push({path:`/animation/${n.videoId}`}),key:k},[s("div",W,[s("img",{src:n.cover,alt:"",style:{width:"239px",height:"300px"}},null,8,Z)]),s("a",q,I(n.title),1)],8,F))),128))])]),_:1},8,["loading"])])])}}},pt=L(A,[["__scopeId","data-v-3504c653"]]);export{pt as default};