var g=(h,c,o)=>new Promise((p,l)=>{var r=s=>{try{t(o.next(s))}catch(e){l(e)}},n=s=>{try{t(o.throw(s))}catch(e){l(e)}},t=s=>s.done?p(s.value):Promise.resolve(s.value).then(r,n);t((o=o.apply(h,c)).next())});import{k as f}from"./element-plus-49029d28.js";import{_ as w}from"./musicTable-0b05219a.js";import{n as y,s as x}from"./index-7f199558.js";import{u as k}from"./vue-router-6e50d621.js";import{Z as b,a7 as L,e as V,o as m,c as _,U as u,S as M,u as i,a,a6 as U,P as A,a8 as B,W as D}from"./@vue-b6763d16.js";import"./@element-plus-3d5ed1a4.js";import"./@vueuse-ae6f4f55.js";import"./lodash-es-9cc69f4e.js";import"./@ctrl-86a38320.js";import"./@popperjs-7c8154ca.js";import"./escape-html-19374969.js";import"./dayjs-39b5b250.js";import"./normalize-wheel-es-ed76fb12.js";import"./formatTime-3cb25965.js";import"./pinia-358b124a.js";import"./pinia-plugin-persist-4bd0ee57.js";import"./axios-e76ab20a.js";const S=""+new URL("../png/danceMk-f34c7e51.png",import.meta.url).href,z=a("div",{class:"content-wrapper-header"},[a("div",{class:"content-wrapper-context"},[a("h3",{class:"img-content"},[a("svg",{t:"1648788969161",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5991",width:"25",height:"25"},[a("path",{d:"M1006.652621 469.673144l-114.751779-114.751778V192.356347a60.318243 60.318243 0 0 0-60.318242-59.950449H669.385374L554.633596 17.65412a59.950448 59.950448 0 0 0-84.960452 0L354.921366 132.405898H192.356347A59.950448 59.950448 0 0 0 132.405898 192.356347v162.565019L17.65412 469.673144a59.950448 59.950448 0 0 0 0 84.960452L132.405898 669.385374v162.197226a59.950448 59.950448 0 0 0 59.950449 59.950448h162.565019l114.751778 115.119573a60.686037 60.686037 0 0 0 84.960452 0l114.751778-115.119573h162.197226a60.318243 60.318243 0 0 0 60.318242-59.950448V669.385374l114.751779-114.751778a60.686037 60.686037 0 0 0 0-84.960452z m-36.779417 49.652212l-116.590749 116.59075a44.503094 44.503094 0 0 0-12.872796 31.262503v164.403991a10.666031 10.666031 0 0 1-10.66603 10.66603h-162.56502a43.767505 43.767505 0 0 0-31.262503 12.872796l-116.222956 116.222955a10.298237 10.298237 0 0 1-15.07956 0l-116.222955-116.222955a43.767505 43.767505 0 0 0-31.262504-12.872796H192.356347a10.666031 10.666031 0 0 1-10.298237-10.66603v-164.403991a43.399711 43.399711 0 0 0-13.24059-31.262503l-116.222955-116.59075a10.298237 10.298237 0 0 1 0-14.711766l116.222955-116.222955a44.135299 44.135299 0 0 0 13.24059-31.630298V192.356347A10.298237 10.298237 0 0 1 192.356347 183.897081h164.771784a44.135299 44.135299 0 0 0 31.262504-13.24059l118.061926-118.061926a11.033825 11.033825 0 0 1 7.355883-2.942353 11.401619 11.401619 0 0 1 7.723677 2.942353l116.222955 116.222955a44.135299 44.135299 0 0 0 31.262504 13.24059h164.40399a10.298237 10.298237 0 0 1 10.666031 10.298237V356.760337a45.606476 45.606476 0 0 0 12.872796 31.630298l116.590749 116.222955a10.298237 10.298237 0 0 1-1.838971 14.711766z","p-id":"5992",fill:"#1296db"}),a("path",{d:"M693.659789 331.014746l-187.207228 274.374444-141.232958-110.338248c-16.182943 0-24.642209 8.459266-24.642209 26.848973l176.173403 159.254872 207.803702-331.014745c5.516912-9.930442-23.538826-31.262504-30.89471-19.125296z","p-id":"5993",fill:"#1296db"})]),U(" 境界的彼方 ")]),a("div",{class:"content-text"}," 《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。 改编自小说的同名电视动画已于2013年10月至12月播出。 ")]),a("img",{class:"content-wrapper-img",src:S,alt:""})],-1),C={class:"content-section"},E={style:{"margin-top":"50px"}},H={class:"apps-card"},N=["onClick"],R={class:"app-card"},j=["src"],K={href:"javascript:;"},n1={__name:"index",setup(h){const c=k(),o=b({searchKw:"",tableData:[],playlists:[],loading:!0}),{tableData:p,playlists:l,loading:r}=L(o);return V(()=>g(this,null,function*(){o.loading=!0,y().then(({data:n})=>{o.tableData=n.result.map(t=>{const s=t.song.artists.map(e=>e.name).join(",");return{cover:t.picUrl,title:t.name,singer:s,album:t.song.album.name,time:t.song.duration,id:t.id,mv:t.song.mvid}}),o.loading=!1}),x({limit:30,offset:0}).then(({data:n})=>{o.playlists=n.playlists})})),(n,t)=>{const s=w,e=f;return m(),_("div",null,[z,u(e,{rows:5,animated:"",loading:i(r)},{default:M(()=>[a("div",C,[u(s,{data:i(p)},null,8,["data"])]),a("div",E,[a("div",H,[u(e,{rows:5,animated:"",loading:i(r)},null,8,["loading"]),(m(!0),_(A,null,B(i(l),(d,v)=>(m(),_("div",{class:"apps-item",key:v,onClick:P=>i(c).push({path:"/playList",query:{id:d.id}})},[a("div",R,[a("img",{src:d.coverImgUrl+"?param=200y200",alt:""},null,8,j)]),a("a",K,D(d.name),1)],8,N))),128))])])]),_:1},8,["loading"])])}}};export{n1 as default};