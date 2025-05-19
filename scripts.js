// Welcome message
console.log("Welcome to Marika Tattoo.");

// Glitch effect on image hover
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.classList.add('glitch-effect');
  });
  img.addEventListener('mouseleave', () => {
    img.classList.remove('glitch-effect');
  });
});

// Fade in sections on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});
