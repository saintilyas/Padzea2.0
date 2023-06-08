    
function changeOpacity() {
  const wrapper = document.querySelector(".header_wrapper");
  let opacity = window.scrollY > 100 ? false : true;

  if (opacity) {
    wrapper.classList.add("bg-opacity");
  } else {
    wrapper.classList.remove("bg-opacity");
  }
}

let Header = {
  render: () => {
    let userData = JSON.parse(localStorage.getItem("_r_usrname")) || JSON.parse(sessionStorage.getItem("_r_usrname"));
    let id = userData ? userData.id : "";
    let a = id ? `<a href="#/user/${id}">Profile</a>` : `<a href="#/login">Login</a>`;
    let view = `
    <header class="header_wrapper bg-opacity">
      <div class="header_container">
        <div class="logo_wrap">
          <a href="#/"><img src="../img/logo.png" alt="logo" title="home"></a>
        </div>
        <div class="nav_wrap">
          <ul class="navbar_header">
            <li><a href="#/">Events</a></li>
            <li><a href="#/about">TERMS & CONDITIONS</a></li>
            <li><a href="#/reference" class="reference">References</a></li>
            ${userData ? 
              "<li><a href='#/messages'>Messages</a></li>"
            : "<li></li>"}
          </ul>
        </div>
        
        <div class="outer_box">
          <ul>
            <li>${a}</li>
            ${userData ? 
            "<li class='add_recipe-btn'><a href='#/addevent'>Add Event</a></li>"
            : "" }
          </ul>
        </div>
      </div>
    </header>
    <nav>
      <div class="navbar">
        <div class="container_ nav-container">
          <input class="checkbox" type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <div class="logo">
            <a href="./index.html"><img src="../img/footer-logo.png" alt=""></a>
          </div>
          <div class="menu-items">
          <li><a href="#/">Events</a></li>
          <li><a href="#/category">Category</a></li>
          <li><a href="#/about">About</a></li>
          <li><a href="#/messages">Messages</a></li>
          <li>${a}</li>
          ${userData ? 
            "<li class='add_recipe-btn'><a href='#/addevent'>Add Event</a></li>"
            : "" }
          </div>
        </div>
      </div>
    </nav>
    `;

    return view;
  },
  after_render: () => {
    window.addEventListener("scroll", changeOpacity);

  }
};

export default Header;
