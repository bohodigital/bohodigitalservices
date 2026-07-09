(() => {
  const dictionaryEntries = Array.isArray(window.BOHO_DICTIONARY) ? window.BOHO_DICTIONARY : [];
  const dictionaryMap = new Map(dictionaryEntries.map((entry) => [entry.slug, entry]));

  const navToggle = document.querySelector("[data-nav-toggle]");
  const navPanel = document.querySelector("[data-nav-panel]");

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navPanel.classList.toggle("is-open", !expanded);
    });

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navPanel.classList.remove("is-open");
      });
    });
  }

  if (navPanel) {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    navPanel.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }

      const targetPath = href.replace(/\/+$/, "") || "/";
      if (targetPath === path) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const revealNodes = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealNodes.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.getAttribute("data-copy-target");
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) {
        return;
      }

      const value = "value" in target ? target.value : target.textContent || "";

      try {
        await navigator.clipboard.writeText(value);
        const previous = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = previous;
        }, 1800);
      } catch (error) {
        if ("select" in target) {
          target.focus();
          target.select();
        }
      }
    });
  });

  document.querySelectorAll("[data-mailto-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitter = form.querySelector("[type='submit']");
      const statusNode = form.querySelector("[data-mailto-status]");
      const formData = new FormData(form);
      const emailTo = form.getAttribute("data-mailto-to") || "hello@bohodigitalservices.com";
      const lines = [];

      const primaryFields = [
        ["Name", formData.get("name")],
        ["Email", formData.get("email")],
        ["Business name", formData.get("business_name")],
        ["Website URL", formData.get("website_url")],
        ["Help needed", formData.get("help_type")],
        ["Budget range", formData.get("budget")],
        ["Timeline", formData.get("timeline")],
        ["Anything else worth knowing", formData.get("notes")],
      ];

      primaryFields.forEach(([label, value]) => {
        if (typeof value === "string" && value.trim()) {
          lines.push(`${label}: ${value.trim()}`);
        }
      });

      const fitValues = formData.getAll("fit");
      if (fitValues.length > 0) {
        lines.push("");
        lines.push("Fit checklist:");
        fitValues.forEach((value) => lines.push(`- ${value}`));
      }

      const subjectBase = typeof formData.get("help_type") === "string" && formData.get("help_type")
        ? formData.get("help_type")
        : "Website or SEO inquiry";
      const subject = `Boho inquiry: ${subjectBase}`;
      const body = lines.join("\n");
      const mailtoUrl = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (statusNode) {
        statusNode.textContent = "Opening your email app with the inquiry drafted.";
      }
      if (submitter) {
        submitter.textContent = "Opening email...";
        window.setTimeout(() => {
          submitter.textContent = "Draft inquiry email";
        }, 1800);
      }

      window.location.href = mailtoUrl;
    });
  });

  if (dictionaryEntries.length > 0) {
    const glossaryButtons = document.querySelectorAll("[data-glossary]");
    let activeTrigger = null;
    let closeTimer = 0;
    let isPinnedOpen = false;

    const popover = document.createElement("div");
    popover.className = "glossary-popover";
    popover.id = "glossary-popover";
    popover.setAttribute("data-glossary-popover", "");
    popover.setAttribute("hidden", "");
    popover.innerHTML = `
      <div class="glossary-popover__top">
        <div>
          <p class="glossary-popover__label">Owl Definition</p>
          <h2 class="glossary-popover__term"></h2>
        </div>
        <button class="glossary-popover__close" type="button" aria-label="Close definition">Close</button>
      </div>
      <p class="glossary-popover__definition"></p>
      <a class="glossary-popover__link" href="/ask-the-owl/dictionary/">Read the full entry</a>
    `;
    document.body.appendChild(popover);

    const labelNode = popover.querySelector(".glossary-popover__label");
    const termNode = popover.querySelector(".glossary-popover__term");
    const definitionNode = popover.querySelector(".glossary-popover__definition");
    const linkNode = popover.querySelector(".glossary-popover__link");
    const closeNode = popover.querySelector(".glossary-popover__close");

    const isNarrowViewport = () => window.matchMedia("(max-width: 720px)").matches;
    const setPopoverRole = () => {
      if (isNarrowViewport()) {
        popover.setAttribute("role", "dialog");
        popover.setAttribute("aria-modal", "false");
      } else {
        popover.setAttribute("role", "tooltip");
        popover.removeAttribute("aria-modal");
      }
    };

    const positionPopover = (trigger) => {
      if (!trigger) {
        return;
      }

      setPopoverRole();
      popover.classList.toggle("is-sheet", isNarrowViewport());
      if (popover.classList.contains("is-sheet")) {
        popover.style.top = "";
        popover.style.left = "";
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();
      const left = Math.min(
        Math.max(12, triggerRect.left + (triggerRect.width / 2) - (popRect.width / 2)),
        window.innerWidth - popRect.width - 12
      );
      const top = Math.min(triggerRect.bottom + 14, window.innerHeight - popRect.height - 12);
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    };

    const closePopover = () => {
      const previousTrigger = activeTrigger;
      if (previousTrigger) {
        previousTrigger.setAttribute("aria-expanded", "false");
      }
      activeTrigger = null;
      isPinnedOpen = false;
      popover.classList.remove("is-open");
      popover.setAttribute("hidden", "");
      popover.removeAttribute("data-tone");
      return previousTrigger;
    };

    const openPopover = (trigger, options = {}) => {
      const { pinned = false } = options;
      const slug = trigger.getAttribute("data-glossary");
      const entry = slug ? dictionaryMap.get(slug) : null;
      if (!entry) {
        return;
      }

      window.clearTimeout(closeTimer);
      activeTrigger = trigger;
      isPinnedOpen = pinned;
      glossaryButtons.forEach((button) => button.setAttribute("aria-expanded", String(button === trigger)));
      labelNode.textContent = entry.tone === "fox" ? "Shortcut Fox Warning" : "Owl Definition";
      termNode.textContent = entry.term;
      definitionNode.textContent = entry.shortDefinition;
      linkNode.href = entry.fullEntryUrl || "/ask-the-owl/dictionary/";
      popover.dataset.tone = entry.tone || "owl";
      popover.removeAttribute("hidden");
      popover.classList.add("is-open");
      positionPopover(trigger);
    };

    glossaryButtons.forEach((button, index) => {
      const slug = button.getAttribute("data-glossary");
      const entry = slug ? dictionaryMap.get(slug) : null;
      if (!entry) {
        return;
      }

      button.setAttribute("type", "button");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", popover.id);
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("title", `${entry.term}: ${entry.shortDefinition}`);
      if (entry.tone === "fox") {
        button.dataset.tone = "fox";
      }

      button.addEventListener("mouseenter", () => openPopover(button));
      button.addEventListener("focus", () => openPopover(button));
      button.addEventListener("click", () => {
        if (activeTrigger === button && popover.classList.contains("is-open") && isPinnedOpen) {
          closePopover();
        } else {
          openPopover(button, { pinned: true });
        }
      });
      button.addEventListener("mouseleave", () => {
        if (!isNarrowViewport() && !isPinnedOpen) {
          closeTimer = window.setTimeout(() => {
            if (!popover.matches(":hover")) {
              closePopover();
            }
          }, 140);
        }
      });
    });

    closeNode.addEventListener("click", () => {
      const previousTrigger = closePopover();
      if (previousTrigger) {
        previousTrigger.focus();
      }
    });

    popover.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
    popover.addEventListener("mouseleave", () => {
      if (!isNarrowViewport() && !isPinnedOpen) {
        closeTimer = window.setTimeout(closePopover, 140);
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (activeTrigger && (activeTrigger.contains(target) || popover.contains(target))) {
        return;
      }
      closePopover();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const previousTrigger = closePopover();
        if (previousTrigger) {
          previousTrigger.focus();
        }
      }
    });

    window.addEventListener("resize", () => {
      if (activeTrigger && popover.classList.contains("is-open")) {
        positionPopover(activeTrigger);
      }
    });
  }

  const searchInput = document.querySelector("[data-dictionary-search]");
  const filterButtons = document.querySelectorAll("[data-dictionary-filter]");
  const dictionaryCards = document.querySelectorAll("[data-dictionary-card]");

  if (searchInput && dictionaryCards.length > 0) {
    const applyDictionaryFilter = () => {
      const query = searchInput.value.trim().toLowerCase();
      const activeFilter = document.querySelector("[data-dictionary-filter].is-active");
      const category = activeFilter ? activeFilter.getAttribute("data-dictionary-filter") : "all";

      dictionaryCards.forEach((card) => {
        const cardText = (card.getAttribute("data-term") || "").toLowerCase();
        const aliases = (card.getAttribute("data-aliases") || "").toLowerCase();
        const cardCategory = card.getAttribute("data-category") || "";
        const matchesQuery = !query || cardText.includes(query) || aliases.includes(query);
        const matchesCategory = category === "all" || cardCategory === category;
        card.hidden = !(matchesQuery && matchesCategory);
      });
    };

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      filterButtons.forEach((button) => {
        button.classList.toggle("is-active", button.getAttribute("data-dictionary-filter") === categoryParam);
      });
    } else if (filterButtons.length > 0) {
      filterButtons[0].classList.add("is-active");
    }

    searchInput.addEventListener("input", applyDictionaryFilter);
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((chip) => chip.classList.remove("is-active"));
        button.classList.add("is-active");
        applyDictionaryFilter();
      });
    });

    applyDictionaryFilter();
  }
})();
