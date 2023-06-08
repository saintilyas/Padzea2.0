let Preloader = {
  render: () => {
    const view = `
    <div class="preloader_wrapper">
      <svg viewBox="0 0 120 120" class="svg-preloader">
        <symbol id="s-circle">
          <circle r="10" cx="10" cy="10"></circle>
        </symbol>
        <g id="circle" class="g-circles">
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
          <use xlink:href="#s-circle" class="u-circle"/>
        </g>
      </svg>
    </div>
    `

    return view
  },
};

export default Preloader;
