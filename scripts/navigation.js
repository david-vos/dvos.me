document.addEventListener("DOMContentLoaded", () => {
  const cursorBall = document.querySelector(".cursor-ball");
  const cursorOutline = document.querySelector(".cursor-outline");
  const links = document.querySelectorAll(".social-links a");

  let mouseX = 0, mouseY = 0; // Mouse position
  let cursorX = 0, cursorY = 0; // Cursor outline position
  const easing = 0.1; // Adjust easing for smoother movement

  // Ensure elements exist before adding event listeners
  if (cursorBall && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      // Directly move the cursor-ball for instant response
      mouseX = e.pageX;
      mouseY = e.pageY;

      cursorBall.style.top = `${mouseY}px`;
      cursorBall.style.left = `${mouseX}px`;
    });

    function animateCursor() {
      // Smoothly interpolate the cursorOutline position
      cursorX += (mouseX - cursorX) * easing;
      cursorY += (mouseY - cursorY) * easing;

      cursorOutline.style.top = `${cursorY}px`;
      cursorOutline.style.left = `${cursorX}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        cursorOutline.classList.add("cursor-mousedown");
      }
    });

    document.addEventListener("mouseup", () => {
      cursorOutline.classList.remove("cursor-mousedown");
    });

    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        cursorOutline.classList.add("scale-link");
        link.classList.add("hovered-link");

        link.addEventListener("mouseleave", () => {
          cursorOutline.classList.remove("scale-link");
          link.classList.remove("hovered-link");
        });
      });
    });
  } else {
    console.error("Cursor elements not found in the DOM.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Map of navigation elements and their corresponding text sections
  const navMapping = {
    "nav-home": "main-text-home",
    "nav-about": "main-text-about",
    "nav-projects": "main-text-projects",
    "nav-inspiration": "main-text-inspiration",
    "nav-contact": "main-text-contact"
  };

  // Get all nav elements
  const navItems = document.querySelectorAll(".nav-container a");

  // Function to update active styles for the nav menu
  const updateNavStyles = (activeNavClass) => {
    navItems.forEach(navItem => {
      if (navItem.classList.contains(activeNavClass)) {
       navItem.classList.add("active-nav");
       navItem.classList.remove("inactive-nav");
      } else {
       navItem.classList.add("inactive-nav");
       navItem.classList.remove("active-nav"); 
      }
    });
  };

  // Attach event listeners to each nav item
  navItems.forEach(navItem => {
    navItem.addEventListener("click", () => {
      // Get the ID of the corresponding text section
      const targetId = navMapping[navItem.classList[0]];
      
      if (targetId) {
        // Hide all main text sections
        Object.values(navMapping).forEach(id => {
          const section = document.getElementById(id);
          if (section) {
            section.style.display = "none";
          }
        });

        // Show the selected text section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = "block";
        }

        // Update navigation menu styles
        updateNavStyles(navItem.classList[0]);
      }
    });
  });

  // Set default active section (optional)
  const defaultNavClass = "nav-home";
  document.querySelector(`.${defaultNavClass}`).click();
});

