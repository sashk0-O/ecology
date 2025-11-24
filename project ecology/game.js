const bins = document.querySelectorAll('.bin');
const trashItems = document.querySelectorAll('.trash');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Додаємо обробники до всіх предметів
trashItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Додаємо обробники до всіх смітників
bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', dropTrash);
});

let draggedElement = null;

function dragStart(e) {
  draggedElement = e.target; 
  e.dataTransfer.setData("type", e.target.dataset.type);
  setTimeout(() => {
    e.target.style.opacity = "0.3"; // ефект перетягування
  }, 0);
}

function dragEnd(e) {
  e.target.style.opacity = "1";
}

function dragOver(e) {
  e.preventDefault();
}

function dropTrash(e) {
  e.preventDefault();

  const trashType = e.dataTransfer.getData("type");
  const binType = e.target.closest(".bin").id;

  const bin = e.target.closest(".bin");

  if (!draggedElement) return;

  // ----- Якщо предмет правильний -----
  if (trashType === binType) {
    score++;
    scoreDisplay.textContent = score;

    // Анімація правильної відповіді
    bin.classList.add("correct");
    setTimeout(() => bin.classList.remove("correct"), 600);

    // Видаляємо предмет
    draggedElement.remove();
    draggedElement = null;

  } 
  // ----- Якщо предмет неправильний -----
  else {
    bin.classList.add("wrong");
    setTimeout(() => bin.classList.remove("wrong"), 600);

    draggedElement.style.opacity = "1";

    if (score > 0) score--;
    scoreDisplay.textContent = score;
  }
}
