(this["webpackJsonpminesweeper-randomwalk"]=this["webpackJsonpminesweeper-randomwalk"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(3),s=n(5),r=n.n(s),i=(n(15),n(2)),o=n(6),l=n(7),c=n(1),d=n(10),m=n(9),h=(n(16),n(0));function u(e,t,n,a){var s=0,r=a,i=a;try{t>0&&(n>0&&"\ud83d\udca3"===e[t-1][n-1]&&(s+=1),"\ud83d\udca3"===e[t-1][n]&&(s+=1),n<i-1&&"\ud83d\udca3"===e[t-1][n+1]&&(s+=1)),n>0&&"\ud83d\udca3"===e[t][n-1]&&(s+=1),n<i-1&&"\ud83d\udca3"===e[t][n+1]&&(s+=1),t<r-1&&n>0&&"\ud83d\udca3"===e[t+1][n-1]&&(s+=1),"\ud83d\udca3"===e[t+1][n]&&(s+=1),n<i-1&&"\ud83d\udca3"===e[t+1][n+1]&&(s+=1)}catch(o){}finally{return s}}function g(e){return"string"==typeof e&&(!isNaN(e)&&!isNaN(parseFloat(e)))}var v=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={debug:!1,dimensions:9,maxTunnels:7,maxLength:13,revealed:!1,reset:!0,currMap:[],win:!1,lost:!1,showWin:!1,bombCounter:0,totalMoves:0,timer:0,timerStr:"00 : 00 : 00",playing:!1,timerStarted:!1},a.onChange=a.onChange.bind(Object(c.a)(a)),a.checkTiles=a.checkTiles.bind(Object(c.a)(a)),a.mapCheat=a.mapCheat.bind(Object(c.a)(a)),a.checkWin=a.checkWin.bind(Object(c.a)(a)),a.hideSHowWin=a.hideSHowWin.bind(Object(c.a)(a)),a.startTimer=a.startTimer.bind(Object(c.a)(a)),a.formatTime=a.formatTime.bind(Object(c.a)(a)),a.changePreset=a.changePreset.bind(Object(c.a)(a)),a.generateNew=a.generateNew.bind(Object(c.a)(a)),a}return Object(l.a)(n,[{key:"createArray",value:function(e,t){for(var n=[],a=0;a<t;a++){n.push([]);for(var s=0;s<t;s++)n[a].push(e)}return n}},{key:"onChange",value:function(e){"dimensions"!==e.target.name?e.target.value>0&&e.target.value<=1e3?this.setState(Object(i.a)({},e.target.name,this.validator(e.target.value))):e.target.value<1?this.setState(Object(i.a)({},e.target.name,1)):this.setState(Object(i.a)({},e.target.name,1e3)):e.target.value>2&&e.target.value<=100?this.setState(Object(i.a)({},e.target.name,this.validator(e.target.value))):e.target.value<3?this.setState(Object(i.a)({},e.target.name,3)):this.setState(Object(i.a)({},e.target.name,100))}},{key:"startTimer",value:function(){var e=this,t=setInterval((function(){e.state.timerStarted?(e.setState({timer:e.state.timer+1}),e.formatTime()):clearInterval(t)}),1e3)}},{key:"formatTime",value:function(){var e="0".concat(this.state.timer%60).slice(-2),t="".concat(Math.floor(this.state.timer/60)),n="0".concat(t%60).slice(-2),a="0".concat(Math.floor(this.state.timer/3600)).slice(-2);this.setState({timerStr:"".concat(a," : ").concat(n," : ").concat(e)})}},{key:"validator",value:function(e){var t=Number(e);return isNaN(t)?0:t}},{key:"mapCheat",value:function(e){alert("Map printed to console"),console.log("=".repeat(25)),console.log("Revealing the map..."),console.log("=".repeat(25)),console.log(this.state.currMap)}},{key:"createMap",value:function(){var e,t=this.state.dimensions,n=this.state.maxTunnels,a=this.state.maxLength,s=this.createArray(1,t),r=Math.floor(Math.random()*t),i=Math.floor(Math.random()*t),o=[[-1,0],[1,0],[0,-1],[0,1]],l=[];if(this.state.reset){for(this.state.debug&&(console.log("=".repeat(25)),console.log("CREATING A NEW MAP..."),console.log("Starting row: "+r),console.log("Starting column: "+i));n&&t&&a;){do{e=o[Math.floor(Math.random()*o.length)]}while(e[0]===-l[0]&&e[1]===-l[1]||e[0]===l[0]&&e[1]===l[1]);for(var c=Math.ceil(Math.random()*a),d=0;d<c&&!(0===r&&-1===e[0]||0===i&&-1===e[1]||r===t-1&&1===e[0]||i===t-1&&1===e[1]);)this.state.debug&&(console.log("=".repeat(25)),console.log("Current row: "+r),console.log("Current column: "+i),console.log("Direction:"),console.log(e)),Math.random()>.5?(s[r][i]=0,this.state.debug&&console.log("Created empty space")):(s[r][i]=2,this.state.debug&&console.log("Created Bomb")),r+=e[0],i+=e[1],d++;d&&(l=e,n--)}for(var m=0,h=0;h<t;h++)for(var g=0;g<t;g++)2===s[h][g]?(s[h][g]="\ud83d\udca3",m++):s[h][g]="#";for(h=0;h<t;h++)for(g=0;g<t;g++)"\ud83d\udca3"!==s[h][g]&&(s[h][g]=u(s,h,g,t));this.state.debug&&(console.log("=".repeat(25)),console.log("MAP:"),console.log(s),console.log("=".repeat(25)),console.log("BOMBS: "+m),console.log("=".repeat(25))),this.setState({currMap:s,reset:!1,win:!1,lose:!1,showWin:!1,bombCounter:m,totalMoves:0,timer:0,timerStr:"00 : 00 : 00",playing:!1,timerStarted:!1})}else s=this.state.currMap;return s}},{key:"checkForNum",value:function(e,t){e=parseInt(e),t=parseInt(t);var n=document.getElementById("inner-"+(e-1)+"-"+t),a=document.getElementById(e-1+"-"+t),s=document.getElementById("inner-"+(e-1)+"-"+(t-1)),r=document.getElementById(e-1+"-"+(t-1)),i=document.getElementById("inner-"+(e-1)+"-"+(t+1)),o=document.getElementById(e-1+"-"+(t+1)),l=document.getElementById("inner-"+(e+1)+"-"+t),c=document.getElementById(e+1+"-"+t),d=document.getElementById("inner-"+(e+1)+"-"+(t-1)),m=document.getElementById(e+1+"-"+(t-1)),h=document.getElementById("inner-"+(e+1)+"-"+(t+1)),u=document.getElementById(e+1+"-"+(t+1)),v=document.getElementById("inner-"+e+"-"+(t-1)),b=document.getElementById(e+"-"+(t-1)),j=document.getElementById("inner-"+e+"-"+(t+1)),y=document.getElementById(e+"-"+(t+1));n&&g(n.innerHTML)&&"revealed"!==n.className&&(n.className="revealed",a.style.backgroundColor="white"),s&&g(s.innerHTML)&&"revealed"!==s.className&&(s.className="revealed",r.style.backgroundColor="white"),i&&g(i.innerHTML)&&"revealed"!==i.className&&(i.className="revealed",o.style.backgroundColor="white"),l&&g(l.innerHTML)&&"revealed"!==l.className&&(l.className="revealed",c.style.backgroundColor="white"),d&&g(d.innerHTML)&&"revealed"!==d.className&&(d.className="revealed",m.style.backgroundColor="white"),h&&g(h.innerHTML)&&"revealed"!==h.className&&(h.className="revealed",u.style.backgroundColor="white"),v&&g(v.innerHTML)&&"revealed"!==v.className&&(v.className="revealed",b.style.backgroundColor="white"),j&&g(j.innerHTML)&&"revealed"!==j.className&&(j.className="revealed",y.style.backgroundColor="white")}},{key:"revealSurroundings",value:function(e,t,n){t=parseInt(t),n=parseInt(n);var a=document.getElementById("inner-"+(t-1)+"-"+n),s=document.getElementById(t-1+"-"+n);a&&"\ud83d\udca3"!==a.innerHTML&&""===a.innerHTML&&"revealed"!==a.className&&(a.className="revealed","white"!==s.style.backgroundColor&&(s.style.backgroundColor="white",this.checkForNum(t-1,n),this.revealSurroundings(e,t-1,n)));var r=document.getElementById("inner-"+(t+1)+"-"+n),i=document.getElementById(t+1+"-"+n);r&&"\ud83d\udca3"!==r.innerHTML&&""===r.innerHTML&&"revealed"!==r.className&&(r.className="revealed","white"!==i.style.backgroundColor&&(i.style.backgroundColor="white",this.checkForNum(t+1,n),this.revealSurroundings(e,t+1,n)));var o=document.getElementById("inner-"+t+"-"+(n-1)),l=document.getElementById(t+"-"+(n-1));o&&"\ud83d\udca3"!==o.innerHTML&&""===o.innerHTML&&"revealed"!==o.className&&(o.className="revealed","white"!==l.style.backgroundColor&&(l.style.backgroundColor="white",this.checkForNum(t,n-1),this.revealSurroundings(e,t,n-1)));var c=document.getElementById("inner-"+t+"-"+(n+1)),d=document.getElementById(t+"-"+(n+1));c&&"\ud83d\udca3"!==c.innerHTML&&""===c.innerHTML&&"revealed"!==c.className&&(c.className="revealed","white"!==d.style.backgroundColor&&(d.style.backgroundColor="white",this.checkForNum(t,n+1),this.revealSurroundings(e,t,n+1)))}},{key:"revealAll",value:function(){for(var e=0;e<this.state.dimensions;e++)for(var t=0;t<this.state.dimensions;t++)try{var n=document.getElementById(e+"-"+t);"\ud83d\udca3"!==document.getElementById("inner-"+e+"-"+t).innerHTML&&(n.style.backgroundColor="white")}catch(a){}}},{key:"resetTiles",value:function(){for(var e=0;e<this.state.dimensions;e++)for(var t=0;t<this.state.dimensions;t++)try{var n=document.getElementById(e+"-"+t),a=document.getElementById("inner-"+e+"-"+t);n.style.border="",n.style.backgroundColor="",a.className="hidden"}catch(s){}}},{key:"generateNew",value:function(){this.setState({revealed:!1,reset:!0,map:this.createMap(),win:!1,lost:!1}),this.resetTiles()}},{key:"changePreset",value:function(e){var t=e.target.value;"Easy"===t?this.setState({dimensions:9,maxTunnels:7,maxLength:13}):"Medium"===t?this.setState({dimensions:16,maxTunnels:20,maxLength:60}):"Hard"===t?this.setState({dimensions:22,maxTunnels:45,maxLength:80}):"Very Hard"===t&&this.setState({dimensions:28,maxTunnels:60,maxLength:110})}},{key:"checkWin",value:function(){for(var e=!0,t=0;t<this.state.dimensions;t++)for(var n=0;n<this.state.dimensions;n++)try{var a=document.getElementById("inner-"+t+"-"+n);"\ud83d\udca3"!==a.innerHTML&&"hidden"===a.className&&(e=!1)}catch(s){}e?this.setState({win:!0,showWin:!0,revealed:!0,timerStarted:!1}):this.setState({win:!1})}},{key:"hideSHowWin",value:function(){this.setState({showWin:!1})}},{key:"checkTiles",value:function(e){if(this.state.win)window.confirm("You have won the game! Would you like to reset?")&&(this.setState({revealed:!1,map:this.createMap(),reset:!0,win:!1}),this.resetTiles());else if(this.state.lost)window.confirm("You have lost the game! Would you like to reset?")&&(this.setState({revealed:!1,map:this.createMap(),reset:!0,lost:!1}),this.resetTiles());else if(this.state.timerStarted||(this.setState({timerStarted:!0}),this.startTimer()),this.state.playing||this.setState({playing:!0}),!1===this.state.win)if("mines"===e.target.getAttribute("data-tiletype"))alert("You step on a mine. You lost!"),this.revealAll(),this.setState({revealed:!0,lost:!0,timerStarted:!1});else{var t=document.getElementById("inner-"+e.target.id);if(null!==t&&"revealed"!==t.className){t.className="revealed";var n=document.getElementById(e.target.id),a=e.target.id.split("-")[0],s=e.target.id.split("-")[1];n.style.backgroundColor="white",""===t.innerHTML&&this.checkForNum(a,s),this.revealSurroundings(this.state.currMap,a,s);var r=this.state.totalMoves;r++,this.setState({totalMoves:r}),this.forceUpdate(),this.checkWin()}}}},{key:"render",value:function(){for(var e=this,t=this.createMap(),n=document.getElementsByTagName("iframe"),a=0;a<n.length;a++)n[a].remove();return Object(h.jsxs)("div",{className:"container",children:[Object(h.jsxs)("div",{className:"form-group row text-center",children:[Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"dimensions"}),Object(h.jsx)("input",{className:"form-control",name:"dimensions",type:"number",min:"1",max:"1000",value:this.state.dimensions,onChange:this.onChange})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"maxTunnels"}),Object(h.jsx)("input",{className:"form-control",name:"maxTunnels",type:"number",min:"1",max:"1000",value:this.state.maxTunnels,onChange:this.onChange})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"maxLength"}),Object(h.jsx)("input",{className:"form-control",name:"maxLength",type:"number",min:"1",max:"1000",value:this.state.maxLength,onChange:this.onChange})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Preset"}),Object(h.jsxs)("select",{className:"form-control",name:"preset",onChange:this.changePreset,children:[Object(h.jsx)("option",{value:"Easy",children:"Easy (9x9)"}),Object(h.jsx)("option",{value:"Medium",children:"Medium (16x16)"}),Object(h.jsx)("option",{value:"Hard",children:"Hard (22x22)"}),Object(h.jsx)("option",{value:"Very Hard",children:"Very Hard (28x28)"})]})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Generate"}),Object(h.jsx)("input",{className:"form-control",type:"button",onClick:this.generateNew,value:"Regenerate"})]})]}),Object(h.jsx)("table",{className:"grid",children:Object(h.jsx)("thead",{children:t.map((function(t,n){return Object(h.jsx)("tr",{children:t.map((function(t,a){return Object(h.jsx)("td",{className:e.state.revealed?"cell-reveal":"cell-hidden",id:n+"-"+a,"data-tiletype":"\ud83d\udca3"===t?"mines":"notmines",onClick:e.checkTiles,children:Object(h.jsx)("span",{id:"inner-"+n+"-"+a,className:e.state.revealed?"revealed":"hidden","data-tiletype":"\ud83d\udca3"===t?"mines":"notmines",children:"\ud83d\udca3"===t?"\ud83d\udca3":0===t?"":t})},a)}))},n)}))})}),Object(h.jsxs)("div",{className:"form-group row text-center",children:[Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Status"}),Object(h.jsx)("input",{className:"form-control default-cursor",type:"button",value:this.state.playing?this.state.lost?"Lost":this.state.win?"Win":"Playing":"-"})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Bomb"}),Object(h.jsx)("input",{className:"form-control default-cursor",type:"button",value:this.state.bombCounter})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Moves"}),Object(h.jsx)("input",{className:"form-control default-cursor",type:"button",value:this.state.totalMoves})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Time"}),Object(h.jsx)("input",{className:"form-control default-cursor",type:"button",value:this.state.timerStr})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Cheat"}),Object(h.jsx)("input",{className:"form-control",name:"cheat",type:"button",onClick:this.mapCheat,value:"Show"})]}),Object(h.jsxs)("div",{className:"inline",children:[Object(h.jsx)("label",{children:"Sourcecode"}),Object(h.jsx)("input",{className:"form-control",name:"sourcecode",type:"button",onClick:function(){window.open("https://github.com/Dadangdut33/minesweeper-randomwalk","_blank")},value:"Github"})]})]}),Object(h.jsx)("div",{className:this.state.showWin?"block":"hidden",id:"win-popup",children:Object(h.jsx)("div",{className:"popup",children:Object(h.jsxs)("div",{className:"popup-content",children:[Object(h.jsx)("h2",{children:"Congratulations! You Won the game!"}),Object(h.jsx)("input",{className:"form-control",type:"button",onClick:this.hideSHowWin,value:"Okay"})]})})})]})}}]),n}(a.Component),b=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function j(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(Object(h.jsx)(v,{}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/minesweeper-randomwalk",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/minesweeper-randomwalk","/service-worker.js");b?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):j(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):j(e)}))}}()}},[[18,1,2]]]);
//# sourceMappingURL=main.ea953e08.chunk.js.map