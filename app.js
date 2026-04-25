const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
// Səhifə tam yüklənəndə loaderi gizlət
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-menu");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 1000); // 0.5 saniyə gecikmə (istəsən dəyiş)
});


// Refresh və ya başqa səhifəyə keçəndə loaderi yenə göstər
window.addEventListener("beforeunload", () => {
  const loader = document.querySelector(".loader-menu");

  loader.style.opacity = "1";
  loader.style.visibility = "visible";
});
