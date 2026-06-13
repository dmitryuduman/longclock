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
