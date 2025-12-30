document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let isAnimating = false;

  function easeOutQuad(t) {
    return t * (2 - t); // easing effect
  }

  function animateCounters() {
    if (isAnimating) return; // prevent overlap
    isAnimating = true;

    const duration = 2000; // total animation time (2s)
    const startTime = performance.now();

    function update() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const isPercent = counter.dataset.format === "percent";
        const isPlus = counter.dataset.format === "plus";
        const isYears = counter.dataset.format === "years";

        const value = Math.floor(target * easedProgress);

        if (isPercent) counter.textContent = value + "%";
        else if (isPlus && isYears) counter.textContent = value + "+ Years";
        else if (isPlus) counter.textContent = value + "+";
        else counter.textContent = value;
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Ensure exact final values
        counters.forEach(counter => {
          const target = +counter.getAttribute("data-target");
          const isPercent = counter.dataset.format === "percent";
          const isPlus = counter.dataset.format === "plus";
          const isYears = counter.dataset.format === "years";

          if (isPercent) counter.textContent = target + "%";
          else if (isPlus && isYears) counter.textContent = target + "+ Years";
          else if (isPlus) counter.textContent = target + "+";
          else counter.textContent = target;
        });

        isAnimating = false; // allow re-trigger
      }
    }

    requestAnimationFrame(update);
  }

  // detect when section enters view (using IntersectionObserver for better performance)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(".stats-section"));
});
