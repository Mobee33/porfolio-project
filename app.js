(function () {
  // Select all elements with class of .section
  const sections = document.querySelectorAll('.section');
  // Select all control buttons
  const controlBtns = document.querySelectorAll('.control');
  // Select the main content element
  const mainContent = document.querySelector('.main-content');
  // Select the theme button
  const themeBtn = document.querySelector('.theme-btn');

  // Function to switch between sections
  function PageTransitions() {
    // Button click functionality
    for (let i = 0; i < controlBtns.length; i++) {
      controlBtns[i].addEventListener('click', function() {
        // Remove 'active-btn' class from the current active button
        document.querySelector('.active-btn').classList.remove('active-btn');
        // Add 'active-btn' class to the clicked button
        this.classList.add('active-btn');

        // Get the data-id attribute value from the clicked button
        const id = this.dataset.id;

        // Remove 'active' class from the current active section
        document.querySelector('.active').classList.remove('active');

        // Add 'active' class to the section with the corresponding id
        document.getElementById(id).classList.add('active');
      });
    }

    // Toggle theme
    themeBtn.addEventListener('click', () => {
      mainContent.classList.toggle('light-mode');

      // Optional: Save theme preference to localStorage
      if (mainContent.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Check if there's a saved theme preference
  function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      mainContent.classList.add('light-mode');
    }
  }

  // Initialize page transitions
  PageTransitions();

  // Check theme on page load
  checkTheme();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll('.portfolio-item, .progress-bar, .timeline-item, .about-item');

    elementsToAnimate.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };

  // Call animateOnScroll on page load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Add preloader
  window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 500);
  });

  // Add CSS for preloader and animations
  const style = document.createElement('style');
  style.textContent = `
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }

    .loader {
      width: 50px;
      height: 50px;
      border: 5px solid var(--color-grey-4);
      border-top: 5px solid var(--color-secondary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .portfolio-item,
    .progress-bar,
    .timeline-item,
    .about-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .portfolio-item.animate,
    .progress-bar.animate,
    .timeline-item.animate,
    .about-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
})();
