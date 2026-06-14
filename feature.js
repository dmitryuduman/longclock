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
