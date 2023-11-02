!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-scratchcard",[],e):"object"==typeof exports?exports["vue-scratchcard"]=e():t["vue-scratchcard"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";function r(t,e,n,r){(!r||r<1)&&(r=1);for(var i=t.getImageData(0,0,e,n),a=i.data.length/r,o=0,s=0;s<i.data.length;s+=r)0===parseInt(i.data[s],10)&&o++;return Math.round(o/a*100)}function i(t,e){var n=e.getBoundingClientRect(),r=n.left,i=n.top,a=t.touches&&t.touches[0];if(a)return{x:a.clientX-r,y:a.clientY-i};var o=window.pageYOffset||document.documentElement.scrollTop,s=window.pageXOffset||document.documentElement.scrollLeft;return{x:t.pageX-r-s,y:t.pageY-i-o}}function a(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function o(t,e){return Math.atan2(e.x-t.x,e.y-t.y)}e.a={name:"ScratchCard",props:{imageUrl:String,brushUrl:String,cardWidth:Number,cardHeight:Number,finishPercent:{type:Number,default:1/0},forceReveal:{type:Boolean,default:!1},onComplete:Function,fog:{type:Boolean,default:!1},externalGain:{type:Boolean,default:!1},cover:{type:Boolean,default:!0}},data:function(){return{overlayLoaded:!1,isDrawing:!1,isFinished:!1,canvas:void 0,ctx:void 0,lastPoint:void 0,brush:new Image}},methods:{initCanvas:function(){this.canvas=this.$refs.canvas,this.canvas.width=this.cardWidth,this.canvas.height=this.cardHeight,this.ctx=this.canvas.getContext("2d")},drawImage:function(){var t=this,e=new Image;e.crossOrigin="Anonymous",e.src=this.imageUrl,e.onload=function(){var n=e.width/e.height,r=t.cardWidth/t.cardHeight,i=void 0,a=void 0,o=void 0,s=void 0;t.cover&&n<r||!t.cover&&n>r?(i=t.cardWidth,a=t.cardWidth/n,o=0,s=(t.cardHeight-a)/2):(a=t.cardHeight,i=t.cardHeight*n,s=0,o=(t.cardWidth-i)/2),t.fog&&(t.ctx.drawImage(e,o,s,i,a),t.ctx.filter="blur("+.02*t.cardWidth+"px)"),t.ctx.drawImage(e,o,s,i,a),t.ctx.filter="none",t.fog&&(t.ctx.globalCompositeOperation="luminosity",t.ctx.fillStyle="rgba(255,255,255,0.15)",t.ctx.fillRect(0,0,t.cardWidth,t.cardHeight)),t.overlayLoaded=!0,t.$emit("overlayload")}},prepBrush:function(){this.brushUrl&&(this.brush.crossOrigin="Anonymous",this.brush.src=this.brushUrl)},scratchAt:function(t,e){if(this.brushUrl){var n=this.brush.width/this.brush.height,r=.2*this.cardWidth,i=r/n,a=t-r/2,o=e-i/2;this.ctx.drawImage(this.brush,a,o,r,i)}else this.ctx.beginPath(),this.ctx.arc(t,e,25,0,2*Math.PI,!1),this.ctx.fill()},handleMouseDown:function(t){this.isDrawing=!0,this.lastPoint=i(t,this.canvas)},handleMouseUp:function(){this.isDrawing=!1},handleMouseMove:function(t){if(this.isDrawing){t.preventDefault();for(var e=i(t,this.canvas),n=a(this.lastPoint,e),s=o(this.lastPoint,e),c=void 0,d=void 0,u=0;u<n;u++)c=this.lastPoint.x+Math.sin(s)*u,d=this.lastPoint.y+Math.cos(s)*u,this.ctx.globalCompositeOperation="destination-out",this.scratchAt(c,d);this.lastPoint=e,this.handlePercentage(r(this.ctx,this.cardWidth,this.cardHeight,32))}},handlePercentage:function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0)>this.finishPercent&&this.reveal()},reveal:function(){this.isFinished||(this.canvas.parentNode.removeChild(this.canvas),this.$emit("complete"),this.onComplete&&this.onComplete()),this.isFinished=!0}},watch:{forceReveal:function(t){t&&this.reveal()}},mounted:function(){this.initCanvas(),this.drawImage(),this.prepBrush(),void 0!==this.onComplete&&console.warn("[vue-scratchcard] - `onComplete` call is deprecated in favor of `complete` event")}}},function(t,e,n){"use strict";function r(t){o||n(2)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=n(8),o=!1,s=n(7),c=r,d=s(i.a,a.a,!1,c,"data-v-2e2e20c1",null);d.options.__file="src/ScratchCard.vue",e.default=d.exports},function(t,e,n){var r=n(3);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(5)("33255b86",r,!1,{})},function(t,e,n){e=t.exports=n(4)(!1),e.push([t.i,"\n.scratchcard[data-v-2e2e20c1] {\r\n  position: relative;\r\n  display: block;\n}\n.scratchcard > *[data-v-2e2e20c1] {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  display: block;\n}\n.scratchcard-overlay[data-v-2e2e20c1] {\r\n  z-index: 1;\n}\r\n",""])},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var a=r(i);return[n].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([a]).join("\n")}return[n].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(r[a]=!0)}for(i=0;i<t.length;i++){var o=t[i];"number"==typeof o[0]&&r[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=u[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(a(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var o=[],i=0;i<n.parts.length;i++)o.push(a(n.parts[i]));u[n.id]={id:n.id,refs:1,parts:o}}}}function i(){var t=document.createElement("style");return t.type="text/css",h.appendChild(t),t}function a(t){var e,n,r=document.querySelector("style["+m+'~="'+t.id+'"]');if(r){if(p)return v;r.parentNode.removeChild(r)}if(y){var a=f++;r=l||(l=i()),e=o.bind(null,r,a,!1),n=o.bind(null,r,a,!0)}else r=i(),e=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function o(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=x(e,i);else{var a=document.createTextNode(i),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}function s(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),g.ssrId&&t.setAttribute(m,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var d=n(6),u={},h=c&&(document.head||document.getElementsByTagName("head")[0]),l=null,f=0,p=!1,v=function(){},g=null,m="data-vue-ssr-id",y="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,i){p=n,g=i||{};var a=d(t,e);return r(a),function(e){for(var n=[],i=0;i<a.length;i++){var o=a[i],s=u[o.id];s.refs--,n.push(s)}e?(a=d(t,e),r(a)):a=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete u[s.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},i=0;i<e.length;i++){var a=e[i],o=a[0],s=a[1],c=a[2],d=a[3],u={id:t+":"+i,css:s,media:c,sourceMap:d};r[o]?r[o].parts.push(u):n.push(r[o]={id:o,parts:[u]})}return n}},function(t,e){t.exports=function(t,e,n,r,i,a){var o,s=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(o=t,s=t.default);var d="function"==typeof s?s.options:s;e&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0),n&&(d.functional=!0),i&&(d._scopeId=i);var u;if(a?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},d._ssrRegister=u):r&&(u=r),u){var h=d.functional,l=h?d.render:d.beforeCreate;h?(d._injectStyles=u,d.render=function(t,e){return u.call(e),l(t,e)}):d.beforeCreate=l?[].concat(l,u):[u]}return{esModule:o,exports:s,options:d}}},function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"scratchcard",style:"width:"+t.cardWidth+"px; height:"+t.cardHeight+"px"},[n("canvas",{ref:"canvas",staticClass:"scratchcard-overlay",on:{mousedown:t.handleMouseDown,mousemove:t.handleMouseMove,mouseup:t.handleMouseUp,touchstart:t.handleMouseDown,touchmove:t.handleMouseMove,touchend:t.handleMouseUp}}),t._v(" "),t.overlayLoaded&&!t.externalGain?n("div",{staticClass:"scratchcard-content"},[t._t("default")],2):t._e()])},i=[];r._withStripped=!0;var a={render:r,staticRenderFns:i};e.a=a}])});