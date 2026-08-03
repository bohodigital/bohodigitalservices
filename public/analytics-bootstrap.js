(() => {
  const config = document.currentScript;
  if (!config || window.__bohoAnalyticsLoaded) return;

  function hosts(value) {
    return [...new Set(
      (value || "").split(",").map((host) => host.trim().toLowerCase()).filter(Boolean),
    )].sort();
  }

  function sameHosts(left, right) {
    return left.length > 0
      && left.length === right.length
      && left.every((host, index) => host === right[index]);
  }

  const umamiHosts = hosts(config.dataset.umamiDomains);
  const gaHosts = hosts(config.dataset.gaPublicHosts);
  const host = window.location.hostname.toLowerCase();
  const umamiScriptUrl = config.dataset.umamiScriptUrl;
  const umamiWebsiteId = config.dataset.umamiWebsiteId;
  const gaId = config.dataset.gaId;
  if (
    !sameHosts(umamiHosts, gaHosts)
    || !umamiHosts.includes(host)
    || !umamiScriptUrl
    || !umamiWebsiteId
    || !gaId
  ) return;

  const qaMarker = "boho_qa";
  let qaSuppressed = false;
  let currentMarker = null;
  try {
    currentMarker = new URLSearchParams(window.location.search).get(qaMarker);
    if (currentMarker === "1") sessionStorage.setItem(qaMarker, "1");
    if (currentMarker === "0") sessionStorage.removeItem(qaMarker);
    qaSuppressed = sessionStorage.getItem(qaMarker) === "1";
  } catch {
    qaSuppressed = currentMarker === "1";
  }

  const dntSuppressed =
    navigator.doNotTrack === "1"
    || navigator.msDoNotTrack === "1"
    || window.doNotTrack === "1";
  const suppressionReason = navigator.webdriver === true
    ? "webdriver"
    : dntSuppressed
      ? "dnt"
      : qaSuppressed
        ? "boho-qa"
        : "";
  if (suppressionReason) {
    document.documentElement.dataset.analyticsSuppressed = suppressionReason;
    return;
  }

  window.__bohoAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const pendingUmamiPageviews = [];
  const pendingUmamiEvents = [];
  let umamiReady = false;
  let lastPathname = null;
  let lastLocation = "";
  let scheduled = false;
  window.gtag("set", { send_page_view: false });
  window.gtag("js", new Date());
  setGoogleLocation();
  window.gtag("config", gaId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    anonymize_ip: true,
    send_page_view: false,
  });

  function sanitizedUrl(value) {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.origin);
      if (url.protocol !== "http:" && url.protocol !== "https:") return "";
      return `${url.origin}${url.pathname || "/"}`;
    } catch {
      return "";
    }
  }

  function setGoogleLocation() {
    const pathname = window.location.pathname || "/";
    const location = `${window.location.origin}${pathname}`;
    const fields = { page_location: location, page_path: pathname };
    const referrer = lastLocation || sanitizedUrl(document.referrer);
    if (referrer) fields.page_referrer = referrer;
    window.gtag("set", fields);
    return { fields, location, pathname, referrer };
  }

  function sendUmamiPageview(pageview) {
    if (!window.umami || typeof window.umami.track !== "function") {
      pendingUmamiPageviews.push(pageview);
      return;
    }
    window.umami.track({ website: umamiWebsiteId, url: pageview.location });
  }

  function flushUmamiPageviews() {
    const umami = window.umami;
    if (!umami || typeof umami.track !== "function") return false;
    umamiReady = true;
    while (pendingUmamiPageviews.length > 0) {
      const pageview = pendingUmamiPageviews[0];
      umami.track({ website: umamiWebsiteId, url: pageview.location });
      pendingUmamiPageviews.shift();
    }
    while (pendingUmamiEvents.length > 0) {
      const event = pendingUmamiEvents[0];
      umami.track(event.name, event.properties);
      pendingUmamiEvents.shift();
    }
    return true;
  }

  function handleUmamiLoad() {
    if (!flushUmamiPageviews()) window.setTimeout(flushUmamiPageviews, 0);
  }

  function emitPageview() {
    const pathname = window.location.pathname || "/";
    if (pathname === lastPathname) return;
    const { fields, location, referrer } = setGoogleLocation();
    const pageview = { location, referrer };
    lastPathname = pathname;
    lastLocation = location;
    window.gtag("event", "page_view", fields);
    if (umamiReady) sendUmamiPageview(pageview);
    else pendingUmamiPageviews.push(pageview);
  }

  function schedulePageview() {
    if (scheduled) return;
    scheduled = true;
    window.setTimeout(() => {
      scheduled = false;
      emitPageview();
    }, 0);
  }

  const commercialEventProperties = {
    free_review_click: ["source_page", "source_section", "service_context", "cta_label"],
    free_review_form_start: ["source_page"],
    free_review_submit_success: ["service_context"],
    free_review_submit_failure: ["failure_stage"],
    emergency_form_start: ["source_page"],
    emergency_submit_success: [],
    emergency_submit_failure: ["failure_stage"],
    commercial_standard_inquiry_success: [],
    pricing_lead_complete: ["path", "offer_id"],
    start_hero_cta_click: ["source_page", "source_section"],
    start_emergency_detour_click: ["source_page", "source_section"],
    start_work_link_click: ["source_page", "source_section"],
    start_pricing_link_click: ["source_page", "source_section"],
    start_service_category_select: ["source_page", "category"],
    start_optional_details_open: ["source_page"],
    free_review_submit_attempt: ["source_page"],
    emergency_hero_cta_click: ["source_page", "source_section"],
    emergency_standard_detour_click: ["source_page", "source_section"],
    emergency_incident_type_select: ["source_page", "category"],
    emergency_submit_attempt: ["source_page"],
    definition_popover_open: ["source_page", "source_section", "term_slug"],
    service_card_click: ["source_page", "service_name", "price_display"],
    service_nav_open: ["device_context"],
    service_nav_click: ["source_page", "service_name", "price_display"],
    pricing_click: ["source_page", "source_section"],
    work_project_click: ["project_name", "destination_type"],
    tools_project_click: ["project_name", "destination_type"],
    email_link_click: ["source_page"],
    phone_link_click: ["source_page"],
  };

  function datasetKey(property) {
    return `analytics${property
      .split("_")
      .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
      .join("")}`;
  }

  function emitCommercialEvent(name, providedProperties) {
    const requiredProperties = commercialEventProperties[name];
    if (!requiredProperties) return;
    const properties = {};
    for (const property of requiredProperties) {
      const value = providedProperties && providedProperties[property];
      if (!value || typeof value !== "string") return;
      properties[property] = value;
    }
    window.gtag("event", name, properties);
    if (umamiReady && window.umami && typeof window.umami.track === "function") {
      window.umami.track(name, properties);
    } else {
      pendingUmamiEvents.push({ name, properties });
    }
  }

  window.bohoTrackCommercialEvent = emitCommercialEvent;

  function handleCommercialClick(event) {
    const target = event && event.target;
    if (!target || typeof target.closest !== "function") return;
    const element = target.closest("[data-analytics-event], a[href^='mailto:'], a[href^='tel:']");
    if (!element || !element.dataset) return;
    const href = element.getAttribute("href") || "";
    const name = element.dataset.analyticsEvent
      || (href.startsWith("mailto:") ? "email_link_click" : href.startsWith("tel:") ? "phone_link_click" : "");
    const requiredProperties = commercialEventProperties[name];
    if (!requiredProperties) return;

    const properties = {};
    for (const property of requiredProperties) {
      let value = element.dataset[datasetKey(property)];
      if (!value && property === "source_page") value = window.location.pathname || "/";
      if (!value && property === "cta_label") value = (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
      if (!value) return;
      properties[property] = value;
    }

    emitCommercialEvent(name, properties);
  }

  for (const method of ["pushState", "replaceState"]) {
    const original = window.history[method];
    if (typeof original !== "function") continue;
    window.history[method] = function bohoAnalyticsHistoryState() {
      const result = original.apply(this, arguments);
      setGoogleLocation();
      schedulePageview();
      return result;
    };
  }
  window.addEventListener("popstate", () => {
    setGoogleLocation();
    schedulePageview();
  });
  document.addEventListener("click", handleCommercialClick);
  emitPageview();

  const umami = document.createElement("script");
  umami.async = true;
  umami.src = umamiScriptUrl;
  umami.setAttribute("data-website-id", umamiWebsiteId);
  umami.setAttribute("data-domains", umamiHosts.join(","));
  umami.setAttribute("data-do-not-track", "true");
  umami.setAttribute("data-exclude-search", "true");
  umami.setAttribute("data-exclude-hash", "true");
  umami.setAttribute("data-auto-pageview", "false");
  umami.addEventListener("load", handleUmamiLoad, { once: true });
  document.head.appendChild(umami);

  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  ga.setAttribute("data-ga-loader", "boho-v2");
  document.head.appendChild(ga);
})();
