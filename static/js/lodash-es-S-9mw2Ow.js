var J=typeof global=="object"&&global&&global.Object===Object&&global,V=typeof self=="object"&&self&&self.Object===Object&&self,O=J||V||Function("return this")(),d=O.Symbol,L=Object.prototype,Q=L.hasOwnProperty,tt=L.toString,v=d?d.toStringTag:void 0;function et(t){var e=Q.call(t,v),r=t[v];try{t[v]=void 0;var n=!0}catch(o){}var i=tt.call(t);return n&&(e?t[v]=r:delete t[v]),i}var rt=Object.prototype,nt=rt.toString;function it(t){return nt.call(t)}var at="[object Null]",ot="[object Undefined]",R=d?d.toStringTag:void 0;function K(t){return t==null?t===void 0?ot:at:R&&R in Object(t)?et(t):it(t)}function st(t){return t!=null&&typeof t=="object"}var ct="[object Symbol]";function S(t){return typeof t=="symbol"||st(t)&&K(t)==ct}function ut(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var x=Array.isArray,ft=1/0,D=d?d.prototype:void 0,H=D?D.toString:void 0;function X(t){if(typeof t=="string")return t;if(x(t))return ut(t,X)+"";if(S(t))return H?H.call(t):"";var e=t+"";return e=="0"&&1/t==-ft?"-0":e}var lt=/\s/;function ht(t){for(var e=t.length;e--&&lt.test(t.charAt(e)););return e}var dt=/^\s+/;function pt(t){return t&&t.slice(0,ht(t)+1).replace(dt,"")}function p(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var G=NaN,gt=/^[-+]0x[0-9a-f]+$/i,_t=/^0b[01]+$/i,yt=/^0o[0-7]+$/i,mt=parseInt;function U(t){if(typeof t=="number")return t;if(S(t))return G;if(p(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=p(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=pt(t);var r=_t.test(t);return r||yt.test(t)?mt(t.slice(2),r?2:8):gt.test(t)?G:+t}var vt="[object AsyncFunction]",bt="[object Function]",Tt="[object GeneratorFunction]",Ot="[object Proxy]";function St(t){if(!p(t))return!1;var e=K(t);return e==bt||e==Tt||e==vt||e==Ot}var E=O["__core-js_shared__"],W=function(){var t=/[^.]+$/.exec(E&&E.keys&&E.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function xt(t){return!!W&&W in t}var Ct=Function.prototype,It=Ct.toString;function jt(t){if(t!=null){try{return It.call(t)}catch(e){}try{return t+""}catch(e){}}return""}var Pt=/[\\^$.*+?()[\]{}|]/g,$t=/^\[object .+?Constructor\]$/,Et=Function.prototype,wt=Object.prototype,Nt=Et.toString,zt=wt.hasOwnProperty,At=RegExp("^"+Nt.call(zt).replace(Pt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Ft(t){if(!p(t)||xt(t))return!1;var e=St(t)?At:$t;return e.test(jt(t))}function Mt(t,e){return t==null?void 0:t[e]}function B(t,e){var r=Mt(t,e);return Ft(r)?r:void 0}function Rt(t,e){return t===e||t!==t&&e!==e}var Dt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ht=/^\w*$/;function Gt(t,e){if(x(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||S(t)?!0:Ht.test(t)||!Dt.test(t)||e!=null&&t in Object(e)}var b=B(Object,"create");function Ut(){this.__data__=b?b(null):{},this.size=0}function Wt(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var Lt="__lodash_hash_undefined__",Kt=Object.prototype,Xt=Kt.hasOwnProperty;function Bt(t){var e=this.__data__;if(b){var r=e[t];return r===Lt?void 0:r}return Xt.call(e,t)?e[t]:void 0}var Yt=Object.prototype,Zt=Yt.hasOwnProperty;function kt(t){var e=this.__data__;return b?e[t]!==void 0:Zt.call(e,t)}var qt="__lodash_hash_undefined__";function Jt(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=b&&e===void 0?qt:e,this}function l(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}l.prototype.clear=Ut;l.prototype.delete=Wt;l.prototype.get=Bt;l.prototype.has=kt;l.prototype.set=Jt;function Vt(){this.__data__=[],this.size=0}function C(t,e){for(var r=t.length;r--;)if(Rt(t[r][0],e))return r;return-1}var Qt=Array.prototype,te=Qt.splice;function ee(t){var e=this.__data__,r=C(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():te.call(e,r,1),--this.size,!0}function re(t){var e=this.__data__,r=C(e,t);return r<0?void 0:e[r][1]}function ne(t){return C(this.__data__,t)>-1}function ie(t,e){var r=this.__data__,n=C(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}function g(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}g.prototype.clear=Vt;g.prototype.delete=ee;g.prototype.get=re;g.prototype.has=ne;g.prototype.set=ie;var ae=B(O,"Map");function oe(){this.size=0,this.__data__={hash:new l,map:new(ae||g),string:new l}}function se(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}function I(t,e){var r=t.__data__;return se(e)?r[typeof e=="string"?"string":"hash"]:r.map}function ce(t){var e=I(this,t).delete(t);return this.size-=e?1:0,e}function ue(t){return I(this,t).get(t)}function fe(t){return I(this,t).has(t)}function le(t,e){var r=I(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}function h(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}h.prototype.clear=oe;h.prototype.delete=ce;h.prototype.get=ue;h.prototype.has=fe;h.prototype.set=le;var he="Expected a function";function N(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(he);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var c=t.apply(this,n);return r.cache=o.set(i,c)||o,c};return r.cache=new(N.Cache||h),r}N.Cache=h;var de=500;function pe(t){var e=N(t,function(n){return r.size===de&&r.clear(),n}),r=e.cache;return e}var ge=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,_e=/\\(\\)?/g,ye=pe(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(ge,function(r,n,i,o){e.push(i?o.replace(_e,"$1"):n||r)}),e});function me(t){return t==null?"":X(t)}function ve(t,e){return x(t)?t:Gt(t,e)?[t]:ye(me(t))}var be=1/0;function Te(t){if(typeof t=="string"||S(t))return t;var e=t+"";return e=="0"&&1/t==-be?"-0":e}function Oe(t,e){e=ve(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Te(e[r++])];return r&&r==n?t:void 0}function Pe(t,e,r){var n=t==null?void 0:Oe(t,e);return n===void 0?r:n}function $e(){if(!arguments.length)return[];var t=arguments[0];return x(t)?t:[t]}var w=function(){return O.Date.now()},Se="Expected a function",xe=Math.max,Ce=Math.min;function Ie(t,e,r){var n,i,o,c,s,f,_=0,z=!1,y=!1,j=!0;if(typeof t!="function")throw new TypeError(Se);e=U(e)||0,p(r)&&(z=!!r.leading,y="maxWait"in r,o=y?xe(U(r.maxWait)||0,e):o,j="trailing"in r?!!r.trailing:j);function P(a){var u=n,m=i;return n=i=void 0,_=a,c=t.apply(m,u),c}function Y(a){return _=a,s=setTimeout(T,e),z?P(a):c}function Z(a){var u=a-f,m=a-_,M=e-u;return y?Ce(M,o-m):M}function A(a){var u=a-f,m=a-_;return f===void 0||u>=e||u<0||y&&m>=o}function T(){var a=w();if(A(a))return F(a);s=setTimeout(T,Z(a))}function F(a){return s=void 0,j&&n?P(a):(n=i=void 0,c)}function k(){s!==void 0&&clearTimeout(s),_=0,n=f=i=s=void 0}function q(){return s===void 0?c:F(w())}function $(){var a=w(),u=A(a);if(n=arguments,i=this,f=a,u){if(s===void 0)return Y(f);if(y)return clearTimeout(s),s=setTimeout(T,e),P(f)}return s===void 0&&(s=setTimeout(T,e)),c}return $.cancel=k,$.flush=q,$}function Ee(t){for(var e=-1,r=t==null?0:t.length,n={};++e<r;){var i=t[e];n[i[0]]=i[1]}return n}function we(t){return t==null}function Ne(t){return t===void 0}var je="Expected a function";function ze(t,e,r){var n=!0,i=!0;if(typeof t!="function")throw new TypeError(je);return p(r)&&(n="leading"in r?!!r.leading:n,i="trailing"in r?!!r.trailing:i),Ie(t,e,{leading:n,maxWait:e,trailing:i})}export{Ne as a,$e as c,Ie as d,Ee as f,Pe as g,we as i,ze as t};
