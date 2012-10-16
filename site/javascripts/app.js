/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={languages:{insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);Object.prototype.toString.call(e)==="[object Object]"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent.trim();if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data));l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r){return n.stringify(t.tokenize(e,r))},tokenize:function(e,n){var r=t.Token,i=[e],s=n.rest;if(s){for(var o in s)n[o]=s[o];delete n.rest}e:for(var o in n){if(!n.hasOwnProperty(o)||!n[o])continue;var u=n[o],a=u.inside,f=!!u.lookbehind||0;u=u.pattern||u;for(var l=0;l<i.length;l++){var c=i[l];if(i.length>e.length)break e;if(c instanceof r)continue;u.lastIndex=0;var h=u.exec(c);if(h){f&&(f=h[1].length);var p=h.index-1+f,h=h[0].slice(f),d=h.length,v=p+d,m=c.slice(0,p+1),g=c.slice(v+1),y=[l,1];m&&y.push(m);var b=new r(o,a?t.tokenize(h,a):h);y.push(b);g&&y.push(g);Array.prototype.splice.apply(i,y)}}}return i},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]"){for(var r=0;r<e.length;r++)e[r]=n.stringify(e[r]);return e.join("")}var i={type:e.type,content:n.stringify(e.content),tag:"span",classes:["token",e.type],attributes:{}};i.type=="comment"&&(i.attributes.spellcheck="true");t.hooks.run("wrap",i);var s="";for(var o in i.attributes)s+=o+'="'+(i.attributes[o]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+s+">"+i.content+"</"+i.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();
Prism.languages.markup={comment:/&lt;!--[\w\W]*?--(&gt;|&gt;)/g,prolog:/&lt;\?.+?\?&gt;/,doctype:/&lt;!DOCTYPE.+?&gt;/,cdata:/&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,tag:{pattern:/&lt;\/?[\w:-]+\s*[\w\W]*?&gt;/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(('|")[\w\W]*?(\2)|[^\s>]+)/gi,inside:{punctuation:/=/g}},punctuation:/\/?&gt;/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(e){e.type==="entity"&&(e.attributes.title=e.content.replace(/&amp;/,"&"))});
Prism.languages.javascript={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0},keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,number:/\b-?(0x)?\d*\.?\d+\b/g,operator:/[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});


/* Foundation v2.2.1 http://foundation.zurb.com */
jQuery(document).ready(function ($) {
	var credentials = 'AtZVaPeWtqEJ7xglZZZ6WZJkMihxHRlweOWszXf0Oh7kf7SEQz1qT-jCDlGw9UAW';
	$('#map').bingmap({api: credentials});

	$('#map2').bingmap({
		api: credentials,
		type: "sky"
	});
	$('#map3').bingmap({
		api: credentials,
		zoom: 10,
		latitude: 48.53530208883657,
		longitude: 2.6383473134050517,
		control: true,
		disable_zoom: false,
		disable_navigate: false
	});
	$('#map4').bingmap({
		api: credentials,
		zoom: 15
	}).bingmap('newPin',{
			latitude : 48.833,
			longitude : 2.333,
			drag : true
		    });
	$('#map5').bingmap({
		api: credentials,
		latitude: 48.84402773346424,
		longitude: 2.2001610956930895,
		zoom: 10
	}).bingmap('newPin',[{
			latitude: 48.81961978106944,
			longitude: 2.2042809687399645,
			drag : true
		    },{
			latitude: 48.854871895710836,
			longitude: 2.1314965449118395,
			popup : {
				title : 'Un message',
                html : "",
                width: 130,
                height: 30,
                onShow: true
			}
		    },{
			latitude: 48.873843528626914,
			longitude: 2.2290002070212145
		    }]);
	$('#map6').bingmap({
		api: credentials,
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		disable_zoom: false,
		disable_navigate: false,
		zoom: 11
	}).bingmap('newPin',{
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		drag : true
	}).bingmap('onPin', function(o){
		Microsoft.Maps.Events.addHandler(o[0], "dragend", function(o){
		    $('#lat').html(o.entity._location.latitude);
		    $('#lng').html(o.entity._location.longitude);
		});
	});
	$('#map7').bingmap({
		api: credentials,
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		disable_zoom: false,
		disable_navigate: false,
		zoom: 12
	}).bingmap('newPin',{
		latitude: 48.873843528626914,
		longitude: 2.2290002070212145,
		drag : true
	}).bingmap('onPin', function(o){
		Microsoft.Maps.Events.addHandler(o[0], "dragend", function(o){
		    $(this).bingmap('getInfo',{
					latitude: o.entity._location.latitude,
					longitude: o.entity._location.longitude,
					callback: function(status,data){
						if(status == "success"){
							$('#adresse').html(data[0].resources[0].name);
						}
					}});
		});
	});

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
		    	$('#map8').bingmap({
						api: credentials,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						zoom: 15
					}).bingmap('newPin',{
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}).bingmap('getInfo',{
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						callback: function(status,data){
							if(status == "success"){
								$('#adresse_bing').html(data[0].resources[0].name);
							}
					}});
			$('#lat5').html(position.coords.latitude);
			$('#lng5').html(position.coords.longitude);

		});
		   
	}else{
		$('#map8').bingmap({api: credentials});
	}	


	$('#showModal2').click(function(){
		$('#myModal2').reveal();
	});
	$('#showModal3').click(function(){
		$('#myModal3').reveal();
	});
	$('#showModal4').click(function(){
		$('#myModal4').reveal();
	});
	$('#showModal5').click(function(){
		$('#myModal5').reveal();
	});
	$('#showModal6').click(function(){
		$('#myModal6').reveal();
	});
	$('#showModal7').click(function(){
		$('#myModal7').reveal();
	});
	$('#showModal8').click(function(){
		$('#myModal8').reveal();
	});
});
