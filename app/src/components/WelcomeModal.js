const root = document.getElementById("root");

const audioPlay = function () {
  const modal = document.querySelector(".welcome_inner")
  let audio = document.createElement("audio");
  audio.src = "../../sound/welcome_modal_sound.mp3";
  audio.autoplay = true;
  modal.append(audio);
}

let WelcomeModal = {
  render: () => {
    const modal = document.createElement("div");
    modal.classList.add("welcome_wrapper");
    modal.innerHTML =`
    <div class="welcome_inner">
      <img src="../img/x.png" class="welcome_close">
      <h2 class="welcome_title">Welcome to our service!</h2>
      <p class="welcome_text">If you are on the site for the first time, we suggest you register.
      The rules of the service, as well as the user manual, you can find on the tab <b>About</b>.</p>
    </div>
    `;

    root.append(modal);
  },
  after_render: () => {
    audioPlay();
    const welcomeClose = document.querySelector(".welcome_close");
    const modal = document.querySelector(".welcome_wrapper");
    
    welcomeClose.addEventListener("click", e => {
      e.preventDefault();

      modal.remove(); 
    })
  }
}

export default WelcomeModal;