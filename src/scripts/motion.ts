/*
  Motion system. Everything is opt-in through data attributes:

    data-split[="load"]     headline characters rise out of a mask (on scroll, or on page load)
    data-fade               fade + rise on scroll
    data-stagger            direct children fade + rise one after another
    data-clip               media unveils bottom-up, image inside settles from a zoom
    data-parallax="0.15"    media drifts inside its frame while scrolling (strength 0–0.4)
    data-expand             block grows from inset to full width as it scrolls in
    data-skew               leans with scroll velocity, springs back when scrolling stops
    data-marquee            infinite ticker; speeds up and reverses with scroll
    data-magnetic[="0.3"]   element is pulled toward the pointer
    data-cursor="Label"     custom cursor grows and shows a label over this element
    data-count              number counts up from 0 when scrolled into view
    data-progress           width tracks page scroll progress
    data-draw               dimension/level lines grow outward from their label on scroll
    data-plan               SVG drawing; children with data-layer="1…n" are drawn layer by layer, scrubbed
    data-crosshair          survey crosshair with live X/Y readout (in mm) over the element
    data-ruler-marker       fixed side ruler marker; reads scroll depth as elevation

  prefers-reduced-motion turns all of it off and leaves the content static.
*/
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const EASE = "expo.out";

const $$ = <T extends HTMLElement = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

/* ── Smooth scroll ──────────────────────────────────────────────── */

let lenis: Lenis | null = null;

function initScroll() {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Mobile menu locks the page.
  new MutationObserver(() => {
    document.body.classList.contains("overflow-hidden") ? lenis!.stop() : lenis!.start();
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
}

/* ── Split text ─────────────────────────────────────────────────── */

function split(el: HTMLElement) {
  el.setAttribute("aria-label", el.textContent!.trim().replace(/\s+/g, " "));
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const part of child.textContent!.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(" ");
            continue;
          }
          const word = document.createElement("span");
          word.className = "split-word";
          word.setAttribute("aria-hidden", "true");
          for (const ch of part) {
            const c = document.createElement("span");
            c.className = "split-char";
            c.textContent = ch;
            word.append(c);
          }
          frag.append(word);
        }
        child.replaceWith(frag);
      } else if (child instanceof HTMLElement && child.tagName !== "BR") {
        walk(child);
      }
    }
  };
  walk(el);
  return $$(".split-char", el);
}

function initSplits(introDelay: number) {
  for (const el of $$("[data-split]")) {
    const chars = split(el);
    gsap.set(el, { visibility: "visible" });
    const onLoad = el.dataset.split === "load";
    gsap.from(chars, {
      yPercent: 115,
      rotate: 6,
      duration: 1.3,
      ease: EASE,
      stagger: { each: 0.025, from: "start" },
      delay: onLoad ? introDelay : 0,
      scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%" },
    });
  }
}

/* ── Scroll reveals ─────────────────────────────────────────────── */

function initReveals(introDelay: number) {
  for (const el of $$("[data-fade]")) {
    const inView = el.getBoundingClientRect().top < innerHeight;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: EASE,
        delay: inView ? introDelay + 0.35 : 0,
        scrollTrigger: inView ? undefined : { trigger: el, start: "top 90%" },
      },
    );
  }

  for (const group of $$("[data-stagger]")) {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 50,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: "top 85%" },
    });
  }

  for (const el of $$("[data-clip]")) {
    const media = el.querySelector("img, video");
    const inView = el.getBoundingClientRect().top < innerHeight;
    const tl = gsap.timeline({
      delay: inView ? introDelay + 0.2 : 0,
      scrollTrigger: inView ? undefined : { trigger: el, start: "top 85%" },
    });
    gsap.set(el, { visibility: "visible" });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" });
    if (media) tl.from(media, { scale: 1.35, duration: 2, ease: EASE }, 0.1);
  }

  for (const el of $$("[data-count]")) {
    const end = parseFloat(el.textContent!.replace(/[^\d.]/g, "")) || 0;
    const pad = el.textContent!.trim().length;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => (el.textContent = String(Math.round(obj.v)).padStart(pad, "0")),
    });
  }
}

