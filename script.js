// script.js
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bgVideo");

  // Attempt to play the background video
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise
      .catch(() => {
        video.style.display = "none";
      });
  }

  // Modal logic
  const modal = document.getElementById("contactModal");
  const openBtn = document.querySelector(".signup-button");
  const tabs = document.querySelectorAll(".modal-tab");
  const contents = document.querySelectorAll(".tab-content");

  // Open modal
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // Close when clicking outside content
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
      document
        .getElementById(tab.dataset.tab)
        .classList.add("active");
    });
  });
});
