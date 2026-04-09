const sliderRoots = document.querySelectorAll("[data-slider]");

sliderRoots.forEach((root, sliderIndex) => {
  const track = root.querySelector(".charm-slider-track");
  const slides = Array.from(root.querySelectorAll(".charm-slide"));
  const prevButton = root.querySelector(".charm-slider-prev");
  const nextButton = root.querySelector(".charm-slider-next");
  const dotsWrap = root.querySelector(".charm-slider-dots");

  if (!track || slides.length === 0 || !prevButton || !nextButton || !dotsWrap) {
    return;
  }

  let currentIndex = 0;
  let timerId = null;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "charm-slider-dot";
    dot.setAttribute("aria-label", `${index + 1}枚目の画像へ移動`);
    dot.addEventListener("click", () => {
      goTo(index);
      restartAutoPlay();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  const render = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const goTo = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    render();
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const stopAutoPlay = () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    timerId = window.setInterval(next, 4500 + sliderIndex * 300);
  };

  const restartAutoPlay = () => {
    startAutoPlay();
  };

  prevButton.addEventListener("click", () => {
    prev();
    restartAutoPlay();
  });

  nextButton.addEventListener("click", () => {
    next();
    restartAutoPlay();
  });

  root.addEventListener("mouseenter", stopAutoPlay);
  root.addEventListener("mouseleave", startAutoPlay);

  render();
  startAutoPlay();
});
