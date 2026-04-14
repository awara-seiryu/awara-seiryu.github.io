const sliderRoots = document.querySelectorAll(".charm-slider");

sliderRoots.forEach((root, sliderIndex) => {
  const track = root.querySelector(".charm-slider-track");
  const slides = track ? Array.from(track.children) : [];
  let prevButton = root.querySelector(".charm-slider-prev");
  let nextButton = root.querySelector(".charm-slider-next");
  let dotsWrap = root.querySelector(".charm-slider-dots");

  if (!track || slides.length === 0) {
    return;
  }

  if (!prevButton) {
    prevButton = document.createElement("button");
    prevButton.className = "charm-slider-btn charm-slider-prev";
    prevButton.textContent = "‹";
    root.appendChild(prevButton);
  }

  if (!nextButton) {
    nextButton = document.createElement("button");
    nextButton.className = "charm-slider-btn charm-slider-next";
    nextButton.textContent = "›";
    root.appendChild(nextButton);
  }

  if (!dotsWrap) {
    dotsWrap = document.createElement("div");
    dotsWrap.className = "charm-slider-dots";
    root.appendChild(dotsWrap);
  }

  let currentIndex = 0;
  let timerId = null;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "charm-slider-dot";
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
