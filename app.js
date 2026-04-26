const root = document.documentElement;

// Marquee content tapılma yoxlaması
const marqueeContent = document.querySelector("ul.marquee-content");
if (!marqueeContent) {
  console.error("Marquee content tapılmadı!");
} else {
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
  root.style.setProperty("--marquee-elements", marqueeContent.children.length);

  for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }
}

// Loader başlayanda scroll-u bağla
document.body.classList.add("no-scroll");

// Səhifə yüklənəndə loaderi gizlət + scroll aç
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-menu");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      document.body.classList.remove("no-scroll"); // scroll açılır
    }, 1000);
  } else {
    console.error("Loader tapılmadı!");
  }
});

// Refresh zamanı yenə bağla
window.addEventListener("beforeunload", () => {
  document.body.classList.add("no-scroll");

  const loader = document.querySelector(".loader-menu");
  if (loader) {
    loader.style.opacity = "1";
    loader.style.visibility = "visible";
  } else {
    console.error("Loader tapılmadı!");
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    let currentImageIndex = 0;

    // Function to update the main image
    function updateMainImage(index) {
        mainImage.src = thumbnails[index].src.replace('100x100', '400x400');
        currentImageIndex = index;
    }

    // Add event listeners for thumbnail clicks
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    // Next and Prev buttons for image carousel
    document.querySelector('.next').addEventListener('click', () => {
        if (currentImageIndex < thumbnails.length - 1) {
            updateMainImage(currentImageIndex + 1);
        } else {
            updateMainImage(0);
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentImageIndex > 0) {
            updateMainImage(currentImageIndex - 1);
        } else {
            updateMainImage(thumbnails.length - 1);
        }
    });
});
