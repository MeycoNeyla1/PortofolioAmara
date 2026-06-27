// --- Pre-loader ---
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  // Add a slight delay so animations can be seen
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 2000);
});

// --- Custom Cursor ---
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Disable custom cursor on touch devices
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows exactly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth animation for outline
  const animateCursor = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    outlineX += distX * 0.2;
    outlineY += distY * 0.2;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover effects on clickable elements
  const clickables = document.querySelectorAll('a, button, .cert-item, input, textarea');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('cursor-hover');
    });
  });
}

// --- Sticky Navbar ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Typewriter Effect ---
const words = ["Siswa Kimia Industri", "Videographers", "Photographers", "Editor"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  
  typewriterElement.textContent = currentWord.substring(0, charIndex);
  
  let typingSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 2000; // Pause at the end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500; // Pause before typing next word
  }
  
  setTimeout(typeEffect, typingSpeed);
}
// Start typewriter
setTimeout(typeEffect, 2500);

// --- 3D Tilt Badge Effect ---
const tiltBadge = document.getElementById('tilt-badge');

if (!isTouchDevice && tiltBadge) {
  tiltBadge.addEventListener('mousemove', (e) => {
    const rect = tiltBadge.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -15; // Max 15deg
    const tiltY = ((x - centerX) / centerX) * 15;
    
    tiltBadge.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  tiltBadge.addEventListener('mouseleave', () => {
    tiltBadge.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

// --- Tab Navigation ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// --- Modals & Lightbox ---
const detailsBtns = document.querySelectorAll('.details-btn');
const modals = document.querySelectorAll('.modal');
const closeModals = document.querySelectorAll('.close-modal');

// Open Modal
detailsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('show');
    }
  });
});

// Close Modal
closeModals.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('show');
  });
});

// Close Modal on outside click
window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

window.openLightbox = (src) => {
  lightboxImg.src = encodeURI(src);
  lightbox.classList.add('show');
}

if(closeLightbox) {
    closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
    });
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
  }
});



// --- Scroll Fade In Up Animation ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Uncomment the line below if you want the animation to happen only once
      // observer.unobserve(entry.target); 
    } else {
      // Remove this else block if you only want it to animate once (not every time you scroll)
      entry.target.classList.remove('visible'); 
    }
  });
}, observerOptions);

// Initialize observer on elements with .fade-in-up when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => observer.observe(el));
});
