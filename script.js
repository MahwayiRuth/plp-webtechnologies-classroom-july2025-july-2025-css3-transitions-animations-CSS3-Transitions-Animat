// Global variable for theme state (Part 2: Scope demonstration)
let isDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {
  // Part 2: Reusable function to toggle animations with parameters and return value
  function toggleAnimation(element, animationClass) {
    if (!element) return false;
    element.classList.toggle(animationClass);
    return element.classList.contains(animationClass);
  }

  // Part 2: Reusable function for input validation with parameters and return value
  function validateInput(value, type, maxLength = null) {
    let isValid = true;
    let errorMessage = '';

    if (type === 'name') {
      if (value === '') {
        isValid = false;
        errorMessage = 'Name is required.';
      } else if (value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters.';
      }
    } else if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    } else if (type === 'remarks') {
      if (value === '') {
        isValid = false;
        errorMessage = 'Your Questions/Remarks are required.';
      } else if (maxLength && value.length > maxLength) {
        isValid = false;
        errorMessage = `Your Questions/Remarks must not exceed ${maxLength} characters.`;
      }
    }

    return { isValid, errorMessage };
  }

  // Section 1: Project Details Toggle
  const viewButton = document.getElementById('viewProjects');
  if (viewButton) {
    const projectCards = document.getElementById('projectCards');
    let isVisible = false; // Local scope (Part 2)

    viewButton.addEventListener('click', () => {
      isVisible = !isVisible;
      const cards = projectCards.getElementsByClassName('card');
      for (let card of cards) {
        toggleAnimation(card, 'expanded'); // Part 2: Using reusable function
      }
      viewButton.textContent = isVisible ? 'Hide Projects' : 'View Projects';
    });
  } else {
    console.log('View Projects button not found');
  }

  // Section 2: Card Highlight and Expand
  const cards = document.getElementsByClassName('card');
  if (cards.length > 0) {
    for (let card of cards) {
      card.addEventListener('mouseover', () => {
        toggleAnimation(card, 'highlight'); // Part 2: Using reusable function
      });
      card.addEventListener('mouseout', () => {
        card.classList.remove('highlight');
      });
      const expandBtn = card.querySelector('.expand-btn');
      if (expandBtn) {
        expandBtn.addEventListener('click', () => {
          const isExpanded = toggleAnimation(card, 'expanded'); // Part 3: Triggers card flip
          expandBtn.textContent = isExpanded ? 'Hide Details' : 'View Details';
        });
      } else {
        console.log('Expand button not found in a card');
      }
    }
  } else {
    console.log('No cards found');
  }

  // Section 3: Welcome Message
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (welcomeMessage) {
    document.addEventListener('keydown', () => {
      toggleAnimation(welcomeMessage, 'show'); // Part 2: Using reusable function
      setTimeout(() => {
        welcomeMessage.classList.remove('show');
        welcomeMessage.style.display = 'none';
      }, 3000);
    });
  } else {
    console.log('Welcome message element not found');
  }

  // Section 4: Light/Dark Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDarkMode = toggleAnimation(document.body, 'dark-mode'); // Part 2: Update global variable
      themeToggle.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
  } else {
    console.log('Theme Toggle button not found');
  }

  // Section 5: Form Validation with Modal
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const modal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');

  if (form && feedback && modal && closeModal) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const remarks = document.getElementById('remarks').value.trim();

      // Part 2: Use reusable validation function
      const nameValidation = validateInput(name, 'name');
      const emailValidation = validateInput(email, 'email');
      const remarksValidation = validateInput(remarks, 'remarks', 350);

      if (!nameValidation.isValid) {
        feedback.textContent = nameValidation.errorMessage;
        feedback.className = 'error';
      } else if (!emailValidation.isValid) {
        feedback.textContent = emailValidation.errorMessage;
        feedback.className = 'error';
      } else if (!remarksValidation.isValid) {
        feedback.textContent = remarksValidation.errorMessage;
        feedback.className = 'error';
      } else {
        feedback.textContent = '';
        toggleAnimation(modal, 'show'); // Part 3: Show modal with animation
        form.reset();
      }
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('show'); // Part 3: Hide modal
    });
  } else {
    console.log('Form, feedback, or modal elements not found');
  }

  // Section 6: Navigation Scroll
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
