import{d as b,L as g,Z as k,bf as w,A as E,g as l,c as a,a as e,F as p,j as f,k as t,n as V,bz as x,o as n,f as r,h as v,Y as C,bk as L,_ as M}from"./index-0nTGE-98.js";const D={key:0,class:"p-3"},j=e("h3",{class:"py-2"},"热门评论",-1),I={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"},N={class:"header flex items-center gap-3"},P={class:"user-info"},S={class:"username font-bold text-sm"},B={class:"text-gray-700 text-xs"},z={class:"comment-text text-gray-800 text-xs py-3"},A={class:"like flex items-center gap-2 justify-between"},F={class:"flex items-center gap-1"},K={class:"text-gray-800 text-xs"},U={class:"py-2"},O={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"},T={class:"header flex items-center gap-3"},Y={class:"user-info"},Z={class:"username font-bold text-sm"},q={class:"text-gray-700 text-xs"},G={class:"comment-text text-gray-800 text-xs py-3"},H={class:"like flex items-center gap-2 justify-between text-xs"},J={class:"flex items-center gap-1"},Q={class:"text-gray-800"},R=b({__name:"comment",props:{modelValue:{},modelModifiers:{}},emits:["update:modelValue"],setup(y){const i=g([]),d=k(y,"modelValue"),o=g({comments:[],hotComments:[],total:0});return w(i,{initialPageNum:2,pageSize:10,threshold:.1},c=>{x({id:d.value,offset:c}).then(_=>{o.value.comments.push(..._.comments)})}),E(()=>d.value,()=>{x({id:d.value}).then(c=>{o.value=c})},{immediate:!0}),(c,_)=>{var h;const m=C,u=L;return((h=l(o).comments)==null?void 0:h.length)>0?(n(),a("div",D,[j,e("div",I,[(n(!0),a(p,null,f(l(o).hotComments,s=>(n(),a("div",{key:s.commentId,ref_for:!0,ref_key:"observedElement",ref:i,class:"bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col justify-between"},[e("div",N,[r(m,{src:s.user.avatarUrl+"?param=60y60",alt:s.user.nickname,class:"w-10 h-10 rounded-full"},null,8,["src","alt"]),e("div",P,[e("h3",S,t(s.user.nickname),1),e("p",B,t(s.timeStr),1)])]),e("p",z,t(s.content),1),e("div",A,[e("div",F,[r(u,{class:"text-red-400"}),e("span",K,t(s.likedCount),1)]),v(" "+t(s.ipLocation.location),1)])]))),128))]),e("h3",U,"最新评论 ("+t(l(o).total)+")",1),e("div",O,[(n(!0),a(p,null,f(l(o).comments,s=>(n(),a("div",{key:s.commentId,ref_for:!0,ref_key:"observedElement",ref:i,class:"bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col justify-between"},[e("div",T,[r(m,{src:s.user.avatarUrl+"?param=60y60",alt:"头像",class:"w-10 h-10 rounded-full"},null,8,["src"]),e("div",Y,[e("h3",Z,t(s.user.nickname),1),e("p",q,t(s.timeStr),1)])]),e("p",G,t(s.content),1),e("div",H,[e("div",J,[r(u,{class:"text-red-400"}),e("span",Q,t(s.likedCount),1)]),v(" "+t(s.ipLocation.location),1)])]))),128))])])):V("",!0)}}}),$=M(R,[["__file","/home/runner/work/KM-Music-Player/KM-Music-Player/src/pages/songList/songListDetails/comment.vue"]]);export{$ as default};