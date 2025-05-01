document.addEventListener('DOMContentLoaded', function() {
    // Set current year in the footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  
    // Mobile navigation toggle (if we decide to add it later)
    // Example of functionality that could be added:
    // const mobileMenuButton = document.querySelector('.mobile-menu-button');
    // const mobileMenu = document.querySelector('.mobile-menu');
    // if (mobileMenuButton && mobileMenu) {
    //   mobileMenuButton.addEventListener('click', () => {
    //     mobileMenu.classList.toggle('active');
    //   });
    // }
  
    // Simple animation for stats counting (optional enhancement)
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(statNumber => {
      const finalValue = parseInt(statNumber.textContent);
      if (!isNaN(finalValue)) {
        let startValue = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const increment = finalValue / (duration / interval);
        
        const counter = setInterval(() => {
          startValue += increment;
          if (startValue >= finalValue) {
            statNumber.textContent = finalValue + (statNumber.textContent.includes('%') ? '%' : '+');
            clearInterval(counter);
          } else {
            statNumber.textContent = Math.floor(startValue) + (statNumber.textContent.includes('%') ? '%' : '+');
          }
        }, interval);
      }
    });
  });
  
  // Function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Add fade-in animation to elements when they come into view
  const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll('.process-step, .faq-card, .benefit-card');
    
    elementsToAnimate.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.animation = 'fadeIn 0.6s ease-out forwards';
      }
    });
  };
  
  // Initial check and add scroll event listener
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Add fadeIn keyframe animation
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animated {
      opacity: 0;
    }
  `;
  document.head.appendChild(styleSheet);