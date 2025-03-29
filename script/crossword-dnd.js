document.addEventListener("DOMContentLoaded", function () {
  const letters = document.querySelectorAll(".letter");
  const cells = document.querySelectorAll(".crossword-cell");

  let selectedLetter = null;
  let originalParent = null;
  let offsetX = 0,
    offsetY = 0;

  // Добавляем события для ПК (drag & drop)
  letters.forEach((letter) => {
    letter.draggable = true;
    letter.addEventListener("dragstart", handleDragStart);
    letter.addEventListener("dragend", handleDragEnd);

    // Добавляем обработчики для мобильных устройств (тач-события)
    letter.addEventListener("touchstart", handleTouchStart, { passive: true });
    letter.addEventListener("touchmove", handleTouchMove, { passive: false });
    letter.addEventListener("touchend", handleTouchEnd);
  });

  // Обработчики событий для ячеек
  cells.forEach((cell) => {
    cell.addEventListener("dragover", (e) => e.preventDefault());
    cell.addEventListener("drop", handleDrop);
  });

  function handleDragStart(e) {
    e.dataTransfer.setData("letterId", e.target.id);
  }

  function handleDragEnd(e) {
    e.target.style.opacity = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    const letterId = e.dataTransfer.getData("letterId");
    const letter = document.getElementById(letterId);
    const targetCell = e.target.closest(".crossword-cell");

    if (targetCell && !targetCell.contains(letter)) {
      swapLetters(letter, targetCell);
    }
  }

  function handleTouchStart(e) {
    selectedLetter = e.target.closest(".letter");
    if (!selectedLetter) return;

    originalParent = selectedLetter.parentElement;

    const touch = e.touches[0];
    const rect = selectedLetter.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!selectedLetter) return;

    const touch = e.touches[0];

    // Перемещаем букву

    selectedLetter.style.position = "absolute";
    selectedLetter.style.zIndex = 1;
    selectedLetter.style.transform = `translate(${touch.windowX - offsetX}px, ${touch.clientY - offsetY}px)`;
    selectedLetter.style.willChange = "transform";
    
  }

  function handleTouchEnd(e) {
    if (!selectedLetter) return;

    const targetCell = document
      .elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      )
      ?.closest(".crossword-cell");

    if (targetCell && targetCell !== originalParent) {
      swapLetters(selectedLetter, targetCell);
    } else {
      originalParent.appendChild(selectedLetter);
    }

    // Сбрасываем стили
    selectedLetter.style.position = "static";
    selectedLetter.style.zIndex = "";
    selectedLetter.style.transform = "";
    selectedLetter.style.willChange = "";

    selectedLetter = null;
  }

  function swapLetters(letter, targetCell) {
    const targetLetter = targetCell.querySelector(".letter");

    if (targetLetter) {
      const letterParent = letter.parentElement;
      targetCell.appendChild(letter);
      letterParent.appendChild(targetLetter);
    } else {
      targetCell.appendChild(letter);
    }
  }
});
