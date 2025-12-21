/* ================= REVEAL ON SCROLL ================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load


/* ================= NAVIGATION LOGIC ================= */

// Map of Nav IDs to Section Selectors
const navMap = {
  "aboutLink": ".about-section",
  "resumeLink": ".resume-panel",
  "portfolioLink": ".portfolio-panel",
  "blogsLink": ".blogs-panel",
  "certificationsLink": ".certifications-panel",
  "contactLink": ".contact-panel"
};

// Function to Show a Specific Section
function showSection(triggerId) {
  // 1. Hide ALL sections
  Object.values(navMap).forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.style.display = "none";
  });

  // 2. Show the TARGET section
  const targetSelector = navMap[triggerId];
  const targetEl = document.querySelector(targetSelector);
  if (targetEl) {
    targetEl.style.display = "block";
    targetEl.style.animation = "none"; // Reset animation
    targetEl.offsetHeight; /* trigger reflow */
    targetEl.style.animation = null; 
  }

  // 3. Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 4. Update Header Active State
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  navLinks.forEach(link => link.classList.remove("active"));
  
  const activeLink = document.getElementById(triggerId);
  if (activeLink) activeLink.classList.add("active");
}

// Add Event Listeners
Object.keys(navMap).forEach(linkId => {
  const link = document.getElementById(linkId);
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(linkId);
    });
  }
});


/* ================= NAVBAR ACTIVE STATE (EXTRA SAFETY) ================= */
// (Optional: If there are other links not in map, handle them here if needed)

/* ================= DEFAULT STATE ================= */
document.addEventListener("DOMContentLoaded", () => {
    // Show About by default, hide others
    showSection("aboutLink");
});

/* ================= PORTFOLIO FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

