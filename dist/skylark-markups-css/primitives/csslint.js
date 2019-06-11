/**
 * skylark-markups-css - The skylark css utility library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./parser-lib"],function(e){var t,r=function(){var t=[],r=[],o=/\/\*csslint([^\*]*)\*\//,i=new e.util.EventTarget;return i.version="0.10.0",i.addRule=function(e){t.push(e),t[e.id]=e},i.clearRules=function(){t=[]},i.getRules=function(){return[].concat(t).sort(function(e,t){return e.id>t.id?1:0})},i.getRuleset=function(){for(var e={},r=0,n=t.length;r<n;)e[t[r++].id]=1;return e},i.addFormatter=function(e){r[e.id]=e},i.getFormatter=function(e){return r[e]},i.format=function(e,t,r,n){var o=this.getFormatter(r),i=null;return o&&(i=o.startFormat(),i+=o.formatResults(e,t,n||{}),i+=o.endFormat()),i},i.hasFormat=function(e){return r.hasOwnProperty(e)},i.verify=function(r,i){var s,a,l,d=0,u=(t.length,new e.css.Parser({starHack:!0,ieFilters:!0,underscoreHack:!0,strict:!1}));for(d in a=r.replace(/\n\r?/g,"$split$").split("$split$"),i||(i=this.getRuleset()),o.test(r)&&(i=function(e,t){var r,n=e&&e.match(o),i=n&&n[1];return i&&(r={true:2,"":1,false:0,2:2,1:1,0:0},i.toLowerCase().split(",").forEach(function(e){var n=e.split(":"),o=n[0]||"",i=n[1]||"";t[o.trim()]=r[i.trim()]})),t}(r,i)),s=new n(a,i),i.errors=2,i)i.hasOwnProperty(d)&&i[d]&&t[d]&&t[d].init(u,s);try{u.parse(r)}catch(e){s.error("Fatal error, cannot continue: "+e.message,e.line,e.col,{})}return(l={messages:s.messages,stats:s.stats,ruleset:s.ruleset}).messages.sort(function(e,t){return e.rollup&&!t.rollup?1:!e.rollup&&t.rollup?-1:e.line-t.line}),l},i}();function n(e,t){this.messages=[],this.stats=[],this.lines=e,this.ruleset=t}return n.prototype={constructor:n,error:function(e,t,r,n){this.messages.push({type:"error",line:t,col:r,message:e,evidence:this.lines[t-1],rule:n||{}})},warn:function(e,t,r,n){this.report(e,t,r,n)},report:function(e,t,r,n){this.messages.push({type:2==this.ruleset[n.id]?"error":"warning",line:t,col:r,message:e,evidence:this.lines[t-1],rule:n})},info:function(e,t,r,n){this.messages.push({type:"info",line:t,col:r,message:e,evidence:this.lines[t-1],rule:n})},rollupError:function(e,t){this.messages.push({type:"error",rollup:!0,message:e,rule:t})},rollupWarn:function(e,t){this.messages.push({type:"warning",rollup:!0,message:e,rule:t})},stat:function(e,t){this.stats[e]=t}},r._Reporter=n,r.Util={mix:function(e,t){var r;for(r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return r},indexOf:function(e,t){if(e.indexOf)return e.indexOf(t);for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1},forEach:function(e,t){if(e.forEach)return e.forEach(t);for(var r=0,n=e.length;r<n;r++)t(e[r],r,e)}},r.addRule({id:"adjoining-classes",name:"Disallow adjoining classes",desc:"Don't use adjoining classes.",browsers:"IE6",init:function(e,t){var r=this;e.addListener("startrule",function(n){var o,i,s,a,l,d,u=n.selectors;for(a=0;a<u.length;a++)for(o=u[a],l=0;l<o.parts.length;l++)if((i=o.parts[l]).type==e.SELECTOR_PART_TYPE)for(s=0,d=0;d<i.modifiers.length;d++)"class"==i.modifiers[d].type&&s++,s>1&&t.report("Don't use adjoining classes.",i.line,i.col,r)})}}),r.addRule({id:"box-model",name:"Beware of broken box size",desc:"Don't use width or height when using padding or border.",browsers:"All",init:function(e,t){var r,n=this,o={border:1,"border-left":1,"border-right":1,padding:1,"padding-left":1,"padding-right":1},i={border:1,"border-bottom":1,"border-top":1,padding:1,"padding-bottom":1,"padding-top":1},s=!1;function a(){r={},s=!1}function l(){var e,a;if(!s){if(r.height)for(e in i)i.hasOwnProperty(e)&&r[e]&&(a=r[e].value,"padding"==e&&2===a.parts.length&&0===a.parts[0].value||t.report("Using height with "+e+" can sometimes make elements larger than you expect.",r[e].line,r[e].col,n));if(r.width)for(e in o)o.hasOwnProperty(e)&&r[e]&&(a=r[e].value,"padding"==e&&2===a.parts.length&&0===a.parts[1].value||t.report("Using width with "+e+" can sometimes make elements larger than you expect.",r[e].line,r[e].col,n))}}e.addListener("startrule",a),e.addListener("startfontface",a),e.addListener("startpage",a),e.addListener("startpagemargin",a),e.addListener("startkeyframerule",a),e.addListener("property",function(e){var t=e.property.text.toLowerCase();i[t]||o[t]?/^0\S*$/.test(e.value)||"border"==t&&"none"==e.value||(r[t]={line:e.property.line,col:e.property.col,value:e.value}):/^(width|height)/i.test(t)&&/^(length|percentage)/.test(e.value.parts[0].type)?r[t]=1:"box-sizing"==t&&(s=!0)}),e.addListener("endrule",l),e.addListener("endfontface",l),e.addListener("endpage",l),e.addListener("endpagemargin",l),e.addListener("endkeyframerule",l)}}),r.addRule({id:"box-sizing",name:"Disallow use of box-sizing",desc:"The box-sizing properties isn't supported in IE6 and IE7.",browsers:"IE6, IE7",tags:["Compatibility"],init:function(e,t){var r=this;e.addListener("property",function(e){"box-sizing"==e.property.text.toLowerCase()&&t.report("The box-sizing property isn't supported in IE6 and IE7.",e.line,e.col,r)})}}),r.addRule({id:"bulletproof-font-face",name:"Use the bulletproof @font-face syntax",desc:"Use the bulletproof @font-face syntax to avoid 404's in old IE (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax).",browsers:"All",init:function(e,t){var r,n,o=this,i=!1,s=!0,a=!1;e.addListener("startfontface",function(e){i=!0}),e.addListener("property",function(e){if(i){var t=e.property.toString().toLowerCase(),o=e.value.toString();if(r=e.line,n=e.col,"src"===t){var l=/^\s?url\(['"].+\.eot\?.*['"]\)\s*format\(['"]embedded-opentype['"]\).*$/i;!o.match(l)&&s?(a=!0,s=!1):o.match(l)&&!s&&(a=!1)}}}),e.addListener("endfontface",function(e){i=!1,a&&t.report("@font-face declaration doesn't follow the fontspring bulletproof syntax.",r,n,o)})}}),r.addRule({id:"compatible-vendor-prefixes",name:"Require compatible vendor prefixes",desc:"Include all compatible vendor prefixes to reach a wider range of users.",browsers:"All",init:function(e,t){var n,o,i,s,a,l,d,u=this,c=!1,p=Array.prototype.push,f=[];for(i in n={animation:"webkit moz","animation-delay":"webkit moz","animation-direction":"webkit moz","animation-duration":"webkit moz","animation-fill-mode":"webkit moz","animation-iteration-count":"webkit moz","animation-name":"webkit moz","animation-play-state":"webkit moz","animation-timing-function":"webkit moz",appearance:"webkit moz","border-end":"webkit moz","border-end-color":"webkit moz","border-end-style":"webkit moz","border-end-width":"webkit moz","border-image":"webkit moz o","border-radius":"webkit","border-start":"webkit moz","border-start-color":"webkit moz","border-start-style":"webkit moz","border-start-width":"webkit moz","box-align":"webkit moz ms","box-direction":"webkit moz ms","box-flex":"webkit moz ms","box-lines":"webkit ms","box-ordinal-group":"webkit moz ms","box-orient":"webkit moz ms","box-pack":"webkit moz ms","box-sizing":"webkit moz","box-shadow":"webkit moz","column-count":"webkit moz ms","column-gap":"webkit moz ms","column-rule":"webkit moz ms","column-rule-color":"webkit moz ms","column-rule-style":"webkit moz ms","column-rule-width":"webkit moz ms","column-width":"webkit moz ms",hyphens:"epub moz","line-break":"webkit ms","margin-end":"webkit moz","margin-start":"webkit moz","marquee-speed":"webkit wap","marquee-style":"webkit wap","padding-end":"webkit moz","padding-start":"webkit moz","tab-size":"moz o","text-size-adjust":"webkit ms",transform:"webkit moz ms o","transform-origin":"webkit moz ms o",transition:"webkit moz o","transition-delay":"webkit moz o","transition-duration":"webkit moz o","transition-property":"webkit moz o","transition-timing-function":"webkit moz o","user-modify":"webkit moz","user-select":"webkit moz ms","word-break":"epub ms","writing-mode":"epub ms"})if(n.hasOwnProperty(i)){for(s=[],l=0,d=(a=n[i].split(" ")).length;l<d;l++)s.push("-"+a[l]+"-"+i);n[i]=s,p.apply(f,s)}e.addListener("startrule",function(){o=[]}),e.addListener("startkeyframes",function(e){c=e.prefix||!0}),e.addListener("endkeyframes",function(e){c=!1}),e.addListener("property",function(e){var t=e.property;r.Util.indexOf(f,t.text)>-1&&(c&&"string"==typeof c&&0===t.text.indexOf("-"+c+"-")||o.push(t))}),e.addListener("endrule",function(e){if(o.length){var i,s,a,l,d,c,p,f,m,h,g={};for(i=0,s=o.length;i<s;i++)for(l in a=o[i],n)n.hasOwnProperty(l)&&(d=n[l],r.Util.indexOf(d,a.text)>-1&&(g[l]||(g[l]={full:d.slice(0),actual:[],actualNodes:[]}),-1===r.Util.indexOf(g[l].actual,a.text)&&(g[l].actual.push(a.text),g[l].actualNodes.push(a))));for(l in g)if(g.hasOwnProperty(l)&&(p=(c=g[l]).full,f=c.actual,p.length>f.length))for(i=0,s=p.length;i<s;i++)m=p[i],-1===r.Util.indexOf(f,m)&&(h=1===f.length?f[0]:2==f.length?f.join(" and "):f.join(", "),t.report("The property "+m+" is compatible with "+h+" and should be included as well.",c.actualNodes[0].line,c.actualNodes[0].col,u))}})}}),r.addRule({id:"display-property-grouping",name:"Require properties appropriate for display",desc:"Certain properties shouldn't be used with certain display property values.",browsers:"All",init:function(e,t){var r,n=this,o={display:1,float:"none",height:1,width:1,margin:1,"margin-left":1,"margin-right":1,"margin-bottom":1,"margin-top":1,padding:1,"padding-left":1,"padding-right":1,"padding-bottom":1,"padding-top":1,"vertical-align":1};function i(e,i,s){r[e]&&("string"==typeof o[e]&&r[e].value.toLowerCase()==o[e]||t.report(s||e+" can't be used with display: "+i+".",r[e].line,r[e].col,n))}function s(){r={}}function a(){var e=r.display?r.display.value:null;if(e)switch(e){case"inline":i("height",e),i("width",e),i("margin",e),i("margin-top",e),i("margin-bottom",e),i("float",e,"display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug).");break;case"block":i("vertical-align",e);break;case"inline-block":i("float",e);break;default:0===e.indexOf("table-")&&(i("margin",e),i("margin-left",e),i("margin-right",e),i("margin-top",e),i("margin-bottom",e),i("float",e))}}e.addListener("startrule",s),e.addListener("startfontface",s),e.addListener("startkeyframerule",s),e.addListener("startpagemargin",s),e.addListener("startpage",s),e.addListener("property",function(e){var t=e.property.text.toLowerCase();o[t]&&(r[t]={value:e.value.text,line:e.property.line,col:e.property.col})}),e.addListener("endrule",a),e.addListener("endfontface",a),e.addListener("endkeyframerule",a),e.addListener("endpagemargin",a),e.addListener("endpage",a)}}),r.addRule({id:"duplicate-background-images",name:"Disallow duplicate background images",desc:"Every background-image should be unique. Use a common class for e.g. sprites.",browsers:"All",init:function(e,t){var r=this,n={};e.addListener("property",function(e){var o,i,s=e.property.text,a=e.value;if(s.match(/background/i))for(o=0,i=a.parts.length;o<i;o++)"uri"==a.parts[o].type&&(void 0===n[a.parts[o].uri]?n[a.parts[o].uri]=e:t.report("Background image '"+a.parts[o].uri+"' was used multiple times, first declared at line "+n[a.parts[o].uri].line+", col "+n[a.parts[o].uri].col+".",e.line,e.col,r))})}}),r.addRule({id:"duplicate-properties",name:"Disallow duplicate properties",desc:"Duplicate properties must appear one after the other.",browsers:"All",init:function(e,t){var r,n,o=this;function i(e){r={}}e.addListener("startrule",i),e.addListener("startfontface",i),e.addListener("startpage",i),e.addListener("startpagemargin",i),e.addListener("startkeyframerule",i),e.addListener("property",function(e){var i=e.property.text.toLowerCase();!r[i]||n==i&&r[i]!=e.value.text||t.report("Duplicate property '"+e.property+"' found.",e.line,e.col,o),r[i]=e.value.text,n=i})}}),r.addRule({id:"empty-rules",name:"Disallow empty rules",desc:"Rules without any properties specified should be removed.",browsers:"All",init:function(e,t){var r=this,n=0;e.addListener("startrule",function(){n=0}),e.addListener("property",function(){n++}),e.addListener("endrule",function(e){var o=e.selectors;0===n&&t.report("Rule is empty.",o[0].line,o[0].col,r)})}}),r.addRule({id:"errors",name:"Parsing Errors",desc:"This rule looks for recoverable syntax errors.",browsers:"All",init:function(e,t){var r=this;e.addListener("error",function(e){t.error(e.message,e.line,e.col,r)})}}),r.addRule({id:"fallback-colors",name:"Require fallback colors",desc:"For older browsers that don't support RGBA, HSL, or HSLA, provide a fallback color.",browsers:"IE6,IE7,IE8",init:function(e,t){var r,n=this,o={color:1,background:1,"border-color":1,"border-top-color":1,"border-right-color":1,"border-bottom-color":1,"border-left-color":1,border:1,"border-top":1,"border-right":1,"border-bottom":1,"border-left":1,"background-color":1};function i(e){({}),r=null}e.addListener("startrule",i),e.addListener("startfontface",i),e.addListener("startpage",i),e.addListener("startpagemargin",i),e.addListener("startkeyframerule",i),e.addListener("property",function(e){var i=e.property.text.toLowerCase(),s=e.value.parts,a=0,l="",d=s.length;if(o[i])for(;a<d;)"color"==s[a].type&&("alpha"in s[a]||"hue"in s[a]?(/([^\)]+)\(/.test(s[a])&&(l=RegExp.$1.toUpperCase()),r&&r.property.text.toLowerCase()==i&&"compat"==r.colorType||t.report("Fallback "+i+" (hex or RGB) should precede "+l+" "+i+".",e.line,e.col,n)):e.colorType="compat"),a++;r=e})}}),r.addRule({id:"floats",name:"Disallow too many floats",desc:"This rule tests if the float property is used too many times",browsers:"All",init:function(e,t){var r=this,n=0;e.addListener("property",function(e){"float"==e.property.text.toLowerCase()&&"none"!=e.value.text.toLowerCase()&&n++}),e.addListener("endstylesheet",function(){t.stat("floats",n),n>=10&&t.rollupWarn("Too many floats ("+n+"), you're probably using them for layout. Consider using a grid system instead.",r)})}}),r.addRule({id:"font-faces",name:"Don't use too many web fonts",desc:"Too many different web fonts in the same stylesheet.",browsers:"All",init:function(e,t){var r=this,n=0;e.addListener("startfontface",function(){n++}),e.addListener("endstylesheet",function(){n>5&&t.rollupWarn("Too many @font-face declarations ("+n+").",r)})}}),r.addRule({id:"font-sizes",name:"Disallow too many font sizes",desc:"Checks the number of font-size declarations.",browsers:"All",init:function(e,t){var r=this,n=0;e.addListener("property",function(e){"font-size"==e.property&&n++}),e.addListener("endstylesheet",function(){t.stat("font-sizes",n),n>=10&&t.rollupWarn("Too many font-size declarations ("+n+"), abstraction needed.",r)})}}),r.addRule({id:"gradients",name:"Require all gradient definitions",desc:"When using a vendor-prefixed gradient, make sure to use them all.",browsers:"All",init:function(e,t){var r,n=this;e.addListener("startrule",function(){r={moz:0,webkit:0,oldWebkit:0,o:0}}),e.addListener("property",function(e){/\-(moz|o|webkit)(?:\-(?:linear|radial))\-gradient/i.test(e.value)?r[RegExp.$1]=1:/\-webkit\-gradient/i.test(e.value)&&(r.oldWebkit=1)}),e.addListener("endrule",function(e){var o=[];r.moz||o.push("Firefox 3.6+"),r.webkit||o.push("Webkit (Safari 5+, Chrome)"),r.oldWebkit||o.push("Old Webkit (Safari 4+, Chrome)"),r.o||o.push("Opera 11.1+"),o.length&&o.length<4&&t.report("Missing vendor-prefixed CSS gradients for "+o.join(", ")+".",e.selectors[0].line,e.selectors[0].col,n)})}}),r.addRule({id:"ids",name:"Disallow IDs in selectors",desc:"Selectors should not contain IDs.",browsers:"All",init:function(e,t){var r=this;e.addListener("startrule",function(n){var o,i,s,a,l,d,u=n.selectors;for(a=0;a<u.length;a++){for(o=u[a],s=0,l=0;l<o.parts.length;l++)if((i=o.parts[l]).type==e.SELECTOR_PART_TYPE)for(d=0;d<i.modifiers.length;d++)"id"==i.modifiers[d].type&&s++;1==s?t.report("Don't use IDs in selectors.",o.line,o.col,r):s>1&&t.report(s+" IDs in the selector, really?",o.line,o.col,r)}})}}),r.addRule({id:"import",name:"Disallow @import",desc:"Don't use @import, use <link> instead.",browsers:"All",init:function(e,t){var r=this;e.addListener("import",function(e){t.report("@import prevents parallel downloads, use <link> instead.",e.line,e.col,r)})}}),r.addRule({id:"important",name:"Disallow !important",desc:"Be careful when using !important declaration",browsers:"All",init:function(e,t){var r=this,n=0;e.addListener("property",function(e){!0===e.important&&(n++,t.report("Use of !important",e.line,e.col,r))}),e.addListener("endstylesheet",function(){t.stat("important",n),n>=10&&t.rollupWarn("Too many !important declarations ("+n+"), try to use less than 10 to avoid specificity issues.",r)})}}),r.addRule({id:"known-properties",name:"Require use of known properties",desc:"Properties should be known (listed in CSS3 specification) or be a vendor-prefixed property.",browsers:"All",init:function(e,t){var r=this;e.addListener("property",function(e){e.property.text.toLowerCase();e.invalid&&t.report(e.invalid.message,e.line,e.col,r)})}}),r.addRule({id:"outline-none",name:"Disallow outline: none",desc:"Use of outline: none or outline: 0 should be limited to :focus rules.",browsers:"All",tags:["Accessibility"],init:function(e,t){var r,n=this;function o(e){r=e.selectors?{line:e.line,col:e.col,selectors:e.selectors,propCount:0,outline:!1}:null}function i(e){r&&r.outline&&(-1==r.selectors.toString().toLowerCase().indexOf(":focus")?t.report("Outlines should only be modified using :focus.",r.line,r.col,n):1==r.propCount&&t.report("Outlines shouldn't be hidden unless other visual changes are made.",r.line,r.col,n))}e.addListener("startrule",o),e.addListener("startfontface",o),e.addListener("startpage",o),e.addListener("startpagemargin",o),e.addListener("startkeyframerule",o),e.addListener("property",function(e){var t=e.property.text.toLowerCase(),n=e.value;r&&(r.propCount++,"outline"!=t||"none"!=n&&"0"!=n||(r.outline=!0))}),e.addListener("endrule",i),e.addListener("endfontface",i),e.addListener("endpage",i),e.addListener("endpagemargin",i),e.addListener("endkeyframerule",i)}}),r.addRule({id:"overqualified-elements",name:"Disallow overqualified elements",desc:"Don't use classes or IDs with elements (a.foo or a#foo).",browsers:"All",init:function(e,t){var r=this,n={};e.addListener("startrule",function(o){var i,s,a,l,d,u,c=o.selectors;for(l=0;l<c.length;l++)for(i=c[l],d=0;d<i.parts.length;d++)if((s=i.parts[d]).type==e.SELECTOR_PART_TYPE)for(u=0;u<s.modifiers.length;u++)a=s.modifiers[u],s.elementName&&"id"==a.type?t.report("Element ("+s+") is overqualified, just use "+a+" without element name.",s.line,s.col,r):"class"==a.type&&(n[a]||(n[a]=[]),n[a].push({modifier:a,part:s}))}),e.addListener("endstylesheet",function(){var e;for(e in n)n.hasOwnProperty(e)&&1==n[e].length&&n[e][0].part.elementName&&t.report("Element ("+n[e][0].part+") is overqualified, just use "+n[e][0].modifier+" without element name.",n[e][0].part.line,n[e][0].part.col,r)})}}),r.addRule({id:"qualified-headings",name:"Disallow qualified headings",desc:"Headings should not be qualified (namespaced).",browsers:"All",init:function(e,t){var r=this;e.addListener("startrule",function(n){var o,i,s,a,l=n.selectors;for(s=0;s<l.length;s++)for(o=l[s],a=0;a<o.parts.length;a++)(i=o.parts[a]).type==e.SELECTOR_PART_TYPE&&i.elementName&&/h[1-6]/.test(i.elementName.toString())&&a>0&&t.report("Heading ("+i.elementName+") should not be qualified.",i.line,i.col,r)})}}),r.addRule({id:"regex-selectors",name:"Disallow selectors that look like regexs",desc:"Selectors that look like regular expressions are slow and should be avoided.",browsers:"All",init:function(e,t){var r=this;e.addListener("startrule",function(n){var o,i,s,a,l,d,u=n.selectors;for(a=0;a<u.length;a++)for(o=u[a],l=0;l<o.parts.length;l++)if((i=o.parts[l]).type==e.SELECTOR_PART_TYPE)for(d=0;d<i.modifiers.length;d++)"attribute"==(s=i.modifiers[d]).type&&/([\~\|\^\$\*]=)/.test(s)&&t.report("Attribute selectors with "+RegExp.$1+" are slow!",s.line,s.col,r)})}}),r.addRule({id:"rules-count",name:"Rules Count",desc:"Track how many rules there are.",browsers:"All",init:function(e,t){var r=0;e.addListener("startrule",function(){r++}),e.addListener("endstylesheet",function(){t.stat("rule-count",r)})}}),r.addRule({id:"selector-max-approaching",name:"Warn when approaching the 4095 selector limit for IE",desc:"Will warn when selector count is >= 3800 selectors.",browsers:"IE",init:function(e,t){var r=this,n=0;e.addListener("startrule",function(e){n+=e.selectors.length}),e.addListener("endstylesheet",function(){n>=3800&&t.report("You have "+n+" selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.",0,0,r)})}}),r.addRule({id:"selector-max",name:"Error when past the 4095 selector limit for IE",desc:"Will error when selector count is > 4095.",browsers:"IE",init:function(e,t){var r=this,n=0;e.addListener("startrule",function(e){n+=e.selectors.length}),e.addListener("endstylesheet",function(){n>4095&&t.report("You have "+n+" selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.",0,0,r)})}}),r.addRule({id:"shorthand",name:"Require shorthand properties",desc:"Use shorthand properties where possible.",browsers:"All",init:function(e,t){var r,n,o,i,s=this,a={},l={margin:["margin-top","margin-bottom","margin-left","margin-right"],padding:["padding-top","padding-bottom","padding-left","padding-right"]};for(r in l)if(l.hasOwnProperty(r))for(n=0,o=l[r].length;n<o;n++)a[l[r][n]]=r;function d(e){i={}}function u(e){var r,n,o,a;for(r in l)if(l.hasOwnProperty(r)){for(a=0,n=0,o=l[r].length;n<o;n++)a+=i[l[r][n]]?1:0;a==l[r].length&&t.report("The properties "+l[r].join(", ")+" can be replaced by "+r+".",e.line,e.col,s)}}e.addListener("startrule",d),e.addListener("startfontface",d),e.addListener("property",function(e){var t=e.property.toString().toLowerCase();e.value.parts[0].value;a[t]&&(i[t]=1)}),e.addListener("endrule",u),e.addListener("endfontface",u)}}),r.addRule({id:"star-property-hack",name:"Disallow properties with a star prefix",desc:"Checks for the star property hack (targets IE6/7)",browsers:"All",init:function(e,t){var r=this;e.addListener("property",function(e){"*"==e.property.hack&&t.report("Property with star prefix found.",e.property.line,e.property.col,r)})}}),r.addRule({id:"text-indent",name:"Disallow negative text-indent",desc:"Checks for text indent less than -99px",browsers:"All",init:function(e,t){var r,n,o=this;function i(e){r=!1,n="inherit"}function s(e){r&&"ltr"!=n&&t.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr.",r.line,r.col,o)}e.addListener("startrule",i),e.addListener("startfontface",i),e.addListener("property",function(e){var t=e.property.toString().toLowerCase(),o=e.value;"text-indent"==t&&o.parts[0].value<-99?r=e.property:"direction"==t&&"ltr"==o&&(n="ltr")}),e.addListener("endrule",s),e.addListener("endfontface",s)}}),r.addRule({id:"underscore-property-hack",name:"Disallow properties with an underscore prefix",desc:"Checks for the underscore property hack (targets IE6)",browsers:"All",init:function(e,t){var r=this;e.addListener("property",function(e){"_"==e.property.hack&&t.report("Property with underscore prefix found.",e.property.line,e.property.col,r)})}}),r.addRule({id:"unique-headings",name:"Headings should only be defined once",desc:"Headings should be defined only once.",browsers:"All",init:function(e,t){var r=this,n={h1:0,h2:0,h3:0,h4:0,h5:0,h6:0};e.addListener("startrule",function(e){var o,i,s,a,l,d=e.selectors;for(a=0;a<d.length;a++)if((i=(o=d[a]).parts[o.parts.length-1]).elementName&&/(h[1-6])/i.test(i.elementName.toString())){for(l=0;l<i.modifiers.length;l++)if("pseudo"==i.modifiers[l].type){s=!0;break}s||(n[RegExp.$1]++,n[RegExp.$1]>1&&t.report("Heading ("+i.elementName+") has already been defined.",i.line,i.col,r))}}),e.addListener("endstylesheet",function(e){var o,i=[];for(o in n)n.hasOwnProperty(o)&&n[o]>1&&i.push(n[o]+" "+o+"s");i.length&&t.rollupWarn("You have "+i.join(", ")+" defined in this stylesheet.",r)})}}),r.addRule({id:"universal-selector",name:"Disallow universal selector",desc:"The universal selector (*) is known to be slow.",browsers:"All",init:function(e,t){var r=this;e.addListener("startrule",function(e){var n,o,i,s=e.selectors;for(i=0;i<s.length;i++)"*"==(o=(n=s[i]).parts[n.parts.length-1]).elementName&&t.report(r.desc,o.line,o.col,r)})}}),r.addRule({id:"unqualified-attributes",name:"Disallow unqualified attribute selectors",desc:"Unqualified attribute selectors are known to be slow.",browsers:"All",init:function(e,t){var r=this;e.addListener("startrule",function(n){var o,i,s,a,l=n.selectors;for(s=0;s<l.length;s++)if((i=(o=l[s]).parts[o.parts.length-1]).type==e.SELECTOR_PART_TYPE)for(a=0;a<i.modifiers.length;a++)"attribute"!=i.modifiers[a].type||i.elementName&&"*"!=i.elementName||t.report(r.desc,i.line,i.col,r)})}}),r.addRule({id:"vendor-prefix",name:"Require standard property with vendor prefix",desc:"When using a vendor-prefixed property, make sure to include the standard one.",browsers:"All",init:function(e,t){var r,n,o=this,i={"-webkit-border-radius":"border-radius","-webkit-border-top-left-radius":"border-top-left-radius","-webkit-border-top-right-radius":"border-top-right-radius","-webkit-border-bottom-left-radius":"border-bottom-left-radius","-webkit-border-bottom-right-radius":"border-bottom-right-radius","-o-border-radius":"border-radius","-o-border-top-left-radius":"border-top-left-radius","-o-border-top-right-radius":"border-top-right-radius","-o-border-bottom-left-radius":"border-bottom-left-radius","-o-border-bottom-right-radius":"border-bottom-right-radius","-moz-border-radius":"border-radius","-moz-border-radius-topleft":"border-top-left-radius","-moz-border-radius-topright":"border-top-right-radius","-moz-border-radius-bottomleft":"border-bottom-left-radius","-moz-border-radius-bottomright":"border-bottom-right-radius","-moz-column-count":"column-count","-webkit-column-count":"column-count","-moz-column-gap":"column-gap","-webkit-column-gap":"column-gap","-moz-column-rule":"column-rule","-webkit-column-rule":"column-rule","-moz-column-rule-style":"column-rule-style","-webkit-column-rule-style":"column-rule-style","-moz-column-rule-color":"column-rule-color","-webkit-column-rule-color":"column-rule-color","-moz-column-rule-width":"column-rule-width","-webkit-column-rule-width":"column-rule-width","-moz-column-width":"column-width","-webkit-column-width":"column-width","-webkit-column-span":"column-span","-webkit-columns":"columns","-moz-box-shadow":"box-shadow","-webkit-box-shadow":"box-shadow","-moz-transform":"transform","-webkit-transform":"transform","-o-transform":"transform","-ms-transform":"transform","-moz-transform-origin":"transform-origin","-webkit-transform-origin":"transform-origin","-o-transform-origin":"transform-origin","-ms-transform-origin":"transform-origin","-moz-box-sizing":"box-sizing","-webkit-box-sizing":"box-sizing","-moz-user-select":"user-select","-khtml-user-select":"user-select","-webkit-user-select":"user-select"};function s(){r={},n=1}function a(e){var n,s,a,l,d,u=[];for(n in r)i[n]&&u.push({actual:n,needed:i[n]});for(s=0,a=u.length;s<a;s++)l=u[s].needed,d=u[s].actual,r[l]?r[l][0].pos<r[d][0].pos&&t.report("Standard property '"+l+"' should come after vendor-prefixed property '"+d+"'.",r[d][0].name.line,r[d][0].name.col,o):t.report("Missing standard property '"+l+"' to go along with '"+d+"'.",r[d][0].name.line,r[d][0].name.col,o)}e.addListener("startrule",s),e.addListener("startfontface",s),e.addListener("startpage",s),e.addListener("startpagemargin",s),e.addListener("startkeyframerule",s),e.addListener("property",function(e){var t=e.property.text.toLowerCase();r[t]||(r[t]=[]),r[t].push({name:e.property,value:e.value,pos:n++})}),e.addListener("endrule",a),e.addListener("endfontface",a),e.addListener("endpage",a),e.addListener("endpagemargin",a),e.addListener("endkeyframerule",a)}}),r.addRule({id:"zero-units",name:"Disallow units for 0 values",desc:"You don't need to specify units when a value is 0.",browsers:"All",init:function(e,t){var r=this;e.addListener("property",function(e){for(var n=e.value.parts,o=0,i=n.length;o<i;)!n[o].units&&"percentage"!=n[o].type||0!==n[o].value||"time"==n[o].type||t.report("Values of 0 shouldn't have units specified.",n[o].line,n[o].col,r),o++})}}),t=function(e){return e&&e.constructor===String?e.replace(/[\"&><]/g,function(e){switch(e){case'"':return"&quot;";case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;"}}):""},r.addFormatter({id:"checkstyle-xml",name:"Checkstyle XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><checkstyle>'},endFormat:function(){return"</checkstyle>"},readError:function(e,r){return'<file name="'+t(e)+'"><error line="0" column="0" severty="error" message="'+t(r)+'"></error></file>'},formatResults:function(e,n,o){var i=e.messages,s=[];return i.length>0&&(s.push('<file name="'+n+'">'),r.Util.forEach(i,function(e,r){var n;e.rollup||s.push('<error line="'+e.line+'" column="'+e.col+'" severity="'+e.type+'" message="'+t(e.message)+'" source="'+((n=e.rule)&&"name"in n?"net.csslint."+n.name.replace(/\s/g,""):"")+'"/>')}),s.push("</file>")),s.join("")}}),r.addFormatter({id:"compact",name:"Compact, 'porcelain' format",startFormat:function(){return""},endFormat:function(){return""},formatResults:function(e,t,n){var o=e.messages,i="";n=n||{};var s=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};return 0===o.length?n.quiet?"":t+": Lint Free!":(r.Util.forEach(o,function(e,r){e.rollup?i+=t+": "+s(e.type)+" - "+e.message+"\n":i+=t+": line "+e.line+", col "+e.col+", "+s(e.type)+" - "+e.message+"\n"}),i)}}),r.addFormatter({id:"csslint-xml",name:"CSSLint XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><csslint>'},endFormat:function(){return"</csslint>"},formatResults:function(e,t,n){var o=e.messages,i=[],s=function(e){return e&&e.constructor===String?e.replace(/\"/g,"'").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""};return o.length>0&&(i.push('<file name="'+t+'">'),r.Util.forEach(o,function(e,t){e.rollup?i.push('<issue severity="'+e.type+'" reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>'):i.push('<issue line="'+e.line+'" char="'+e.col+'" severity="'+e.type+'" reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>')}),i.push("</file>")),i.join("")}}),r.addFormatter({id:"junit-xml",name:"JUNIT XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><testsuites>'},endFormat:function(){return"</testsuites>"},formatResults:function(e,t,r){var n=e.messages,o=[],i={error:0,failure:0},s=function(e){return e&&e.constructor===String?e.replace(/\"/g,"'").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""};return n.length>0&&(n.forEach(function(e,t){var r,n="warning"===e.type?"error":e.type;e.rollup||(o.push('<testcase time="0" name="'+((r=e.rule)&&"name"in r?"net.csslint."+r.name.replace(/\s/g,""):"")+'">'),o.push("<"+n+' message="'+s(e.message)+'"><![CDATA['+e.line+":"+e.col+":"+s(e.evidence)+"]]></"+n+">"),o.push("</testcase>"),i[n]+=1)}),o.unshift('<testsuite time="0" tests="'+n.length+'" skipped="0" errors="'+i.error+'" failures="'+i.failure+'" package="net.csslint" name="'+t+'">'),o.push("</testsuite>")),o.join("")}}),r.addFormatter({id:"lint-xml",name:"Lint XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><lint>'},endFormat:function(){return"</lint>"},formatResults:function(e,t,n){var o=e.messages,i=[],s=function(e){return e&&e.constructor===String?e.replace(/\"/g,"'").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""};return o.length>0&&(i.push('<file name="'+t+'">'),r.Util.forEach(o,function(e,t){e.rollup?i.push('<issue severity="'+e.type+'" reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>'):i.push('<issue line="'+e.line+'" char="'+e.col+'" severity="'+e.type+'" reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>')}),i.push("</file>")),i.join("")}}),r.addFormatter({id:"text",name:"Plain Text",startFormat:function(){return""},endFormat:function(){return""},formatResults:function(e,t,n){var o=e.messages,i="";if(n=n||{},0===o.length)return n.quiet?"":"\n\ncsslint: No errors in "+t+".";i="\n\ncsslint: There are "+o.length+" problems in "+t+".";var s=t.lastIndexOf("/"),a=t;return-1===s&&(s=t.lastIndexOf("\\")),s>-1&&(a=t.substring(s+1)),r.Util.forEach(o,function(e,t){i=i+"\n\n"+a,e.rollup?(i+="\n"+(t+1)+": "+e.type,i+="\n"+e.message):(i+="\n"+(t+1)+": "+e.type+" at line "+e.line+", col "+e.col,i+="\n"+e.message,i+="\n"+e.evidence)}),i}}),r});
//# sourceMappingURL=../sourcemaps/primitives/csslint.js.map
