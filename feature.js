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

/* Library callout at the end of each article */
(function(){
  var anchor = document.querySelector('.colophon');
  if(!anchor || document.querySelector('.libcallout')) return;
  var a = document.createElement('aside');
  a.className = 'libcallout';
  a.innerHTML = '<p class="t">Off the main path</p>'
    + '<p class="s">The Library holds eight shorter essays — gold weighed fairly, the freeze, the debasement tax, money as memory, and more.</p>'
    + '<p style="margin:0"><a href="index.html#library">Browse the Library &rarr;</a></p>';
  anchor.parentNode.insertBefore(a, anchor);
})();
