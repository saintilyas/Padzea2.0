import Header from  "../components/Header.js";
import Utils from   "../services/Utils.js";
import app from     "../firebase.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const checkInputs = function(data) {
  const inputs = document.querySelectorAll(".user_input");
  
  let userInfo = Object.entries(data);

  localStorage.setItem("username", userInfo[2][1]);
  
  if (userInfo) {
    document.getElementById("user_name").value = userInfo[0][1];
    document.getElementById("user_surname").value = userInfo[1][1];
    document.getElementById("username").value = userInfo[2][1];
    document.getElementById("edit_user_name").value = userInfo[0][1];
    document.getElementById("edit_user_surname").value = userInfo[1][1];
    document.getElementById("edit_username").value = userInfo[2][1];
  }

  inputs.forEach(input => {
    if (!input.value) {
      input.classList.add("err_input")
    } else {
      input.classList.remove("err_input")
    }
  })
}

const hideModal = function() {
  const modal = document.querySelector(".modal_profile");
  const overlay = document.querySelector(".modal_overlay");

  overlay.classList.add("unvisible");
  modal.classList.add("unvisible");
}

function writeUserDataIntoDb(name, surname, username) {
  const db = getDatabase();
  const userId = Utils.parseRequestURL().id;
  
  
  set(ref(db, 'usersInfo/' + userId), {
    name: name,
    surname: surname,
    username: username,
  });
}

function getUsersInfo () {
  const db = getDatabase();
  const userId = Utils.parseRequestURL().id;
  try {
    const commentsRef = ref(db, 'usersInfo/' + userId);
    onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        checkInputs(data);
      } else {
        return
      }
    });
  } catch (error) {
    console.log(error)
  } 
}

let UserProfile = {
  title: "User profile",
  render: () => {
    let view = `
        <div class="head_bg">
          <h1>User profile</h1>
        </div>
        <div class="profile_section">
          <div class="profile_nav_wrap">     
            <ul class="profile_nav">
              <li><a href="#" class="profile_tab active_tab">Your details</a></li>
            </ul>
          </div>
          <div class="profile_info_wrap">
            <h2>Account Details</h2>
            <div class="main_container">
              <label for="user_name" class="profile_label">Name</label>
              <input type="text" class="user_input" id="user_name" placeholder="Please, enter your name" readonly>
              <label for="user_surname" class="profile_label">Surname</label>
              <input type="text" class="user_input" id="user_surname" placeholder="Please, enter your surname" readonly>
              <label for="username" class="profile_label">Username (show in comments)</label>
              <input type="text" class="user_input" id="username" placeholder="Please, enter your Nickname" readonly>
              <label for="email" class="profile_label">E-mail</label>
              <input type="email" class="user_input" id="email" readonly>
              <label for="password" class="profile_label">Password</label>
              <input type="text" class="user_input" id="password" readonly>
              <div class="details_info_wrap">
                <a href="" class="edit_info_btn">Edit</a>
                <a href="#" class="logout_btn">Log out</a>
              </div>
                <div class="modal_overlay unvisible"></div>
                <div class="modal_profile unvisible">
                <label for="user_name" class="profile_label">Name</label>
                <input type="text" class="user_input" id="edit_user_name" placeholder="Please, enter your name" >
                <label for="user_surname" class="profile_label">Surname</label>
                <input type="text" class="user_input" id="edit_user_surname" placeholder="Please, enter your surname" >
                <label for="username" class="profile_label">Username (show in comments)</label>
                <input type="text" class="user_input" id="edit_username" placeholder="Please, enter your Nickname" >
                <div class="save_btn_wrap">
                  <button class="modal_save_btn">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    `;

    return view
  },
  after_render: async () => {
    const editBtn = document.querySelector(".edit_info_btn");
    const overlay = document.querySelector(".modal_overlay");
    const modal = document.querySelector(".modal_profile");
    const saveBtn = document.querySelector(".modal_save_btn");

    const editName = document.getElementById("edit_user_name");
    const editSurname = document.getElementById("edit_user_surname");
    const editUserName = document.getElementById("edit_username");

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let userData = localStorage.getItem("_r_usrname") 
    ? JSON.parse(localStorage.getItem("_r_usrname")) 
    : JSON.parse(sessionStorage.getItem("_r_usrname"));
    email.value = userData.email;
    password.value = userData.password;

    const header = document.getElementById("header");
    const logoutBtn = document.querySelector(".logout_btn");
    logoutBtn.addEventListener("click", e => {
      localStorage.removeItem("_r_usrname") || sessionStorage.removeItem("_r_usrname");
      localStorage.removeItem("username");
      header.innerHTML = Header.render();
      Header.after_render();
    });

    const profileTab = document.querySelector(".profile_tab");
    profileTab.addEventListener("click", (e) =>{
      e.preventDefault()
    }); 

    editBtn.addEventListener("click", e => {
      e.preventDefault();

      modal.classList.remove("unvisible");
      overlay.classList.remove("unvisible");
    });

    overlay.addEventListener("click", e => {
      
      hideModal();
    });

    saveBtn.addEventListener("click", e => {
      e.preventDefault();

      if (editName.value.trim() && editSurname.value.trim() && editUserName.value.trim()) {
        writeUserDataIntoDb(editName.value, editSurname.value, editUserName.value);

      } else {
        if (!editName.value.trim()) {
          editName.classList.add("err_input");
        }
        if (!editSurname.value.trim()) {
          editSurname.classList.add("err_input");
        }
        if (!editUserName.value.trim()) {
          editUserName.classList.add("err_input");
        }
        return
      }
      
      hideModal();
    });

    getUsersInfo();
  }
}

export default UserProfile;