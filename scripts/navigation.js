document.addEventListener("DOMContentLoaded", () => {
  // Map of navigation elements and their corresponding text sections
  const navMapping = {
    "nav-home": "main-text-home",
    "nav-about": "main-text-about",
    "nav-projects": "main-text-projects",
    "nav-inspiration": "main-text-inspiration",
    "nav-contact": "main-text-contact",
  };

  // Get all nav elements
  const navItems = document.querySelectorAll(".nav-container a");

  // Function to update active styles for the nav menu
  const updateNavStyles = (activeNavClass) => {
    navItems.forEach((navItem) => {
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
  navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      // Get the ID of the corresponding text section
      const targetId = navMapping[navItem.classList[0]];

      if (targetId) {
        // Hide all main text sections
        Object.values(navMapping).forEach((id) => {
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

function switchMode(mode) {
  // Update URL with the selected mode
  const url = new URL(window.location);
  url.searchParams.set("mode", mode);
  window.location.href = url.toString();
}

// On page load, check for mode parameter and load appropriate script
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");

  // Update mode switcher buttons based on current mode
  const modeSwitchers = document.querySelectorAll(".mode-switcher");
  if (modeSwitchers.length >= 2) {
    if (mode === "white") {
      modeSwitchers[0].textContent = "white [#]";
      modeSwitchers[1].textContent = "dark [ ]";
    } else {
      modeSwitchers[0].textContent = "white [ ]";
      modeSwitchers[1].textContent = "dark [#]";
    }
  }

  // Load appropriate script based on mode
  if (mode === "white") {
    // Apply white mode text colors
    document
      .querySelectorAll(
        ".main-text, .main-title, .under-title, .nav-container a"
      )
      .forEach((el) => {
        el.style.color = "black";
      });

    document.querySelectorAll(".text-shadow").forEach((el) => {
      el.style.textShadow = "0 0 5px #000000";
    });

    document.querySelectorAll(".canvas-container").forEach((el) => {
      el.style.borderColor = "black";
    });

    document
      .querySelectorAll(".vertical-link a, .vertical-legacy-page a")
      .forEach((el) => {
        el.style.color = "#ffffff";
      });

    // Remove the default script
    const defaultScript = document.querySelector(
      'script[src="./scripts/script.js"]'
    );
    if (defaultScript) {
      defaultScript.remove();
    }

    // Load the legacy script
    const legacyScript = document.createElement("script");
    legacyScript.src = "./legacy/script.js";
    document.body.appendChild(legacyScript);
  }
});
