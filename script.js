// script.js
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bgVideo");

  // Attempt to play the background video
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.style.display = "none";
    });
  }

  // Modal logic
  const modal = document.getElementById("contactModal");
  // only target the contact button
  const contactBtn = document.querySelector(".signup-button.contact");
  // target the external button separately
  const externalBtn = document.querySelector(".signup-button.external");
  const tabs = document.querySelectorAll(".modal-tab");
  const contents = document.querySelectorAll(".tab-content");

  // Open modal when “contact” clicked
  contactBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // Open placeholder page in new tab when “visit” clicked
  externalBtn.addEventListener("click", () => {
    window.open("https://lu.ma/intouch-sessions?k=c", "_blank");
  });

  // Close modal when clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Deactivate all
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));
      // Activate clicked + matching content
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});
