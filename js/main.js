/* ============================================================
   CIABATTA PIZZA — interacciones
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Año del footer ─────────────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Nav: fondo al hacer scroll ─────────────────────────── */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Nav móvil (hamburguesa) + bloqueo de scroll ────────── */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    links.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("nav-open", open);
  };
  const closeMenu = () => setMenu(false);
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

    // Cerrar al volver a desktop (con fallback para Safari antiguo)
    const mqDesktop = window.matchMedia("(min-width: 821px)");
    if (mqDesktop.addEventListener) mqDesktop.addEventListener("change", closeMenu);
    else if (mqDesktop.addListener) mqDesktop.addListener(closeMenu);
  }

  /* ── Scroll reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ── Link activo: sección más cercana al centro del viewport ── */
  const navAnchors = Array.from(document.querySelectorAll(".nav__links a[href^='#']"));
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const setActive = () => {
      const mid = window.innerHeight / 2;
      let bestId = null, bestDist = Infinity;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) { bestDist = dist; bestId = "#" + s.id; }
      });
      navAnchors.forEach((a) =>
        a.classList.toggle("is-active", bestId !== null && a.getAttribute("href") === bestId)
      );
    };
    const spy = new IntersectionObserver(setActive, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  /* ── Contadores animados ────────────────────────────────── */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const duration = 1400;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      const co = new IntersectionObserver(
        (entries, obs) => entries.forEach((entry) => {
          if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
        }),
        { threshold: 0.6 }
      );
      counters.forEach((el) => co.observe(el));
    }
  }

  /* ── Videos de galería: carga diferida + play/pausa accesible ── */
  document.querySelectorAll(".gtile").forEach((tile) => {
    const video = tile.querySelector("video[data-lazy-video]");
    const playBtn = tile.querySelector(".gtile__play");
    if (!video || !playBtn) return;

    const setState = (playing) => {
      tile.classList.toggle("is-playing", playing);
      playBtn.setAttribute("aria-pressed", String(playing));
      playBtn.setAttribute("aria-label", playing ? "Pausar video" : "Reproducir video");
    };
    playBtn.setAttribute("aria-pressed", "false");

    const ensureLoaded = () => {
      if (!video.src) { video.src = video.dataset.src; video.load(); }
    };
    playBtn.addEventListener("click", () => {
      ensureLoaded();
      if (video.paused) {
        const p = video.play();
        if (p && p.then) p.then(() => setState(true)).catch(() => {});
        else setState(true);
      } else {
        video.pause();
        setState(false);
      }
    });
    video.addEventListener("ended", () => setState(false));

    // Pausar al salir del viewport (ahorro de batería; sin auto-resume)
    if ("IntersectionObserver" in window) {
      const vo = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (!en.isIntersecting && !video.paused) { video.pause(); setState(false); }
        }),
        { threshold: 0.1 }
      );
      vo.observe(tile);
    }
  });

  /* ── Tilt 3D sutil (solo puntero fino, sin lag) ─────────── */
  if (!prefersReduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const MAX = 6;
      let rect = null, px = 0, py = 0, ticking = false;
      const apply = () => {
        ticking = false;
        card.style.transform =
          `perspective(800px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-6px)`;
      };
      card.addEventListener("mouseenter", () => {
        rect = card.getBoundingClientRect();   // una sola lectura de layout por hover
        card.style.transition = "transform 0s"; // el tilt sigue al cursor 1:1
      });
      card.addEventListener("mousemove", (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        px = (e.clientX - rect.left) / rect.width - 0.5;
        py = (e.clientY - rect.top) / rect.height - 0.5;
        if (!ticking) { ticking = true; requestAnimationFrame(apply); }
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "";  // restaura la transición CSS para un retorno suave
        card.style.transform = "";
        rect = null;
      });
    });
  }

  /* ── Video del hero: consciente de datos/batería ────────── */
  const heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowNet = conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || ""));
    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
    const skipVideo = prefersReduced || reducedData || slowNet;

    if (!skipVideo && "IntersectionObserver" in window) {
      const startHero = () => {
        if (!heroVideo.src) { heroVideo.src = heroVideo.dataset.src; heroVideo.load(); }
        heroVideo.play().catch(() => {});
      };
      const hv = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (en.isIntersecting) startHero();
          else heroVideo.pause();
        }),
        { threshold: 0.1 }
      );
      hv.observe(heroVideo);
    }
    // Si skipVideo: no se asigna src; queda visible el poster (cero descarga de video).
  }
})();
