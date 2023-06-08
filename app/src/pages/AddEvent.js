import app from "../firebase.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();

// скрываем модалку
function hideModal() {
  const modal = document.querySelector(".add_recipe_modal");
  const overlay = document.querySelector(".add_recipe_overlay");
  modal.classList.add("unvisible");
  overlay.classList.add("unvisible");
}

// открываем модалку
function showModal (text) {
  const modal = document.querySelector(".add_recipe_modal");
  const overlay = document.querySelector(".add_recipe_overlay");
  const modalTitle = document.querySelector(".add_recipe_modal_title")
  const closeBtn = document.querySelector(".add_recipe_modal_btn")
  modal.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
  modalTitle.innerText = text;

  closeBtn.addEventListener("click", hideModal);

  overlay.addEventListener("click", hideModal);
}

// добавляем в базу event, если что-то не так показываем в модалке ошибку
function setNewEvent () {
  const ingredientDel = document.querySelectorAll(".del");
  const title = document.getElementById("recipeTitle");
  const directions = document.getElementById("addDirections");
  const summarize = document.getElementById("recipeDescription");
  const ingredientInputs = document.querySelectorAll(".ingredient_input");
  let ingredientsArr = Array.from(ingredientInputs).map(input => input.value);

  if (title.value && directions.value && ingredientsArr.length && summarize.value) {
    setEventData(title.value, directions.value, ingredientsArr, summarize.value);
    showModal("Your Recipe has been successfully published");
    
    title.value = "";
    directions.value ="";
    summarize.value = "";
    
    ingredientInputs.forEach((input) => input.value = "");
    ingredientDel.forEach(elem => elem.remove());
  } else {
    showModal("Error adding recipe");
  }
}

let AddEvent = {
  title: "Add event",
  render: () => {
    let view = `
    <div class="add_recipe_bg">
      <h1>Add Event</h1>
    </div>

    <div class="add-recipe-area">
      <div class="container">
        <div class="add_recipe">
          <h4>Post an event in our service</h4>
          <form 
          action="https://formspree.io/f/xnqykgnb"
          method="POST">
            <div class="form_group">
              <label for="eventTitle">Event Title</label>
              <input type="text" name="Event Title" class="form_control" id="eventTitle" placeholder="Example: Disney On Ice presents Find Your Hero" required>
            </div>
            <div class="form_group">
              <label for="addDirections">Event Information</label>
              <textarea id="addDirections" name="Event Information" rows="4" placeholder="Write Here..." required></textarea>
            </div>
            <div class="form_group fit">
              <label for="price">Ticket price</label>
              <div class="ingredient_inner">
                <input type="text" name="Ticket price" class="ingredient_input" id="price" placeholder="Write Here..." required>
              </div>
            </div>
            <div class="form_group">
              <label for="eventDescription">Date and time</label>
              <input type="date" name="Date" class="form_group fit" required/>
              <input type="text" name="Time" id="event_time" class="ingredient_input form_group fit" placeholder="Write time here" required/>
              <label for="eventAdress">Event adress</label>
              <input type="text" name="Event adress" id="eventAdress" class="ingredient_input form_group fit" placeholder="Write here..." />
            </div>
            <div class="form_group">
              <label for="addComm">Add comment</label>
              <div class="ingredient_inner">
                <textarea class="form_control" name="Additional comment" id="addComm" rows="4" placeholder="Write Here..."></textarea>
              </div>
            </div>
            <div class="form_group">
              <label for="addComm">Your contact details</label>
              <div class="form_group">
                <input type="text" name="Name" class="ingredient_input form_group fit" placeholder="Your name" required/>
                <input type="tel" name="Phone number" id="user_phone" class="ingredient_input form_group fit" placeholder="Your phone" required/>
                <input type="email" name="Email" id="eventAdress" class="ingredient_input form_group fit" placeholder="E-mail" />
              </div>
            </div>
            <button class="submit_btn" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
    <div class="add_recipe_overlay unvisible"></div>
    <div class="add_recipe_modal unvisible">
      <h5 class="add_recipe_modal_title">Some text from modal</h5>
      <button class="add_recipe_modal_btn">Close</button>
    </div>
    `

    return view
  },
  after_render: async () => {

  }
}

export default AddEvent;