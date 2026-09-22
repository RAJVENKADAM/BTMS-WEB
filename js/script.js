document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  reveals.forEach((el) => observer.observe(el));

  const workflowLinks = document.querySelectorAll(".workflow-nav a");
  const sections = [...workflowLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (workflowLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          workflowLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(
            `.workflow-nav a[href="#${entry.target.id}"]`,
          );
          if (active) active.classList.add("active");
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".btms-demo-video");
    const errorBox = document.querySelector(".video-error");

    if (!video || !errorBox) return;

    video.addEventListener("error", () => {
      errorBox.style.display = "flex";
    });

    video.addEventListener("loadeddata", () => {
      errorBox.style.display = "none";
    });
  });
  // Small moving signal on the GPS pipeline.
  document.querySelectorAll(".pipeline").forEach((pipeline) => {
    const nodes = pipeline.querySelectorAll("i");
    nodes.forEach((node, index) => {
      const dot = document.createElement("span");
      dot.className = "pipeline-dot";
      dot.style.cssText = `
        position:absolute;width:6px;height:6px;border-radius:50%;
        background:#0A66C2;top:-3px;left:0;
        opacity:0;transition:opacity .2s;
      `;
      node.style.position = "relative";
      node.appendChild(dot);
      let progress = 0;
      setInterval(
        () => {
          progress += 0.035;
          if (progress > 1) progress = 0;
          dot.style.left = `${progress * 100}%`;
          dot.style.opacity = progress > 0.03 && progress < 0.97 ? "1" : "0";
        },
        45 + index * 20,
      );
    });
  });
});
