import { gsap } from "gsap";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealElements = (root: ParentNode) => {
  if (prefersReducedMotion()) return;

  const elements = Array.from(
    root.querySelectorAll<HTMLElement>("[data-home-reveal]"),
  ).filter((element) => element.dataset.homeRevealed !== "true");

  if (!elements.length) return;

  gsap.set(elements, { autoAlpha: 0, y: 36 });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target as HTMLElement;
        element.dataset.homeRevealed = "true";
        gsap.to(element, {
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          y: 0,
        });

        const chips = element.querySelectorAll("[data-chip-group] span");
        if (chips.length) {
          gsap.fromTo(
            chips,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              duration: 0.38,
              ease: "power2.out",
              stagger: 0.045,
              y: 0,
            },
          );
        }

        observer.unobserve(element);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
  );

  elements.forEach((element) => observer.observe(element));
};

const animateSwarmHero = (root: ParentNode) => {
  if (prefersReducedMotion()) return;

  const paths = Array.from(
    root.querySelectorAll<SVGPathElement>(".swarm-path"),
  );
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });

  gsap.to(paths, {
    delay: 0.18,
    duration: 1.15,
    ease: "power2.out",
    stagger: 0.045,
    strokeDashoffset: 0,
  });

  gsap.from(root.querySelectorAll(".swarm-node"), {
    autoAlpha: 0,
    duration: 0.62,
    ease: "back.out(1.5)",
    scale: 0.72,
    stagger: 0.055,
    transformOrigin: "center",
  });

  gsap.to(root.querySelectorAll(".swarm-node__core"), {
    duration: 1.8,
    ease: "sine.inOut",
    repeat: -1,
    scale: 1.28,
    stagger: 0.14,
    transformOrigin: "center",
    yoyo: true,
  });
};

const bindSignalDeck = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>("[data-signal-deck]").forEach((deck) => {
    if (deck.dataset.homeSignalBound === "true") return;
    deck.dataset.homeSignalBound = "true";

    const panels = Array.from(
      deck.querySelectorAll<HTMLElement>("[data-signal-panel]"),
    );
    const activate = (activePanel: HTMLElement) => {
      panels.forEach((panel) =>
        panel.classList.toggle("is-active", panel === activePanel),
      );
    };

    panels.forEach((panel) => {
      panel.addEventListener("pointerenter", () => activate(panel));
      panel.addEventListener("focusin", () => activate(panel));
    });
  });
};

const initHomeExperience = () => {
  const root = document.querySelector(".boho-home");
  if (!root) return;

  revealElements(root);
  animateSwarmHero(root);
  bindSignalDeck(root);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeExperience, {
    once: true,
  });
} else {
  initHomeExperience();
}

document.addEventListener("astro:after-swap", initHomeExperience);
