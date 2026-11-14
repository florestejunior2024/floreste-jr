const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();


/* Ampliação das fotografias do portfólio */
(() => {
  const portfolioImages = document.querySelectorAll(
    ".portfolio-project .portfolio-cover img, .portfolio-project .portfolio-gallery img"
  );
  if (!portfolioImages.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "portfolio-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Fotografia ampliada");

  const inner = document.createElement("div");
  inner.className = "portfolio-lightbox-inner";

  const closeButton = document.createElement("button");
  closeButton.className = "portfolio-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Fechar fotografia");
  closeButton.innerHTML = "&times;";

  const enlarged = document.createElement("img");
  const caption = document.createElement("p");
  caption.className = "portfolio-lightbox-caption";

  inner.append(closeButton, enlarged, caption);
  lightbox.append(inner);
  document.body.append(lightbox);

  let previousFocus = null;

  const close = () => {
    lightbox.classList.remove("is-open");
    enlarged.removeAttribute("src");
    if (previousFocus) previousFocus.focus();
  };

  const open = (image) => {
    previousFocus = document.activeElement;
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt;
    const figureCaption = image.closest("figure")?.querySelector("figcaption");
    caption.textContent = figureCaption?.textContent || image.alt;
    lightbox.classList.add("is-open");
    closeButton.focus();
  };

  portfolioImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Ampliar fotografia: ${image.alt}`);
    image.addEventListener("click", () => open(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(image);
      }
    });
  });

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) close();
  });
})();
