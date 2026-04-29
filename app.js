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

// Timeline 2 saniyəlik delay ilə başlayır
    const tl = gsap.timeline({ 
        delay: 2, 
        defaults: { ease: "power2.out", duration: 0.6 } 
    });

    
      
      // 1. Öncə ulduzlar (stars)
      tl.from(".stars", { y: -20, opacity: 0 })

      // 2. Sonra sub-title (Yeni Sezon)
      .from(".sub-title", { x: -30, opacity: 0 }, "-=0.3")

      // 3. Sonra başlıq (ERKEK tshirt)
      .from(".main-title", { y: 30, opacity: 0 }, "-=0.2")

      // 4. İkonlar və qarşısındakı sözlər (Ardıcıl)
      // Öncə bütün ikonlar (i), sonra yazı hissələri
      .from(".feature-item i", { 
          scale: 0, 
          opacity: 0, 
          stagger: 0.2 
      }, "-=0.1")
      .from(".feature-item", { 
          color: "transparent", // Yazıları ikonlardan dərhal sonra göstərmək üçün
          opacity: 0,
          x: -10,
          stagger: 0.2 
      }, "-=0.5")

      // 5. a teqi (Hemen Satın Al düyməsi)
      

      // 6. Ən sonda aşağıdakı info-boxlar
      .from(".info-box", { 
          y: 20, 
          opacity: 0, 
          stagger: 0.15 
      }, "-=0.2")
      
      // Bonus: Endirim etiketi də kənardan gəlsin
      .from(".discount-badge", { x: 50, opacity: 0 }, "-=0.5")
      .from(".btn-buy", { 
    scale: 0.5, 
    opacity: 0, 
    ease: "back.out(1.7)",
    onComplete: function() {
        gsap.set(".btn-buy", { clearProps: "all" }); // Animasiya bitəndə bütün GSAP stillərini silir, düymə orijinal halına qayıdır
    }
})