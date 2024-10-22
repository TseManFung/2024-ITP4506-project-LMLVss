document.addEventListener('DOMContentLoaded', function() {
const body=document.body;
const eye=document.querySelector('.fa-regular');
const beam=document.querySelector('.beam');
const passwordInput=document.getElementById('password');
const accountInput=document.getElementById('account');
const btnLogin = document.getElementsByClassName("btn-login")[0];

body.addEventListener('mousemove',function(e){
    let rect=beam.getBoundingClientRect();
    let mouseX=rect.right+(rect.width/2);
    let mouseY=rect.top+(rect.height/2);
    let rad=Math.atan2(mouseX-e.pageX,mouseY-e.pageY);
    let deg=(rad*(20/Math.PI)*-1)-350;
    body.style.setProperty('--beam-deg',deg+'deg');
})

eye.addEventListener('click',function(e){
    e.preventDefault();
    body.classList.toggle('show-password');
    passwordInput.type=passwordInput.type==='password'?'text':'password';
    eye.className='fa-regular '+(passwordInput.type==='password'?'fa-eye-slash':'fa-eye');
    eye.style='color: '+(passwordInput.type==='password'?'':'white');
    passwordInput.focus();
})

btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    account = $("#account").val(accountInput.value);
    password = $("#password").val(passwordInput.value);
    if(account===''||password===''){
        alert('Please fill in all fields');
        return;
    }
    if(password==="Ab12345678"){
      if(account==="C"){
        window.location.href = "./customer/index.html";
      }
      else if(account==="V"){
        window.location.href = "./vehicle/index.html";
      }
      else if(account==="I"){
        window.location.href = "./insurance/index.html";
      }
    }
});
})
