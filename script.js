(function() {
  let cookies = 0;
  let clickPower = 1;
  let autoRate = 0;

  let clickUpgradeCost = 15;
  let autoUpgradeCost = 30;

  const CLICK_POWER_STEP = 1;
  const AUTO_RATE_STEP = 1;

  const scoreDisplay = document.getElementById('scoreDisplay');
  const cpcDisplay = document.getElementById('cpcDisplay');
  const cpsDisplay = document.getElementById('cpsDisplay');
  const clickButton = document.getElementById('clickButton');

  const upgradeClickBtn = document.getElementById('upgradeClickBtn');
  const upgradeAutoBtn = document.getElementById('upgradeAutoBtn');
  const clickCostSpan = document.getElementById('clickCost');
  const autoCostSpan = document.getElementById('autoCost');
  const resetButton = document.getElementById('resetButton');

  function formatNumber(value) {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + 'M';
    } else if (value >= 1e4) {
      return (value / 1e3).toFixed(1) + 'K';
    } else {
      return Math.floor(value).toString();
    }
  }

  function updateUI() {
    const formattedCookies = formatNumber(cookies);
    scoreDisplay.textContent = formattedCookies;

    if (formattedCookies.length > 6) {
      scoreDisplay.classList.add('small');
    } else {
      scoreDisplay.classList.remove('small');
    }

    cpcDisplay.textContent = clickPower;
    cpsDisplay.textContent = autoRate;

    clickCostSpan.textContent = `🍪 ${clickUpgradeCost}`;
    autoCostSpan.textContent = `🍪 ${autoUpgradeCost}`;

    upgradeClickBtn.disabled = cookies < clickUpgradeCost;
    upgradeAutoBtn.disabled = cookies < autoUpgradeCost;
  }

  function addCookies(amount) {
    cookies = Math.max(0, cookies + amount);
    updateUI();
  }

  function handleClick() {
    addCookies(clickPower);
  }

  function buyClickUpgrade() {
    if (cookies < clickUpgradeCost) return;
    cookies -= clickUpgradeCost;
    clickPower += CLICK_POWER_STEP;
    clickUpgradeCost = Math.round(clickUpgradeCost * 1.65);
    if (clickUpgradeCost < 2) clickUpgradeCost = 2;
    updateUI();
  }

  function buyAutoUpgrade() {
    if (cookies < autoUpgradeCost) return;
    cookies -= autoUpgradeCost;
    autoRate += AUTO_RATE_STEP;
    autoUpgradeCost = Math.round(autoUpgradeCost * 1.85);
    if (autoUpgradeCost < 5) autoUpgradeCost = 5;
    updateUI();
  }

  function resetGame() {
    cookies = 0;
    clickPower = 1;
    autoRate = 0;
    clickUpgradeCost = 15;
    autoUpgradeCost = 30;
    updateUI();
  }

  function autoClickTick() {
    if (autoRate > 0) {
      addCookies(autoRate);
    }
  }

  clickButton.addEventListener('click', handleClick);

  upgradeClickBtn.addEventListener('click', buyClickUpgrade);
  upgradeAutoBtn.addEventListener('click', buyAutoUpgrade);

  resetButton.addEventListener('click', resetGame);

  clickButton.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  });

  setInterval(autoClickTick, 1000);

  updateUI();
})();