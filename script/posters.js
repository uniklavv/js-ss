const buttonBye = document.querySelector(".poster-button");
const poster = document.querySelector(".poster");

buttonBye.addEventListener("click", () => {
   poster.classList.add("hidden");
});