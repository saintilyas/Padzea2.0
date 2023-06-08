let Footer = {
  render: () => {
    let userData = JSON.parse(localStorage.getItem("_r_usrname")) || JSON.parse(sessionStorage.getItem("_r_usrname"));
    let view = `
    <footer class="main-footer">
      <div class="auto_container">
        <div class="footer_logo">
          <a href="#"><img src="../img/footer-logo.png" alt="footer-logo"></a>
        </div>
        <ul class="footer_nav">
          <li><a href="#/">Events</a></li>
          <li><a href="#/about">Terms & Conditions</a></li>
          <li><a href="#/reference">References</a></li>
          ${userData ? 
            "<li><a href='#/messages'>Messages</a></li>"
          : "<li></li>"}
        </ul>
        <div class="copyright">© All Rights Reserved 2023</div>
      </div>
    </footer>
    `
    return view
  },
  after_render: () => {

  }
}

export default Footer;