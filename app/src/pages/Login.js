import Header from      "../components/Header.js";
import Preloader from   "../components/Preloader.js";
import About from       "./About.js";
import app from         "../firebase.js";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

const auth = getAuth(app);
const root = document.getElementById("root");

function LoginForm() {

  // валидация формы регистрации
  this.validateSignup = function () {
    const signupPassword = document.getElementById("signup_password").value;
    const signupEmail = document.getElementById("signup_email").value;
    const wrapper = document.querySelector(".signup_formfields");
    const emailRegExp = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    
    // проверяем корректность введенного email, заполненность полей, взвращаем true либо false
    if (emailRegExp.test(signupEmail) && signupPassword.trim().length > 5) {
      return true
    } else {
      wrapper.classList.add("signup_err");
      return false
    }
  }

  // проверяем валидность введенных данных формы логина
  this.validateLogin = function () {
    const wrapper = document.querySelector(".login_formfields");
    const loginEmail = document.getElementById("login_email").value;
    const loginPassword = document.getElementById("login_password").value;

    if (!loginEmail && loginPassword.length < 6) {
      wrapper.classList.add("login_err"); 
      return false
    } else {
      return true
    }
  }
  
  // находим кнопки показа пароля и вещаем на них обработчики события
  this.showPassword = function () {
    const showPasswordBtns = document.querySelectorAll(".visible_password");
    showPasswordBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        let password = e.target.previousElementSibling;
        password.type = password.type == "password" ? "text" : "password";
      });
    });
  }

  // функция switchа между формой для входа и регистрации
  this.switchEnterView = function () {
    const signupLink = document.querySelector(".signup_btn");
    const loginLink = document.querySelector(".login_btn");
    const loginForm = document.querySelector(".login_formfields");
    const signupForm = document.querySelector(".signup_formfields");
    const title = document.querySelector(".head_bg > h1");

    signupLink.addEventListener("click", (e) => {
      e.preventDefault();

      title.innerText = "Signup";
      signupForm.classList.remove("unvisible");
      loginForm.classList.add("unvisible")
    });

    loginLink.addEventListener("click", (e) => {
      e.preventDefault();

      title.innerText = "Login";
      loginForm.classList.remove("unvisible");
      signupForm.classList.add("unvisible");
    });
  }

  // логиним пользователя в аккаунт
  this.loginAccount = async function () {
    const wrapper = document.querySelector(".login_formfields");
    const loginEmail = document.getElementById("login_email");
    const loginPassword = document.getElementById("login_password");
    const rememberBtn = document.getElementById("login_remember");

    let user = {
      email: loginEmail.value,
      password: loginPassword.value,
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      user.id = userCredential.user.uid;

      // проверяем галочку и записываем пользователя в локал или сешн сторэдж
      rememberBtn.checked ? localStorage.setItem("_r_usrname", JSON.stringify(user)) : sessionStorage.setItem("_r_usrname", JSON.stringify(user));
    } catch (error) {
      wrapper.classList.add("login_err");
      return
    }

    // обновляем хедер, рендерим юзер профиль
    const header = document.getElementById("header");
    header.innerHTML = Header.render();
    Header.after_render();
    document.title = About.title;
    root.innerHTML = About.render();
    About.after_render();
  }

  // регистрируем пользователя
  this.signupAccount = async function () {
    const wrapper = document.querySelector(".signup_formfields");
    const signupEmail = document.getElementById("signup_email");
    const signupPassword = document.getElementById("signup_password");
    const rememberBtn = document.getElementById("signup_remember");
    
    let user = {
      email: signupEmail.value,
      password: signupPassword.value,
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      user.id = userCredential.user.uid;

      // проверяем галочку и записываем пользователя в локал или сешн сторэдж
      rememberBtn.checked ? localStorage.setItem("_r_usrname", JSON.stringify(user)) : sessionStorage.setItem("_r_usrname", JSON.stringify(user));
    } catch (error) {
      wrapper.classList.add(".signup_err");
      return
    }
    
    // обновляем хедер, рендерим юзер профиль
    const header = document.getElementById("header");
    header.innerHTML = Header.render();
    Header.after_render();
    document.title = UserProfile.title;
    root.innerHTML = UserProfile.render();
    UserProfile.after_render();
  }
}

let Login = {
  title: "Login/Signup",
  render: async () => {
    root.innerHTML = Preloader.render();
    let view = `
    <div class="head_bg">
      <h1>Login</h1>
    </div>
    <div class="auto_container">
      <div class="login_inner_container">
        <div class="image">
          <img src="../img/login.jpg" alt="cooker">
        </div>
        <div class="login_form">
          <form class="login_formfields">
            <div class="form_group" >
              <input type="email" class="login_form_input" id="login_email" placeholder="Email">
            </div>
            <div class="form_group" >
              <input type="password" class="login_form_input" class="login_form_input" id="login_password" placeholder="Password">
              <img class="visible_password" src="../img/visible.png" alt="show password">
            </div>
            <div class="form_group">
              <div class="check_box">
                <input type="checkbox" id="login_remember">
                <label for="remember">Remember me</label>
              </div>
            </div>
            <div class="form_group">
              <a href="#/user/id" type="submit" id="login_acc_btn" class="theme_btn">Login</a>
              <span>Don't have an account?</span>
              <a class="signup_btn">Sign up</a>
            </div>
          </form>
          <form class="signup_formfields unvisible">
            <div class="form_group">
              <input type="email" class="login_form_input" id="signup_email" placeholder="Email">
            </div>
            <div class="form_group password-help">
              <input type="password" class="login_form_input" id="signup_password" placeholder="Password">
              <img class="visible_password" src="../img/visible.png" alt="show password">
            </div>
            <div class="form_group">
              <div class="check_box">
                <input type="checkbox" id="signup_remember">
                <label for="remember">Remember me</label>
              </div>
            </div>
            <div class="form_group">
              <a href="#/user/id" type="submit" id="signup_acc_btn" class="theme_btn">Sign up</a>
              <span>Already have an account?</span>
              <a href="#" class="login_btn">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;
    
    return view
  },
  after_render: async () => {
    const login = new LoginForm();
    login.showPassword();
    login.switchEnterView();
    
    // если данные формы не валидны, то показываем юзеру ошибку
    const signupBtn = document.getElementById("signup_acc_btn");
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (login.validateSignup()) {
        login.signupAccount();
      } else {
        login.validateSignup();
      }
    });

    // если данные формы не валидны, то показываем юзеру ошибку
    const loginBtn = document.getElementById("login_acc_btn");
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (login.validateLogin()) {
        login.loginAccount();
      } else {
        login.validateLogin();
      }
    });
  }
}

export default Login;