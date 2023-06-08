import Preloader from "../components/Preloader.js";
import app from       "../firebase.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// получаем данные о пользовательских рецептах
const getUserRecipes = function () {
  const listWrapper = document.querySelector(".food_list");
  listWrapper.innerHTML = Preloader.render();

  const dbRef = ref(getDatabase());
  get(child(dbRef, `user_recipes/`)).then((snapshot) => {
    if (snapshot.exists()) {
      getRecipeList(Object.entries(snapshot.val()))
    } else {
      console.log("Empty! :(");  
    }
  }).catch((error) => {
    console.log(error);
  });
}

function getRecipeList (data) {
  const listWrapper = document.querySelector(".food_list");

  listWrapper.innerHTML = data.map(([id, recipe]) => 
    `<li>
      <a class="user_recipe_link" href="#/userrecipe/${id}">${recipe.title}</a>
    </li>`
  ).join(' \n');
}

let Messages= {
  title: "User recipes",
  render: () => {
    let view = `
    <div class="head_bg">
      <h1>Sorry</h1>
    </div>

    <div class="error_section">
      <div class="auto_container">
        <div class="content">
          <h1>Sorry, but</h1>
          <h2>Messages will aviable in next version of app</h2>
          <p></p>
          <a href="#home">Go to home page</a>
        </div>
      </div>
    </div>
                  
    `
    return view
  },
  after_render: () => {
    getUserRecipes();
  }
}

export default Messages;