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

const state = {
  balance: 0,
  stacking: {},
};

formElement.addEventListener('submit', stacking);
document.addEventListener('keydown', async function triggerMine(e) {
  if (e.key !== 'd') return;
  const count = window.prompt('How much coins do you want to mine?');
  if (count === null) return;
  if (+count <= 1) {
    window.alert('Wrong value. Please, try again');
    return;
  }
  renderMessage('Mining...');
  document.removeEventListener('keydown', triggerMine);
  await mine(count);
  renderMessage(null);
});

function delay(milliseconds = config.day) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function mine(count) {
  taxOffice();
  for (let i = 0; i < count; i++) {
    await delay();
    state.balance++;
    renderBalance();
  }
}

async function taxOffice() {
  while (true) {
    const { taxesEvery, day } = config;
    const { balance } = state;
    await delay(taxesEvery * day);
    if (balance) {
      state.balance -= (balance / 100) * Math.LN10;
      renderBalance();
    }
  }
}

async function stacking(event) {
  event.preventDefault();
  const deposit = +inputElement.value;
  const period = +selectElement.value;
  if (deposit <= 1) {
    window.alert('Please enter a deposit greater than 1');
    return;
  }
  if (deposit > state.balance) {
    window.alert("You don't have enough coins");
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
