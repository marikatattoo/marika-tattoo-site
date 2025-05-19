// Welcome message
console.log("Welcome to Marika Tattoo.");

// Fade in sections on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      obs.unobserve(entry.target); // Stop observing once faded in
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});