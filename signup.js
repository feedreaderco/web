!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}({0:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t){t.preventDefault();var e=document.getElementById("signupForm"),r=e.elements.user.value,n=e.elements.password.value;localStorage.user=r,console.log(r,n),(0,s.default)(r).signup(n).then(function(t){if(!t.token)throw new Error;e.style.display="none",localStorage.token=t.token,window.location.href="https://feedreader.co/welcome/"}).catch(function(t){console.error(t),alert("Something went wrong - please contact me at arpith@feedreader.co")})}var i=r(7),s=n(i),a=document.getElementById("signup");a.onclick=o},7:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t){return(0,l.btoa)(unescape(encodeURIComponent(t)))}function i(t,e){return encodeURIComponent(t)+"="+encodeURIComponent(e)}function s(t){var e=function(e){return i(e,t[e])};return Object.keys(t).map(e).join("&")}function a(t){return{body:s(t),headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}}}function u(t,e){var r="https://api.feedreader.co/v1",n=r+"/"+t;return p(n,e).then(function(t){return t.json()}).then(function(t){if(!t.success)throw t;return t}).catch(function(t){throw t})}function f(t){return"Basic "+o(t+":")}Object.defineProperty(e,"__esModule",{value:!0});var c=r(14),d=n(c),l=r(13),h=(0,d.default)(),p=h.fetch;e.default=function(t,e){var r=function(t,r,n){var o=a(r);return o.headers.authorization=f(e),o.method=n,u(t,o)},n={get:function(t){return u(t,{method:"GET"})},post:function(t,e){return r(t,e,"POST")},del:function(t,e){return r(t,e,"DELETE")}};return{get:n.get,signup:function(e){return n.post("signup",{username:t,password:e})},articles:{get:function(t){return n.get("articles/"+t)}},feeds:{get:function(t){return n.get("feeds/"+t)}},user:{tokens:{create:function(e){return n.post(t+"/tokens",{password:e})},delete:function(){return n.del(t+"/tokens",{token:e})}},feeds:{get:function(){return n.get(t+"/feeds")}},labels:{create:function(e){var r=t+"/labels";return n.post(r,{label:e})},get:function(e){return e?n.get(t+"/labels/"+encodeURIComponent(e)):n.get(t+"/labels")},post:function(e,r){var o=t+"/labels/"+encodeURIComponent(e);return n.post(o,{hash:r})},del:function(e,r){var o=t+"/labels/"+encodeURIComponent(e);return n.del(o,{hash:r})}},folders:{create:function(e){var r=t+"/folders";return n.post(r,{folder:e})},get:function(e){return n.get(t+"/folders?xmlurl="+e)},post:function(e,r){var o=t+"/folders/"+encodeURIComponent(e);return n.post(o,{xmlurl:r})},del:function(e,r){var o=t+"/folders/"+encodeURIComponent(e);return n.del(o,{xmlurl:r})}}}}}},13:function(t,e,r){var n,o,i;!function(s){"use strict";if("object"==typeof e&&null!=e&&"number"!=typeof e.nodeType)t.exports=s();else if(null!=r(19))o=[],n=s,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i));else{var a=s(),u="undefined"!=typeof self?self:$.global;"function"!=typeof u.btoa&&(u.btoa=a.btoa),"function"!=typeof u.atob&&(u.atob=a.atob)}}(function(){"use strict";function t(t){this.message=t}function e(e){for(var r,o,i=String(e),s=0,a=n,u="";i.charAt(0|s)||(a="=",s%1);u+=a.charAt(63&r>>8-s%1*8)){if(o=i.charCodeAt(s+=.75),o>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");r=r<<8|o}return u}function r(e){var r=String(e).replace(/[=]+$/,"");if(r.length%4===1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,i,s=0,a=0,u="";i=r.charAt(a++);~i&&(o=s%4?64*o+i:i,s++%4)?u+=String.fromCharCode(255&o>>(-2*s&6)):0)i=n.indexOf(i);return u}var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return t.prototype=new Error,t.prototype.name="InvalidCharacterError",{btoa:e,atob:r}})},14:function(t,e,r){var n;!function(o){"use strict";function i(t){var e=t&&t.Promise||o.Promise,r=t&&t.XMLHttpRequest||o.XMLHttpRequest,n=o;return function(){var t=Object.create(n,{fetch:{value:void 0,writable:!0}});return function(t){function n(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function o(t){return"string"!=typeof t&&(t=String(t)),t}function i(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return v.iterable&&(e[Symbol.iterator]=function(){return e}),e}function s(t){this.map={},t instanceof s?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function a(t){return t.bodyUsed?e.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function u(t){return new e(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function f(t){var e=new FileReader,r=u(e);return e.readAsArrayBuffer(t),r}function c(t){var e=new FileReader,r=u(e);return e.readAsText(t),r}function d(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function l(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function h(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(v.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(v.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(v.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(v.arrayBuffer&&v.blob&&_(t))this._bodyArrayBuffer=l(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!v.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!T(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=l(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):v.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},v.blob&&(this.blob=function(){var t=a(this);if(t)return t;if(this._bodyBlob)return e.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return e.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return e.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?a(this)||e.resolve(this._bodyArrayBuffer):this.blob().then(f)}),this.text=function(){var t=a(this);if(t)return t;if(this._bodyBlob)return c(this._bodyBlob);if(this._bodyArrayBuffer)return e.resolve(d(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return e.resolve(this._bodyText)},v.formData&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}function p(t){var e=t.toUpperCase();return A.indexOf(e)>-1?e:t}function y(t,e){e=e||{};var r=e.body;if(t instanceof y){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new s(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new s(e.headers)),this.method=p(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function b(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}}),e}function m(t){var e=new s;return t.split(/\r?\n/).forEach(function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}}),e}function w(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new s(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var v={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(v.arrayBuffer)var g=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],_=function(t){return t&&DataView.prototype.isPrototypeOf(t)},T=ArrayBuffer.isView||function(t){return t&&g.indexOf(Object.prototype.toString.call(t))>-1};s.prototype.append=function(t,e){t=n(t),e=o(e);var r=this.map[t];this.map[t]=r?r+","+e:e},s.prototype.delete=function(t){delete this.map[n(t)]},s.prototype.get=function(t){return t=n(t),this.has(t)?this.map[t]:null},s.prototype.has=function(t){return this.map.hasOwnProperty(n(t))},s.prototype.set=function(t,e){this.map[n(t)]=o(e)},s.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},s.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),i(t)},s.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),i(t)},s.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),i(t)},v.iterable&&(s.prototype[Symbol.iterator]=s.prototype.entries);var A=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];y.prototype.clone=function(){return new y(this,{body:this._bodyInit})},h.call(y.prototype),h.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new s(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var B=[301,302,303,307,308];w.redirect=function(t,e){if(B.indexOf(e)===-1)throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})},t.Headers=s,t.Request=y,t.Response=w,t.fetch=function(t,n){return new e(function(e,o){var i=new y(t,n),s=new r;s.onload=function(){var t={status:s.status,statusText:s.statusText,headers:m(s.getAllResponseHeaders()||"")};t.url="responseURL"in s?s.responseURL:t.headers.get("X-Request-URL");var r="response"in s?s.response:s.responseText;e(new w(r,t))},s.onerror=function(){o(new TypeError("Network request failed"))},s.ontimeout=function(){o(new TypeError("Network request failed"))},s.open(i.method,i.url,!0),"include"===i.credentials&&(s.withCredentials=!0),"responseType"in s&&v.blob&&(s.responseType="blob"),i.headers.forEach(function(t,e){s.setRequestHeader(e,t)}),s.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof t?t:this),{fetch:t.fetch,Headers:t.Headers,Request:t.Request,Response:t.Response}}()}n=function(){return i}.call(e,r,e,t),!(void 0!==n&&(t.exports=n))}("undefined"==typeof self?this:self)},19:function(t,e){(function(e){t.exports=e}).call(e,{})}});