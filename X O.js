const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let togglePlayerButton = document.getElementById('togglePlayerButton');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O'; 
    placeMark(cell, currentClass);

    // Remove the toggle button after the first move
    if ([...cells].some(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
        if (togglePlayerButton) {
            togglePlayerButton.parentNode.removeChild(togglePlayerButton);
            togglePlayerButton = null; // Set to null to indicate it's removed
        }
    }

    if (checkWin(currentClass)) {
        setTimeout(() => alert(`${currentClass} wins!`), 10);
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 10);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    cell.classList.add(currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.addEventListener('click', handleClick, { once: true });
    });

    // Re-add the toggle button if it was removed
    if (!togglePlayerButton) {
        togglePlayerButton = document.createElement('button');
        togglePlayerButton.textContent = 'Toggle Starting Player';
        togglePlayerButton.setAttribute('id', 'togglePlayerButton');
        restartButton.parentElement.appendChild(togglePlayerButton);

        togglePlayerButton.addEventListener('click', function() {
            isXTurn = !isXTurn;
            togglePlayerButton.textContent = `Starting Player: ${isXTurn ? 'X' : 'O'}`;
        });
    }
}

togglePlayerButton.addEventListener('click', function() {
    isXTurn = !isXTurn;
    togglePlayerButton.textContent = `Starting Player: ${isXTurn ? 'X' : 'O'}`;
});
restartButton.addEventListener('click', startGame);
startGame();
