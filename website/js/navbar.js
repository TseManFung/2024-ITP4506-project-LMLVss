window.addEventListener("scroll",()=>{
    let header=document.querySelector("header");
    header.classList.toggle("sticky",window.scrollY>0);
})

document.addEventListener("DOMContentLoaded", () => {
    let header=document.querySelector("header");
    header.classList.toggle("sticky",window.scrollY>0);
});

const menuIcon = document.querySelector('.menu-icon');
const header = document.querySelector('header');

menuIcon.addEventListener('click', () => {
    header.classList.toggle('active');
});

window.addEventListener("resize", (e)=>{
    if(window.innerWidth>768){
        header.classList.remove('active');
    }
});
