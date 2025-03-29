const cues = document.querySelectorAll(".cue");
const primaryCue = document.querySelector(".cue-primary");

cues.forEach((cue) => {
  cue.addEventListener("click", () => {
    // Меняем содержимое основного кия на кликнутый
    primaryCue.innerHTML = cue.innerHTML;

    // Убираем активный класс у всех киев
    cues.forEach((c) => c.classList.remove("active"));
    primaryCue.classList.remove("active");

    // Добавляем активный класс к текущему кию
    cue.classList.add("active");
    primaryCue.classList.add("active");
  });
});
