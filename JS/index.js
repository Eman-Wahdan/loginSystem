let form = document.querySelectorAll("form");
let emailInputLogin = document.getElementById("emailLoginId");
let passwordInputLOgin = document.getElementById("passwordLoginId");
let btnLogin = document.getElementById("btnLOgin");
let signupLink = document.getElementById("signupLink");
let pageLogin = document.querySelector(".pageLogin");

let pageSignup = document.querySelector(".signup");
let nameInputSignup = document.getElementById("nameSignUpId");
let emailInputSignup = document.getElementById("emailSignupId");
let passwordInputSignup = document.getElementById("passwordSignupId");
let btnSignUP = document.getElementById("btnSignup");
let signinLink = document.getElementById("SigninLink");
let welcomePage = document.querySelector(".welcomePage");

let btnLOgout = document.querySelector(".logout");
let passwordRoles = document.getElementById("passwordRules");
let usersData = [];

for (let i = 0; i < form.length; i++) {
  form[i].addEventListener("submit", function (e) {
    e.preventDefault();
  });
}
if (localStorage.getItem("Accounts")) {
  usersData = JSON.parse(localStorage.getItem("Accounts"));
} else {
  usersData = [];
}

function checkData() {
  let checker = 0;
  if (emailInputLogin.value !== "" && passwordInputLOgin.value !== "") {
    for (let b = 0; b < usersData.length; b++) {
      if (
        emailInputLogin.value === usersData[b].userEmail &&
        passwordInputLOgin.value === usersData[b].userPassword
      ) {
        document.querySelector(
          ".content"
        ).innerHTML = `Welcome ${usersData[b].userName}`;
        welcomePage.classList.remove("d-none");
        pageLogin.classList.add("d-none");
        checker++;
        clear();
        break;
      }
    }
    if (checker < 1) {
      let errorMess = "";
      errorMess += `<p class="mes text-danger text-center">Invalid email or password</p>`;
      document.querySelector(".errMessageLOgin").innerHTML = errorMess;
    }
  } else {
    let errorMess2 = "";
    errorMess2 += `<p class="mes text-danger text-center">Enter your data</p>`;
    document.querySelector(".errMessageLOgin").innerHTML = errorMess2;
  }
}

function signUp() {
  let account = {
    userName: nameInputSignup.value,
    userEmail: emailInputSignup.value,
    userPassword: passwordInputSignup.value,
  };
  if (
    rejexEmail(account.userEmail) &
    rejexName(account.userName) &
    rejexPassword(account.userPassword)
  ) {
    usersData.push(account);
    localStorage.setItem("Accounts", JSON.stringify(usersData));
    clear();
    let successMesss = "";
    successMesss += `<p class="mes text-success text-center">Success</p>`;
    document.querySelector(".errormessage").innerHTML = successMesss;
  }
}

btnLOgout.addEventListener("click", function () {
  welcomePage.classList.add("d-none");
  pageLogin.classList.remove("d-none");
});

btnLogin.addEventListener("click", function () {
  checkData();
});

btnSignUP.addEventListener("click", function () {
  signUp();
  clear();
});

signinLink.addEventListener("click", function () {
  pageSignup.classList.add("d-none");
  pageLogin.classList.remove("d-none");
});
signupLink.addEventListener("click", function () {
  pageSignup.classList.remove("d-none");
  pageLogin.classList.add("d-none");
});

function clear() {
  nameInputSignup.value = "";
  emailInputSignup.value = "";
  passwordInputSignup.value = "";
}

function rejexName(uName) {
  if (uName === "") {
    document.querySelector(".Uname").innerHTML = "Name is required";
    return false;
  } else if (uName.length <= 2) {
    document.querySelector(".Uname").innerHTML =
      "Must be more than 2 characters";
  } else {
    document.querySelector(".Uname").innerHTML = "";
    return true;
  }
}
function rejexEmail(uEmail) {
  let rejex = /^(?!.*\.\.)[a-z0-9_.]+@[a-z0-9-]+\.[a-z]{2,6}(?:\.[a-z]{2,})?$/g;
  if (rejex.test(uEmail)) {
    for (let t = 0; t < usersData.length; t++) {
      if (uEmail === usersData[t].userEmail) {
        document.querySelector(".Uemail").innerHTML = "Email is exist";
        return false;
      }
    }
    document.querySelector(".Uemail").innerHTML = "";
    return true;
  } else if (uEmail === "") {
    document.querySelector(".Uemail").innerHTML = "Email is required";
  } else {
    document.querySelector(".Uemail").innerHTML = "Email is Invalid";
    return false;
  }
}
function rejexPassword(uPassword) {
  let rejex =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/g;
  if (rejex.test(uPassword)) {
    passwordRoles.classList.add("d-none");
    return true;
  } else {
    passwordRoles.classList.remove("d-none");
    return false;
  }
}
