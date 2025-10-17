# Complete Examples

Real-world implementation examples for Blocky UI components.

## Table of Contents

- [Game Menu System](#game-menu-system)
- [Casino Game UI](#casino-game-ui)
- [Settings Panel](#settings-panel)
- [Shop Interface](#shop-interface)
- [Notification System](#notification-system)
- [Achievement Display](#achievement-display)

---

## Game Menu System

Complete main menu with navigation and modals.

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

class GameMenu {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.render();
  }

  private render() {
    // Title
    const title = document.createElement('h1');
    title.textContent = 'Block Breaker';
    title.style.textAlign = 'center';
    title.style.marginBottom = '40px';
    this.container.appendChild(title);

    // Menu buttons
    const buttons = [
      {
        text: '▶ Start Game',
        variant: 'primary' as const,
        action: () => this.startGame()
      },
      {
        text: '⚙ Settings',
        variant: 'secondary' as const,
        action: () => this.showSettings()
      },
      {
        text: '🏆 Achievements',
        variant: 'default' as const,
        action: () => this.showAchievements()
      },
      {
        text: '❌ Exit',
        variant: 'danger' as const,
        action: () => this.confirmExit()
      }
    ];

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '20px';
    buttonContainer.style.alignItems = 'center';

    buttons.forEach(config => {
      const button = BlockyUI.createButton({
        text: config.text,
        variant: config.variant,
        onClick: config.action
      });
      button.style.width = '300px';
      buttonContainer.appendChild(button);
    });

    this.container.appendChild(buttonContainer);
  }

  private startGame() {
    BlockyUI.showConfirmation(
      'Start New Game',
      'Ready to begin your adventure?',
      () => {
        console.log('Starting game...');
        // Start game logic
      }
    );
  }

  private showSettings() {
    const settingsContent = `
      <div style="padding: 20px;">
        <h3>Game Settings</h3>
        <div style="margin: 20px 0;">
          <label><input type="checkbox" checked> Sound Effects</label><br>
          <label><input type="checkbox" checked> Background Music</label><br>
          <label><input type="checkbox"> Full Screen</label>
        </div>
        <div>
          <label>Difficulty:</label><br>
          <select style="width: 100%; padding: 8px; margin-top: 5px;">
            <option>Easy</option>
            <option selected>Normal</option>
            <option>Hard</option>
          </select>
        </div>
      </div>
    `;

    const modal = BlockyUI.createModal({
      title: '⚙ Settings',
      content: settingsContent,
      buttons: [
        { text: 'Cancel', variant: 'default' },
        { text: 'Save', variant: 'primary', onClick: () => {
          BlockyUI.showNotification('Settings Saved', 'Your preferences have been saved.');
        }}
      ]
    });
    modal.show();
  }

  private showAchievements() {
    const achievements = [
      { name: 'First Victory', description: 'Win your first game', unlocked: true },
      { name: 'Speed Demon', description: 'Complete a level in under 30s', unlocked: true },
      { name: 'Perfect Clear', description: 'Clear all blocks without missing', unlocked: false },
      { name: 'Master Player', description: 'Reach level 50', unlocked: false }
    ];

    const achievementCards = achievements.map(ach => {
      return BlockyUI.createCard({
        title: ach.name,
        content: `
          <p>${ach.description}</p>
          <p style="color: ${ach.unlocked ? 'rgb(28, 230, 28)' : 'gray'};">
            ${ach.unlocked ? '✓ Unlocked' : '🔒 Locked'}
          </p>
        `,
        variant: ach.unlocked ? 'primary' : 'default'
      });
    });

    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    gridContainer.style.gap = '20px';
    gridContainer.style.padding = '20px';
    achievementCards.forEach(card => gridContainer.appendChild(card));

    const modal = BlockyUI.createModal({
      title: '🏆 Achievements',
      content: gridContainer,
      buttons: [{ text: 'Close', variant: 'primary' }]
    });
    modal.show();
  }

  private confirmExit() {
    BlockyUI.showConfirmation(
      'Exit Game',
      'Are you sure you want to quit?',
      () => {
        console.log('Exiting game...');
        // Exit logic
      },
      () => {
        console.log('Staying in game');
      }
    );
  }
}

// Initialize menu
const menu = new GameMenu('app');
```

---

## Casino Game UI

Slot machine-style interface with multiplier tags and win notifications.

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

class SlotMachine {
  private balance: number = 1000;
  private betAmount: number = 10;
  private container: HTMLElement;
  private balanceDisplay!: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.render();
  }

  private render() {
    // Balance display
    const balanceCard = BlockyUI.createCard({
      title: '💰 Balance',
      content: `<h2 id="balance">$${this.balance}</h2>`,
      variant: 'primary'
    });
    this.container.appendChild(balanceCard);

    // Slot display
    const slotDisplay = document.createElement('div');
    slotDisplay.id = 'slots';
    slotDisplay.style.display = 'flex';
    slotDisplay.style.gap = '20px';
    slotDisplay.style.justifyContent = 'center';
    slotDisplay.style.margin = '40px 0';

    for (let i = 0; i < 3; i++) {
      const slot = BlockyUI.createCard({
        content: '<h1 style="text-align: center; font-size: 4rem;">🎰</h1>'
      });
      slotDisplay.appendChild(slot);
    }
    this.container.appendChild(slotDisplay);

    // Bet controls
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '20px';
    controls.style.justifyContent = 'center';
    controls.style.alignItems = 'center';

    const decreaseBtn = BlockyUI.createButton({
      text: '-',
      variant: 'secondary',
      onClick: () => this.adjustBet(-10)
    });

    const betDisplay = BlockyUI.createCard({
      content: `<div style="text-align: center;">
        <p>Bet Amount</p>
        <h2 id="bet">$${this.betAmount}</h2>
      </div>`
    });

    const increaseBtn = BlockyUI.createButton({
      text: '+',
      variant: 'secondary',
      onClick: () => this.adjustBet(10)
    });

    controls.appendChild(decreaseBtn);
    controls.appendChild(betDisplay);
    controls.appendChild(increaseBtn);
    this.container.appendChild(controls);

    // Spin button
    const spinBtn = BlockyUI.createButton({
      text: '🎰 SPIN ($' + this.betAmount + ')',
      variant: 'primary',
      onClick: () => this.spin()
    });
    spinBtn.style.width = '300px';
    spinBtn.style.margin = '40px auto';
    spinBtn.style.display = 'block';
    this.container.appendChild(spinBtn);

    this.balanceDisplay = document.getElementById('balance')!;
  }

  private adjustBet(amount: number) {
    const newBet = this.betAmount + amount;
    if (newBet >= 10 && newBet <= this.balance) {
      this.betAmount = newBet;
      document.getElementById('bet')!.textContent = `$${this.betAmount}`;
    }
  }

  private async spin() {
    if (this.balance < this.betAmount) {
      BlockyUI.showError('Insufficient Balance', 'You don\'t have enough credits to spin!');
      return;
    }

    // Deduct bet
    this.balance -= this.betAmount;
    this.updateBalance();

    // Animate spin (simplified)
    const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎', '7️⃣'];
    const slots = document.querySelectorAll('#slots h1');

    // Random results
    const results: string[] = [];
    slots.forEach((slot, i) => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      results.push(symbol);
      (slot as HTMLElement).textContent = symbol;
    });

    // Check win
    setTimeout(() => this.checkWin(results), 500);
  }

  private checkWin(results: string[]) {
    const isWin = results[0] === results[1] && results[1] === results[2];

    if (isWin) {
      const multipliers = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎', '7️⃣'];
      const multiplier = multipliers.indexOf(results[0]) + 2;
      const winAmount = this.betAmount * multiplier;

      this.balance += winAmount;
      this.updateBalance();

      // Show win notification
      const multiplierTag = BlockyUI.createTag({
        text: `×${multiplier}`,
        variant: 'primary'
      });

      const winModal = BlockyUI.createModal({
        title: '🎉 BIG WIN!',
        content: `
          <div style="text-align: center;">
            <h1 style="font-size: 3rem; margin: 20px 0;">$${winAmount}</h1>
            <p>You won ${multiplier}x your bet!</p>
          </div>
        `,
        buttons: [{ text: 'Collect', variant: 'primary' }]
      });
      winModal.show();
    }
  }

  private updateBalance() {
    this.balanceDisplay.textContent = `$${this.balance}`;
  }
}

// Initialize slot machine
const slotMachine = new SlotMachine('app');
```

---

## Settings Panel

Complete settings interface with tabs and controls.

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

class SettingsPanel {
  private currentTab: string = 'general';
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.render();
  }

  private render() {
    // Header
    const header = BlockyUI.createCard({
      title: '⚙ Settings',
      content: '<p>Configure your game preferences</p>',
      variant: 'primary'
    });
    this.container.appendChild(header);

    // Tab buttons
    const tabs = [
      { id: 'general', label: 'General' },
      { id: 'graphics', label: 'Graphics' },
      { id: 'audio', label: 'Audio' },
      { id: 'controls', label: 'Controls' }
    ];

    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.gap = '10px';
    tabContainer.style.margin = '20px 0';
    tabContainer.style.justifyContent = 'center';

    tabs.forEach(tab => {
      const button = BlockyUI.createButton({
        text: tab.label,
        variant: this.currentTab === tab.id ? 'primary' : 'default',
        onClick: () => this.switchTab(tab.id)
      });
      button.setAttribute('data-tab', tab.id);
      tabContainer.appendChild(button);
    });
    this.container.appendChild(tabContainer);

    // Content area
    const contentArea = document.createElement('div');
    contentArea.id = 'settings-content';
    this.container.appendChild(contentArea);

    this.renderTabContent();

    // Save button
    const saveBtn = BlockyUI.createButton({
      text: '💾 Save Settings',
      variant: 'primary',
      onClick: () => this.saveSettings()
    });
    saveBtn.style.width = '300px';
    saveBtn.style.margin = '40px auto';
    saveBtn.style.display = 'block';
    this.container.appendChild(saveBtn);
  }

  private switchTab(tabId: string) {
    this.currentTab = tabId;

    // Update button styles
    document.querySelectorAll('[data-tab]').forEach(btn => {
      const button = btn.querySelector('.blocky-btn') as HTMLElement;
      if (btn.getAttribute('data-tab') === tabId) {
        button.className = 'blocky-btn blocky-gradient blocky-3d primary';
      } else {
        button.className = 'blocky-btn blocky-gradient blocky-3d default';
      }
    });

    this.renderTabContent();
  }

  private renderTabContent() {
    const content = document.getElementById('settings-content')!;
    content.innerHTML = '';

    let settingsCard: HTMLDivElement;

    switch (this.currentTab) {
      case 'general':
        settingsCard = this.createGeneralSettings();
        break;
      case 'graphics':
        settingsCard = this.createGraphicsSettings();
        break;
      case 'audio':
        settingsCard = this.createAudioSettings();
        break;
      case 'controls':
        settingsCard = this.createControlsSettings();
        break;
      default:
        settingsCard = BlockyUI.createCard({ content: 'Select a tab' });
    }

    content.appendChild(settingsCard);
  }

  private createGeneralSettings(): HTMLDivElement {
    return BlockyUI.createCard({
      title: 'General Settings',
      content: `
        <div style="padding: 20px;">
          <label style="display: block; margin-bottom: 15px;">
            <input type="checkbox" checked> Auto-save progress
          </label>
          <label style="display: block; margin-bottom: 15px;">
            <input type="checkbox" checked> Show tutorials
          </label>
          <label style="display: block; margin-bottom: 15px;">
            <input type="checkbox"> Hard mode
          </label>
          <div style="margin-top: 20px;">
            <label>Language:</label><br>
            <select style="width: 100%; padding: 8px; margin-top: 5px;">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      `
    });
  }

  private createGraphicsSettings(): HTMLDivElement {
    return BlockyUI.createCard({
      title: 'Graphics Settings',
      content: `
        <div style="padding: 20px;">
          <label>Quality:</label><br>
          <select style="width: 100%; padding: 8px; margin: 5px 0 15px 0;">
            <option>Low</option>
            <option>Medium</option>
            <option selected>High</option>
            <option>Ultra</option>
          </select>

          <label>Resolution:</label><br>
          <select style="width: 100%; padding: 8px; margin: 5px 0 15px 0;">
            <option>1280×720</option>
            <option selected>1920×1080</option>
            <option>2560×1440</option>
          </select>

          <label style="display: block; margin: 15px 0;">
            <input type="checkbox" checked> VSync
          </label>
          <label style="display: block; margin: 15px 0;">
            <input type="checkbox" checked> Antialiasing
          </label>
        </div>
      `
    });
  }

  private createAudioSettings(): HTMLDivElement {
    return BlockyUI.createCard({
      title: 'Audio Settings',
      content: `
        <div style="padding: 20px;">
          <label>Master Volume:</label><br>
          <input type="range" min="0" max="100" value="80" style="width: 100%; margin: 10px 0 20px 0;">

          <label>Music Volume:</label><br>
          <input type="range" min="0" max="100" value="60" style="width: 100%; margin: 10px 0 20px 0;">

          <label>Sound Effects:</label><br>
          <input type="range" min="0" max="100" value="70" style="width: 100%; margin: 10px 0 20px 0;">

          <label style="display: block; margin: 15px 0;">
            <input type="checkbox" checked> Enable music
          </label>
          <label style="display: block; margin: 15px 0;">
            <input type="checkbox" checked> Enable sound effects
          </label>
        </div>
      `
    });
  }

  private createControlsSettings(): HTMLDivElement {
    return BlockyUI.createCard({
      title: 'Control Settings',
      content: `
        <div style="padding: 20px;">
          <p>Keyboard Bindings:</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
            <span>Move Up:</span><span>W</span>
            <span>Move Down:</span><span>S</span>
            <span>Move Left:</span><span>A</span>
            <span>Move Right:</span><span>D</span>
            <span>Action:</span><span>Space</span>
            <span>Menu:</span><span>Esc</span>
          </div>

          <label>Mouse Sensitivity:</label><br>
          <input type="range" min="1" max="10" value="5" style="width: 100%; margin: 10px 0;">
        </div>
      `
    });
  }

  private saveSettings() {
    BlockyUI.showNotification(
      'Settings Saved',
      'Your preferences have been saved successfully.',
      () => console.log('Settings saved')
    );
  }
}

// Initialize settings
const settings = new SettingsPanel('app');
```

---

## Shop Interface

In-game shop with items and purchase confirmations.

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

class GameShop {
  private coins: number = 500;
  private container: HTMLElement;
  private coinDisplay!: HTMLElement;

  private items: ShopItem[] = [
    { id: '1', name: 'Health Potion', description: 'Restores 50 HP', price: 50, icon: '❤️' },
    { id: '2', name: 'Speed Boost', description: '+20% movement speed', price: 100, icon: '⚡' },
    { id: '3', name: 'Shield', description: 'Blocks 100 damage', price: 150, icon: '🛡️' },
    { id: '4', name: 'Sword Upgrade', description: '+10 damage', price: 200, icon: '⚔️' },
    { id: '5', name: 'Magic Scroll', description: 'Learn a new spell', price: 250, icon: '📜' },
    { id: '6', name: 'Rare Gem', description: 'Valuable collectible', price: 500, icon: '💎' }
  ];

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.render();
  }

  private render() {
    // Header with coin balance
    const header = BlockyUI.createCard({
      title: '🏪 Item Shop',
      content: `<div style="text-align: center;">
        <h2>💰 <span id="coins">${this.coins}</span> Coins</h2>
      </div>`,
      variant: 'primary'
    });
    this.container.appendChild(header);
    this.coinDisplay = document.getElementById('coins')!;

    // Item grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    grid.style.gap = '20px';
    grid.style.margin = '30px 0';

    this.items.forEach(item => {
      const itemCard = this.createItemCard(item);
      grid.appendChild(itemCard);
    });

    this.container.appendChild(grid);
  }

  private createItemCard(item: ShopItem): HTMLDivElement {
    const card = BlockyUI.createCard({
      content: `
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 3rem; margin-bottom: 10px;">${item.icon}</div>
          <h3 style="margin: 10px 0;">${item.name}</h3>
          <p style="opacity: 0.8; margin: 10px 0; min-height: 40px;">${item.description}</p>
          <div style="font-size: 1.5rem; font-weight: bold; color: rgb(255, 194, 1); margin: 15px 0;">
            💰 ${item.price}
          </div>
        </div>
      `
    });

    const buyBtn = BlockyUI.createButton({
      text: 'Buy Now',
      variant: this.coins >= item.price ? 'primary' : 'default',
      disabled: this.coins < item.price,
      onClick: () => this.buyItem(item)
    });
    buyBtn.style.width = '100%';
    buyBtn.style.marginTop = '10px';

    card.appendChild(buyBtn);
    return card;
  }

  private buyItem(item: ShopItem) {
    if (this.coins < item.price) {
      BlockyUI.showError(
        'Insufficient Coins',
        `You need ${item.price - this.coins} more coins to buy this item.`
      );
      return;
    }

    BlockyUI.showConfirmation(
      'Confirm Purchase',
      `Buy ${item.name} for ${item.price} coins?`,
      () => this.completePurchase(item),
      () => console.log('Purchase cancelled')
    );
  }

  private completePurchase(item: ShopItem) {
    this.coins -= item.price;
    this.coinDisplay.textContent = String(this.coins);

    BlockyUI.showNotification(
      'Purchase Complete',
      `You bought ${item.name}!`,
      () => console.log('Purchase completed')
    );

    // Re-render to update button states
    this.container.innerHTML = '';
    this.render();
  }
}

// Initialize shop
const shop = new GameShop('app');
```

---

## More Examples

For more examples, check out:
- [Game Integration](Game-Integration) - Framework-specific examples
- [Common Patterns](Common-Patterns) - Reusable patterns
- [API Reference](API-Reference) - Complete API documentation

---

**Ready to build your own? Start with these examples and customize to your needs! 🎮**
