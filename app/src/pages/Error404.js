let Error404 = {
  render: () => {
    let view = `
    <div class="head_bg">
      <h1>404</h1>
    </div>

    <div class="error_section">
      <div class="auto_container">
        <div class="content">
          <h1>404</h1>
          <h2>Oops! That page can’t be found</h2>
          <p>Sorry, but the page you are looking for does not existing</p>
          <a href="#home">Go to home page</a>
        </div>
      </div>
    </div>`

    return view
  },
  after_render: () =>{}
}

export default Error404;