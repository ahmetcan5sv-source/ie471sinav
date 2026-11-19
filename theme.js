/* Dark / light mode toggle. Follows the system theme until the visitor chooses; the choice is remembered. */
(function(){
var DARK='--bg:#161615;--card:#222221;--ink:#eeede8;--mut:#a09f98;--acc:#7da2ff;--ok:#4cc27d;--no:#ef7a6d;--line:#3a3a38;--soft:#1f2636;--c0:rgba(125,162,255,.22);--c1:rgba(76,194,125,.2);--c2:rgba(240,170,60,.22);--c3:rgba(190,120,230,.22);--c4:rgba(239,122,109,.2)';
var LIGHT='--bg:#f6f5f1;--card:#fff;--ink:#1d1d1b;--mut:#6b6a65;--acc:#2f5fd0;--ok:#1f8a4c;--no:#c0392b;--line:#dcdad2;--soft:#eef2fc;--c0:rgba(47,95,208,.16);--c1:rgba(31,138,76,.16);--c2:rgba(214,140,20,.18);--c3:rgba(142,68,173,.16);--c4:rgba(192,57,43,.14)';
var st=document.createElement('style');
st.textContent='html[data-theme="dark"]{'+DARK+';color-scheme:dark}html[data-theme="light"]{'+LIGHT+';color-scheme:light}';
document.head.appendChild(st);
var KEY='prep_theme';
function get(){try{return localStorage.getItem(KEY)||localStorage.getItem('ie471_theme')}catch(e){return null}}
function put(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function sys(){return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
var tr=(document.documentElement.lang||'').toLowerCase()==='tr';
var cur=get()||sys();
var b=document.createElement('button');
b.type='button';
b.style.cssText='position:fixed;right:12px;bottom:12px;z-index:50;padding:8px 14px;border-radius:999px;background:var(--card,#fff);color:var(--ink,#1d1d1b);border:1px solid var(--line,#dcdad2);box-shadow:0 2px 8px rgba(0,0,0,.18);font:600 14px system-ui,Segoe UI,sans-serif;cursor:pointer';
function apply(){
 document.documentElement.setAttribute('data-theme',cur);
 b.textContent=cur==='dark'?(tr?'☀ Açık mod':'☀ Light'):(tr?'🌙 Koyu mod':'🌙 Dark');
 b.setAttribute('aria-label',tr?'Koyu modu değiştir':'Toggle dark mode');
}
b.onclick=function(){cur=cur==='dark'?'light':'dark';put(cur);apply()};
document.body.appendChild(b);
apply();

/* Deep links: give every exam question an id (q1, q2, ...) so pages can be opened at set1.html#q3 */
var sm=document.createElement('style');
sm.textContent='.q{scroll-margin-top:84px}';
document.head.appendChild(sm);
document.querySelectorAll('.q').forEach(function(e){
 var t=e.querySelector('textarea');
 if(t&&!e.id)e.id=t.id.replace(/^t_/,'');
});
function target(){
 if(!location.hash)return null;
 try{return document.getElementById(decodeURIComponent(location.hash.slice(1)))}catch(e){return null}
}
var userMoved=false;
['wheel','touchstart','keydown','mousedown'].forEach(function(ev){
 window.addEventListener(ev,function(){userMoved=true},{passive:true,once:true});
});
function goHash(){
 var el=target();
 if(el&&!userMoved)el.scrollIntoView();
}
if(target()){
 var first=target();
 first.style.outline='3px solid var(--acc,#2f5fd0)';
 setTimeout(function(){first.style.outline=''},3000);
 /* retry: translators, late fonts and diagrams can shift the layout after load */
 [0,150,400,900,1800,3000].forEach(function(ms){setTimeout(goHash,ms)});
 window.addEventListener('load',goHash);
 window.addEventListener('hashchange',function(){userMoved=false;goHash()});
}
})();
