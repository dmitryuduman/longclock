/* The Long Clock — shared content + interactivity for variants A / B / C */
(function(global){
  "use strict";

  // ---------- chapter content (identical across variants) ----------
  var chapters = [
    {
      id:"noise", num:"I.", eyebrow:"The hinge",
      title:"Step back from the noise",
      blurb:"Why the most transformative moment in centuries is invisible to anyone watching the quarter.",
      body:
        '<p class="lead">You are alive at the hinge. Humans, machines, money, and memory are all going digital at once – the largest reorganization of value since the printing press. And the headlines are far too small to show it. <b>So don\'t ask what Bitcoin is worth this quarter. Ask which clock you\'re using.</b></p>'+
        '<div class="lvl-explore">'+
          '<p>The trap is that the noise is loud and the signal is slow. Quarterly prices, conference theatrics, the daily outrage – all of it runs on a timescale where nothing important about money is ever visible. Regimes of money turn over across generations, not news cycles.</p>'+
          '<p>And the people most fluent in the present order are, for that very reason, the ones who keep missing its end. The British establishment could not picture sterling dethroned. The monetary authorities of the 1960s treated the gold peg as eternal – until Nixon ended it overnight in 1971.</p>'+
        '</div>'+
        '<div class="lvl-deep">'+
          '<p>What makes this moment different from an ordinary regime change is that three transformations are arriving together: the digitization of everything, the rise of machines that transact, and a multipolar scramble for reserves that cannot be frozen. Each alone would be historic. Braided together, they describe an inflection most people will only recognize in hindsight.</p>'+
          '<p>The decisive vote on what becomes the world\'s neutral reserve will not be cast by today\'s central bankers. It will be cast by people who are children now, and by those not yet born – who will know money only as figures on a screen. To them "intangible" will not be a flaw; it will simply be what money is, and as far as they can tell always was. Gold will be the thing that needs explaining.</p>'+
        '</div>'+
        '<p class="morehint">Turn the dial up for the reasoning, or all the way for the long view.</p>'+
        '<div class="box" data-int="timedial">'+
          '<div class="blab"><span>Which clock are you using?</span><span class="val" id="thorizon">10 years</span></div>'+
          '<input type="range" min="0" max="3" step="1" value="0" id="tslider" aria-label="Time horizon">'+
          '<div class="ticks">'+
            '<span class="tick on" data-i="0">10y</span><span class="tick" data-i="1">100y</span>'+
            '<span class="tick" data-i="2">1,000y</span><span class="tick" data-i="3">10,000y</span>'+
          '</div>'+
          '<p class="tout" id="tout"></p>'+
        '</div>'
    },
    {
      id:"regimes", num:"II.", eyebrow:"The historian\'s own logic",
      title:"Reserve money is a regime, and regimes end",
      blurb:"The argument you already accept about empires and currencies, simply carried forward.",
      body:
        '<p class="lead">Reserve currency feels permanent to the people living under it, and it never is. The florin, the guilder, sterling, the dollar – each lasted a few generations, each felt eternal, each ended. <b>You already believe we\'re inside one of those transitions.</b></p>'+
        '<div class="lvl-explore">'+
          '<p>The useful question is never whether the dollar is strong today – it plainly is. It is what the issuing power reaches for once <em>it</em> stops trusting the assets in its own vault. And here is the part almost no one outside the field has clocked: the current administration\'s own economists now describe reserve status as a burden to manage down, not a crown to defend. When the hegemon\'s own house calls the crown a curse, that is the signal – not a Bitcoin conference.</p>'+
        '</div>'+
        '<div class="lvl-deep">'+
          '<p>Money does two jobs: it is how the world <em>pays</em> and how the world <em>saves</em>. The manoeuvre now underway is to keep the first and quietly let go of the second. The dollar stays the language of payments – entrenched even deeper by dollar-pegged stablecoins. But the savings layer, the part that forces overvaluation and deficits, is allowed to drift toward a neutral asset no single state issues, debases, or controls.</p>'+
        '</div>'+
        '<p class="pull">Keep the dollar important.<br><span class="gold">Stop needing it to be the world\'s vault.</span></p>'
    },
    {
      id:"gold", num:"III.", eyebrow:"Score it yourself",
      title:"The gold argument, with the weaknesses removed",
      blurb:"An interactive ledger: weigh what a reserve must do, and watch the three candidates sort themselves.",
      body:
        '<p class="lead">Your strongest objection – Bitcoin is intangible – is the wrong objection. Reserves were never about tangibility; China\'s pile is a database row, and the gold in London is a line in a custody ledger no one will move. <b>So weigh what a treasurer actually cares about, and see who passes.</b></p>'+
        '<div class="box scorer" data-int="scorer">'+
          '<div class="blab"><span>Tick what a reserve must do</span><span class="val" id="scsel">6 of 6</span></div>'+
          '<div class="props" id="scprops"></div>'+
          '<div class="assets" id="scassets"></div>'+
          '<p class="scorenote" id="scnote"></p>'+
        '</div>'+
        '<div class="lvl-explore">'+
          '<p>The dollar fails the two columns that now matter most to half the planet: its issuer can debase it, and its issuer can freeze it. Gold passes most – which is exactly why central banks are buying it in record volume. And everyone knows the date the buying began: 2022, when roughly three hundred billion dollars of Russia\'s reserves were frozen with administrative orders. Every treasurer drew the same lesson.</p>'+
        '</div>'+
        '<div class="lvl-deep">'+
          '<p>Bitcoin is the same answer as gold, carried further. Its scarcity is enforced by physics: to add to its ledger you must spend real energy on a worldwide race, so falsifying its history would cost more than it could ever steal. Its inventor did not call it a blockchain – in the original code the word was <em>time chain</em>: a single, ordered, tamper-evident record of <em>when</em>, a clock the whole world keeps and no one can wind back.</p>'+
          '<p>You can copy the code in an afternoon. You cannot copy the years. A rival could fork it before lunch, but it would launch sixteen years behind on the one input no one can manufacture, rush, or print: time that has genuinely elapsed under proof of work. That, not any feature, is the moat – and it is why even a capable state cannot mint a superior coin and seize the role.</p>'+
        '</div>'
    },
    {
      id:"vehicle", num:"IV.", eyebrow:"Changing the world, on purpose",
      title:"Borrowing the melting money to buy the kind that lasts",
      blurb:"Set the technicalities aside: the almost-moral idea of borrowing money built to melt, to own money that can't be debased.",
      body:
        '<p class="lead">You\'ve heard about MSTR and Saylor for years and found the mechanics exhausting – fair. Set every technicality aside. The idea underneath is simple, and nearly moral: when the money itself is built to lose value, the rational move is to borrow that melting money and turn it into money no one can debase. <b>One company made that single conviction its entire reason to exist.</b></p>'+
        '<div class="box" data-int="melt">'+
          '<div class="blab"><span>If money loses this much each year&hellip;</span><span class="val" id="meltrate">7%</span></div>'+
          '<input type="range" min="1" max="15" step="1" value="7" id="meltslider" aria-label="Annual debasement rate">'+
          '<div class="meltrow"><span class="meltlabel">$100,000 of cash savings, 20 years on</span><span class="meltval" id="meltout">$25,700</span></div>'+
          '<div class="meltbar"><div class="meltfill" id="meltbar"></div></div>'+
          '<p class="tout" id="meltnote"></p>'+
        '</div>'+
        '<div class="lvl-explore">'+
          '<p>Fiat money is designed to inflate – quietly, every year, savers are taxed by it. That cuts both ways: a debt owed in a melting currency also gets lighter every year. So borrowing it to hold a fixed-supply asset is not a casino bet; it is a refusal to keep a life\'s work in the one thing engineered to shrink. Do that at the scale of a public company, and you have built a vehicle whose whole purpose is to move value out of money that decays and into money that does not.</p>'+
        '</div>'+
        '<div class="lvl-deep">'+
          '<p>Strip it to the conviction and it stops being a finance story and becomes a moral one: that sound, un-debasable money is a public good, and a world that cannot quietly inflate away people\'s savings is a more honest one. That is the version worth bringing to a skeptic – not the instruments, but the belief beneath them.</p>'+
          '<div class="more-door">'+
            '<p class="t">The plumbing is real – and optional.</p>'+
            '<p class="s">Exactly how the borrowing is structured, and where it can break, is a chapter of its own. It sits downstream of the conviction. You do not need it to understand the bet – come back for it only when you\'re curious.</p>'+
          '</div>'+
        '</div>'
    }
  ];

  function flywheelSVG(){
    return '<svg class="fly" viewBox="0 0 600 360" role="img" aria-label="The accretion flywheel">'+
      '<defs><marker id="ga" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M2 1L8 5L2 9" fill="none" stroke="#B8923C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>'+
      '<circle cx="300" cy="186" r="118" fill="none" stroke="#D8C99A" stroke-width="1" stroke-dasharray="2 6"/>'+
      '<path d="M 360 94 A 118 118 0 0 1 396 246" fill="none" stroke="#B8923C" stroke-width="1.5" marker-end="url(#ga)"/>'+
      '<path d="M 372 276 A 118 118 0 0 1 204 276" fill="none" stroke="#B8923C" stroke-width="1.5" marker-end="url(#ga)"/>'+
      '<path d="M 204 246 A 118 118 0 0 1 240 94" fill="none" stroke="#B8923C" stroke-width="1.5" marker-end="url(#ga)"/>'+
      '<path d="M 268 78 A 118 118 0 0 1 332 78" fill="none" stroke="#B8923C" stroke-width="1.5" marker-end="url(#ga)"/>'+
      '<rect x="216" y="40" width="168" height="46" rx="6" fill="#FFFFFF" stroke="rgba(27,35,48,0.16)"/>'+
      '<text x="300" y="61" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="#1B2330">Capital markets</text>'+
      '<text x="300" y="78" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" fill="#6A6F78">debt &amp; equity raised</text>'+
      '<rect x="402" y="163" width="184" height="46" rx="6" fill="#FFFFFF" stroke="rgba(27,35,48,0.16)"/>'+
      '<text x="494" y="184" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="#1B2330">Financing</text>'+
      '<text x="494" y="201" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" fill="#6A6F78">converts, equity, preferreds</text>'+
      '<rect x="216" y="286" width="168" height="46" rx="6" fill="#FFFFFF" stroke="#D88A2A" stroke-width="1.4"/>'+
      '<text x="300" y="307" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#B5650A">Bitcoin treasury</text>'+
      '<text x="300" y="324" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" fill="#A8731F">acquire &amp; hold</text>'+
      '<rect x="14" y="163" width="178" height="46" rx="6" fill="#FFFFFF" stroke="rgba(27,35,48,0.16)"/>'+
      '<text x="103" y="184" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="500" fill="#1B2330">Price premium</text>'+
      '<text x="103" y="201" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" fill="#6A6F78">trades above bitcoin held</text>'+
      '<text x="300" y="180" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" letter-spacing="1.6" fill="#8A8F98">BITCOIN PER SHARE</text>'+
      '<text id="flyhub" x="300" y="205" text-anchor="middle" font-family="Inter,sans-serif" font-size="19" font-weight="600" fill="#2E7D5B">&#8593; rising</text>'+
    '</svg>';
  }

  // ---------- renderers ----------
  function chapterHTML(c){
    return '<section class="chapter" id="'+c.id+'">'+
      '<div class="cmark"><span class="cnum">'+c.num+'</span><p class="ceyebrow">'+c.eyebrow+'</p></div>'+
      '<h2>'+c.title+'</h2>'+ c.body +'</section>';
  }
  function closeHTML(){
    return '<section class="close" id="wager">'+
      '<div class="cmark"><span class="cnum">V.</span><p class="ceyebrow">The wager</p></div>'+
      '<h2 style="font-family:Fraunces,serif;font-weight:600;">You needn\'t own a coin. Just don\'t misread the board.</h2>'+
      '<p class="lead">You do not have to buy a single coin, or even believe it wins. The wager is smaller and harder to wave away: that what replaces dollar dominance is now being decided at the level of state strategy – and to file it under "internet money" is to miss one of the live moves on the very board you spent a lifetime learning to read.</p>'+
      '<p class="signoff">Judge it as reserve power, on the long clock, before you set it down – and don\'t mistake a thing built from energy and time for a thing made of nothing.</p>'+
      '<p class="foot"><b>On the figures and the framing.</b> Reserve, gold, and Bitcoin-holding figures reflect official-sector reporting through early-to-mid 2026; the interactive numbers here are illustrative. The argument does not depend on the third decimal place.</p>'+
    '</section>';
  }

  function renderCore(container, opts){
    opts = opts || {};
    var html = chapters.map(chapterHTML).join('') + closeHTML();
    container.innerHTML = html;
    initInteractions(container);
    if(opts.rail) buildRail(opts.rail);
  }

  function renderHubCards(container){
    var cards = '';
    cards += '<a class="chap parchcard" href="the-asset-no-empire-can-freeze.html">'+
      '<span class="ci">Prologue · the essay</span><h3>The asset no empire can freeze</h3>'+
      '<p>The reserve-power case, written for the reader who knows geopolitics cold and finds Bitcoin unconvincing.</p></a>';
    chapters.forEach(function(c){
      cards += '<a class="chap" href="longclock-a.html#'+c.id+'">'+
        '<span class="ci">Chapter '+c.num+'</span><h3>'+c.title+'</h3><p>'+c.blurb+'</p></a>';
    });
    cards += '<div class="chap soon"><span class="ci">Coming next</span><h3>Bitcoin, up close</h3><p>Proof of work, the time chain, and self-custody – the asset on its own terms.</p><span class="tag">In progress</span></div>';
    cards += '<div class="chap soon"><span class="ci">For the curious</span><h3>The plumbing, when you want it</h3><p>How the bet is actually built – the credit instruments and where they can break. Optional; skip until you\'re curious.</p><span class="tag">In progress</span></div>';
    container.innerHTML = cards;
  }

  // ---------- interactions ----------
  function initInteractions(root){
    initDepthDial();
    initTimeDial(root);
    initScorer(root);
    initMelt(root);
    initRailSpy();
  }

  function initDepthDial(){
    var dial = document.querySelector('.dial');
    if(!dial) return;
    var target = document.querySelector('[data-depth-target]') || document.body;
    dial.addEventListener('click', function(e){
      var b = e.target.closest('button'); if(!b) return;
      dial.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on');
      target.setAttribute('data-mode', b.getAttribute('data-mode'));
    });
  }

  function initTimeDial(root){
    var slider = root.querySelector('#tslider'); if(!slider) return;
    var horizons = [
      {k:"10 years", t:"<b>Volatility and headlines.</b> Gold looks settled; Bitcoin looks wild. On this clock the skeptic is right – and it is the only clock the noise ever shows you."},
      {k:"100 years", t:"<b>A full monetary regime turns over.</b> The florin, the guilder, sterling, the dollar – each felt eternal. The question becomes which form of scarcity a digital world standardized on."},
      {k:"1,000 years", t:"<b>Civilisational time.</b> Both assets are old. But only one was designed for a world run partly by machines, and only one crosses a closing border inside a memorized phrase."},
      {k:"10,000 years", t:"<b>The clock gold is measured by.</b> Gold\'s entire case rests on a five-thousand-year record. Very well – then weigh its rival on the same clock, not on this quarter\'s chart."}
    ];
    var tout = root.querySelector('#tout'), thor = root.querySelector('#thorizon');
    var ticks = root.querySelectorAll('.tick');
    function set(i){
      thor.textContent = horizons[i].k; tout.innerHTML = horizons[i].t;
      ticks.forEach(function(tk){ tk.classList.toggle('on', +tk.getAttribute('data-i')===i); });
    }
    slider.addEventListener('input', function(){ set(+slider.value); });
    ticks.forEach(function(tk){ tk.addEventListener('click', function(){ var i=+tk.getAttribute('data-i'); slider.value=i; set(i); }); });
    set(0);
  }

  function initScorer(root){
    var host = root.querySelector('#scprops'); if(!host) return;
    var props = [
      {k:"Fixed, un-expandable supply", d:0, g:1, b:2},
      {k:"Safe from debasement",        d:0, g:2, b:2},
      {k:"Safe from seizure & sanctions", d:0, g:1, b:2},
      {k:"Moves across a hostile border", d:0, g:0, b:2},
      {k:"No one\'s liability",          d:0, g:2, b:2},
      {k:"Carries no flag",             d:0, g:2, b:2}
    ];
    var state = props.map(function(){ return true; });
    host.innerHTML = props.map(function(p,i){
      return '<div class="prop on" data-i="'+i+'"><span class="chk">&#10003;</span><span class="pn">'+p.k+'</span></div>';
    }).join('');
    var assetHost = root.querySelector('#scassets');
    var assetDefs = [{key:"d",n:"Dollar"},{key:"g",n:"Gold"},{key:"b",n:"Bitcoin"}];
    assetHost.innerHTML = assetDefs.map(function(a){
      return '<div class="asset" data-a="'+a.key+'"><div class="an">'+a.n+'</div><div class="asc">0</div><div class="meter"><div class="fill"></div></div></div>';
    }).join('');
    var sel = root.querySelector('#scsel'), note = root.querySelector('#scnote');

    function recompute(){
      var checked = []; props.forEach(function(p,i){ if(state[i]) checked.push(i); });
      sel.textContent = checked.length + " of " + props.length;
      var maxScore = checked.length * 2;
      var totals = {d:0,g:0,b:0};
      checked.forEach(function(i){ totals.d+=props[i].d; totals.g+=props[i].g; totals.b+=props[i].b; });
      var best = Math.max(totals.d, totals.g, totals.b);
      assetDefs.forEach(function(a){
        var el = assetHost.querySelector('[data-a="'+a.key+'"]');
        var v = totals[a.key];
        el.querySelector('.asc').textContent = checked.length ? v : 0;
        el.querySelector('.fill').style.width = maxScore ? (v/maxScore*100)+'%' : '0%';
        el.classList.toggle('win', checked.length>0 && v===best && best>0);
      });
      note.innerHTML = scoreNote(totals, state, props);
    }

    function scoreNote(t, st, props){
      var checked = st.filter(Boolean).length;
      if(checked===0) return "Choose what a reserve actually has to do. The three candidates will sort themselves.";
      var seize = st[2], border = st[3], supply = st[0];
      if(t.d>=t.g && t.d>=t.b) return "Care only about liquidity and ubiquity, and the incumbent still wins. Notice what you had to ignore to get there.";
      if((seize||border||supply) && t.b>t.d){
        if(t.b>t.g) return "The moment seizure, scarcity, or cross-border settlement matters, the dollar drops away and Bitcoin edges past even gold – the same virtues, without the bullion\'s defects. <b>That shift is the entire argument.</b>";
        return "With these priorities, gold and Bitcoin both leave the dollar behind. They are the same answer – Bitcoin is gold\'s case with the weaknesses removed.";
      }
      return "Gold and Bitcoin track each other closely – which is the point. One is the other\'s argument, updated for a world where reserves are frozen by memo.";
    }

    host.addEventListener('click', function(e){
      var row = e.target.closest('.prop'); if(!row) return;
      var i = +row.getAttribute('data-i');
      state[i] = !state[i];
      row.classList.toggle('on', state[i]); row.classList.toggle('off', !state[i]);
      recompute();
    });
    recompute();
  }

  function initMelt(root){
    var s = root.querySelector('#meltslider'); if(!s) return;
    var rate = root.querySelector('#meltrate'), out = root.querySelector('#meltout');
    var bar = root.querySelector('#meltbar'), note = root.querySelector('#meltnote');
    function fmt(n){ return '$'+Math.round(n).toLocaleString('en-US'); }
    function set(r){
      rate.textContent = r+'%';
      var real = 100000 * Math.pow(1 - r/100, 20);
      out.textContent = fmt(real);
      bar.style.width = Math.max(2, real/100000*100) + '%';
      var lead = r<=3 ? 'Even mild debasement compounds into a slow, steady tax on everyone who saves in cash.'
               : r>=10 ? 'At rates like this, holding cash is a near-guaranteed loss of purchasing power – the melting is the whole point.'
               : 'A few percent a year quietly halves a saver\'s purchasing power within a working lifetime.';
      note.innerHTML = lead + ' <b>Borrow the melting money, hold the asset that can\'t be inflated – and the bet starts to look rational, not reckless.</b>';
    }
    s.addEventListener('input', function(){ set(+s.value); });
    set(+s.value);
  }

  function buildRail(railEl){
    var items = chapters.map(function(c){
      return '<a href="#'+c.id+'" data-id="'+c.id+'"><span class="bar"></span>'+c.num+'</a>';
    }).join('') + '<a href="#wager" data-id="wager"><span class="bar"></span>V.</a>';
    railEl.innerHTML = items;
  }

  function initRailSpy(){
    var rail = document.querySelector('.rail'); if(!rail || !('IntersectionObserver' in window)) return;
    var links = {};
    rail.querySelectorAll('a').forEach(function(a){ links[a.getAttribute('data-id')] = a; });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          Object.keys(links).forEach(function(k){ links[k].classList.remove('active'); });
          var l = links[en.target.id]; if(l) l.classList.add('active');
        }
      });
    }, {rootMargin:"-40% 0px -55% 0px"});
    document.querySelectorAll('.chapter, .close').forEach(function(s){ io.observe(s); });
  }

  // ---------- public API ----------
  global.LongClock = {
    renderCore: renderCore,
    renderHubCards: renderHubCards,
    chapters: chapters
  };
})(window);
