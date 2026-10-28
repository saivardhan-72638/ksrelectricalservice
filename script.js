// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

function closeMenu() {
  if (!menuButton || !nav) return;
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

// Footer copyright year
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Project gallery filters
const projectFilters = [...document.querySelectorAll('.project-filter')];
const projectCards = [...document.querySelectorAll('.project-card[data-category]')];
const galleryEmpty = document.querySelector('.gallery-empty');

projectFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    projectFilters.forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle('is-active', active);
      filterButton.setAttribute('aria-pressed', String(active));
    });

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const visible = selected === 'all' || categories.includes(selected);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (galleryEmpty) galleryEmpty.hidden = visibleCount > 0;
  });
});

// Accessible project photo viewer. Navigation follows the currently visible gallery cards.
const lightbox = document.querySelector('#gallery-lightbox');

if (lightbox) {
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxCount = lightbox.querySelector('.lightbox-count');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const previousButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  const galleryLinks = [...document.querySelectorAll('.project-image[data-gallery-index]')];

  let currentPhoto = 0;
  let visibleGalleryLinks = [];
  let previousFocus = null;
  let previousBodyOverflow = '';

  function getVisibleGalleryLinks() {
    return galleryLinks.filter((link) => {
      const card = link.closest('.project-card');
      return card && !card.hidden;
    });
  }

  function showPhoto(index) {
    if (!visibleGalleryLinks.length) return;

    currentPhoto = (index + visibleGalleryLinks.length) % visibleGalleryLinks.length;
    const link = visibleGalleryLinks[currentPhoto];
    const image = link.querySelector('img');
    const caption = image?.alt || 'Project photo';

    lightboxImage.src = link.href;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightboxCount.textContent = `${currentPhoto + 1} / ${visibleGalleryLinks.length}`;

    const onlyOnePhoto = visibleGalleryLinks.length <= 1;
    previousButton.disabled = onlyOnePhoto;
    nextButton.disabled = onlyOnePhoto;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = previousBodyOverflow;

    if (previousFocus && !previousFocus.closest('.project-card')?.hidden) {
      previousFocus.focus();
    } else {
      document.querySelector('.project-filter.is-active')?.focus();
    }
  }

  galleryLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      visibleGalleryLinks = getVisibleGalleryLinks();
      currentPhoto = visibleGalleryLinks.indexOf(link);
      if (currentPhoto < 0) return;

      previousFocus = link;
      previousBodyOverflow = document.body.style.overflow;
      showPhoto(currentPhoto);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => showPhoto(currentPhoto - 1));
  nextButton.addEventListener('click', () => showPhoto(currentPhoto + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) {
      if (event.key === 'Escape') closeMenu();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPhoto(currentPhoto - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentPhoto + 1);
      return;
    }

    // Keep keyboard focus inside the modal photo viewer.
    if (event.key === 'Tab') {
      const focusableElements = [closeButton, previousButton, nextButton].filter(
        (element) => !element.disabled
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
}