/* ── Scroll-linked (scrubbed) effects ───────────────────────────── */

function initScrub() {
  for (const el of $$("[data-parallax]")) {
    const s = Math.min(parseFloat(el.dataset.parallax || "0.15"), 0.4);
    gsap.set(el, { scale: 1 + s });
    gsap.fromTo(
      el,
      { yPercent: -s * 40 },
      {
        yPercent: s * 40,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  for (const el of $$("[data-expand]")) {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 6% 0% 6% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: true },
      },
    );
  }

  const bar = document.querySelector<HTMLElement>("[data-progress]");
  if (bar) {
    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  }
}

/* ── Velocity: skew + marquee ───────────────────────────────────── */

function initVelocity() {
  const skews = $$("[data-skew]");
  const setters = skews.map((el) => gsap.quickTo(el, "skewY", { duration: 0.8, ease: "power3.out" }));

  const marquees = $$("[data-marquee]").map((el) => {
    const track = el.querySelector<HTMLElement>(".marquee-track")!;
    // Duplicate content so the loop is seamless.
    track.append(...Array.from(track.children).map((n) => {
      const c = n.cloneNode(true) as HTMLElement;
      c.setAttribute("aria-hidden", "true");
      return c;
    }));
    const tween = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    return tween;
  });

  let dir = 1;
  lenis?.on("scroll", ({ velocity, direction }: { velocity: number; direction: number }) => {
    const v = gsap.utils.clamp(-4, 4, velocity * 0.2);
    setters.forEach((set) => set(v));
    if (direction) dir = direction;
    marquees.forEach((t) => {
      gsap.to(t, { timeScale: dir * (1 + Math.abs(velocity) * 0.15), duration: 0.3, overwrite: true });
    });
  });
}

/* ── Header: hide on scroll down, show on scroll up ─────────────── */

function initHeader() {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;
  ScrollTrigger.create({
    start: 120,
    end: "max",
    onUpdate: (self) => header.classList.toggle("is-hidden", self.direction === 1),
    onLeaveBack: () => header.classList.remove("is-hidden"),
  });
}

/* ── Pointer: magnetic + cursor ─────────────────────────────────── */

function initPointer() {
  if (!finePointer) return;

  for (const el of $$("[data-magnetic]")) {
    const strength = parseFloat(el.dataset.magnetic || "0.3");
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * strength);
      y((e.clientY - r.top - r.height / 2) * strength);
    });
    el.addEventListener("pointerleave", () => {
      x(0);
      y(0);
    });
  }

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<span class="cursor-label"></span>';
  document.body.append(cursor);
  const label = cursor.firstElementChild as HTMLElement;
  const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
  const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
  gsap.set(cursor, { autoAlpha: 0 });

  addEventListener("pointermove", (e) => {
    gsap.to(cursor, { autoAlpha: 1, duration: 0.3 });
    cx(e.clientX);
    cy(e.clientY);
    const target = e.target as HTMLElement;
    const labelled = target.closest<HTMLElement>("[data-cursor]");
    cursor.classList.toggle("is-label", !!labelled);
    cursor.classList.toggle("is-link", !labelled && !!target.closest("a, button, input, textarea, label"));
    if (labelled) label.textContent = labelled.dataset.cursor!;
  });
  document.addEventListener("pointerleave", () => gsap.to(cursor, { autoAlpha: 0, duration: 0.3 }));
}

/* ── Page transitions (curtain wipe between pages) ──────────────── */

const curtain = () => document.querySelector<HTMLElement>(".curtain");

function initTransitions(): number {
  const el = curtain();
  if (!el) return 0;

  let intro = 0.1;
  if (sessionStorage.getItem("pt")) {
    sessionStorage.removeItem("pt");
    gsap.set(el, { scaleY: 1, transformOrigin: "top" });
    gsap.to(el, { scaleY: 0, duration: 0.9, ease: "expo.inOut" });
    intro = 0.55;
  }

  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const url = new URL(a.href, location.href);
    const samePage = url.pathname === location.pathname && url.hash;
    if (url.origin !== location.origin || a.target === "_blank" || a.hasAttribute("download") || samePage) return;
    e.preventDefault();
    sessionStorage.setItem("pt", "1");
    gsap.set(el, { transformOrigin: "bottom" });
    gsap.to(el, { scaleY: 1, duration: 0.7, ease: "expo.inOut", onComplete: () => location.assign(url) });
  });

  // Coming back via the back button restores a frozen page: lift the curtain.
  addEventListener("pageshow", (e) => {
    if (e.persisted) gsap.set(el, { scaleY: 0 });
  });

  return intro;
}

