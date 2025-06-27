// Mobile User Panel Modal Functionality
(function() {
  'use strict';

  // Mobile detection function
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 1024;
  }

  // Show mobile modal
  function showMobileModal() {
    const modal = document.getElementById('mobileUserPanelModal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close mobile modal
  function closeMobileModal() {
    const modal = document.getElementById('mobileUserPanelModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  // Handle User Panel click
  function handleUserPanelClick(event) {
    if (isMobileDevice()) {
      event.preventDefault();
      event.stopPropagation();
      showMobileModal();
    } else {
      // Desktop behavior - redirect to User Panel
      window.location.href = "https://app.sogentmev.tech/";
    }
  }

  // Add click handlers to User Panel buttons when DOM is loaded
  function initializeMobileModal() {
    // Function to add click handler to a button
    function addUserPanelHandler(element) {
      if (element && !element.hasAttribute('data-user-panel-handler')) {
        element.setAttribute('data-user-panel-handler', 'true');
        element.addEventListener('click', handleUserPanelClick);
        console.log('User Panel handler added to:', element);
      }
    }

    // Find buttons by text content (more reliable)
    function findUserPanelButtons() {
      // Find all buttons and spans that might contain "User Panel"
      const allElements = document.querySelectorAll('button, span, a, div');
      
      allElements.forEach(element => {
        const elementText = (element.textContent || element.innerText || '').trim();
        if (elementText === 'User Panel' || elementText.includes('User Panel')) {
          // If it's a span inside a button, add handler to the button
          if (element.tagName === 'SPAN' && element.closest('button')) {
            addUserPanelHandler(element.closest('button'));
          } else if (element.tagName === 'BUTTON') {
            addUserPanelHandler(element);
          } else if (element.tagName === 'A') {
            addUserPanelHandler(element);
          }
        }
      });
    }

    // Initial search
    findUserPanelButtons();

    // Also search after a short delay to catch dynamically added elements
    setTimeout(findUserPanelButtons, 500);
    setTimeout(findUserPanelButtons, 1000);
  }

  // Close modal when clicking outside
  function handleOutsideClick(event) {
    const modal = document.getElementById('mobileUserPanelModal');
    if (modal && !modal.contains(event.target) && !modal.classList.contains('hidden')) {
      closeMobileModal();
    }
  }

  // Close modal with Escape key
  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      closeMobileModal();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileModal);
  } else {
    initializeMobileModal();
  }

  // Add event listeners
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapeKey);

  // Make functions globally available
  window.showMobileModal = showMobileModal;
  window.closeMobileModal = closeMobileModal;
  window.handleUserPanelClick = handleUserPanelClick;
  window.isMobileDevice = isMobileDevice;

})(); 