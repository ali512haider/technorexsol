document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle("active");
  });
});


function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let current = start;
    let range = end - start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));

    let timer = setInterval(function () {
        current += increment;
        obj.textContent = current + "%";
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Trigger animation on scroll using Intersection Observer
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter("counter", 0, 99, 2000); // Start animation
            observer.unobserve(entry.target); // Run only once
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% visible

observer.observe(document.querySelector(".stat"));
