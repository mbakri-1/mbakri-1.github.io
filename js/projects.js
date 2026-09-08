/*
 * EDIT PROJECTS HERE
 * ------------------
 * Duplicate one object to add a new project.
 * Use a direct repository or live-demo URL when you have one.
 * Set a link to null when it is not ready to publish yet.
 */
window.PORTFOLIO_PROJECTS = [
  {
    number: "01",
    title: "Multi-Tenant Business Agent Platform",
    category: "AI platform",
    status: "Platform build",
    summary:
      "A configurable business-agent platform with isolated tenant data, guided onboarding, routing, and conversation workflows.",
    details:
      "The project explores how one core agent product can support multiple businesses without mixing their data, settings, or customer experiences.",
    highlights: [
      "Tenant-scoped data models and application logic",
      "Configurable FAQs, channels, and routing rules",
      "Customer, conversation, and message workflows",
    ],
    technologies: ["FastAPI", "PostgreSQL", "React"],
    repository: "https://github.com/mbakri-1",
    repositoryLabel: "GitHub profile",
    demo: null,
    icon: "fas fa-robot",
    color: "#d44331",
    size: "wide",
  },
  {
    number: "02",
    title: "MediCore HMS Backend",
    category: "Health systems",
    status: "Backend system",
    summary:
      "A hospital management backend designed around patients, appointments, clinical records, and dependable API structure.",
    details:
      "MediCore focuses on the domain logic behind a healthcare platform and the relationships required to keep operational data organized.",
    highlights: [
      "Patient and appointment domain modeling",
      "Structured REST API endpoints",
      "Relational database design and ORM workflows",
    ],
    technologies: ["Python", "FastAPI", "SQL"],
    repository: "https://github.com/mbakri-1",
    repositoryLabel: "GitHub profile",
    demo: null,
    icon: "fas fa-heart-pulse",
    color: "#5962ef",
    size: "compact",
  },
  {
    number: "03",
    title: "Data Science & Machine Learning",
    category: "Applied ML",
    status: "Academic collection",
    summary:
      "A growing set of analytical projects spanning data preparation, model development, evaluation, and visual explanation.",
    details:
      "These projects document my process from an imperfect dataset to a defensible result, with attention to what a model can—and cannot—tell us.",
    highlights: [
      "Exploratory data analysis and cleaning",
      "Machine-learning training and evaluation",
      "Clear visual communication of findings",
    ],
    technologies: ["Python", "Pandas", "Machine Learning"],
    repository: "https://github.com/mbakri-1",
    repositoryLabel: "GitHub profile",
    demo: null,
    icon: "fas fa-chart-line",
    color: "#b8e53d",
    size: "full",
  },
];
