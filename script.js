const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.textContent;

    if (!action) {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
      currentInput += value;
      updateDisplay(currentInput);
    } else {
      switch (action) {
        case 'clear':
          currentInput = '';
          updateDisplay('0');
          break;
        case 'del':
          currentInput = currentInput.slice(0, -1);
          updateDisplay(currentInput || '0');
          break;
        case '=':
          try {
            const result = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/'));
            updateDisplay(result);
            currentInput = result.toString();
            resultDisplayed = true;
          } catch {
            updateDisplay('Error');
            currentInput = '';
          }
          break;
        default:
          currentInput += action;
          updateDisplay(currentInput);
      }
    }
  });
});

function updateDisplay(value) {
  display.textContent = value;
}

// Bonus: Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || key === '.') {
    currentInput += key;
    updateDisplay(currentInput);
  } else if (['+', '-', '*', '/'].includes(key)) {
    currentInput += key;
    updateDisplay(currentInput);
  } else if (key === 'Enter') {
    try {
      const result = eval(currentInput);
      updateDisplay(result);
      currentInput = result.toString();
      resultDisplayed = true;
    } catch {
      updateDisplay('Error');
      currentInput = '';
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
  } else if (key.toLowerCase() === 'c') {
    currentInput = '';
    updateDisplay('0');
  }
});
