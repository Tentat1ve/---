(function() {
  let currentInput = '';
  let previousValue = '';
  let operation = null;
  let waitingForOperand = false;
  let justCalculated = false;
  let history = [];

  const screen = document.getElementById('calcScreen');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  function updateDisplay(value) {
    if (value === undefined || value === null) value = '0';
    let strVal = value.toString();
    if (strVal.length > 16) strVal = strVal.slice(0, 16) + '…';
    screen.innerText = strVal;
  }

  function renderHistory() {
    if (!historyList) return;
    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-empty">Нет записей</div>';
      return;
    }
    historyList.innerHTML = history.map(item => `
      <div class="history-item">
        <div class="history-expression">${item.expression}</div>
        <div class="history-result">= ${item.result}</div>
      </div>
    `).join('');
    historyList.scrollTop = historyList.scrollHeight;
  }

  function addToHistory(expression, result) {
    history.unshift({ expression, result });
    if (history.length > 20) history.pop();
    renderHistory();
  }

  function clearHistory() {
    history = [];
    renderHistory();
  }

  function inputDigit(digit) {
    if (justCalculated) {
      currentInput = digit;
      waitingForOperand = false;
      operation = null;
      previousValue = '';
      justCalculated = false;
      updateDisplay(currentInput);
      return;
    }
    
    if (waitingForOperand) {
      currentInput = digit;
      waitingForOperand = false;
      updateDisplay(currentInput);
    } else {
      if (digit === '.' && currentInput.includes('.')) return;
      if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
      } else {
        currentInput += digit;
      }
      updateDisplay(currentInput);
    }
  }

  function toggleSign() {
    let num = parseFloat(currentInput);
    if (isNaN(num)) num = 0;
    num = -num;
    currentInput = num.toString();
    updateDisplay(currentInput);
    if (justCalculated) {
      justCalculated = false;
      operation = null;
      previousValue = '';
    }
  }

  function inputPercent() {
    let num = parseFloat(currentInput);
    if (isNaN(num)) num = 0;
    let percentVal = num / 100;
    currentInput = percentVal.toString();
    updateDisplay(currentInput);
    if (justCalculated) {
      justCalculated = false;
      operation = null;
      previousValue = '';
    }
  }

  function getOperatorSymbol(op) {
    switch(op) {
      case '+': return '+';
      case '-': return '−';
      case '×': return '×';
      case '÷': return '÷';
      default: return op;
    }
  }

  function formatNumber(num) {
    let n = parseFloat(num);
    if (isNaN(n)) return num.toString();
    if (Math.abs(n) > 1e10 || (Math.abs(n) < 1e-5 && n !== 0)) {
      return n.toExponential(6);
    }
    let str = n.toString();
    if (str.length > 12) str = str.slice(0, 12);
    return str;
  }

  function calculate() {
    let a = parseFloat(previousValue);
    let b = parseFloat(currentInput);
    if (isNaN(a)) a = 0;
    if (isNaN(b)) b = 0;
    let result = 0;
    switch (operation) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '×': result = a * b; break;
      case '÷':
        if (b === 0) return 'Ошибка';
        result = a / b;
        break;
      default: return b;
    }
    if (Math.abs(result) > 1e12) result = result.toExponential(8);
    else result = parseFloat(result.toFixed(10));
    return result;
  }

  function performOperation(op) {
    if (justCalculated) {
      previousValue = currentInput;
      justCalculated = false;
      waitingForOperand = true;
      operation = op;
      return;
    }
    
    if (operation !== null && !waitingForOperand) {
      let result = calculate();
      if (result === 'Ошибка') {
        clearAll();
        updateDisplay('Ошибка');
        operation = null;
        previousValue = '';
        currentInput = '';
        waitingForOperand = true;
        justCalculated = false;
        return;
      }
      let expr = `${formatNumber(previousValue)} ${getOperatorSymbol(operation)} ${formatNumber(currentInput)}`;
      addToHistory(expr, formatNumber(result));
      
      previousValue = result.toString();
      currentInput = previousValue;
      updateDisplay(previousValue);
    } else if (previousValue === '' && !waitingForOperand && currentInput !== '') {
      previousValue = currentInput;
    }
    operation = op;
    waitingForOperand = true;
    justCalculated = false;
  }

  function computeEqual() {
    if (operation === null || waitingForOperand) {
      if (currentInput === '' && previousValue !== '') {
        updateDisplay(previousValue);
        currentInput = previousValue;
      }
      justCalculated = true;
      return;
    }
    
    let result = calculate();
    if (result === 'Ошибка') {
      updateDisplay('Ошибка');
      addToHistory(`${formatNumber(previousValue)} ${getOperatorSymbol(operation)} ${formatNumber(currentInput)}`, 'Ошибка');
      clearAll();
      return;
    }
    
    let expr = `${formatNumber(previousValue)} ${getOperatorSymbol(operation)} ${formatNumber(currentInput)}`;
    addToHistory(expr, formatNumber(result));
    
    currentInput = result.toString();
    previousValue = '';
    operation = null;
    waitingForOperand = true;
    justCalculated = true;
    updateDisplay(currentInput);
  }

  function clearAll() {
    currentInput = '';
    previousValue = '';
    operation = null;
    waitingForOperand = false;
    justCalculated = false;
    updateDisplay('0');
  }

  // Кнопки калькулятора
  document.querySelectorAll('[data-digit]').forEach(btn => {
    btn.addEventListener('click', () => {
      inputDigit(btn.getAttribute('data-digit'));
    });
  });

  document.getElementById('btnClear')?.addEventListener('click', clearAll);
  document.getElementById('btnSign')?.addEventListener('click', toggleSign);
  document.getElementById('btnPercent')?.addEventListener('click', inputPercent);
  document.getElementById('btnDivide')?.addEventListener('click', () => performOperation('÷'));
  document.getElementById('btnMultiply')?.addEventListener('click', () => performOperation('×'));
  document.getElementById('btnMinus')?.addEventListener('click', () => performOperation('-'));
  document.getElementById('btnPlus')?.addEventListener('click', () => performOperation('+'));
  document.getElementById('btnEqual')?.addEventListener('click', computeEqual);
  clearHistoryBtn?.addEventListener('click', clearHistory);

  // Клавиатура
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') inputDigit(key);
    else if (key === '.') inputDigit('.');
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
      e.preventDefault();
      if (key === '+') performOperation('+');
      if (key === '-') performOperation('-');
      if (key === '*') performOperation('×');
      if (key === '/') performOperation('÷');
    } else if (key === 'Enter' || key === '=') computeEqual();
    else if (key === 'Escape' || key === 'c' || key === 'C') clearAll();
    else if (key === '%') inputPercent();
  });

  clearAll();

  // Навигация
  const pages = {
    home: document.getElementById('homePage'),
    calculator: document.getElementById('calculatorPage')
  };

  function showPage(pageId) {
    Object.keys(pages).forEach(id => {
      if (pages[id]) pages[id].classList.remove('active-page');
    });
    if (pages[pageId]) pages[pageId].classList.add('active-page');
  }

  const logoLink = document.getElementById('logoLink');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('home');
    });
  }

  const calculatorNavLink = document.getElementById('calculatorNavLink');
  if (calculatorNavLink) {
    calculatorNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('calculator');
    });
  }
  
  const requestBtn = document.getElementById('requestBtn');
  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      window.location.href = 'https://github.com/Tentat1ve';
    });
  }
  
  showPage('calculator');
})();