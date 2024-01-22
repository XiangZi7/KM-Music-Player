import{r as w,f as te,d as re}from"./@videojs-V0voznOz.js";import{a as U}from"./global-ZBe6n8GH.js";import{D as ne}from"./@xmldom-OwpznvVO.js";/*! @name mpd-parser @version 0.22.1 @license Apache-2.0 */var G=function(e){return!!e&&typeof e=="object"},I=function o(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.reduce(function(n,i){return typeof i!="object"||Object.keys(i).forEach(function(a){Array.isArray(n[a])&&Array.isArray(i[a])?n[a]=n[a].concat(i[a]):G(n[a])&&G(i[a])?n[a]=o(n[a],i[a]):n[a]=i[a]}),n},{})},j=function(e){return Object.keys(e).map(function(r){return e[r]})},ie=function(e,r){for(var t=[],n=e;n<r;n++)t.push(n);return t},_=function(e){return e.reduce(function(r,t){return r.concat(t)},[])},K=function(e){if(!e.length)return[];for(var r=[],t=0;t<e.length;t++)r.push(e[t]);return r},ae=function(e,r){return e.reduce(function(t,n,i){return n[r]&&t.push(i),t},[])},L=function(e,r){for(var t=0;t<e.length;t++)if(r(e[t]))return t;return-1},oe=function(e,r){return j(e.reduce(function(t,n){return n.forEach(function(i){t[r(i)]=i}),t},{}))},A={INVALID_NUMBER_OF_PERIOD:"INVALID_NUMBER_OF_PERIOD",DASH_EMPTY_MANIFEST:"DASH_EMPTY_MANIFEST",DASH_INVALID_XML:"DASH_INVALID_XML",NO_BASE_URL:"NO_BASE_URL",MISSING_SEGMENT_INFORMATION:"MISSING_SEGMENT_INFORMATION",SEGMENT_TIME_UNSPECIFIED:"SEGMENT_TIME_UNSPECIFIED",UNSUPPORTED_UTC_TIMING_SCHEME:"UNSUPPORTED_UTC_TIMING_SCHEME"},R=function(e){var r=e.baseUrl,t=r===void 0?"":r,n=e.source,i=n===void 0?"":n,a=e.range,u=a===void 0?"":a,s=e.indexRange,f=s===void 0?"":s,m={uri:i,resolvedUri:w(t||"",i)};if(u||f){var c=u||f,d=c.split("-"),l=U.BigInt?U.BigInt(d[0]):parseInt(d[0],10),v=U.BigInt?U.BigInt(d[1]):parseInt(d[1],10);l<Number.MAX_SAFE_INTEGER&&typeof l=="bigint"&&(l=Number(l)),v<Number.MAX_SAFE_INTEGER&&typeof v=="bigint"&&(v=Number(v));var p;typeof v=="bigint"||typeof l=="bigint"?p=U.BigInt(v)-U.BigInt(l)+U.BigInt(1):p=v-l+1,typeof p=="bigint"&&p<Number.MAX_SAFE_INTEGER&&(p=Number(p)),m.byterange={length:p,offset:l}}return m},ue=function(e){var r;return typeof e.offset=="bigint"||typeof e.length=="bigint"?r=U.BigInt(e.offset)+U.BigInt(e.length)-U.BigInt(1):r=e.offset+e.length-1,e.offset+"-"+r},z=function(e){return e&&typeof e!="number"&&(e=parseInt(e,10)),isNaN(e)?null:e},se={static:function(e){var r=e.duration,t=e.timescale,n=t===void 0?1:t,i=e.sourceDuration,a=e.periodDuration,u=z(e.endNumber),s=r/n;return typeof u=="number"?{start:0,end:u}:typeof a=="number"?{start:0,end:a/s}:{start:0,end:i/s}},dynamic:function(e){var r=e.NOW,t=e.clientOffset,n=e.availabilityStartTime,i=e.timescale,a=i===void 0?1:i,u=e.duration,s=e.periodStart,f=s===void 0?0:s,m=e.minimumUpdatePeriod,c=m===void 0?0:m,d=e.timeShiftBufferDepth,l=d===void 0?1/0:d,v=z(e.endNumber),p=(r+t)/1e3,g=n+f,S=p+c,y=S-g,D=Math.ceil(y*a/u),P=Math.floor((p-g-l)*a/u),T=Math.floor((p-g)*a/u);return{start:Math.max(0,P),end:typeof v=="number"?v:Math.min(D,T)}}},me=function(e){return function(r){var t=e.duration,n=e.timescale,i=n===void 0?1:n,a=e.periodStart,u=e.startNumber,s=u===void 0?1:u;return{number:s+r,duration:t/i,timeline:a,time:r*t}}},x=function(e){var r=e.type,t=e.duration,n=e.timescale,i=n===void 0?1:n,a=e.periodDuration,u=e.sourceDuration,s=se[r](e),f=s.start,m=s.end,c=ie(f,m).map(me(e));if(r==="static"){var d=c.length-1,l=typeof a=="number"?a:u;c[d].duration=l-t/i*d}return c},Z=function(e){var r=e.baseUrl,t=e.initialization,n=t===void 0?{}:t,i=e.sourceDuration,a=e.indexRange,u=a===void 0?"":a,s=e.periodStart,f=e.presentationTime,m=e.number,c=m===void 0?0:m,d=e.duration;if(!r)throw new Error(A.NO_BASE_URL);var l=R({baseUrl:r,source:n.sourceURL,range:n.range}),v=R({baseUrl:r,source:r,indexRange:u});if(v.map=l,d){var p=x(e);p.length&&(v.duration=p[0].duration,v.timeline=p[0].timeline)}else i&&(v.duration=i,v.timeline=s);return v.presentationTime=f||s,v.number=c,[v]},de=function(e,r,t){var n=e.sidx.map?e.sidx.map:null,i=e.sidx.duration,a=e.timeline||0,u=e.sidx.byterange,s=u.offset+u.length,f=r.timescale,m=r.references.filter(function(ee){return ee.referenceType!==1}),c=[],d=e.endList?"static":"dynamic",l=e.sidx.timeline,v=l,p=e.mediaSequence||0,g;typeof r.firstOffset=="bigint"?g=U.BigInt(s)+r.firstOffset:g=s+r.firstOffset;for(var S=0;S<m.length;S++){var y=r.references[S],D=y.referencedSize,P=y.subsegmentDuration,T=void 0;typeof g=="bigint"?T=g+U.BigInt(D)-U.BigInt(1):T=g+D-1;var M=g+"-"+T,N={baseUrl:t,timescale:f,timeline:a,periodStart:l,presentationTime:v,number:p,duration:P,sourceDuration:i,indexRange:M,type:d},E=Z(N)[0];n&&(E.map=n),c.push(E),typeof g=="bigint"?g+=U.BigInt(D):g+=D,v+=P/f,p++}return e.segments=c,e},fe=["AUDIO","SUBTITLES"],ce=1/60,J=function(e){return oe(e,function(r){var t=r.timeline;return t}).sort(function(r,t){return r.timeline>t.timeline?1:-1})},le=function(e,r){for(var t=0;t<e.length;t++)if(e[t].attributes.NAME===r)return e[t];return null},V=function(e){var r=[];return te(e,fe,function(t,n,i,a){r=r.concat(t.playlists||[])}),r},W=function(e){var r=e.playlist,t=e.mediaSequence;r.mediaSequence=t,r.segments.forEach(function(n,i){n.number=r.mediaSequence+i})},ve=function(e){var r=e.oldPlaylists,t=e.newPlaylists,n=e.timelineStarts;t.forEach(function(i){i.discontinuitySequence=L(n,function(m){var c=m.timeline;return c===i.timeline});var a=le(r,i.attributes.NAME);if(a&&!i.sidx){var u=i.segments[0],s=L(a.segments,function(m){return Math.abs(m.presentationTime-u.presentationTime)<ce});if(s===-1){W({playlist:i,mediaSequence:a.mediaSequence+a.segments.length}),i.segments[0].discontinuity=!0,i.discontinuityStarts.unshift(0),(!a.segments.length&&i.timeline>a.timeline||a.segments.length&&i.timeline>a.segments[a.segments.length-1].timeline)&&i.discontinuitySequence--;return}var f=a.segments[s];f.discontinuity&&!u.discontinuity&&(u.discontinuity=!0,i.discontinuityStarts.unshift(0),i.discontinuitySequence--),W({playlist:i,mediaSequence:a.segments[s].number})}})},pe=function(e){var r=e.oldManifest,t=e.newManifest,n=r.playlists.concat(V(r)),i=t.playlists.concat(V(t));return t.timelineStarts=J([r.timelineStarts,t.timelineStarts]),ve({oldPlaylists:n,newPlaylists:i,timelineStarts:t.timelineStarts}),t},ge=function(e){return e&&e.uri+"-"+ue(e.byterange)},C=function(e){var r=j(e.reduce(function(t,n){var i=n.attributes.id+(n.attributes.lang||"");if(!t[i])t[i]=n,t[i].attributes.timelineStarts=[];else{if(n.segments){var a;n.segments[0]&&(n.segments[0].discontinuity=!0),(a=t[i].segments).push.apply(a,n.segments)}n.attributes.contentProtection&&(t[i].attributes.contentProtection=n.attributes.contentProtection)}return t[i].attributes.timelineStarts.push({start:n.attributes.periodStart,timeline:n.attributes.periodStart}),t},{}));return r.map(function(t){return t.discontinuityStarts=ae(t.segments||[],"discontinuity"),t})},$=function(e,r){var t=ge(e.sidx),n=t&&r[t]&&r[t].sidx;return n&&de(e,n,e.sidx.resolvedUri),e},Se=function(e,r){if(r===void 0&&(r={}),!Object.keys(r).length)return e;for(var t in e)e[t]=$(e[t],r);return e},he=function(e,r){var t,n=e.attributes,i=e.segments,a=e.sidx,u=e.mediaSequence,s=e.discontinuitySequence,f=e.discontinuityStarts,m={attributes:(t={NAME:n.id,BANDWIDTH:n.bandwidth,CODECS:n.codecs},t["PROGRAM-ID"]=1,t),uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:"",targetDuration:n.duration,discontinuitySequence:s,discontinuityStarts:f,timelineStarts:n.timelineStarts,mediaSequence:u,segments:i};return n.contentProtection&&(m.contentProtection=n.contentProtection),a&&(m.sidx=a),r&&(m.attributes.AUDIO="audio",m.attributes.SUBTITLES="subs"),m},be=function(e){var r,t=e.attributes,n=e.segments,i=e.mediaSequence,a=e.discontinuityStarts,u=e.discontinuitySequence;typeof n=="undefined"&&(n=[{uri:t.baseUrl,timeline:t.periodStart,resolvedUri:t.baseUrl||"",duration:t.sourceDuration,number:0}],t.duration=t.sourceDuration);var s=(r={NAME:t.id,BANDWIDTH:t.bandwidth},r["PROGRAM-ID"]=1,r);return t.codecs&&(s.CODECS=t.codecs),{attributes:s,uri:"",endList:t.type==="static",timeline:t.periodStart,resolvedUri:t.baseUrl||"",targetDuration:t.duration,timelineStarts:t.timelineStarts,discontinuityStarts:a,discontinuitySequence:u,mediaSequence:i,segments:n}},ye=function(e,r,t){r===void 0&&(r={}),t===void 0&&(t=!1);var n,i=e.reduce(function(u,s){var f=s.attributes.role&&s.attributes.role.value||"",m=s.attributes.lang||"",c=s.attributes.label||"main";if(m&&!s.attributes.label){var d=f?" ("+f+")":"";c=""+s.attributes.lang+d}u[c]||(u[c]={language:m,autoselect:!0,default:f==="main",playlists:[],uri:""});var l=$(he(s,t),r);return u[c].playlists.push(l),typeof n=="undefined"&&f==="main"&&(n=s,n.default=!0),u},{});if(!n){var a=Object.keys(i)[0];i[a].default=!0}return i},Ie=function(e,r){return r===void 0&&(r={}),e.reduce(function(t,n){var i=n.attributes.lang||"text";return t[i]||(t[i]={language:i,default:!1,autoselect:!1,playlists:[],uri:""}),t[i].playlists.push($(be(n),r)),t},{})},Te=function(e){return e.reduce(function(r,t){return t&&t.forEach(function(n){var i=n.channel,a=n.language;r[a]={autoselect:!1,default:!1,instreamId:i,language:a},n.hasOwnProperty("aspectRatio")&&(r[a].aspectRatio=n.aspectRatio),n.hasOwnProperty("easyReader")&&(r[a].easyReader=n.easyReader),n.hasOwnProperty("3D")&&(r[a]["3D"]=n["3D"])}),r},{})},Ue=function(e){var r,t=e.attributes,n=e.segments,i=e.sidx,a=e.discontinuityStarts,u={attributes:(r={NAME:t.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:t.width,height:t.height},CODECS:t.codecs,BANDWIDTH:t.bandwidth},r["PROGRAM-ID"]=1,r),uri:"",endList:t.type==="static",timeline:t.periodStart,resolvedUri:"",targetDuration:t.duration,discontinuityStarts:a,timelineStarts:t.timelineStarts,segments:n};return t.frameRate&&(u.attributes["FRAME-RATE"]=t.frameRate),t.contentProtection&&(u.contentProtection=t.contentProtection),i&&(u.sidx=i),u},De=function(e){var r=e.attributes;return r.mimeType==="video/mp4"||r.mimeType==="video/webm"||r.contentType==="video"},Pe=function(e){var r=e.attributes;return r.mimeType==="audio/mp4"||r.mimeType==="audio/webm"||r.contentType==="audio"},Ee=function(e){var r=e.attributes;return r.mimeType==="text/vtt"||r.contentType==="text"},Ne=function(e,r){e.forEach(function(t){t.mediaSequence=0,t.discontinuitySequence=L(r,function(n){var i=n.timeline;return i===t.timeline}),t.segments&&t.segments.forEach(function(n,i){n.number=i})})},H=function(e){return e?Object.keys(e).reduce(function(r,t){var n=e[t];return r.concat(n.playlists)},[]):[]},Me=function(e){var r,t=e.dashPlaylists,n=e.locations,i=e.sidxMapping,a=i===void 0?{}:i,u=e.previousManifest;if(!t.length)return{};var s=t[0].attributes,f=s.sourceDuration,m=s.type,c=s.suggestedPresentationDelay,d=s.minimumUpdatePeriod,l=C(t.filter(De)).map(Ue),v=C(t.filter(Pe)),p=C(t.filter(Ee)),g=t.map(function(N){return N.attributes.captionServices}).filter(Boolean),S={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:(r={AUDIO:{},VIDEO:{}},r["CLOSED-CAPTIONS"]={},r.SUBTITLES={},r),uri:"",duration:f,playlists:Se(l,a)};d>=0&&(S.minimumUpdatePeriod=d*1e3),n&&(S.locations=n),m==="dynamic"&&(S.suggestedPresentationDelay=c);var y=S.playlists.length===0,D=v.length?ye(v,a,y):null,P=p.length?Ie(p,a):null,T=l.concat(H(D),H(P)),M=T.map(function(N){var E=N.timelineStarts;return E});return S.timelineStarts=J(M),Ne(T,S.timelineStarts),D&&(S.mediaGroups.AUDIO.audio=D),P&&(S.mediaGroups.SUBTITLES.subs=P),g.length&&(S.mediaGroups["CLOSED-CAPTIONS"].cc=Te(g)),u?pe({oldManifest:u,newManifest:S}):S},Oe=function(e,r,t){var n=e.NOW,i=e.clientOffset,a=e.availabilityStartTime,u=e.timescale,s=u===void 0?1:u,f=e.periodStart,m=f===void 0?0:f,c=e.minimumUpdatePeriod,d=c===void 0?0:c,l=(n+i)/1e3,v=a+m,p=l+d,g=p-v;return Math.ceil((g*s-r)/t)},Q=function(e,r){for(var t=e.type,n=e.minimumUpdatePeriod,i=n===void 0?0:n,a=e.media,u=a===void 0?"":a,s=e.sourceDuration,f=e.timescale,m=f===void 0?1:f,c=e.startNumber,d=c===void 0?1:c,l=e.periodStart,v=[],p=-1,g=0;g<r.length;g++){var S=r[g],y=S.d,D=S.r||0,P=S.t||0;p<0&&(p=P),P&&P>p&&(p=P);var T=void 0;if(D<0){var M=g+1;M===r.length?t==="dynamic"&&i>0&&u.indexOf("$Number$")>0?T=Oe(e,p,y):T=(s*m-p)/y:T=(r[M].t-p)/y}else T=D+1;for(var N=d+v.length+T,E=d+v.length;E<N;)v.push({number:E,duration:y/m,time:p,timeline:l}),p+=y,E++}return v},Ae=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,Re=function(e){return function(r,t,n,i){if(r==="$$")return"$";if(typeof e[t]=="undefined")return r;var a=""+e[t];return t==="RepresentationID"||(n?i=parseInt(i,10):i=1,a.length>=i)?a:""+new Array(i-a.length+1).join("0")+a}},X=function(e,r){return e.replace(Ae,Re(r))},_e=function(e,r){return!e.duration&&!r?[{number:e.startNumber||1,duration:e.sourceDuration,time:0,timeline:e.periodStart}]:e.duration?x(e):Q(e,r)},Be=function(e,r){var t={RepresentationID:e.id,Bandwidth:e.bandwidth||0},n=e.initialization,i=n===void 0?{sourceURL:"",range:""}:n,a=R({baseUrl:e.baseUrl,source:X(i.sourceURL,t),range:i.range}),u=_e(e,r);return u.map(function(s){t.Number=s.number,t.Time=s.time;var f=X(e.media||"",t),m=e.timescale||1,c=e.presentationTimeOffset||0,d=e.periodStart+(s.time-c)/m,l={uri:f,timeline:s.timeline,duration:s.duration,resolvedUri:w(e.baseUrl||"",f),map:a,number:s.number,presentationTime:d};return l})},Ce=function(e,r){var t=e.baseUrl,n=e.initialization,i=n===void 0?{}:n,a=R({baseUrl:t,source:i.sourceURL,range:i.range}),u=R({baseUrl:t,source:r.media,range:r.mediaRange});return u.map=a,u},Le=function(e,r){var t=e.duration,n=e.segmentUrls,i=n===void 0?[]:n,a=e.periodStart;if(!t&&!r||t&&r)throw new Error(A.SEGMENT_TIME_UNSPECIFIED);var u=i.map(function(m){return Ce(e,m)}),s;t&&(s=x(e)),r&&(s=Q(e,r));var f=s.map(function(m,c){if(u[c]){var d=u[c],l=e.timescale||1,v=e.presentationTimeOffset||0;return d.timeline=m.timeline,d.duration=m.duration,d.number=m.number,d.presentationTime=a+(m.time-v)/l,d}}).filter(function(m){return m});return f},we=function(e){var r=e.attributes,t=e.segmentInfo,n,i;t.template?(i=Be,n=I(r,t.template)):t.base?(i=Z,n=I(r,t.base)):t.list&&(i=Le,n=I(r,t.list));var a={attributes:r};if(!i)return a;var u=i(n,t.segmentTimeline);if(n.duration){var s=n,f=s.duration,m=s.timescale,c=m===void 0?1:m;n.duration=f/c}else u.length?n.duration=u.reduce(function(d,l){return Math.max(d,Math.ceil(l.duration))},0):n.duration=0;return a.attributes=n,a.segments=u,t.base&&n.indexRange&&(a.sidx=u[0],a.segments=[]),a},xe=function(e){return e.map(we)},h=function(e,r){return K(e.childNodes).filter(function(t){var n=t.tagName;return n===r})},F=function(e){return e.textContent.trim()},$e=function(e){return parseFloat(e.split("/").reduce(function(r,t){return r/t}))},O=function(e){var r=31536e3,t=30*24*60*60,n=24*60*60,i=60*60,a=60,u=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/,s=u.exec(e);if(!s)return 0;var f=s.slice(1),m=f[0],c=f[1],d=f[2],l=f[3],v=f[4],p=f[5];return parseFloat(m||0)*r+parseFloat(c||0)*t+parseFloat(d||0)*n+parseFloat(l||0)*i+parseFloat(v||0)*a+parseFloat(p||0)},Fe=function(e){var r=/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/;return r.test(e)&&(e+="Z"),Date.parse(e)},Y={mediaPresentationDuration:function(e){return O(e)},availabilityStartTime:function(e){return Fe(e)/1e3},minimumUpdatePeriod:function(e){return O(e)},suggestedPresentationDelay:function(e){return O(e)},type:function(e){return e},timeShiftBufferDepth:function(e){return O(e)},start:function(e){return O(e)},width:function(e){return parseInt(e,10)},height:function(e){return parseInt(e,10)},bandwidth:function(e){return parseInt(e,10)},frameRate:function(e){return $e(e)},startNumber:function(e){return parseInt(e,10)},timescale:function(e){return parseInt(e,10)},presentationTimeOffset:function(e){return parseInt(e,10)},duration:function(e){var r=parseInt(e,10);return isNaN(r)?O(e):r},d:function(e){return parseInt(e,10)},t:function(e){return parseInt(e,10)},r:function(e){return parseInt(e,10)},DEFAULT:function(e){return e}},b=function(e){return e&&e.attributes?K(e.attributes).reduce(function(r,t){var n=Y[t.name]||Y.DEFAULT;return r[t.name]=n(t.value),r},{}):{}},qe={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime"},B=function(e,r){return r.length?_(e.map(function(t){return r.map(function(n){return w(t,F(n))})})):e},q=function(e){var r=h(e,"SegmentTemplate")[0],t=h(e,"SegmentList")[0],n=t&&h(t,"SegmentURL").map(function(d){return I({tag:"SegmentURL"},b(d))}),i=h(e,"SegmentBase")[0],a=t||r,u=a&&h(a,"SegmentTimeline")[0],s=t||i||r,f=s&&h(s,"Initialization")[0],m=r&&b(r);m&&f?m.initialization=f&&b(f):m&&m.initialization&&(m.initialization={sourceURL:m.initialization});var c={template:m,segmentTimeline:u&&h(u,"S").map(function(d){return b(d)}),list:t&&I(b(t),{segmentUrls:n,initialization:b(f)}),base:i&&I(b(i),{initialization:b(f)})};return Object.keys(c).forEach(function(d){c[d]||delete c[d]}),c},Ge=function(e,r,t){return function(n){var i=h(n,"BaseURL"),a=B(r,i),u=I(e,b(n)),s=q(n);return a.map(function(f){return{segmentInfo:I(t,s),attributes:I(u,{baseUrl:f})}})}},ze=function(e){return e.reduce(function(r,t){var n=b(t);n.schemeIdUri&&(n.schemeIdUri=n.schemeIdUri.toLowerCase());var i=qe[n.schemeIdUri];if(i){r[i]={attributes:n};var a=h(t,"cenc:pssh")[0];if(a){var u=F(a);r[i].pssh=u&&re(u)}}return r},{})},Ve=function(e){if(e.schemeIdUri==="urn:scte:dash:cc:cea-608:2015"){var r=typeof e.value!="string"?[]:e.value.split(";");return r.map(function(n){var i,a;if(a=n,/^CC\d=/.test(n)){var u=n.split("=");i=u[0],a=u[1]}else/^CC\d$/.test(n)&&(i=n);return{channel:i,language:a}})}else if(e.schemeIdUri==="urn:scte:dash:cc:cea-708:2015"){var t=typeof e.value!="string"?[]:e.value.split(";");return t.map(function(n){var i={channel:void 0,language:void 0,aspectRatio:1,easyReader:0,"3D":0};if(/=/.test(n)){var a=n.split("="),u=a[0],s=a[1],f=s===void 0?"":s;i.channel=u,i.language=n,f.split(",").forEach(function(m){var c=m.split(":"),d=c[0],l=c[1];d==="lang"?i.language=l:d==="er"?i.easyReader=Number(l):d==="war"?i.aspectRatio=Number(l):d==="3D"&&(i["3D"]=Number(l))})}else i.language=n;return i.channel&&(i.channel="SERVICE"+i.channel),i})}},We=function(e,r,t){return function(n){var i=b(n),a=B(r,h(n,"BaseURL")),u=h(n,"Role")[0],s={role:b(u)},f=I(e,i,s),m=h(n,"Accessibility")[0],c=Ve(b(m));c&&(f=I(f,{captionServices:c}));var d=h(n,"Label")[0];if(d&&d.childNodes.length){var l=d.childNodes[0].nodeValue.trim();f=I(f,{label:l})}var v=ze(h(n,"ContentProtection"));Object.keys(v).length&&(f=I(f,{contentProtection:v}));var p=q(n),g=h(n,"Representation"),S=I(t,p);return _(g.map(Ge(f,a,S)))}},He=function(e,r){return function(t,n){var i=B(r,h(t.node,"BaseURL")),a=I(e,{periodStart:t.attributes.start});typeof t.attributes.duration=="number"&&(a.periodDuration=t.attributes.duration);var u=h(t.node,"AdaptationSet"),s=q(t.node);return _(u.map(We(a,i,s)))}},Xe=function(e){var r=e.attributes,t=e.priorPeriodAttributes,n=e.mpdType;return typeof r.start=="number"?r.start:t&&typeof t.start=="number"&&typeof t.duration=="number"?t.start+t.duration:!t&&n==="static"?0:null},Ye=function(e,r){r===void 0&&(r={});var t=r,n=t.manifestUri,i=n===void 0?"":n,a=t.NOW,u=a===void 0?Date.now():a,s=t.clientOffset,f=s===void 0?0:s,m=h(e,"Period");if(!m.length)throw new Error(A.INVALID_NUMBER_OF_PERIOD);var c=h(e,"Location"),d=b(e),l=B([i],h(e,"BaseURL"));d.type=d.type||"static",d.sourceDuration=d.mediaPresentationDuration||0,d.NOW=u,d.clientOffset=f,c.length&&(d.locations=c.map(F));var v=[];return m.forEach(function(p,g){var S=b(p),y=v[g-1];S.start=Xe({attributes:S,priorPeriodAttributes:y?y.attributes:null,mpdType:d.type}),v.push({node:p,attributes:S})}),{locations:d.locations,representationInfo:_(v.map(He(d,l)))}},k=function(e){if(e==="")throw new Error(A.DASH_EMPTY_MANIFEST);var r=new ne,t,n;try{t=r.parseFromString(e,"application/xml"),n=t&&t.documentElement.tagName==="MPD"?t.documentElement:null}catch(i){}if(!n||n&&n.getElementsByTagName("parsererror").length>0)throw new Error(A.DASH_INVALID_XML);return n},je=function(e){var r=h(e,"UTCTiming")[0];if(!r)return null;var t=b(r);switch(t.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":t.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":t.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":t.method="DIRECT",t.value=Date.parse(t.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(A.UNSUPPORTED_UTC_TIMING_SCHEME)}return t},Qe=function(e,r){r===void 0&&(r={});var t=Ye(k(e),r),n=xe(t.representationInfo);return Me({dashPlaylists:n,locations:t.locations,sidxMapping:r.sidxMapping,previousManifest:r.previousManifest})},ke=function(e){return je(k(e))};export{Qe as a,de as b,ge as g,ke as p};
