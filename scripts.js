<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
  // Glitch effect placeholder
console.log("Welcome to Marika Tattoo.");

document.addEventListener('DOMContentLoaded', () => {
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

  // Initialize PhotoSwipe Lightbox
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery, .support-crew',
    children: 'a',
    pswpModule: PhotoSwipe,
    zoom: true,
    pinchToClose: false,
  });
  lightbox.init();
});
