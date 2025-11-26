const UMBRELLA_IMAGES = {
  pink: "assets/pink umbrella.png",
  blue: "assets/Blue umbrella.png",
  yellow: "assets/Yellow umbrella.png",
};

const umbrellaImage = document.getElementById("umbrellaImage");
const colorSwatches = document.getElementById("colorSwatches");
const logoImage = document.getElementById("logoImage");
const logoInput = document.getElementById("logoInput");
const fileNameLabel = document.getElementById("fileName");
const removeLogoBtn = document.getElementById("removeLogoBtn");
const loader = document.getElementById("loader");

let currentColor = "blue";

function startLoading() {
  document.body.classList.add("is-loading");
  loader.style.display = "block";
  umbrellaImage.style.opacity = "0";
}

function stopLoading() {
  loader.style.display = "none";
  document.body.classList.remove("is-loading");
  umbrellaImage.style.opacity = "1";
}

function clearLogo() {
  logoImage.src = "";
  logoInput.value = "";
  document.body.classList.remove("has-logo");
}

colorSwatches.addEventListener("click", (event) => {
  const button = event.target.closest(".color-dot");
  if (!button) return;

  const color = button.getAttribute("data-color");
  if (!color || color === currentColor) return;

  const newSrc = UMBRELLA_IMAGES[color];
  if (!newSrc) return;

  currentColor = color;
  document.body.setAttribute("data-theme", color);

  startLoading();

  const img = new Image();
  img.src = newSrc;

  img.onload = () => {
    setTimeout(() => {
      umbrellaImage.src = newSrc;
      stopLoading();
    }, 2000);
  };

  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.classList.remove("is-active");
  });
  button.classList.add("is-active");
});

logoInput.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    clearLogo();
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    logoImage.src = e.target.result;
    document.body.classList.add("has-logo");
  };

  reader.readAsDataURL(file);
});

removeLogoBtn.addEventListener("click", () => {
  clearLogo();
});
