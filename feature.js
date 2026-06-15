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

/* calligraphic broad-nib strokes – converts any element marked data-calli="maxWidth" into a tapered, angle-weighted filled stroke */
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
    + '<p class="s">This piece is one strand of a larger argument. The Library follows the others &ndash; what sound money really is, the objections worth taking seriously, and the people willing it into being.</p>'
    + '<p style="margin:0"><a href="index.html#library">Open the Library &rarr;</a></p>';
  anchor.parentNode.insertBefore(a, anchor);
})();

/* ── Review mode – a private annotation layer. Activate by visiting any page with #review (it then persists across the whole site until you press Exit). Normal visitors never see it. Notes live in this browser; use "Copy all notes" to hand them to Claude. ── */
(function(){
  var FLAG='tlc-review-on-v2', KEY='tlc-review-notes';
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
  function exportText(){ var by={}; Object.keys(notes).forEach(function(k){ var p=k.split('#')[0]; (by[p]=by[p]||[]).push(notes[k]); }); var out='THE LONG CLOCK – REVIEW NOTES – '+new Date().toISOString().slice(0,16).replace('T',' ')+'\n'+Object.keys(notes).length+' notes total\n'; Object.keys(by).sort().forEach(function(p){ out+='\n=== '+p+' ===\n'; by[p].forEach(function(n){ out+='\n• ['+n.snippet+']\n  '+n.note+'\n'; }); }); return out; }
  function fallback(txt){ var ta=document.createElement('textarea'); ta.value=txt; ta.style.cssText='position:fixed;left:8px;top:8px;width:92vw;height:62vh;z-index:9999'; document.body.appendChild(ta); ta.focus(); ta.select(); try{document.execCommand('copy');}catch(e){} toast('Select-all + copy this, then paste to Claude'); setTimeout(function(){ ta.remove(); }, 9000); }
  bar.querySelector('.cp').addEventListener('click', function(){ if(!Object.keys(notes).length){ toast('No notes yet'); return; } var txt=exportText(); if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(function(){ toast('All notes copied – paste them to Claude'); }, function(){ fallback(txt); }); } else fallback(txt); });
  bar.querySelector('.ex').addEventListener('click', function(){ try{ localStorage.setItem(FLAG,'0'); }catch(e){} if(location.hash) history.replaceState(null,'',location.pathname+location.search); location.reload(); });
})();

/* ── Byline date · appreciation (like) · share – appears on article pages only.
   Date: override per page with <meta name="published" content="14 June 2026">,
   otherwise the default below is used. Reading time is estimated from the body.
   Likes use a free shared counter (swap LIKE_API for your own endpoint later). ── */
