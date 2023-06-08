let Footer = {
  render: () => {
    let view = `
    <footer class="main-footer">
      <div class="auto_container">
        <div class="footer_logo">
          <a href="#"><img src="../img/footer-logo.png" alt="footer-logo"></a>
        </div>
        <ul class="footer_nav">
          <li><a href="#/">Events</a></li>
          <li><a href="#/category">Category</a></li>
          <li><a href="#/about">About</a></li>
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