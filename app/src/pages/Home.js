import Preloader from '../components/Preloader.js'

const APIKey = "9H7udJ8vAX0UXZ3GiCgfwDSRXpOhUzLq";

// получаем ивенты, по дефолту рандом
const fetchData = async function(value = "music") {

  try {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?sort=random&keyword=${value}&apikey=${APIKey}`);
    const data = await response.json();
    createEventList(data);
  } catch (error) {
    console.error("Failing fetching data.", error);
  }
}

// формируем список из полученных данных
const createEventList = function (data) {
  const eventWrapper = document.querySelector(".food_wrapper");

  if (data._embedded) {
    eventWrapper.innerHTML = `
    ${data._embedded.events.map(item =>`
    <div class="inner">
      <a href=#/event/${item.id}>
        <img class="food_img" src=${item.images[4].url}>
        <p class="food_name">${item.name}</p> 
      </a>
    </div>`).join('\n ')}
    `
  } else {
    eventWrapper.innerHTML = `
          <div class="error_section">
            <div class="auto_container">
              <div class="content">
                <h1>Oops!</h1>
                <p>Sorry, there are no such events, but you can choose one of available</p>
                <a href="#">Go to home page</a>
              </div>
            </div>
          </div> 
    `
  }
}

let Home = {
  title: "Events",
  render: async () => {
    const view = `<div class="head_bg">
                    <h1>Events</h1>
                  </div>
                  <div class="search_section">
                    <div class="auto_container">
                      <div class="inner_container">
                        <h2 class="inner_title">Search events</h2>
                        <div class="search_form">
                          <input class="search_input" type="text" placeholder="Event keyword">
                          <button class="search_btn">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div class="category_section">
                      <div class="auto_container">
                        <div class="title">
                          <h2>Events Categories</h2>
                          <p>Search for the events you need based on your interests</p>
                        </div>
                        <div class="food_categories">
                          <ul class="categories_list">
                            <li class="category">Music</li>
                            <li class="category">Sports</li>
                            <li class="category">Arts</li>
                            <li class="category">Family</li>
                          </ul>
                        </div>
                        <div class="food_wrapper"></div>
                      </div>
                    </div>
                  </div>`;

    return view;
  },
  after_render: async () => {
    const categoryBtn = document.querySelectorAll(".category");
    const eventWrapper = document.querySelector(".food_wrapper");
    const searchBtn = document.querySelector(".search_btn");
    const searchInput = document.querySelector(".search_input");
    eventWrapper.innerHTML = Preloader.render();
    await fetchData();

    // быстрый поиск ивентов из предложенных сверху страницы
    categoryBtn.forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const value = e.target.innerText.toLowerCase();        
        eventWrapper.innerHTML = Preloader.render();
        await fetchData(value);
      })
    });

    // поиск с помощью ввода названия ивента, формируем список, или ошибку, если совпадений нет
    searchBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      if (searchInput.value.trim()) {
        await fetchData(searchInput.value.trim());
      } 

      searchInput.value = "";
    });
  }
}

export default Home;
  
