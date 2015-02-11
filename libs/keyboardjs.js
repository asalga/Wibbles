/**
 * Title: KeyboardJS
 * Version: v0.4.1
 * Description: KeyboardJS is a flexible and easy to use keyboard binding
 * library.
 * Author: Robert Hurst.
 *
 * Copyright 2011, Robert William Hurst
 * Licenced under the BSD License.
 * See https://raw.github.com/RobertWHurst/KeyboardJS/master/license.txt
 */
(function(e,t){function n(){function n(e){var r;r=t(e,"amd");r.fork=n;return r}return n(e)}function r(){function n(e){var r;r=t(e,"CommonJS");r.fork=n;return r}module.exports=n(e);return}function i(){function r(e){function o(){var t,r,o;o=Array.prototype.slice.apply(arguments);for(r=0;r<i.length;r+=1){if(typeof s[i[r]]==="undefined"){delete e[i[r]]}else{e[i[r]]=s[i[r]]}}s={};for(r=0;r<o.length;r+=1){if(typeof o[r]!=="string"){throw new Error("Cannot replace namespaces. All new namespaces must be strings.")}s[o[r]]=e[o[r]];e[o[r]]=n}i=o;return i}var n,i=[],s={};n=t(e,"global");n.fork=r;n.noConflict=o;n.noConflict("KeyboardJS","k");return n}var n;n=r(e)}[].indexOf||(Array.prototype.indexOf=function(e,t,n){for(n=this.length,t=(n+~~t)%n;t<n&&(!(t in this)||this[t]!==e);t++);return t^n?t:-1});if(typeof define==="function"&&define.amd){define(n)}else if(typeof module!=="undefined"){r()}else{i()}})(this,function(e,t){function p(){if(e.addEventListener){e.document.addEventListener("keydown",m,false);e.document.addEventListener("keyup",g,false);e.addEventListener("blur",v,false);e.addEventListener("webkitfullscreenchange",v,false);e.addEventListener("mozfullscreenchange",v,false)}else if(e.attachEvent){e.document.attachEvent("onkeydown",m);e.document.attachEvent("onkeyup",g);e.attachEvent("onblur",v)}}function d(){v();if(e.removeEventListener){e.document.removeEventListener("keydown",m,false);e.document.removeEventListener("keyup",g,false);e.removeEventListener("blur",v,false);e.removeEventListener("webkitfullscreenchange",v,false);e.removeEventListener("mozfullscreenchange",v,false)}else if(e.detachEvent){e.document.detachEvent("onkeydown",m);e.document.detachEvent("onkeyup",g);e.detachEvent("onblur",v)}}function v(e){u=[];x();L(e)}function m(e){var t,n,r;t=y(e.keyCode);if(t.length<1){return}e.isRepeat=false;for(r=0;r<t.length;r+=1){n=t[r];if(P().indexOf(n)!=-1)e.isRepeat=true;H(n)}S();k(e)}function g(e){var t,n;t=y(e.keyCode);if(t.length<1){return}for(n=0;n<t.length;n+=1){B(t[n])}x();L(e)}function y(e){return s[e]||[]}function b(e){var t;for(t in s){if(!s.hasOwnProperty(t)){continue}if(s[t].indexOf(e)>-1){return t}}return false}function w(e,t){if(typeof e!=="string"&&(typeof e!=="object"||typeof e.push!=="function")){throw new Error("Cannot create macro. The combo must be a string or array.")}if(typeof t!=="object"||typeof t.push!=="function"){throw new Error("Cannot create macro. The injectedKeys must be an array.")}o.push([e,t])}function E(e){var t;if(typeof e!=="string"&&(typeof e!=="object"||typeof e.push!=="function")){throw new Error("Cannot remove macro. The combo must be a string or array.")}for(mI=0;mI<o.length;mI+=1){t=o[mI];if(A(e,t[0])){B(t[1]);o.splice(mI,1);break}}}function S(){var e,t,n;for(e=0;e<o.length;e+=1){t=_(o[e][0]);if(l.indexOf(o[e])===-1&&O(t)){l.push(o[e]);for(n=0;n<o[e][1].length;n+=1){H(o[e][1][n])}}}}function x(){var e,t,n;for(e=0;e<l.length;e+=1){t=_(l[e][0]);if(O(t)===false){for(n=0;n<l[e][1].length;n+=1){B(l[e][1][n])}l.splice(e,1);e-=1}}}function T(e,t,n){function l(){var e;for(e=0;e<s.length;e+=1){a.splice(a.indexOf(s[e]),1)}}function c(e){function o(){var t,r;for(t=0;t<n.length;t+=1){if(typeof n[t]==="function"){if(e==="keyup"){for(r=0;r<s.length;r+=1){s[r].keyUpCallback.splice(s[r].keyUpCallback.indexOf(n[t]),1)}}else{for(r=0;r<s.length;r+=1){s[r].keyDownCallback.splice(s[r].keyDownCallback.indexOf(n[t]),1)}}}}}var t={},n,r,i;if(typeof e!=="string"){throw new Error("Cannot bind callback. The event name must be a string.")}if(e!=="keyup"&&e!=="keydown"){throw new Error('Cannot bind callback. The event name must be a "keyup" or "keydown".')}n=Array.prototype.slice.apply(arguments,[1]);for(r=0;r<n.length;r+=1){if(typeof n[r]==="function"){if(e==="keyup"){for(i=0;i<s.length;i+=1){s[i].keyUpCallback.push(n[r])}}else if(e==="keydown"){for(i=0;i<s.length;i+=1){s[i].keyDownCallback.push(n[r])}}}}t.clear=o;return t}var r={},i,s=[],o={},u,f;if(typeof e==="string"){e=_(e)}for(u=0;u<e.length;u+=1){i={};f=D([e[u]]);if(typeof f!=="string"){throw new Error("Failed to bind key combo. The key combo must be string.")}i.keyCombo=f;i.keyDownCallback=[];i.keyUpCallback=[];if(t){i.keyDownCallback.push(t)}if(n){i.keyUpCallback.push(n)}a.push(i);s.push(i)}r.clear=l;r.on=c;return r}function N(e){var t,n,r;for(t=0;t<a.length;t+=1){n=a[t];if(A(e,n.keyCombo)){a.splice(t,1);t-=1}}}function C(e){var t,n,r;if(e){for(t=0;t<a.length;t+=1){r=a[t];for(n=0;n<r.keyCombo.length;n+=1){if(r.keyCombo[n].indexOf(e)>-1){a.splice(t,1);t-=1;break}}}}else{a=[]}}function k(e){var t,n,r,i,s,o,l,c,h,p,d=[],v;s=[].concat(u);for(t=0;t<a.length;t+=1){v=M(a[t].keyCombo).length;if(!d[v]){d[v]=[]}d[v].push(a[t])}for(n=d.length-1;n>=0;n-=1){if(!d[n]){continue}for(t=0;t<d[n].length;t+=1){r=d[n][t];i=M(r.keyCombo);h=true;for(c=0;c<i.length;c+=1){if(s.indexOf(i[c])===-1){h=false;break}}if(h&&O(r.keyCombo)){f.push(r);for(c=0;c<i.length;c+=1){p=s.indexOf(i[c]);if(p>-1){s.splice(p,1);c-=1}}for(o=0;o<r.keyDownCallback.length;o+=1){if(r.keyDownCallback[o](e,P(),r.keyCombo)===false){l=true}}if(l===true){e.preventDefault();e.stopPropagation()}}}}}function L(e){var t,n,r,i;for(t=0;t<f.length;t+=1){r=f[t];if(O(r.keyCombo)===false){for(n=0;n<r.keyUpCallback.length;n+=1){if(r.keyUpCallback[n](e,P(),r.keyCombo)===false){i=true}}if(i===true){e.preventDefault();e.stopPropagation()}f.splice(t,1);t-=1}}}function A(e,t){var n,r,i;e=_(e);t=_(t);if(e.length!==t.length){return false}for(n=0;n<e.length;n+=1){if(e[n].length!==t[n].length){return false}for(r=0;r<e[n].length;r+=1){if(e[n][r].length!==t[n][r].length){return false}for(i=0;i<e[n][r].length;i+=1){if(t[n][r].indexOf(e[n][r][i])===-1){return false}}}}return true}function O(e){var t,n,r,i,s=0,o,a;e=_(e);for(t=0;t<e.length;t+=1){a=true;s=0;for(n=0;n<e[t].length;n+=1){r=[].concat(e[t][n]);for(i=s;i<u.length;i+=1){o=r.indexOf(u[i]);if(o>-1){r.splice(o,1);s=i}}if(r.length!==0){a=false;break}}if(a){return true}}return false}function M(e){var t,n,r,i=[];e=_(e);for(t=0;t<e.length;t+=1){for(n=0;n<e[t].length;n+=1){i=i.concat(e[t][n])}}return i}function _(e){var t=e,n=0,r=0,i=false,s=false,o=[],u=[],a=[],f="";if(typeof e==="object"&&typeof e.push==="function"){return e}if(typeof e!=="string"){throw new Error('Cannot parse "keyCombo" because its type is "'+typeof e+'". It must be a "string".')}while(t.charAt(n)===" "){n+=1}while(true){if(t.charAt(n)===" "){while(t.charAt(n)===" "){n+=1}i=true}else if(t.charAt(n)===","){if(r||s){throw new Error("Failed to parse key combo. Unexpected , at character index "+n+".")}s=true;n+=1}else if(t.charAt(n)==="+"){if(f.length){a.push(f);f=""}if(r||s){throw new Error("Failed to parse key combo. Unexpected + at character index "+n+".")}r=true;n+=1}else if(t.charAt(n)===">"){if(f.length){a.push(f);f=""}if(a.length){u.push(a);a=[]}if(r||s){throw new Error("Failed to parse key combo. Unexpected > at character index "+n+".")}r=true;n+=1}else if(n<t.length-1&&t.charAt(n)==="!"&&(t.charAt(n+1)===">"||t.charAt(n+1)===","||t.charAt(n+1)==="+")){f+=t.charAt(n+1);r=false;i=false;s=false;n+=2}else if(n<t.length&&t.charAt(n)!=="+"&&t.charAt(n)!==">"&&t.charAt(n)!==","&&t.charAt(n)!==" "){if(r===false&&i===true||s===true){if(f.length){a.push(f);f=""}if(a.length){u.push(a);a=[]}if(u.length){o.push(u);u=[]}}r=false;i=false;s=false;while(n<t.length&&t.charAt(n)!=="+"&&t.charAt(n)!==">"&&t.charAt(n)!==","&&t.charAt(n)!==" "){f+=t.charAt(n);n+=1}}else{n+=1;continue}if(n>=t.length){if(f.length){a.push(f);f=""}if(a.length){u.push(a);a=[]}if(u.length){o.push(u);u=[]}break}}return o}function D(e){var t,n,r=[];if(typeof e==="string"){return e}if(typeof e!=="object"||typeof e.push!=="function"){throw new Error("Cannot stringify key combo.")}for(t=0;t<e.length;t+=1){r[t]=[];for(n=0;n<e[t].length;n+=1){r[t][n]=e[t][n].join(" + ")}r[t]=r[t].join(" > ")}return r.join(" ")}function P(){return[].concat(u)}function H(e){if(e.match(/\s/)){throw new Error("Cannot add key name "+e+" to active keys because it contains whitespace.")}if(u.indexOf(e)>-1){return}u.push(e)}function B(e){var t=b(e);if(t==="91"||t==="92"){u=[]}else{u.splice(u.indexOf(e),1)}}function j(e,t){if(typeof e!=="string"){throw new Error("Cannot register new locale. The locale name must be a string.")}if(typeof t!=="object"){throw new Error("Cannot register "+e+" locale. The locale map must be an object.")}if(typeof t.map!=="object"){throw new Error("Cannot register "+e+" locale. The locale map is invalid.")}if(!t.macros){t.macros=[]}r[e]=t}function F(e){if(e){if(typeof e!=="string"){throw new Error("Cannot set locale. The locale name must be a string.")}if(!r[e]){throw new Error("Cannot set locale to "+e+" because it does not exist. If you would like to submit a "+e+" locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.")}s=r[e].map;o=r[e].macros;i=e}return i}var n={},r={},i,s,o,u=[],a=[],f=[],l=[],c,h;e=e||window;h={map:{3:["cancel"],8:["backspace"],9:["tab"],12:["clear"],13:["enter"],16:["shift"],17:["ctrl"],18:["alt","menu"],19:["pause","break"],20:["capslock"],27:["escape","esc"],32:["space","spacebar"],33:["pageup"],34:["pagedown"],35:["end"],36:["home"],37:["left"],38:["up"],39:["right"],40:["down"],41:["select"],42:["printscreen"],43:["execute"],44:["snapshot"],45:["insert","ins"],46:["delete","del"],47:["help"],91:["command","windows","win","super","leftcommand","leftwindows","leftwin","leftsuper"],92:["command","windows","win","super","rightcommand","rightwindows","rightwin","rightsuper"],145:["scrolllock","scroll"],186:["semicolon",";"],187:["equal","equalsign","="],188:["comma",","],189:["dash","-"],190:["period","."],191:["slash","forwardslash","/"],192:["graveaccent","`"],219:["openbracket","["],220:["backslash","\\"],221:["closebracket","]"],222:["apostrophe","'"],48:["zero","0"],49:["one","1"],50:["two","2"],51:["three","3"],52:["four","4"],53:["five","5"],54:["six","6"],55:["seven","7"],56:["eight","8"],57:["nine","9"],96:["numzero","num0"],97:["numone","num1"],98:["numtwo","num2"],99:["numthree","num3"],100:["numfour","num4"],101:["numfive","num5"],102:["numsix","num6"],103:["numseven","num7"],104:["numeight","num8"],105:["numnine","num9"],106:["nummultiply","num*"],107:["numadd","num+"],108:["numenter"],109:["numsubtract","num-"],110:["numdecimal","num."],111:["numdivide","num/"],144:["numlock","num"],112:["f1"],113:["f2"],114:["f3"],115:["f4"],116:["f5"],117:["f6"],118:["f7"],119:["f8"],120:["f9"],121:["f10"],122:["f11"],123:["f12"]},macros:[["shift + `",["tilde","~"]],["shift + 1",["exclamation","exclamationpoint","!"]],["shift + 2",["at","@"]],["shift + 3",["number","#"]],["shift + 4",["dollar","dollars","dollarsign","$"]],["shift + 5",["percent","%"]],["shift + 6",["caret","^"]],["shift + 7",["ampersand","and","&"]],["shift + 8",["asterisk","*"]],["shift + 9",["openparen","("]],["shift + 0",["closeparen",")"]],["shift + -",["underscore","_"]],["shift + =",["plus","+"]],["shift + (",["opencurlybrace","opencurlybracket","{"]],["shift + )",["closecurlybrace","closecurlybracket","}"]],["shift + \\",["verticalbar","|"]],["shift + ;",["colon",":"]],["shift + '",["quotationmark",'"']],["shift + !,",["openanglebracket","<"]],["shift + .",["closeanglebracket",">"]],["shift + /",["questionmark","?"]]]};for(c=65;c<=90;c+=1){h.map[c]=String.fromCharCode(c+32);h.macros.push(["shift + "+String.fromCharCode(c+32)+", capslock + "+String.fromCharCode(c+32),[String.fromCharCode(c)]])}j("us",h);F("us");p();n.enable=p;n.disable=d;n.activeKeys=P;n.releaseKey=B;n.pressKey=H;n.on=T;n.clear=N;n.clear.key=C;n.locale=F;n.locale.register=j;n.macro=w;n.macro.remove=E;n.key={};n.key.name=y;n.key.code=b;n.combo={};n.combo.active=O;n.combo.parse=_;n.combo.stringify=D;return n})