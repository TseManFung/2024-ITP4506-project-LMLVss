document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const eye = $(".fa-regular");
  const beam = document.querySelector(".beam");
  const btnLogin = document.getElementsByClassName("btn-login")[0];
  const btnNext = document.getElementsByClassName("btn-next")[0];

  body.addEventListener("mousemove", function (e) {
      let rect = beam.getBoundingClientRect();
      let mouseX = rect.right + rect.width / 2;
      let mouseY = rect.top + rect.height / 2;
      let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
      let deg = rad * (20 / Math.PI) * -1 - 350;
      body.style.setProperty("--beam-deg", deg + "deg");
  });

  eye.bind("click", function (e) {
    e.preventDefault();
    const ID = this.getAttribute("for");
    const passwordInput = document.getElementById(ID);
    this.parentElement.classList.toggle("show-beam");
    if (!body.classList.contains("show-password")) {
      body.classList.add("show-password");
    } else if (document.querySelectorAll(".ipt-box.show-beam").length === 0) {
      body.classList.remove("show-password");
    }
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
    this.className =
      "fa-regular " +
      (passwordInput.type === "password" ? "fa-eye-slash" : "fa-eye");
    passwordInput.focus();
  });

  if (btnLogin !== undefined) {
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      account = $("#account").val();
      password = $("#password").val();
      if (account === "" || password === "") {
        modalSetPrimaryBtn((Show = false));
        modalSetTitle("login failed");
        modalSetBody("Please fill in all fields");
        return;
      }
      if (password === "Ab12345678") {
        if (account === "C") {
          window.location.href = "./customer/index.html";
        } else if (account === "V") {
          window.location.href = "./vehicle/index.html";
        } else if (account === "I") {
          window.location.href = "./insurance/index.html";
        }
        return;
      }

      modalSetPrimaryBtn((Show = false));
      modalSetTitle("login failed");
      modalSetBody("Incorrect account or password");
    });
  }
  
  if (btnNext !== undefined ){
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      const current = this.getAttribute("curr");
      const finish = this.getAttribute("fin");
      const next = parseInt(current,10) + 1;
      if (next > finish) {
        window.location.href = "./login.html";
        return;
      }
      $("#card-" + current).addClass("d-none");
      $("#card-" + next).removeClass("d-none");
      this.setAttribute("curr", next);
      if(next == finish) {
        this.innerText=this.getAttribute("fin-text");
      }
    });
  }
});