/* ── Drafting: lines, plans, ruler, crosshair ───────────────────── */

function initDrafting() {
  for (const el of $$("[data-draw]")) {
    const lines = $$(".dim-line", el);
    const rest = Array.from(el.children).filter((c) => !c.classList.contains("dim-line"));
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 92%" } });
    tl.from(lines, { scaleX: 0, duration: 1.4, ease: "expo.inOut" }).from(rest, { autoAlpha: 0, duration: 0.6, stagger: 0.05 }, 0.2);
  }

  for (const svg of $$<HTMLElement>("[data-plan]")) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: "top 80%", end: "bottom 55%", scrub: 0.6 },
    });
    const layers = [...new Set($$("[data-layer]", svg).map((l) => l.dataset.layer!))].sort();
    for (const n of layers) {
      const groups = $$(`[data-layer="${n}"]`, svg);
      const strokes = groups.flatMap((g) =>
        (g as unknown as SVGElement) instanceof SVGGeometryElement ? [g] : $$("path, rect, circle, ellipse, line", g),
      ) as unknown as SVGGeometryElement[];
      const texts = groups.flatMap((g) => $$("text", g));
      for (const st of strokes) {
        const len = Math.ceil(st.getTotalLength());
        // Keep a dashed stroke's own pattern by only drawing solid strokes.
        if (st.closest("[stroke-dasharray]")) continue;
        gsap.set(st, { strokeDasharray: len, strokeDashoffset: len });
      }
      const label = `l${n}`;
      tl.addLabel(label);
      tl.to(strokes.filter((st) => !st.closest("[stroke-dasharray]")), { strokeDashoffset: 0, duration: 1, ease: "none", stagger: 0.04 }, label);
      tl.from(groups.filter((g) => g.closest("[stroke-dasharray]")), { autoAlpha: 0, duration: 0.6 }, label);
      if (texts.length) tl.from(texts, { autoAlpha: 0, y: 6, duration: 0.5, stagger: 0.03 }, `${label}+=0.5`);
    }
  }

  const marker = document.querySelector<HTMLElement>("[data-ruler-marker]");
  const value = document.querySelector<HTMLElement>("[data-ruler-value]");
  if (marker && value) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.to(marker, { top: `${self.progress * 96 + 1}%`, duration: 0.4, ease: "power3.out", overwrite: true });
        // Page depth as metres below datum, 1 screen ≈ 3.20 m (one storey).
        value.textContent = `-${((scrollY / innerHeight) * 3.2).toFixed(2)}`;
      },
    });
  }

  if (!finePointer) return;
  for (const el of $$("[data-crosshair]")) {
    const hair = el.querySelector<HTMLElement>(".crosshair");
    if (!hair) continue;
    const [hx, hy, read] = [".crosshair-x", ".crosshair-y", ".crosshair-readout"].map((s) => hair.querySelector<HTMLElement>(s)!);
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      gsap.set(hx, { y });
      gsap.set(hy, { x });
      gsap.set(read, { x: x + 10, y: y + 8 });
      const mm = (v: number, total: number) => String(Math.round((v / total) * 12400)).padStart(5, "0");
      read.textContent = `X ${mm(x, r.width)} · Y ${mm(y, r.width)}`;
    });
  }
}

/* ── Boot ───────────────────────────────────────────────────────── */

if (!reduce) {
  initScroll();
  const intro = initTransitions();
  initSplits(intro);
  initReveals(intro);
  initScrub();
  initVelocity();
  initHeader();
  initPointer();
  initDrafting();
  // Re-measure once fonts and media have settled.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener("load", () => ScrollTrigger.refresh());
}
(window as unknown as { __motion: boolean }).__motion = true;
root.classList.remove("motion-pending");
