---
title: Examples
layout: default
nav_order: 5
---

# Complete Examples

Real-world implementation examples for Blocky UI components.

## Table of Contents

- [Game Menu System](#game-menu-system)
- [Casino Game UI](#casino-game-ui)
- [Settings Panel](#settings-panel)
- [Shop Interface](#shop-interface)

---

## Game Menu System

Complete main menu with navigation and modals.

```typescript
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

class GameMenu {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.render();
  }

  private render() {
    const title = document.createElement('h1');
    title.textContent = 'Block Breaker';
    this.container.appendChild(title);

    const buttons = [
      { text: 'Start Game', variant: 'primary' as const, action: () => this.startGame() },
      { text: 'Settings', variant: 'secondary' as const, action: () => this.showSettings() },
      { text: 'Achievements', variant: 'default' as const, action: () => this.showAchievements() },
      { text: 'Exit', variant: 'danger' as const, action: () => this.confirmExit() }
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
      () => console.log('Starting game...')
    );
  }

  private showSettings() {
    const modal = BlockyUI.createModal({
      title: 'Settings',
      content: '<div style="padding: 20px;"><label><input type="checkbox" checked> Sound Effects</label></div>',
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
      { name: 'First Victory', unlocked: true },
      { name: 'Speed Demon', unlocked: true },
      { name: 'Perfect Clear', unlocked: false }
    ];

    const content = achievements.map(ach =>
      `<p>${ach.unlocked ? '✓' : '🔒'} ${ach.name}</p>`
    ).join('');

    const modal = BlockyUI.createModal({
      title: 'Achievements',
      content,
      buttons: [{ text: 'Close', variant: 'primary' }]
    });
    modal.show();
  }

  private confirmExit() {
    BlockyUI.showConfirmation('Exit Game', 'Are you sure?', () => console.log('Exiting...'));
  }
}
```

---

## Casino Game UI

Slot machine-style interface with multiplier tags and win notifications.

```typescript
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

class SlotMachine {
  private balance: number = 1000;
  private betAmount: number = 10;

  constructor(containerId: string) {
    const container = document.getElementById(containerId)!;

    // Balance display
    container.appendChild(BlockyUI.createCard({
      title: 'Balance',
      content: `<h2 id="balance">$${this.balance}</h2>`,
      variant: 'primary'
    }));

    // Spin button
    const spinBtn = BlockyUI.createButton({
      text: 'SPIN',
      variant: 'primary',
      onClick: () => this.spin()
    });
    container.appendChild(spinBtn);
  }

  private spin() {
    if (this.balance < this.betAmount) {
      BlockyUI.showError('Insufficient Balance', "You don't have enough credits!");
      return;
    }

    this.balance -= this.betAmount;
    const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎', '7️⃣'];
    const results = Array.from({ length: 3 }, () =>
      symbols[Math.floor(Math.random() * symbols.length)]
    );

    if (results[0] === results[1] && results[1] === results[2]) {
      const multiplier = symbols.indexOf(results[0]) + 2;
      const winAmount = this.betAmount * multiplier;
      this.balance += winAmount;

      const winModal = BlockyUI.createModal({
        title: 'BIG WIN!',
        content: `<div style="text-align:center;"><h1>$${winAmount}</h1><p>${multiplier}x your bet!</p></div>`,
        buttons: [{ text: 'Collect', variant: 'primary' }]
      });
      winModal.show();
    }
  }
}
```

---

## Settings Panel

Complete settings interface with tabs and controls.

```typescript
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

// Tab buttons
const tabs = ['General', 'Graphics', 'Audio', 'Controls'];

tabs.forEach(tab => {
  const button = BlockyUI.createButton({
    text: tab,
    variant: tab === 'General' ? 'primary' : 'default',
    onClick: () => switchTab(tab)
  });
  tabContainer.appendChild(button);
});

// Use BlockyDropdown for select elements
const languageDropdown = BlockyUI.createDropdown({
  label: 'Language:',
  options: [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' }
  ],
  value: 'en',
  variant: 'default',
  onChange: (value) => console.log('Language:', value)
});
```

---

## Shop Interface

In-game shop with items and purchase confirmations.

```typescript
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

interface ShopItem {
  name: string;
  description: string;
  price: number;
  icon: string;
}

const items: ShopItem[] = [
  { name: 'Health Potion', description: 'Restores 50 HP', price: 50, icon: '❤️' },
  { name: 'Speed Boost', description: '+20% speed', price: 100, icon: '⚡' },
  { name: 'Shield', description: 'Blocks 100 damage', price: 150, icon: '🛡️' },
];

// Create item cards
items.forEach(item => {
  const card = BlockyUI.createCard({
    content: `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 3rem;">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <strong>${item.price} coins</strong>
      </div>
    `
  });

  const buyBtn = BlockyUI.createButton({
    text: 'Buy Now',
    variant: 'primary',
    onClick: () => {
      BlockyUI.showConfirmation(
        'Confirm Purchase',
        `Buy ${item.name} for ${item.price} coins?`,
        () => BlockyUI.showNotification('Purchased!', `You bought ${item.name}!`)
      );
    }
  });

  card.appendChild(buyBtn);
  grid.appendChild(card);
});
```

---

**See the [Live Demo]({{ site.baseurl }}/demo/) for interactive examples.**
