var b=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function _(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function a(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return t[r]}})}),n}function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}const l=Object.freeze(Object.defineProperty({__proto__:null,default:i},Symbol.toStringTag,{value:"Module"}));function O(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(t,e){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},u(t,e)}function g(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,u(t,e)}const s=a(l);function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(p=function(){return!!t})()}function y(t,e,n){if(p())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var o=new(t.bind.apply(t,r));return n&&u(o,n.prototype),o}function h(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&u(t,e)}function c(t){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},c(t)}function d(t){try{return Function.toString.call(t).indexOf("[native code]")!==-1}catch(e){return typeof t=="function"}}function f(t){var e=typeof Map=="function"?new Map:void 0;return f=function(r){if(r===null||!d(r))return r;if(typeof r!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e!="undefined"){if(e.has(r))return e.get(r);e.set(r,o)}function o(){return y(r,arguments,c(this).constructor)}return o.prototype=Object.create(r.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),u(o,r)},f(t)}export{g as _,a,O as b,b as c,i as d,f as e,h as f,_ as g,y as h,s as r};