(function(){
  var DEFAULT_DATE='14 June 2026';
  var LIKE_API='https://countapi.mileshilliard.com/api/v1';   /* shared, no-key counter */

  var main=document.querySelector('main');
  var deck=document.querySelector('header .deck');
  if(!main||!deck) return;                                    /* skip non-article pages */

  var page=(location.pathname.split('/').pop()||'index.html').replace(/[?#].*$/,'')||'index.html';
  function svg(p){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; }

  /* Pages that link feature.css already have these styles. Pages that don't
     (e.g. the homepage, which uses its own palette tokens) get a self-contained
     copy here, with fallback chains so colours resolve under either scheme. */
  if(!document.querySelector('link[href*="feature.css"]')){
    var AC='var(--accent, var(--gold-line, var(--gold, #8A6A1C)))';
    var AL='var(--accent-line, var(--gold-line, var(--rule, rgba(0,0,0,.18))))';
    var IS='var(--ink-soft, #5b5b5b)';
    var IK='var(--ink, #1b2330)';
    var RU='var(--rule, rgba(0,0,0,.16))';
    var BG='var(--bg, var(--paper, #fff))';
    var FM='var(--font-mono, "IBM Plex Mono", ui-monospace, monospace)';
    var FD='var(--font-display, "Fraunces", Georgia, serif)';
    var s=document.createElement('style');
    s.textContent=
     '.tlc-byline{font-family:'+FM+';font-size:.72rem;letter-spacing:.13em;text-transform:uppercase;color:'+IS+';margin:1.1rem 0 0;display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;opacity:0;transform:translateY(4px);transition:opacity .8s ease,transform .8s ease}'
    +'.tlc-byline.in{opacity:.9;transform:none}'
    +'.tlc-byline .dot{width:3px;height:3px;border-radius:50%;background:'+AC+';opacity:.85}'
    +'.tlc-byline .sep{width:14px;height:1px;background:'+RU+'}'
    +'.tlc-engage{max-width:39rem;margin:4rem auto 1rem;padding:2.6rem 1rem 0;border-top:1px solid '+RU+';text-align:center}'
    +'.tlc-engage .prompt{font-family:'+FD+';font-weight:500;font-style:italic;font-size:1.32rem;line-height:1.4;color:'+IK+';margin:0 0 1.5rem}'
    +'.tlc-like{display:inline-flex;flex-direction:column;align-items:center;gap:.55rem}'
    +'.tlc-likebtn{position:relative;width:64px;height:64px;border-radius:50%;border:1px solid '+AL+';background:transparent;color:'+IS+';cursor:pointer;display:grid;place-items:center;transition:transform .2s cubic-bezier(.34,1.56,.64,1),border-color .25s,color .25s,background .25s}'
    +'.tlc-likebtn svg{width:26px;height:26px}'
    +'.tlc-likebtn:hover{border-color:'+AC+';color:'+AC+';transform:translateY(-2px)}'
    +'.tlc-likebtn:active{transform:scale(.94)}'
    +'.tlc-likebtn.liked{background:'+AC+';border-color:'+AC+';color:'+BG+';cursor:default}'
    +'.tlc-likebtn.pop{animation:tlc-pop .42s cubic-bezier(.34,1.56,.64,1)}'
    +'@keyframes tlc-pop{0%{transform:scale(1)}45%{transform:scale(1.22)}100%{transform:scale(1)}}'
    +'.tlc-likebtn .ring{position:absolute;inset:-1px;border-radius:50%;border:1.5px solid '+AC+';opacity:0;pointer-events:none}'
    +'.tlc-likebtn.pop .ring{animation:tlc-ring .6s ease-out}'
    +'@keyframes tlc-ring{0%{opacity:.55;transform:scale(1)}100%{opacity:0;transform:scale(1.7)}}'
    +'.tlc-likemeta{font-family:'+FM+';font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:'+IS+'}'
    +'.tlc-likemeta b{color:'+IK+';font-weight:500}'
    +'.tlc-share{margin-top:2.2rem}'
    +'.tlc-share .lbl{font-family:'+FM+';font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:'+IS+';margin:0 0 .95rem}'
    +'.tlc-shrow{display:flex;justify-content:center;align-items:center;gap:.7rem;flex-wrap:wrap}'
    +'.tlc-sh{width:44px;height:44px;border-radius:50%;border:1px solid '+AL+';background:transparent;color:'+IK+';cursor:pointer;display:grid;place-items:center;transition:transform .18s,border-color .22s,color .22s,background .22s;text-decoration:none}'
    +'.tlc-sh svg{width:19px;height:19px}'
    +'.tlc-sh:hover{transform:translateY(-3px);border-color:'+AC+';color:'+AC+'}'
    +'.tlc-sh:active{transform:translateY(-1px) scale(.96)}'
    +'.tlc-sh.primary{width:auto;height:44px;padding:0 1.15rem;border-radius:22px;gap:.5rem;display:inline-flex;align-items:center;font-family:'+FM+';font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;border-color:'+AC+';color:'+AC+'}'
    +'.tlc-sh.primary:hover{background:'+AC+';color:'+BG+'}'
    +'.tlc-sh.primary svg{width:17px;height:17px}'
    +'.tlc-toast{position:fixed;left:50%;bottom:84px;transform:translateX(-50%) translateY(8px);z-index:9500;background:'+IK+';color:'+BG+';font-family:'+FM+';font-size:.72rem;letter-spacing:.04em;padding:9px 15px;border-radius:9px;opacity:0;pointer-events:none;transition:opacity .22s,transform .22s;box-shadow:0 8px 28px rgba(0,0,0,.28)}'
    +'.tlc-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}'
    +'main .key{font-weight:600;color:'+AC+'}'
    +'main .key.soft{font-weight:600;color:'+AC+'}'
    +'@media(prefers-reduced-motion:reduce){.tlc-byline,.tlc-likebtn,.tlc-sh{transition:none}.tlc-likebtn.pop{animation:none}}';
    document.head.appendChild(s);
  }

  /* ---- byline: published date + reading time ---- */
  (function(){
    var meta=document.querySelector('meta[name="published"]');
    var raw=(meta&&meta.content)||DEFAULT_DATE;
    /* Render months as words, never as numbers (DD can be confused with days).
       Accepts ISO YYYY-MM-DD (and YYYY-MM) and reformats to "D Month YYYY". */
    var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date=raw, m=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(raw);
    if(m){ var y=m[1], mo=MON[(+m[2])-1]||m[2], d=m[3]?String(+m[3]):''; date=(d?d+' ':'')+mo+' '+y; }
    var words=(main.textContent||'').trim().split(/\s+/).length;
    var mins=Math.max(1, Math.round(words/200));
    var b=document.createElement('p'); b.className='tlc-byline';
    b.innerHTML='<span class="dot"></span><span>Published '+date+'</span><span class="sep"></span><span>'+mins+' min read</span>';
    deck.parentNode.insertBefore(b, deck.nextSibling);
    requestAnimationFrame(function(){ setTimeout(function(){ b.classList.add('in'); }, 120); });
  })();

  /* ---- appreciation + share ---- */
  var wrap=document.createElement('section'); wrap.className='tlc-engage';

  var THUMB='M7 11v9M7 11l4.2-8.2a1.6 1.6 0 0 1 3 .8V8h4.8a1.8 1.8 0 0 1 1.77 2.13l-1.3 7A1.8 1.8 0 0 1 17.5 19H7M3 11h4v9H3z';
  wrap.innerHTML=
    '<p class="prompt">If this earned a few minutes of your attention, let it be known.</p>'
   +'<div class="tlc-like">'
   +'  <button class="tlc-likebtn" type="button" aria-label="Appreciate this essay"><span class="ring"></span>'+svg('<path d="'+THUMB+'"/>')+'</button>'
   +'  <span class="tlc-likemeta"><b class="ct">–</b> <span class="word">appreciations</span></span>'
   +'</div>'
   +'<div class="tlc-share"><p class="lbl">Pass it on</p><div class="tlc-shrow"></div></div>';

  var colo=document.querySelector('.colophon');
  if(colo) colo.parentNode.insertBefore(wrap, colo); else main.parentNode.insertBefore(wrap, main.nextSibling);

  /* toast helper */
  var tEl;
  function toast(m){ if(!tEl){ tEl=document.createElement('div'); tEl.className='tlc-toast'; document.body.appendChild(tEl); } tEl.textContent=m; requestAnimationFrame(function(){ tEl.classList.add('on'); }); clearTimeout(toast._t); toast._t=setTimeout(function(){ tEl.classList.remove('on'); }, 1800); }

  /* ---- likes (shared count) ---- */
  (function(){
    var btn=wrap.querySelector('.tlc-likebtn'), ctEl=wrap.querySelector('.ct'), wordEl=wrap.querySelector('.word');
    var key='longclock_tlc_v1_'+page.replace(/[^a-z0-9]+/gi,'_').toLowerCase();
    var likedKey='tlc-liked-'+page;
    var liked=false; try{ liked=localStorage.getItem(likedKey)==='1'; }catch(e){}
    function render(n){ if(n==null){ ctEl.textContent='–'; return; } ctEl.textContent=n.toLocaleString(); wordEl.textContent=(n===1?'appreciation':'appreciations'); }
    if(liked) btn.classList.add('liked');

    if(window.fetch){
      fetch(LIKE_API+'/get/'+key).then(function(r){ return r.ok?r.json():{value:0}; })
        .then(function(d){ render(parseInt(d.value,10)||0); })
        .catch(function(){ render(null); });
    } else { render(null); }

    btn.addEventListener('click', function(){
      if(btn.classList.contains('liked')) return;
      btn.classList.add('liked','pop');
      setTimeout(function(){ btn.classList.remove('pop'); }, 650);
      try{ localStorage.setItem(likedKey,'1'); }catch(e){}
      var optimistic=(parseInt((ctEl.textContent||'0').replace(/\D/g,''),10)||0)+1;
      render(optimistic);
      if(window.fetch){
        fetch(LIKE_API+'/hit/'+key).then(function(r){ return r.json(); })
          .then(function(d){ var n=parseInt(d.value,10); if(!isNaN(n)) render(n); })
          .catch(function(){ /* keep optimistic count */ });
      }
    });
  })();

  /* ---- share ---- */
  (function(){
    var row=wrap.querySelector('.tlc-shrow');
    var url=location.href.replace(/#.*$/,'');
    var title=(document.querySelector('h1')?document.querySelector('h1').textContent.trim():document.title);
    var eu=encodeURIComponent(url), et=encodeURIComponent(title), etu=encodeURIComponent(title+' – '+url);

    function iconBtn(label, inner, href){
      var a=document.createElement(href?'a':'button');
      a.className='tlc-sh'; a.setAttribute('aria-label',label); a.title=label; a.innerHTML=inner;
      if(href){ a.href=href; if(/^https?:/.test(href)){ a.target='_blank'; a.rel='noopener'; } }
      row.appendChild(a); return a;
    }

    /* native share sheet first – opens the device's own menu (iMessage, SMS,
       WhatsApp, AirDrop, Mail…) on phones and on Safari/most mobile browsers */
    if(navigator.share){
      var p=document.createElement('button'); p.className='tlc-sh primary'; p.type='button';
      p.innerHTML=svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>')+'<span>Share…</span>';
      p.addEventListener('click', function(){ navigator.share({title:title, url:url}).catch(function(){}); });
      row.appendChild(p);
    }

    /* explicit options – always present so desktop gets everything too */
    iconBtn('Copy link', svg('<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.5"/>'))
      .addEventListener('click', function(){
        if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(function(){ toast('Link copied'); }, function(){ toast(url); }); }
        else { toast(url); }
      });
    iconBtn('Message (iMessage / SMS)', svg('<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9.5 9.5 0 0 1-4-.9L3 20l1.4-4.5A8.38 8.38 0 0 1 3.5 11 8.5 8.5 0 0 1 12 2.5a8.38 8.38 0 0 1 9 9z"/>'), 'sms:?&body='+etu);
    iconBtn('WhatsApp', svg('<path d="M3 21l1.65-4.5A8 8 0 1 1 8 19.5L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/><path d="M9 9.5c0-.8.7-1.5 1.5-1.2.4.7.8 1.4.9 1.7.1.4-.4.8-.7 1"/><path d="M12.6 13.6c.3.3.8.6 1.2.6.3 0 1-.4 1.2-.9"/>'), 'https://wa.me/?text='+etu);
    iconBtn('Email', svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'), 'mailto:?subject='+et+'&body='+etu);
    iconBtn('Share on X', svg('<path d="M4 4l16 16M20 4L4 20"/>'), 'https://twitter.com/intent/tweet?text='+et+'&url='+eu);
  })();
})();

/* ── Sticky top nav – a slim, translucent bar with a grouped dropdown of every
   piece, so readers move between essays without returning to the homepage.
   Site-wide (injected here); auto-hides on scroll-down, returns on scroll-up. ── */
(function(){
  if(!document.querySelector('header, main')) return;          /* skip scratch pages */

  var INDEX=[
    { g:'The Long Clock – the core argument', items:[
      ['index.html','The Asset No Empire Can Freeze'],
      ['longclock-saylor.html',"The Steward's Wager"],
      ['longclock-incumbents.html',"The Old Guard's Dilemma"],
      ['longclock-doorways.html','Ten Thousand Doorways'],
      ['longclock-timechain.html','The Timechain'] ]},
    { g:'Featured – pillars worth reading on their own', items:[
      ['longclock-incorruptible.html','The Incorruptible'],
      ['longclock-gametheory.html','The Game Theory of Bitcoin'],
      ['longclock-asymmetry.html','Take the Zero Off the Table'],
      ['longclock-rails.html',"On Steve's Rails"],
      ['longclock-whatismoney.html','What Is Money? – the series, distilled'] ]},
    { g:'Thread one – what sound money really is', items:[
      ['longclock-memory.html','What Money Remembers'],
      ['longclock-gold.html',"Gold's Long Reign"],
      ['longclock-energy.html','The Energy Theory of Money'],
      ['longclock-satoshi.html','The Ghost in the Machine'] ]},
    { g:'Thread two – the objections worth taking seriously', items:[
      ['longclock-debasement.html','The Debasement Tax'],
      ['longclock-freeze.html','When States Freeze Money'],
      ['longclock-volatility.html','Volatility Is the Toll, Not the Trip'],
      ['longclock-century.html','The 100-Year Portfolio'] ]},
    { g:'Thread three – the endgame, and the people willing it', items:[
      ['longclock-saylor-transcript.html','Saylor, Before Bitcoin'],
      ['longclock-squeeze.html',"Why Price Falls When Everyone's Buying"],
      ['longclock-sp500.html','The Index Trap'],
      ['longclock-strc.html',"Saylor's iPhone Moment"] ]}
  ];
  var page=(location.pathname.split('/').pop()||'index.html').replace(/[?#].*$/,'')||'index.html';

  /* palette fallbacks (works on both the essays' tokens and the homepage's) */
  var AC='var(--accent, var(--gold-line, var(--gold, #8A6A1C)))';
  var IK='var(--ink, #1b2330)', IS='var(--ink-soft,#5b5b5b)', RU='var(--rule,rgba(0,0,0,.16))';
  var BG='var(--bg, var(--paper, #faf8f2))';
  var FM='var(--font-mono,"IBM Plex Mono",ui-monospace,monospace)';
  var FD='var(--font-display,"Fraunces",Georgia,serif)';
  var H='52px';

  var s=document.createElement('style');
  s.textContent=
   '.tlc-nav{position:fixed;top:0;left:0;right:0;height:'+H+';z-index:8000;display:flex;align-items:center;justify-content:space-between;'
     +'padding:0 clamp(1rem,4vw,2.2rem);background:transparent;border-bottom:1px solid transparent;'
     +'transition:transform .34s ease,background .3s ease,border-color .3s ease;-webkit-backdrop-filter:saturate(1.1) blur(0px);backdrop-filter:saturate(1.1) blur(0px)}'
  +'.tlc-nav.scrolled{background:color-mix(in srgb,'+BG+' 80%,transparent);border-bottom-color:'+RU+';-webkit-backdrop-filter:saturate(1.2) blur(10px);backdrop-filter:saturate(1.2) blur(10px)}'
  +'.tlc-nav.hidden{transform:translateY(-105%)}'
  +'.tlc-nav .wm{font-family:'+FM+';font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;color:'+IK+';text-decoration:none;display:inline-flex;align-items:center;gap:.55rem;opacity:.9}'
  +'.tlc-nav .wm:hover{opacity:1;color:'+AC+'}'
  +'.tlc-nav .wm .gem{width:7px;height:7px;transform:rotate(45deg);background:'+AC+';display:inline-block;border-radius:1px}'
  +'.tlc-nav .essays{font-family:'+FM+';font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:'+IK+';background:transparent;border:1px solid '+RU+';border-radius:20px;padding:.42rem .9rem;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;transition:border-color .2s,color .2s}'
  +'.tlc-nav .essays:hover,.tlc-nav .essays[aria-expanded="true"]{border-color:'+AC+';color:'+AC+'}'
  +'.tlc-nav .essays .cv{width:9px;height:9px;transition:transform .25s}'
  +'.tlc-nav .essays[aria-expanded="true"] .cv{transform:rotate(180deg)}'
  +'.tlc-navscrim{position:fixed;inset:0;z-index:7999;background:transparent;display:none}'
  +'.tlc-navscrim.on{display:block}'
  +'.tlc-navpanel{position:fixed;top:calc('+H+' - 6px);right:clamp(.6rem,3vw,1.6rem);z-index:8001;width:min(380px,94vw);max-height:78vh;overflow:auto;'
     +'background:color-mix(in srgb,'+BG+' 96%,#0000);border:1px solid '+RU+';border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.22);'
     +'padding:.5rem .35rem;opacity:0;transform:translateY(-8px) scale(.99);pointer-events:none;transition:opacity .2s ease,transform .2s ease;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}'
  +'.tlc-navpanel.open{opacity:1;transform:none;pointer-events:auto}'
  +'.tlc-navgrp{font-family:'+FM+';font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:'+AC+';padding:.95rem .9rem .35rem;opacity:.85}'
  +'.tlc-navlink{display:block;text-decoration:none;color:'+IK+';font-family:'+FD+';font-size:1.02rem;line-height:1.25;padding:.5rem .9rem;border-radius:9px;transition:background .15s,color .15s}'
  +'.tlc-navlink:hover{background:color-mix(in srgb,'+AC+' 12%,transparent);color:'+AC+'}'
  +'.tlc-navlink.current{color:'+AC+';position:relative}'
  +'.tlc-navlink.current:before{content:"";position:absolute;left:.25rem;top:50%;width:3px;height:1.05em;transform:translateY(-50%);background:'+AC+';border-radius:2px}'
  +'.tlc-navlink .n{font-family:'+FM+';font-size:.66rem;color:'+IS+';margin-right:.55rem}'
  +'@media(prefers-reduced-motion:reduce){.tlc-nav,.tlc-navpanel,.tlc-nav .essays .cv{transition:none}}';
  document.head.appendChild(s);
  document.body.style.paddingTop=H;

  function svgN(p,cls){ return '<svg class="'+(cls||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; }

  var nav=document.createElement('nav'); nav.className='tlc-nav'; nav.setAttribute('aria-label','Essays');
  nav.innerHTML=
    '<a class="wm" href="index.html"><span class="gem"></span>The Long Clock</a>'
   +'<button class="essays" type="button" aria-haspopup="true" aria-expanded="false">Essays'+svgN('<path d="M6 9l6 6 6-6"/>','cv')+'</button>';
  document.body.appendChild(nav);

  var scrim=document.createElement('div'); scrim.className='tlc-navscrim'; document.body.appendChild(scrim);
  var panel=document.createElement('div'); panel.className='tlc-navpanel'; panel.setAttribute('role','menu');
  var n=0, html='';
  INDEX.forEach(function(grp){
    html+='<p class="tlc-navgrp">'+grp.g+'</p>';
    grp.items.forEach(function(it){ n++;
      var cur=(it[0]===page)?' current':'';
      var num=('0'+n).slice(-2);
      html+='<a class="tlc-navlink'+cur+'" role="menuitem" href="'+it[0]+'"><span class="n">'+num+'</span>'+it[1]+'</a>';
    });
  });
  panel.innerHTML=html; document.body.appendChild(panel);

  var btn=nav.querySelector('.essays'), open=false;
  function setOpen(o){ open=o; panel.classList.toggle('open',o); scrim.classList.toggle('on',o); btn.setAttribute('aria-expanded',o?'true':'false'); }
  btn.addEventListener('click', function(e){ e.stopPropagation(); setOpen(!open); });
  scrim.addEventListener('click', function(){ setOpen(false); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&open) setOpen(false); });

  /* scrolled styling + auto-hide on scroll-down */
  var lastY=window.pageYOffset||0, ticking=false;
  function onScroll(){
    var y=window.pageYOffset||0;
    nav.classList.toggle('scrolled', y>24);
    if(!open){
      if(y>lastY && y>240) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
    }
    lastY=y; ticking=false;
  }
  window.addEventListener('scroll', function(){ if(!ticking){ window.requestAnimationFrame(onScroll); ticking=true; } }, {passive:true});
  onScroll();
})();
