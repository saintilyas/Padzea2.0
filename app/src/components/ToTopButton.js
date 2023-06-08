let ToTopButton = {
  render: () => {
    let view = `
      <div class="scroll_to_top hide">
        <img src="../img/upArrow_negate.png" alt="to-top-arrow">
      </div>
    `
    return view
  },
  after_render: () => {
    const toTopBtn = document.querySelector(".scroll_to_top");
    
    /* hide/show кнопку при скролле */
    function showArrowUp() {
      if (window.pageYOffset > 300) {
        toTopBtn.classList.remove("hide")
      } else {
        toTopBtn.classList.add("hide")
      }
    }

    /* анимация плавного скролла вверх страницы с помощью requestAnimationFrame */
    const scrollToTop = () => {
      const c = window.pageYOffset ;
      const speed = 30;

      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / speed);
      }
    };
    
    window.addEventListener("scroll", showArrowUp);
    toTopBtn.addEventListener("click", scrollToTop);
  }
}

export default ToTopButton;