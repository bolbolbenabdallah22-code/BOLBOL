
/* =========================================================
   BOLBOL — Main Application Controller
   File: src/main.js
   ========================================================= */

"use strict";

/* ---------- DOM HELPERS ---------- */

const $ = (selector, root = document) => root.querySelector(selector);

const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

/* ---------- APP STATE ---------- */

const App = {
  name: "BOLBOL",
  version: "1.0.0",
  activePage: "home",
  toastTimers: new Set(),
};

/* ---------- NOTIFICATIONS ---------- */

function showToast(message, type = "success", duration = 3000) {
  const container =
    $("#toast-container") || createToastContainer();

  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " toast-error" : ""}`;
  toast.setAttribute("role", type === "error" ? "alert" : "status");
  toast.textContent = String(message);

  container.appendChild(toast);

  const timer = window.setTimeout(() => {
    toast.remove();
    App.toastTimers.delete(timer);

    if (container.childElementCount === 0) {
      container.remove();
    }
  }, duration);

  App.toastTimers.add(timer);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  container.className = "toast-container";
  container.setAttribute("aria-live", "polite");
  document.body.appendChild(container);
  return container;
}

/* ---------- MOBILE SIDEBAR ---------- */

function getSidebar() {
  return $(".sidebar");
}

function getOverlay() {
  return $("#sidebar-overlay");
}

function openSidebar() {
  const sidebar = getSidebar();
  const overlay = getOverlay();
  const toggle = $("#menu-toggle");

  if (!sidebar) return;

  sidebar.classList.add("is-open");
  overlay?.classList.add("is-visible");
  toggle?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  const sidebar = getSidebar();
  const overlay = getOverlay();
  const toggle = $("#menu-toggle");

  sidebar?.classList.remove("is-open");
  overlay?.classList.remove("is-visible");
  toggle?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function toggleSidebar() {
  const sidebar = getSidebar();

  if (sidebar?.classList.contains("is-open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function setupSidebar() {
  $("#menu-toggle")?.addEventListener("click", toggleSidebar);

  getOverlay()?.addEventListener("click", closeSidebar);

  $$(".sidebar .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeSidebar();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeSidebar();
    }
  });
}

/* ---------- NAVIGATION ---------- */

function getPageFromLink(link) {
  const href = link.getAttribute("href");

  if (!href || !href.startsWith("#")) {
    return null;
  }

  return href.slice(1);
}

function setActiveNavigation(page) {
  App.activePage = page;

  const links = $$(".nav-link, .mobile-nav-link");

  links.forEach((link) => {
    const linkPage = getPageFromLink(link);
    const isActive = linkPage === page;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function navigateTo(page) {
  const target = document.getElementById(page);

  if (!target) {
    showToast(
      "This section is not available yet. We will add it in the next steps.",
      "error",
      3500
    );
    return;
  }

  setActiveNavigation(page);
  closeSidebar();

  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });

  if (window.location.hash !== `#${page}`) {
    history.replaceState(null, "", `#${page}`);
  }
}

function setupNavigation() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const page = getPageFromLink(link);

      if (!page) return;

      event.preventDefault();
      navigateTo(page);
    });
  });

  const initialPage = window.location.hash.slice(1) || "home";

  if (document.getElementById(initialPage)) {
    setActiveNavigation(initialPage);
  } else {
    setActiveNavigation("home");
  }
}

/* ---------- DASHBOARD HELPERS ---------- */

function setupFooterYear() {
  const yearElement = $("#footer-year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function setupProfileButtons() {
  const profileButtons = [
    $("#profile-button"),
    $("#setup-profile-button"),
  ];

  profileButtons.filter(Boolean).forEach((button) => {
    button.addEventListener("click", () => {
      if (document.getElementById("profile")) {
        navigateTo("profile");
      } else {
        showToast(
          "Your profile setup screen will be added in a future step."
        );
      }
    });
  });
}

function setupPrimaryButtons() {
  $$(".hero-card .primary-button").forEach((button) => {
    button.addEventListener("click", () => {
      const workoutSection = document.getElementById("workout");

      if (workoutSection) {
        navigateTo("workout");
      } else {
        showToast(
          "The workout planner is coming in the next development step."
        );
      }
    });
  });
}

/* ---------- ACCESSIBILITY ---------- */

function setupAccessibleButtons() {
  const menuToggle = $("#menu-toggle");

  if (menuToggle) {
    menuToggle.setAttribute("aria-label", "Toggle navigation menu");
    menuToggle.setAttribute("aria-controls", "sidebar");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  const overlay = getOverlay();

  if (overlay) {
    overlay.setAttribute("aria-hidden", "true");
  }
}

/* ---------- APP STARTUP ---------- */

function initApp() {
  setupFooterYear();
  setupSidebar();
  setupNavigation();
  setupProfileButtons();
  setupPrimaryButtons();
  setupAccessibleButtons();

  console.info(
    `${App.name} v${App.version} initialized.`
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
  }
    
