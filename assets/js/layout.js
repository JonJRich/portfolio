/* Motion for the site's layout (Zine: the Text layout plus print effects).

   <html data-layout="text" data-zine> is set in _layouts/default.html. This file
   runs the layout's motion:

     headings   words rise out of a blur, one after another
                (the homepage title is two inks: the name, then the line)
     labels     section labels are set a letter at a time
     numbers    years, counts and reading times count up
     blocks     everything else rises in, staggered, as it enters the viewport
     previews   a work row shows its image beside the cursor

   Content is only hidden while html.tx-js is set, so pages read normally
   without JavaScript, and the class is never set for reduced motion. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;

  /* Tells the <head> failsafe that this file loaded, and lets the footer's
     "Page printed in" picker replay the arrival after a reprint. */
  window.jrLayout = { replay: function () { startText(); } };

  function still() { return !!(reduce && reduce.matches); }
  function current() {
    if (root.hasAttribute("data-zine")) return "zine";
    return root.getAttribute("data-layout") || "classic";
  }
  function isText() { return current() === "text" || current() === "zine"; }

  /* ---------------------------------------------------------------- targets
     Keep RISE in step with the same list in main.css (Layout: Text). */

  var HEADS = ".intro, .case-title, .page-header h1, .blog-post-head h1";
  var LABELS = ".tx .section-kicker, .case-study .section-kicker, .blog-post .section-kicker";
  var RISE = [
    "[data-tx]",
    ".case-hero .dek", ".meta-row li", ".case-hero-media",
    ".glance-summary", ".glance-points li",
    ".case-body .figure", ".case-body .split", ".case-body .decision",
    ".case-body .pullquote", ".case-body .insight",
    ".case-body .pair", ".case-body .callout", ".case-body .stats li",
    ".related",
    ".page-header .dek", ".writing-meta",
    ".blog-post .blog-date", ".blog-post .reading-time", ".blog-post .dek",
    ".note-list li",
    ".prose",
    ".footer-copy"
  ].join(",");
  var COUNTS = ".meta-value, .blog-post .reading-time, .blog-post .blog-day, .footer-copy";

  var STEP = 55;            /* ms between neighbours arriving together */
  var prepared = false;
  var observer = null;
  var firstBatch = true;
  var timers = [];
  var frames = [];

  function all(selector, scope) {
    return [].slice.call((scope || document).querySelectorAll(selector));
  }

  function textNodes(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [], node;
    while ((node = walker.nextNode())) nodes.push(node);
    return nodes;
  }

  /* ------------------------------------------------------------- preparing */

  /* Heading -> one inline-block per word, so each can rise on its own. */
  function splitWords(heading) {
    var count = 0;
    textNodes(heading).forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
        var word = document.createElement("span");
        word.className = "tx-w";
        word.style.setProperty("--w", count++);
        word.textContent = part;
        frag.appendChild(word);
      });
      node.parentNode.replaceChild(frag, node);
    });
    heading.classList.add("tx-split");
  }

  /* Label -> one span per letter. Screen readers get the untouched text. */
  function splitChars(label) {
    var count = 0;
    textNodes(label).forEach(function (node) {
      var text = node.nodeValue;
      if (!text.trim()) return;
      var spoken = document.createElement("span");
      spoken.className = "visually-hidden";
      spoken.textContent = text;
      var shown = document.createElement("span");
      shown.className = "tx-chars";
      shown.setAttribute("aria-hidden", "true");
      text.trim().split("").forEach(function (ch) {
        var c = document.createElement("span");
        c.className = "tx-c";
        c.style.setProperty("--c", count++);
        c.textContent = ch;
        shown.appendChild(c);
      });
      var frag = document.createDocumentFragment();
      frag.appendChild(spoken);
      frag.appendChild(shown);
      node.parentNode.replaceChild(frag, node);
    });
    label.classList.add("tx-split");
  }

  /* Wrap the first number in an element so it can count up. */
  function wrapNumber(el) {
    if (el.querySelector("[data-tx-count]")) return;
    var nodes = textNodes(el);
    for (var i = 0; i < nodes.length; i++) {
      var match = /\d+/.exec(nodes[i].nodeValue);
      if (!match) continue;
      var rest = nodes[i].splitText(match.index);
      rest.splitText(match[0].length);
      var num = document.createElement("span");
      num.setAttribute("data-tx-count", "");
      rest.parentNode.replaceChild(num, rest);
      num.textContent = match[0];
      return;
    }
  }

  function prepare() {
    if (prepared) return;
    prepared = true;
    all(HEADS).forEach(function (heading) {
      /* The homepage title is two impressions, not a word at a time. */
      if (heading.classList.contains("intro") && heading.querySelector(".intro-name")) {
        heading.classList.add("tx-print");
        return;
      }
      splitWords(heading);
    });
    all(LABELS).forEach(splitChars);
    all(COUNTS).forEach(wrapNumber);
    all("[data-tx-count]").forEach(function (el) {
      el.setAttribute("data-tx-count", el.textContent.trim());   /* the value to land on */
    });
  }

  /* --------------------------------------------------------------- numbers */

  function pad(n, width) {
    var s = String(n);
    while (s.length < width) s = "0" + s;
    return s;
  }

  /* Years start a couple of decades back; small numbers start from nought. */
  function countFrom(to) { return to > 100 ? to - 24 : 0; }

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function countUp(el) {
    var raw = el.getAttribute("data-tx-count");
    var to = parseInt(raw, 10);
    if (isNaN(to)) return;
    var from = countFrom(to);
    var duration = to > 100 ? 1300 : 700 + Math.min(to, 12) * 35;
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      el.textContent = pad(Math.round(from + (to - from) * easeOutQuart(t)), raw.length);
      if (t < 1) frames.push(requestAnimationFrame(frame));
    }
    frames.push(requestAnimationFrame(frame));
  }

  /* A number is only wound back as its block arrives (it is still invisible
     then), so anything not yet on screen always holds its real value. */
  function windBack(el) {
    var raw = el.getAttribute("data-tx-count");
    var to = parseInt(raw, 10);
    if (!isNaN(to)) el.textContent = pad(countFrom(to), raw.length);
  }

  function settleCounts() {
    all("[data-tx-count]").forEach(function (el) {
      var raw = el.getAttribute("data-tx-count");
      if (raw) el.textContent = raw;
    });
  }

  /* ------------------------------------------------------------- revealing */

  function reveal(el, delay) {
    el.style.setProperty("--d", delay + "ms");
    el.classList.add("is-in");
    var counts = all("[data-tx-count]", el);
    if (!counts.length) return;
    counts.forEach(windBack);
    timers.push(setTimeout(function () { counts.forEach(countUp); }, delay + 140));
  }

  function revealBatch(batch) {
    if (!batch.length) return;
    /* a long batch (a jump down the page) is squeezed so nothing waits long */
    var step = Math.min(STEP, 720 / batch.length);
    var delay = firstBatch ? 60 : 0;
    firstBatch = false;
    batch.forEach(function (el) {
      observer.unobserve(el);
      reveal(el, Math.round(delay));
      /* a heading leads: what follows waits for most of its words.
         The homepage title holds the page until its second ink has started. */
      delay += el.classList.contains("tx-print")
        ? 860
        : el.matches(HEADS) ? Math.min(340, all(".tx-w", el).length * 22) : step;
    });
  }

  function onEntries(entries) {
    var batch = [];
    entries.forEach(function (entry) { if (entry.isIntersecting) batch.push(entry.target); });
    revealBatch(batch);
  }

  /* The observer waits until something is a little way into the viewport,
     which the last lines of a page never are. At the end of the page, bring
     in whatever is on screen and still waiting. */
  function atPageEnd() {
    if (!observer) return;
    if (window.innerHeight + window.pageYOffset < root.scrollHeight - 2) return;
    revealBatch(all(HEADS + "," + LABELS + "," + RISE).filter(function (el) {
      if (el.classList.contains("is-in") || !el.getClientRects().length) return false;
      var box = el.getBoundingClientRect();
      return box.bottom > 0 && box.top < window.innerHeight;
    }));
  }

  function clearPending() {
    timers.forEach(clearTimeout);
    frames.forEach(cancelAnimationFrame);
    timers = [];
    frames = [];
  }

  function startText() {
    if (still() || !("IntersectionObserver" in window)) {
      root.classList.remove("tx-js");
      return;
    }
    stopText();
    root.classList.add("tx-js");
    prepare();
    void root.offsetWidth;   /* commit the hidden state before anything arrives */
    firstBatch = true;
    observer = new IntersectionObserver(onEntries, { rootMargin: "0px 0px -7% 0px", threshold: 0 });
    all(HEADS + "," + LABELS + "," + RISE).forEach(function (el) { observer.observe(el); });
    timers.push(setTimeout(atPageEnd, 400));   /* a page short enough to have no scroll */
  }

  window.addEventListener("scroll", atPageEnd, { passive: true });

  function stopText() {
    if (observer) { observer.disconnect(); observer = null; }
    clearPending();
    all(".is-in").forEach(function (el) { el.classList.remove("is-in"); });
    settleCounts();
    root.classList.remove("tx-js");
  }

  /* -------------------------------------------------- preview on the cursor
     A work row shows its image with the image's top-left corner just below
     and to the right of the cursor. With no room on the right it flips to the
     left; with no room below it sits above. */

  var preview = null;

  function setUpPreview() {
    if (preview || !window.matchMedia || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var box = document.createElement("div");
    box.className = "tx-preview";
    box.setAttribute("aria-hidden", "true");
    var card = document.createElement("div");
    card.className = "tx-preview-card";
    box.appendChild(card);
    document.body.appendChild(box);

    var GAP = 14, EDGE = 10;
    var images = {};
    var x = 0, y = 0, toX = 0, toY = 0, on = false, raf = 0;

    function place(cx, cy) {
      var w = box.offsetWidth, h = box.offsetHeight;
      var vw = root.clientWidth, vh = window.innerHeight;
      var left = cx + GAP, top = cy + GAP + 6, ox = "0%", oy = "0%";
      if (left + w > vw - EDGE) { left = cx - GAP - w; ox = "100%"; }
      if (top + h > vh - EDGE) { top = cy - GAP - h; oy = "100%"; }
      toX = Math.max(EDGE, Math.min(left, vw - w - EDGE));
      toY = Math.max(EDGE, Math.min(top, vh - h - EDGE));
      card.style.transformOrigin = ox + " " + oy;
    }

    /* Snap to whole device pixels: a layer sitting between pixels gets resampled,
       which makes the screenshot in the card look soft or jagged. */
    function paint() {
      var d = window.devicePixelRatio || 1;
      var px = Math.round(x * d) / d, py = Math.round(y * d) / d;
      box.style.transform = "translate(" + px + "px," + py + "px)";
    }

    function tick() {
      raf = 0;
      var ease = still() ? 1 : 0.22;
      x += (toX - x) * ease;
      y += (toY - y) * ease;
      if (Math.abs(toX - x) < 0.1 && Math.abs(toY - y) < 0.1) { x = toX; y = toY; }
      paint();
      if (x !== toX || y !== toY) raf = requestAnimationFrame(tick);
    }

    function show(src, e) {
      if (!isText() || !src) return;            /* Text and Zine (Zine is Text plus print) */
      if (!images[src]) {
        var img = document.createElement("img");
        img.alt = "";
        img.decoding = "async";
        img.src = src;
        card.appendChild(img);
        images[src] = img;
      }
      Object.keys(images).forEach(function (key) {
        images[key].classList.toggle("is-active", key === src);
      });
      place(e.clientX, e.clientY);
      if (!on) { x = toX; y = toY; paint(); }   /* arrive in place, then follow */
      on = true;
      box.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function move(e) {
      if (!on) return;
      place(e.clientX, e.clientY);
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function hide() {
      on = false;
      box.classList.remove("is-on");
    }

    function source(el) {
      var src = el.getAttribute("data-preview");
      if (src) return src;
      var img = el.querySelector("img");
      return img ? img.getAttribute("src") : "";
    }

    all(".tx-row[data-preview], .related-link").forEach(function (el) {
      el.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") show(source(el), e); });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", hide);
      el.addEventListener("click", hide);
    });
    window.addEventListener("pagehide", hide);

    preview = { hide: hide };
  }

  if (isText()) {
    setUpPreview();
    startText();
    /* /#work, /#about and /#blog point at the classic sections */
    var hash = location.hash.replace("#", "");
    var section = hash && document.getElementById("tx-" + hash);
    if (section) section.scrollIntoView();
  }

  /* Back/forward cache: never come back to a half-hidden page. */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted || !isText()) return;
    clearPending();
    all(HEADS + "," + LABELS + "," + RISE).forEach(function (el) { el.classList.add("is-in"); });
    settleCounts();
  });
})();
