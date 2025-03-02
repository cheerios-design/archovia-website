// Google Translate Initialization
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "tr",
      includedLanguages: "en,tr",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

// Load Google Translate Script
const script = document.createElement("script");
script.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
script.async = true; // Load script asynchronously
document.body.appendChild(script);

let currentLang = "tr"; // Track current language

// Trigger Language Translation on Click
document
  .querySelector("a[href='#language_popup']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    if (window.google && window.google.translate) {
      toggleLanguage();
    } else {
      console.log("Google Translate is still loading...");
    }
  });

// Function to Toggle Language
function toggleLanguage() {
  const iframe = document.querySelector("iframe.goog-te-banner-frame");
  const translateSelect = document.querySelector(".goog-te-combo");

  if (translateSelect) {
    if (currentLang === "tr") {
      translateSelect.value = "en";
      currentLang = "en";
    } else {
      translateSelect.value = "tr";
      currentLang = "tr";
    }
    translateSelect.dispatchEvent(new Event("change"));
  }

  // Hide Google Translate Banner if it appears
  if (iframe) {
    iframe.style.display = "block";
  }
}
