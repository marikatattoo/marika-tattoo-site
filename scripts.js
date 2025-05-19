document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery img');

  galleryImages.forEach(img => {
    let scale = 1;
    let lastScale = 1;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let lastTouchEnd = 0;
    let initialDistance = null;

    // Reset transform helper
    function resetTransform() {
      scale = 1;
      lastScale = 1;
      posX = 0;
      posY = 0;
      lastX = 0;
      lastY = 0;
      img.style.transform = 'translate(0,0) scale(1)';
    }

    // Apply transform
    function applyTransform() {
      img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    // Get distance between two touches
    function getDistance(touches) {
      const [touch1, touch2] = touches;
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.hypot(dx, dy);
    }

    // Double tap to toggle zoom
    img.addEventListener('touchend', e => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        // Double tap detected
        if (scale > 1) {
          resetTransform();
        } else {
          // Zoom in centered on the tap
          scale = 2;
          lastScale = scale;

          // Calculate tap position relative to image
          const rect = img.getBoundingClientRect();
          const tapX = e.changedTouches[0].clientX - rect.left;
          const tapY = e.changedTouches[0].clientY - rect.top;

          // Translate so zoom centers on tap
          posX = -(tapX * (scale - 1));
          posY = -(tapY * (scale - 1));
          lastX = posX;
          lastY = posY;
          applyTransform();
        }
      }
      lastTouchEnd = now;
    });

    // Pinch to zoom start
    img.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches);
      } else if (scale > 1 && e.touches.length === 1) {
        // Start dragging
        isDragging = true;
        startX = e.touches[0].clientX - lastX;
        startY = e.touches[0].clientY - lastY;
      }
    });

    // Pinch to zoom move & drag
    img.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        e.preventDefault(); // prevent scroll

        const currentDistance = getDistance(e.touches);
        if (!initialDistance) initialDistance = currentDistance;

        let newScale = (currentDistance / initialDistance) * lastScale;

        // Clamp scale between 1 and 4
        newScale = Math.min(Math.max(1, newScale), 4);
        scale = newScale;
        applyTransform();
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        e.preventDefault(); // prevent scroll
        posX = e.touches[0].clientX - startX;
        posY = e.touches[0].clientY - startY;
        lastX = posX;
        lastY = posY;
        applyTransform();
      }
    });

    // Pinch end & drag end
    img.addEventListener('touchend', e => {
      if (e.touches.length < 2) {
        lastScale = scale;
        initialDistance = null;
      }
      if (e.touches.length === 0) {
        isDragging = false;

        // If zoomed out too much, reset
        if (scale < 1.05) {
          resetTransform();
        }
      }
    });

    // Mouse wheel zoom for desktop
    img.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = img.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate new scale
      let delta = e.deltaY > 0 ? -0.1 : 0.1;
      let newScale = scale + delta;

      newScale = Math.min(Math.max(1, newScale), 4);

      // Calculate new position so zoom centers on mouse
      posX -= (mouseX / scale) * delta;
      posY -= (mouseY / scale) * delta;

      scale = newScale;
      lastScale = scale;
      lastX = posX;
      lastY = posY;
      applyTransform();
    });

    // Mouse drag to pan when zoomed
    img.addEventListener('mousedown', e => {
      if (scale <= 1) return;

      isDragging = true;
      startX = e.clientX - lastX;
      startY = e.clientY - lastY;

      img.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();

      posX = e.clientX - startX;
      posY = e.clientY - startY;
      lastX = posX;
      lastY = posY;
      applyTransform();
    });

    document.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      img.style.cursor = 'pointer';
    });
  });
});