const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
// Loader başlayanda scroll-u bağla
document.body.classList.add("no-scroll");

// Səhifə yüklənəndə loaderi gizlət + scroll aç
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-menu");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    document.body.classList.remove("no-scroll"); // scroll açılır
  }, 1000);
});

// Refresh zamanı yenə bağla
window.addEventListener("beforeunload", () => {
  document.body.classList.add("no-scroll");

  const loader = document.querySelector(".loader-menu");
  loader.style.opacity = "1";
  loader.style.visibility = "visible";
});
AOS.init();