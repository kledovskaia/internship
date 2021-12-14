const messageElement = document.getElementById('message');
const amountElement = document.getElementById('amount');
const inputElement = document.getElementById('input');
const selectElement = document.getElementById('select');
const tableElement = document.getElementById('table');
const formElement = document.getElementById('form');

const config = {
  taxesEvery: 100,
  day: 0.4 * 1000,
  coefficient: {
    30: 20,
    60: 35,
    90: 50,
  },
};

let state;

inputElement.oninput = handleInputChange.bind(inputElement);
function handleInputChange() {
  if (this.value === '.') this.value = '';
  this.value = this.value.replace(/[^0-9.]/g, '').replace(/\.+/g, '.');
  if (this.value.split('.').length > 2) {
    this.value = this.value.split('.').slice(0, 2).join('.');
  }
}

formElement.addEventListener('submit', stacking);
document.addEventListener('keydown', function triggerMine(e) {
  if (e.key !== 'd') return;
  if (inputElement === document.activeElement) return;
  if (!state) {
    state = {
      balance: 0,
      stacking: {},
    };
    taxOffice();
  }
  mine();
});

function delay(milliseconds = config.day) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function mine(count = 1) {
  for (let i = 0; i < count; i++) {
    state.balance++;
    renderBalance();
  }
}

async function taxOffice() {
  const { taxesEvery, day } = config;
  setInterval(() => {
    const { balance } = state;
    if (balance) {
      state.balance -= (balance / 100) * Math.LN10;
      renderBalance();
    }
  }, taxesEvery * day);
}

async function stacking(event) {
  event.preventDefault();
  const deposit = +inputElement.value;
  const period = +selectElement.value;
  if (!state || deposit > state.balance) {
    window.alert("You don't have enough coins");
    return;
  }
  if (deposit <= 1) {
    window.alert('Please enter a deposit greater than 1');
    return;
  }
  inputElement.value = '';

  const id = Date.now();
  state.balance -= deposit;
  renderBalance();
  const isStackingEmpty = !Object.keys(state.stacking).length;
  state.stacking[id] = {
    deposit,
    period,
    daysLeft: period,
    profit: 0,
  };
  if (isStackingEmpty) renderTable();
  while (state.stacking[id].daysLeft) {
    const { period, deposit, profit } = state.stacking[id];
    await delay();
    state.stacking[id].profit +=
      (Math.log10(deposit + profit) * config.coefficient[period]) / 100;
    state.stacking[id].daysLeft--;
  }
  const { profit } = state.stacking[id];
  state.balance += deposit + profit;
  delete state.stacking[id];
  renderBalance();
}

async function renderTable() {
  while (true) {
    if (!Object.keys(state.stacking).length) return;
    await delay();
    tableElement.innerHTML = `
    <tr>
      <th>Сумма</th>
      <th>Период</th>
      <th>Осталось</th>
      <th>Добыто</th>
    </tr>
    ${Object.values(state.stacking)
      .map(
        (entity) =>
          `<tr>
          <td>${entity.deposit}</td>
          <td>${entity.period}d</td>
          <td>${entity.daysLeft}d</td>
          <td>${entity.profit.toFixed(4)}</td>
        </tr>`
      )
      .join('')}
    `;
  }
}

function renderBalance() {
  const { balance } = state;
  const formattedBalance = balance.toFixed(4);
  if (balance == formattedBalance) {
    amountElement.innerText = `Balance: ${balance}`;
  } else {
    amountElement.innerText = `Balance: ${formattedBalance}`;
  }
}

function renderMessage(text) {
  messageElement.innerText = text || '';
}
