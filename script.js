
/* ABRIR INVITACIÓN */

const openButton = document.getElementById("openInvitation");
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");

openButton.addEventListener("click", () => {
  intro.style.transition = "opacity 0.8s ease";
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.classList.add("hidden");
    invitation.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 800);
});


/* CUENTA REGRESIVA */

const eventDate = new Date("2026-10-31T16:00:00-06:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const difference = eventDate - now;

  if (difference <= 0) {
    document.querySelector(".countdown-section h2").textContent =
      "¡HOY ES LA GRAN AVENTURA!";
    document.querySelector(".countdown").innerHTML =
      "<h3>¡FELIZ CUMPLEAÑOS, ANTHONY!</h3>";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");
  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* GALERÍA DE FOTOGRAFÍAS */

const photos = [
  {
    src: "foto1.jpg",
    caption: "Mi primera aventura"
  },
  {
    src: "foto2.jpg",
    caption: "Pequeños grandes momentos"
  },
  {
    src: "foto3.jpg",
    caption: "Cada día creciendo"
  },
  {
    src: "foto4.jpg",
    caption: "Momentos en familia"
  },
  {
    src: "foto5.jpg",
    caption: "¡Listo para nuevas aventuras!"
  }
];

let currentPhoto = 0;

const galleryImage = document.getElementById("galleryImage");
const photoCaption = document.getElementById("photoCaption");
const dotsContainer = document.getElementById("galleryDots");

function createDots() {
  dotsContainer.innerHTML = "";

  photos.forEach((photo, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ver fotografía ${index + 1}`);

    dot.addEventListener("click", () => {
      showPhoto(index);
    });

    dotsContainer.appendChild(dot);
  });
}

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;

  galleryImage.classList.add("changing");

  setTimeout(() => {
    galleryImage.src = photos[currentPhoto].src;
    photoCaption.textContent = photos[currentPhoto].caption;

    galleryImage.classList.remove("changing");

    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPhoto);
    });
  }, 250);
}

document.getElementById("prevPhoto").addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});

document.getElementById("nextPhoto").addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

createDots();
showPhoto(0);


/* CAMBIO AUTOMÁTICO DE FOTOGRAFÍAS */

let galleryInterval = setInterval(() => {
  showPhoto(currentPhoto + 1);
}, 5000);

document.querySelector(".gallery").addEventListener("mouseenter", () => {
  clearInterval(galleryInterval);
});

document.querySelector(".gallery").addEventListener("mouseleave", () => {
  clearInterval(galleryInterval);
  galleryInterval = setInterval(() => {
    showPhoto(currentPhoto + 1);
  }, 5000);
});


/* CONFIRMACIÓN POR WHATSAPP */

const phone = "522218415389";

const message =
  "¡Hola! Confirmo mi asistencia al cumpleaños número 8 de Anthony. ¡Nos vemos en la aventura Minecraft!";

document.getElementById("whatsappButton").href =
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
