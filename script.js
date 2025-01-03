const startButton = document.getElementById('start-button');
const welcomePage = document.getElementById('welcome-page');
const burgerBuilder = document.getElementById('burger-builder');
const ingredients = document.querySelectorAll('.ingredient');
const dropZone = document.getElementById('drop-zone');
const undoButton = document.getElementById('undo-button');
const retryButton = document.getElementById('retry-button');

// Transition to the burger builder page
startButton.addEventListener('click', () => {
  welcomePage.style.display = 'none'; // Hide the welcome page
  burgerBuilder.style.display = 'block'; // Show the burger builder
});

// Drag-and-drop functionality
ingredients.forEach(ingredient => {
  ingredient.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', ingredient.getAttribute('data-ingredient'));
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // Allow drop
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();

  const ingredientType = e.dataTransfer.getData('text/plain');
  const newIngredient = document.createElement('div');
  newIngredient.className = ingredientType;
  dropZone.appendChild(newIngredient);

  // Check if the top bun (Bread-Top) is dropped
  if (ingredientType === 'Bread-Top') {
    // Disable drag-and-drop for all ingredients
    ingredients.forEach(ingredient => {
      ingredient.setAttribute('draggable', false);
    });

    // Hide the Undo button
    undoButton.style.display = 'none';

    // Show the Retry button
    retryButton.style.display = 'block';

    // Display the "Yummy!" message
    const message = document.createElement('div');
    message.id = 'yummy-message';
    message.textContent = 'Yummy! That looks good.';
    message.style.marginTop = '20px';
    message.style.fontSize = '20px';
    message.style.color = "#fff";
    document.body.appendChild(message);
  }
});

// Undo Button Logic
undoButton.addEventListener('click', () => {
  if (dropZone.lastChild) {
    dropZone.removeChild(dropZone.lastChild); // Remove the last added ingredient
  }
});

// Retry Button Logic
retryButton.addEventListener('click', () => {
  // Clear the drop zone
  dropZone.innerHTML = '';

  // Re-enable drag-and-drop for ingredients
  ingredients.forEach(ingredient => {
    ingredient.setAttribute('draggable', true);
  });

  // Show the Undo button
  undoButton.style.display = 'block';

  // Hide the Retry button
  retryButton.style.display = 'none';

  // Remove the "Yummy!" message if it exists
  const message = document.getElementById('yummy-message');
  if (message) {
    message.remove();
  }
});
