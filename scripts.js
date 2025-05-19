<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Marika Tattoo</title>
  <style>
    /* Fade-in effect */
    .section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
  <!-- Include PhotoSwipe CSS and JS here -->
  <!--
  <link rel="stylesheet" href="path-to-photoswipe.css" />
  <script src="path-to-photoswipe.min.js"></script>
  <script src="path-to-photoswipe-lightbox.min.js"></script>
  -->
</head>
<body>

  <section class="section">Section 1 content</section>
  <section class="section">Section 2 content</section>

  <div id="gallery" class="support-crew">
    <a href="image1.jpg" data-pswp-width="1200" data-pswp-height="800" target="_blank">
      <img src="thumb1.jpg" alt="Tattoo 1" />
    </a>
    <a href="image2.jpg" data-pswp-width="1200" data-pswp-height="800" target="_blank">
      <img src="thumb2.jpg" alt="Tattoo 2" />
    </a>
  </div>

  <script>
    console.log("Marika Tattoo");

    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('.section');

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      sections.forEach(section => observer.observe(section));

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
  </script>

</body>
</html>
