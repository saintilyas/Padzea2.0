import Preloader from "../components/Preloader.js";
import Utils from     "../services/Utils.js";
import app from       "../firebase.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const root = document.getElementById("root");

const APIKey = `9H7udJ8vAX0UXZ3GiCgfwDSRXpOhUzLq`;

// снизу функции получения разных данных об ивенте
const getEvent = async function (id) {
  try {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${APIKey}`)
    const data = response.json();
    return data
  } catch (error) {
    console.error("Failing fetching data.", error)
  }
}

// генерируем рандомный id для коммента
const randomId = () => Math.floor(Math.random() * (100000 - 1) + 1);

// получаем объект с данными пользователя
const userData = JSON.parse(localStorage.getItem("_r_usrname")) || JSON.parse(sessionStorage.getItem("_r_usrname"));

// записываем комментарий в бд
function writeCommentsIntoDb(username, text, timestamp) {
  const db = getDatabase();
  const eventId = Utils.parseRequestURL().id;
  const commentId = randomId();
  
  set(ref(db, 'eventComments/' + eventId + "/comments/" + commentId), {
    username: username,
    text: text,
    timestamp: timestamp,
    userId: userData.id,
    commentId: commentId,
  });
}

function deleteComment (commentId) {
  const db = getDatabase();
  const eventId = Utils.parseRequestURL().id;
  
  remove(ref(db, "eventComments/" + eventId + "/comments/" + commentId));
}

// формируем список комментариев от новых к старым
function getAllComments (data) {
  const list = document.querySelector(".comment_list");
  let comments = Object.entries(data);
  let sortedComments = comments.sort((a,b) => b[1].timestamp - a[1].timestamp);

  list.innerHTML = `${sortedComments.map(([key, value]) => {
    if (value.userId === userData.id) {
      return `<li class="comment_inner">
                <img src="../img/x.png" class="delete_comment" data-id="${value.commentId}" />
                <h5 class="comment_username">${value.username}</h5><span class="comment_date">${new Date(value.timestamp).toLocaleDateString()}</span>
                <p class="comment_text">${value.text}</p>
              </li>`
    } else {
      return `<li class="comment_inner">
                <h5 class="comment_username">${value.username}</h5><span class="comment_date">${new Date(value.timestamp).toLocaleDateString()}</span>
                <p class="comment_text">${value.text}</p>
              </li>`
    }
  }).join(' \n')}`

  const deleteCommentBtns = document.querySelectorAll(".delete_comment");
  deleteCommentBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const wrapper = btn.closest(".comment_inner");
      const commId = btn.dataset.id;
      deleteComment(commId);
      wrapper.remove();
    })
  })
}

// получаем комменты из бд, если есть то формируем список
function getRecipeComments () {
  const db = getDatabase();
  const eventId = Utils.parseRequestURL().id;
  try {
    const commentsRef = ref(db, 'eventComments/' + eventId + "/comments");
    onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        getAllComments(data);
      } else {
        return
      }
    });
  } catch (error) {
    console.log(error)
  } 
}

// для неавторизованных комменты недоступны
function disableComments () {
  const comm_err = document.querySelector(".comments_worm");

  comm_err.innerHTML = `
    <h4>Comments are available only to authorized users</h4>
  `
}

// если поля комментария не заполнены, кнопка поста задизеблена
function disableCommentBtn () {
  const text = document.querySelector(".comment_textarea");
  const commentBtn = document.querySelector(".comment_btn");
  commentBtn.disabled = true;
  commentBtn.classList.add("disable")

  if (localStorage.getItem("username")) {
    if (!text.value) {
      commentBtn.disabled = true;
      commentBtn.classList.add("disable")
    } else if (text.value) {
      commentBtn.disabled = false;
      commentBtn.classList.remove("disable")
    }
  } else {
    return
  }
}

let ShowEvent = {
  title: "Event page",
  render: async () => {
    root.innerHTML = Preloader.render();

    // получаем id eventa  и данные о нем
    let URL = Utils.parseRequestURL();
    const event = await getEvent(URL.id);
    console.log(event)

    // формируем страницу, если данных нет, то выдаем извинение
    let view;
    if (!Object.entries(event)) {
      view = `
          <div class="head_bg">
            <h1>We are so sorry</h1>
          </div>
          <div class="error_section">
            <div class="auto_container">
              <div class="content">
                <h1>Sorry</h1>
                <p>The event is not available. If you have any questions please connect with event organizers.</p>
                <a href="#home">Go to home page</a>
              </div>
            </div>
          </div>            
    `
    } else {
      view = `
          <div class="head_bg-single">
            <h1>${event.name}</h1>
          </div>
          <div class="auto_container shadow">
            <div class="show_recipe">
              <div class="food_img_wrap">
                <img src="${event.images[4].url}">
              </div>
              <div class="cook_wrap">
                <h3><span>"${event.name}"</span></h3>
              </div>
              <div class="summary_wrap">
                <h3>Info:</h3>
                <ul>
                  <li>Event starts - ${event.dates.start.localDate || "No information about start date of this event"} </li>
                  <li>${event.dates.start.localTime || "We don't yet have information about the start time of this event."}</li>
                  ${event.info ? `<li>Event info - ${event.info}</li>` : ""}
                  ${event.info ? `<li>Event info - ${event.pleaseNote}</li>` : ""}
                </ul>
                <h3>Price ranges:</h3>
                <ul>
                ${event.priceRanges ? event.priceRanges.map(item =>
                  `<li>Ticket type - ${item.type}. From ${item.min} to ${item.max} ${item.currency}</li>`
                  ).join(" ") : "No information"}
                <ul></ul>
                <h3>Event's address:</h3>
                  <p>${event._embedded.venues[0].country.name}</p>
                  <p>${event._embedded.venues[0].address.line1}</p>
                  <div class='buy_ticket_btn'>
                    <a href='${event.url}' target="_blank">Buy tickets</a>
                  </div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
              </div>
              <div class="comments_wrap">
                <h3>COMMENTS</h3>
                <div class="comments_worm">
                  <textarea class="comment_textarea" type="text" placeholder="Type here..."></textarea>
                  <button class="comment_btn">Post</button>
                </div>
                <ul class="comment_list"></ul>
              </div>
            </div>
          </div>
      `
    }

    return view
  },
  after_render: async () => {
    const summaryWrap = document.querySelector(".summary_wrap");
    const anonimous = localStorage.getItem("_r_usrname") || sessionStorage.getItem("_r_usrname") ? false : true; // проверка на авторизацию

    // проверяем авторизован ли пользователь, показываем блок комментариев
    if (!anonimous) {
      getRecipeComments();
    } else {
      disableComments();
    }
    

    // если пользователь авторизован, вешаем обработчик постинга комментария, очищаем поля ввода
    const commentBtn = document.querySelector(".comment_btn");
    const text = document.querySelector(".comment_textarea");

    if (commentBtn) {
      disableCommentBtn();
      
      text.addEventListener("input", disableCommentBtn);
      
      commentBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const timestamp = new Date().getTime();
  
        const username = localStorage.getItem("username");
        writeCommentsIntoDb(username, text.value, timestamp);

        text.value = "";
      });
    }
  }
}

export default ShowEvent;