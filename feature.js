/* Tag the page so feature.css can give each piece its own colour identity. */
try{ document.documentElement.setAttribute('data-page', (location.pathname.split('/').pop()||'index.html').replace(/[?#].*$/,'')||'index.html'); }catch(e){}

/* Shared scroll-reveal for The Long Clock feature essays. */
(function(){
  document.body.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    els.forEach(function(e){ e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin:'0px 0px -8% 0px', threshold:0.08 });
  els.forEach(function(e){ io.observe(e); });
  setTimeout(function(){ els.forEach(function(e){ e.classList.add('in'); }); }, 3000);
})();

/* calligraphic broad-nib strokes — converts any element marked data-calli="maxWidth" into a tapered, angle-weighted filled stroke */
(function(){
  var NS="http://www.w3.org/2000/svg";
  var pen = 40*Math.PI/180;
  document.querySelectorAll('[data-calli]').forEach(function(el){
    var L; try{ L = el.getTotalLength(); }catch(e){ return; }
    if(!L) return;
    var w = parseFloat(el.dataset.calli) || 4;
    var a0 = el.getPointAtLength(0), aL = el.getPointAtLength(L);
    var closed = el.tagName.toLowerCase() !== 'line' && Math.hypot(a0.x-aL.x, a0.y-aL.y) < 1.5;
    var N = Math.max(18, Math.round(L/4));
    var outer=[], inner=[];
    for(var i=0;i<=N;i++){
      var s=i/N*L, p=el.getPointAtLength(s);
      var pa=el.getPointAtLength(Math.max(0,s-0.7)), pb=el.getPointAtLength(Math.min(L,s+0.7));
      var ang=Math.atan2(pb.y-pa.y, pb.x-pa.x);
      var width=w*(0.30+0.70*Math.abs(Math.sin(ang-pen)));
      if(!closed){ width *= 0.45 + 0.55*Math.sin(Math.PI*(i/N)); }
      var nx=-Math.sin(ang), ny=Math.cos(ang);
      outer.push([(p.x+nx*width/2).toFixed(1),(p.y+ny*width/2).toFixed(1)]);
      inner.push([(p.x-nx*width/2).toFixed(1),(p.y-ny*width/2).toFixed(1)]);
    }
    var d='M'+outer[0][0]+','+outer[0][1];
    for(var k=1;k<outer.length;k++) d+=' L'+outer[k][0]+','+outer[k][1];
    for(var j=inner.length-1;j>=0;j--) d+=' L'+inner[j][0]+','+inner[j][1];
    d+=' Z';
    var path=document.createElementNS(NS,'path');
    path.setAttribute('d',d);
    path.setAttribute('fill', el.getAttribute('stroke') || 'currentColor');
    if(el.getAttribute('opacity')) path.setAttribute('opacity', el.getAttribute('opacity'));
    el.parentNode.replaceChild(path, el);
  });
})();

/* Library callout at the end of each article */
(function(){
  var anchor = document.querySelector('.colophon');
  if(!anchor || document.querySelector('.libcallout')) return;
  var a = document.createElement('aside');
  a.className = 'libcallout';
  a.innerHTML = '<p class="t">Follow the thread further</p>'
    + '<p class="s">This piece is one strand of a larger argument. The Library follows the others &mdash; what sound money really is, the objections worth taking seriously, and the people willing it into being.</p>'
    + '<p style="margin:0"><a href="index.html#library">Open the Library &rarr;</a></p>';
  anchor.parentNode.insertBefore(a, anchor);
})();

/* ── Review mode — a private annotation layer. Activate by visiting any page with #review (it then persists across the whole site until you press Exit). Normal visitors never see it. Notes live in this browser; use "Copy all notes" to hand them to Claude. ── */
(function(){
  var FLAG='tlc-review-on', KEY='tlc-review-notes';
  /* Review window: ON by default so it's visible on every device. Press Exit (or ?noreview) to hide on this device. */
  try{
    if(/noreview/i.test(location.search)) localStorage.setItem(FLAG,'0');
    else if(/review/i.test(location.hash) || /review/i.test(location.search)) localStorage.setItem(FLAG,'1');
    if(localStorage.getItem(FLAG)==='0') return;
  }catch(e){}
  var notes={}; try{ notes=JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){}
  function persist(){ try{ localStorage.setItem(KEY, JSON.stringify(notes)); }catch(e){} }
  var page=(location.pathname.split('/').pop()||'index.html').replace(/[?#].*$/,'')||'index.html';

  var css=document.createElement('style');
  css.textContent=
   'body.tlc-rv .tlc-rv-able{ cursor:pointer; }'
  +'body.tlc-rv .tlc-rv-able:hover{ outline:1.5px dashed rgba(192,57,43,.55); outline-offset:4px; }'
  +'.tlc-rv-has{ box-shadow:-3px 0 0 0 #C0392B; }'
  +'.tlc-rv-bar{ position:fixed; right:16px; bottom:16px; z-index:9000; display:flex; gap:8px; align-items:center; background:#1b1b1f; color:#f3efe6; font-family:ui-monospace,Menlo,monospace; font-size:12px; letter-spacing:.04em; padding:8px 10px; border-radius:10px; box-shadow:0 6px 24px rgba(0,0,0,.32); }'
  +'.tlc-rv-bar b{ color:#E8B04B; }'
  +'.tlc-rv-bar button{ font:inherit; cursor:pointer; border:1px solid #4a4a52; background:#26262c; color:#f3efe6; border-radius:7px; padding:5px 9px; }'
  +'.tlc-rv-bar button:hover{ border-color:#E8B04B; }'
  +'.tlc-rv-ed{ position:fixed; left:50%; bottom:72px; transform:translateX(-50%); z-index:9001; width:min(560px,92vw); background:#fff; color:#1b1b1f; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,.35); padding:14px 16px; display:none; }'
  +'.tlc-rv-ed.on{ display:block; }'
  +'.tlc-rv-ed .sn{ font-family:ui-monospace,Menlo,monospace; font-size:11px; color:#666; margin:0 0 8px; max-height:3.4em; overflow:auto; }'
  +'.tlc-rv-ed textarea{ width:100%; min-height:84px; font:15px/1.5 Georgia,serif; padding:9px; border:1px solid #ccc; border-radius:8px; resize:vertical; box-sizing:border-box; }'
  +'.tlc-rv-ed .row{ display:flex; gap:8px; justify-content:flex-end; margin-top:10px; }'
  +'.tlc-rv-ed button{ font:13px ui-monospace,Menlo,monospace; cursor:pointer; border-radius:8px; padding:7px 12px; border:1px solid #ccc; background:#f4f4f4; }'
  +'.tlc-rv-ed button.pri{ background:#1b1b1f; color:#fff; border-color:#1b1b1f; }'
  +'.tlc-rv-ed button.del{ color:#C0392B; }'
  +'.tlc-rv-toast{ position:fixed; left:50%; bottom:124px; transform:translateX(-50%); z-index:9002; background:#1b1b1f; color:#fff; font:12px ui-monospace,monospace; padding:8px 14px; border-radius:8px; opacity:0; transition:opacity .2s; pointer-events:none; }'
  +'.tlc-rv-toast.on{ opacity:1; }';
  document.head.appendChild(css);
  document.body.classList.add('tlc-rv');

  function snip(el){ var f=el.querySelector&&el.querySelector('.figcap'); var t=(f?f.textContent:el.textContent)||''; t=t.replace(/\s+/g,' ').trim(); if(!t){ t=(el.tagName.toLowerCase()==='svg'||(el.querySelector&&el.querySelector('svg')))?'[figure]':'['+el.tagName.toLowerCase()+']'; } return t.slice(0,100); }
  var SEL='header h1,.deck,main p,main h2,main h3,main li,blockquote,.pull,.saylq,.netfig,figure,.doors,.zoom,.eras,.corrupt,.regimes,.ledgerwrap,.signoff';
  var els=[].slice.call(document.querySelectorAll(SEL)).filter(function(el){ return !el.closest('.tlc-rv-ed,.tlc-rv-bar'); });
  els.forEach(function(el,i){
    var key=page+'#'+i; el.classList.add('tlc-rv-able');
    if(notes[key]) el.classList.add('tlc-rv-has');
    el.addEventListener('click', function(ev){ if(ev.target.closest('a,button,input,textarea,select,summary,details')) return; ev.preventDefault(); ev.stopPropagation(); edit(el,key); });
  });

  var ed=document.createElement('div'); ed.className='tlc-rv-ed';
  ed.innerHTML='<p class="sn"></p><textarea placeholder="Your note on this paragraph / image…"></textarea><div class="row"><button class="del">Delete</button><button class="cl">Close</button><button class="pri">Save</button></div>';
  document.body.appendChild(ed);
  var edSn=ed.querySelector('.sn'), edTa=ed.querySelector('textarea'), cur=null;
  function edit(el,key){ cur={el:el,key:key}; edSn.textContent=snip(el); edTa.value=(notes[key]&&notes[key].note)||''; ed.classList.add('on'); edTa.focus(); }
  ed.querySelector('.pri').addEventListener('click', function(){ if(!cur)return; var v=edTa.value.trim(); if(v){ notes[cur.key]={snippet:snip(cur.el),note:v}; cur.el.classList.add('tlc-rv-has'); } else { delete notes[cur.key]; cur.el.classList.remove('tlc-rv-has'); } persist(); count(); ed.classList.remove('on'); });
  ed.querySelector('.del').addEventListener('click', function(){ if(!cur)return; delete notes[cur.key]; cur.el.classList.remove('tlc-rv-has'); persist(); count(); ed.classList.remove('on'); });
  ed.querySelector('.cl').addEventListener('click', function(){ ed.classList.remove('on'); });

  var bar=document.createElement('div'); bar.className='tlc-rv-bar';
  bar.innerHTML='<span>REVIEW &middot; <b class="ct">0</b> notes</span><button class="cp">Copy all notes</button><button class="ex">Exit</button>';
  document.body.appendChild(bar);
  function count(){ bar.querySelector('.ct').textContent=Object.keys(notes).length; }
  count();
  function toast(m){ var t=document.createElement('div'); t.className='tlc-rv-toast'; t.textContent=m; document.body.appendChild(t); requestAnimationFrame(function(){ t.classList.add('on'); }); setTimeout(function(){ t.classList.remove('on'); setTimeout(function(){ t.remove(); },260); },1900); }
  function exportText(){ var by={}; Object.keys(notes).forEach(function(k){ var p=k.split('#')[0]; (by[p]=by[p]||[]).push(notes[k]); }); var out='THE LONG CLOCK — REVIEW NOTES — '+new Date().toISOString().slice(0,16).replace('T',' ')+'\n'+Object.keys(notes).length+' notes total\n'; Object.keys(by).sort().forEach(function(p){ out+='\n=== '+p+' ===\n'; by[p].forEach(function(n){ out+='\n• ['+n.snippet+']\n  '+n.note+'\n'; }); }); return out; }
  function fallback(txt){ var ta=document.createElement('textarea'); ta.value=txt; ta.style.cssText='position:fixed;left:8px;top:8px;width:92vw;height:62vh;z-index:9999'; document.body.appendChild(ta); ta.focus(); ta.select(); try{document.execCommand('copy');}catch(e){} toast('Select-all + copy this, then paste to Claude'); setTimeout(function(){ ta.remove(); }, 9000); }
  bar.querySelector('.cp').addEventListener('click', function(){ if(!Object.keys(notes).length){ toast('No notes yet'); return; } var txt=exportText(); if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(function(){ toast('All notes copied — paste them to Claude'); }, function(){ fallback(txt); }); } else fallback(txt); });
  bar.querySelector('.ex').addEventListener('click', function(){ try{ localStorage.setItem(FLAG,'0'); }catch(e){} if(location.hash) history.replaceState(null,'',location.pathname+location.search); location.reload(); });
})();
