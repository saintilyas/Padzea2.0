let Reference = {
  title: "Reference",
  render: async () => {
    const view = `
    <div class="page_title">
      <h1>Reference</h1>
    </div>
    <div class="about_section">
      <div class="auto_container">
        <div class="inner_section margin-top">
          <img class="inner_section_logo reference" src="../img/reference.png" alt="logo">
        </div>
        <h2 class="about_title">References</h2>
        <p class="reference_text">
        The application is designed to book tickets for various events, as well as provide
        online communication opportunities for all registered users.
        </br></br>
        This application was developed solely for educational purposes for students of the 45TP group
        Minsk State College of Digital Technologies by Ilya Shchupanovsky in 2023.
        </p>
      </div>
    </div>
    `;

    return view;
  },
  after_render: async () => {
  }
}

export default Reference;