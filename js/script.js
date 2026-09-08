const root = document.documentElement;
const body = document.body;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");

const escapeHTML = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );

const safeColor = (value) =>
  /^#[0-9a-f]{6}$/i.test(value || "") ? value : "#d44331";

/* Theme */
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

const syncThemeControl = () => {
  const isDark = root.dataset.theme === "dark";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
  themeColor?.setAttribute("content", isDark ? "#11100f" : "#f4efe8");
};

const setTheme = (theme, savePreference = true) => {
  root.dataset.theme = theme;
  if (savePreference) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      // The selected theme still works if browser storage is unavailable.
    }
  }
  syncThemeControl();
};

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  const updateTheme = () => setTheme(nextTheme);

  if (document.startViewTransition && !prefersReducedMotion.matches) {
    document.startViewTransition(updateTheme);
  } else {
    updateTheme();
  }
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    savedTheme = null;
  }
  if (!savedTheme) setTheme(event.matches ? "dark" : "light", false);
});

syncThemeControl();

/* Project archive: content comes from projects.js */
const projectsGrid = document.querySelector("#projects-grid");
const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
  ? window.PORTFOLIO_PROJECTS
  : [];

const projectLink = (url, label, icon, isPrimary = false) => {
  if (!url) return "";
  return `
    <a class="project-link${isPrimary ? " primary" : ""}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">
      <i class="${escapeHTML(icon)}" aria-hidden="true"></i>
      ${escapeHTML(label)}
    </a>
  `;
};

if (projectsGrid) {
  projectsGrid.innerHTML = projects
    .map((project, index) => {
      const detailsId = `project-details-${index + 1}`;
      const technologies = (project.technologies || [])
        .map((technology) => `<span>${escapeHTML(technology)}</span>`)
        .join("");
      const highlights = (project.highlights || [])
        .map((highlight) => `<li>${escapeHTML(highlight)}</li>`)
        .join("");

      return `
        <article
          class="project-card"
          data-reveal
          data-size="${escapeHTML(project.size || "wide")}"
          style="--project-color: ${safeColor(project.color)}"
        >
          <div class="project-visual" aria-hidden="true">
            <span class="project-number">${escapeHTML(project.number || String(index + 1).padStart(2, "0"))}</span>
            <span class="project-icon"><i class="${escapeHTML(project.icon || "fas fa-code")}"></i></span>
            <span class="project-category">${escapeHTML(project.category)}</span>
          </div>
          <div class="project-body">
            <span class="project-status">${escapeHTML(project.status)}</span>
            <h3>${escapeHTML(project.title)}</h3>
            <p class="project-summary">${escapeHTML(project.summary)}</p>
            <div class="project-tech" aria-label="Technologies">${technologies}</div>
            <div class="project-actions">
              ${projectLink(
                project.repository,
                project.repositoryLabel || "Source code",
                "fab fa-github",
                true,
              )}
              ${projectLink(project.demo, "Live demo", "fas fa-arrow-up-right-from-square")}
              <button
                class="project-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="${detailsId}"
              >
                Project details <i class="fas fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <div class="project-details" id="${detailsId}">
              <div class="project-details-inner">
                <div class="project-details-content">
                  <p>${escapeHTML(project.details)}</p>
                  <ul class="project-highlights">${highlights}</ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

projectsGrid?.addEventListener("click", (event) => {
  const toggle = event.target.closest(".project-toggle");
  if (!toggle) return;

  const details = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!details) return;

  const willExpand = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(willExpand));
  toggle.firstChild.textContent = willExpand ? "Close details " : "Project details ";
  details.classList.toggle("is-expanded", willExpand);
});

/* Mobile navigation */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  navLinks?.classList.remove("is-open");
  body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
  navLinks?.classList.toggle("is-open", willOpen);
  body.classList.toggle("menu-open", willOpen);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (
    navLinks?.classList.contains("is-open") &&
    !event.target.closest(".navbar")
  ) {
    closeMenu();
  }
});

/* Scroll states */
const navbar = document.querySelector(".navbar");
const progressBar = document.querySelector(".scroll-progress");

const updateScrollState = () => {
  navbar?.classList.toggle("is-scrolled", window.scrollY > 32);

  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
  progressBar?.style.setProperty(
    "--scroll-progress",
    String(Math.min(1, Math.max(0, scrollProgress))),
  );
};

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();

/* Section reveals */
const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

/* Active navigation */
const sections = document.querySelectorAll("main section[id]");
const navigationAnchors = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationAnchors.forEach((anchor) => {
          anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* Pointer-led motion */
if (finePointer.matches && !prefersReducedMotion.matches) {
  document.addEventListener(
    "pointermove",
    (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    },
    { passive: true },
  );

  const hero = document.querySelector(".hero");
  const portrait = document.querySelector("[data-parallax]");

  hero?.addEventListener(
    "pointermove",
    (event) => {
      const bounds = hero.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
      const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
      portrait?.style.setProperty("--portrait-x", `${horizontal * 18}px`);
      portrait?.style.setProperty("--portrait-y", `${vertical * 16}px`);
    },
    { passive: true },
  );

  hero?.addEventListener("pointerleave", () => {
    portrait?.style.setProperty("--portrait-x", "0px");
    portrait?.style.setProperty("--portrait-y", "0px");
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--card-rx", `${y * -4}deg`);
        card.style.setProperty("--card-ry", `${x * 5}deg`);
      },
      { passive: true },
    );

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
    });
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener(
      "pointermove",
      (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.14;
        element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(-0.5deg)`;
      },
      { passive: true },
    );

    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("transform");
    });
  });
}

/* Keep motion preferences responsive if they change while the page is open. */
prefersReducedMotion.addEventListener("change", (event) => {
  if (event.matches) {
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => element.classList.add("is-visible"));
  }
});
