/* =====================================================================
   Acre — Free Property Marketplace Template · uiCookies
   Vanilla JS only. No external libraries. Each feature is a guard-claused init.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header solidify ---------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile navigation ---------- */
  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.getElementById("mainNav");
    var backdrop = document.querySelector("[data-nav-backdrop]");
    var closeBtn = document.querySelector("[data-nav-close]");
    if (!toggle || !nav) return;

    var open = function () {
      nav.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      if (backdrop) backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      if (backdrop) backdrop.hidden = true;
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) close();
    });
  }

  /* ---------- search buy/rent/sold tabs ---------- */
  function initSearchTabs() {
    var tabs = document.querySelectorAll(".search-tab");
    if (!tabs.length) return;
    var input = document.querySelector("[data-search-placeholder]");
    var placeholders = {
      buy: "City, neighbourhood or ZIP",
      rent: "Where do you want to rent?",
      sold: "See what sold near…"
    };
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        var key = tab.getAttribute("data-tab");
        if (input && placeholders[key]) input.setAttribute("placeholder", placeholders[key]);
      });
    });

    var form = document.querySelector("[data-search]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var listings = document.getElementById("listings");
        if (listings) listings.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  /* ---------- favourites (localStorage) ---------- */
  function initFavourites() {
    var buttons = document.querySelectorAll("[data-fav]");
    var countEl = document.querySelector("[data-saved-count]");
    var savedBtn = document.querySelector("[data-saved-link]");
    if (!buttons.length) return;

    var KEY = "acre:saved";
    var saved;
    try { saved = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { saved = []; }
    if (!Array.isArray(saved)) saved = [];

    var persist = function () {
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
    };
    var render = function () {
      if (countEl) countEl.textContent = String(saved.length);
      if (savedBtn) savedBtn.classList.toggle("has-saved", saved.length > 0);
    };

    buttons.forEach(function (btn) {
      var id = btn.getAttribute("data-fav");
      var isSaved = saved.indexOf(id) !== -1;
      btn.setAttribute("aria-pressed", isSaved ? "true" : "false");

      btn.addEventListener("click", function () {
        var idx = saved.indexOf(id);
        if (idx === -1) {
          saved.push(id);
          btn.setAttribute("aria-pressed", "true");
          if (!reduceMotion) {
            btn.classList.remove("pop");
            void btn.offsetWidth;
            btn.classList.add("pop");
          }
        } else {
          saved.splice(idx, 1);
          btn.setAttribute("aria-pressed", "false");
        }
        persist();
        render();
      });
    });

    render();
  }

  /* ---------- listing filters ---------- */
  function initFilters() {
    var chips = document.querySelectorAll(".chip[data-filter]");
    var cards = document.querySelectorAll("[data-listing]");
    var empty = document.querySelector("[data-empty]");
    if (!chips.length || !cards.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");

        var filter = chip.getAttribute("data-filter");
        var visible = 0;
        cards.forEach(function (card) {
          var cats = (card.getAttribute("data-cat") || "").split(" ");
          var show = filter === "all" || cats.indexOf(filter) !== -1;
          card.style.display = show ? "" : "none";
          if (show) visible++;
        });
        if (empty) empty.hidden = visible !== 0;
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- count-up stats ---------- */
  function initCounters() {
    var group = document.querySelector("[data-counters]");
    if (!group) return;
    var nums = group.querySelectorAll("[data-count]");
    if (!nums.length) return;

    var run = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion) { el.textContent = target.toLocaleString() + suffix; return; }
      var start = null, dur = 1400;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      nums.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          nums.forEach(run);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(group);
  }

  /* ---------- back to top ---------- */
  function initBackToTop() {
    var btn = document.querySelector("[data-to-top]");
    if (!btn) return;
    btn.hidden = false;
    var onScroll = function () {
      btn.classList.toggle("show", window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- newsletter / account forms ---------- */
  function initForms() {
    var forms = document.querySelectorAll("[data-newsletter]");
    if (!forms.length) return;
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = form.querySelector('input[type="email"]');
        var note = form.querySelector("[data-newsletter-note]");
        if (email && !email.checkValidity()) {
          email.focus();
          email.reportValidity && email.reportValidity();
          return;
        }
        if (note) note.hidden = false;
        form.querySelectorAll("input").forEach(function (i) { i.value = ""; });
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    initHeader();
    initMobileNav();
    initSearchTabs();
    initFavourites();
    initFilters();
    initReveal();
    initCounters();
    initBackToTop();
    initForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
