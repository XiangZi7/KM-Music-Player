import{_ as y}from"./songSheet-Z3pXy2R7.js";import{e as q,l as k}from"./element-plus-A4OnKNmX.js";import"./vue-FZ-pYLT9.js";import{o as a,c as r,a as t,d as L,$ as S,af as M,g as V,e as c,a8 as w,V as T,u as l,b,G as C,T as I,ap as $,aq as z,U as B,a6 as E,Y as H}from"./@vue-GMwlVji0.js";import{c as m,_ as K}from"./index-LPQjQdh8.js";import{u as N}from"./vue-router-jOw_sAY5.js";import"./useObserver-MJJEv3g1.js";import"./@element-plus-ms82W8TN.js";import"./@vueuse-9LSs8qtL.js";import"./lodash-es-DA4vajO2.js";import"./@ctrl--dareiTT.js";import"./@popperjs-NiN61gaS.js";import"./memoize-one-JaOscZgY.js";import"./pinia-ckBJVpDU.js";import"./axios-52F-EHG1.js";import"./nprogress-8aEWLQce.js";import"./@babel-3yCADe9Y.js";import"./pinia-plugin-persistedstate-XbYvz584.js";const U={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},A=t("path",{fill:"currentColor",d:"M4 18v-8v.325V6zm13.9 2.5L14.4 17q-.325-.325-.462-.7t-.138-.75q0-.8.575-1.425t1.475-.625q.7 0 1.1.325t.95.875q.5-.5.913-.85t1.137-.35q.925 0 1.488.638T22 15.574q0 .375-.15.75T21.4 17zM4 8h16V6H4zm7.575 12H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v5.325q-.875-.625-1.912-.975T17.9 10q-1.425 0-2.687.538T13 12H4v6h6.975q.075.525.225 1.025t.375.975"},null,-1),D=[A];function R(o,d){return a(),r("svg",U,[...D])}const P={name:"material-symbols-credit-card-heart-outline",render:R},j="/static/png/danceMk-AjoH-2K3.png",p=o=>($("data-v-d1d3d0d7"),o=o(),z(),o),F={class:"banner"},G={class:"des"},Y={class:"des-title flex gap-1"},J=p(()=>t("p",{class:"des-text"}," 《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。 改编自小说的同名电视动画已于2013年10月至12月播出。 ",-1)),O=p(()=>t("div",{class:"danceMk"},[t("img",{src:j})],-1)),Q={class:"Music-Library mt-3"},W=["onClick"],X=L({__name:"index",setup(o){const d=N(),i=S({SongsList:[],SongList:[]}),{SongsList:n,SongList:u}=M(i);V(()=>{m({kw:"境界的彼方"}).then(({result:s})=>{i.SongsList=s.songs}),m({kw:"境界的彼方",type:1e3}).then(({result:s})=>{i.SongList=s.playlists})});function h(s){d.push({path:`/songList/songListDetails/${s}`})}return(s,_)=>{const g=P,v=k,f=q,x=y;return a(),r("div",null,[t("div",F,[t("div",G,[t("div",Y,[c(g),w(" 境界的彼方 ")]),J,O])]),c(f,null,{default:T(()=>[t("div",Q,[(a(!0),r(B,null,E(l(u),e=>(a(),r("div",{key:e.id,class:"Library-item",onClick:Z=>h(e.id)},[c(v,{lazy:"",loading:"lazy",src:e.coverImgUrl+"?param=500y500",class:"w-[200px] rounded-xl shadow-xl",alt:e.name},null,8,["src","alt"]),t("div",null,H(e.name),1)],8,W))),128))])]),_:1}),l(n).length>0?(a(),b(x,{key:0,modelValue:l(n),"onUpdate:modelValue":_[0]||(_[0]=e=>C(n)?n.value=e:null),class:"mt-3"},null,8,["modelValue"])):I("",!0)])}}}),ft=K(X,[["__scopeId","data-v-d1d3d0d7"],["__file","/home/runner/work/KM-Music-Player/KM-Music-Player/src/pages/index.vue"]]);export{ft as default};