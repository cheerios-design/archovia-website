// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu-2");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});
