// src/scenes/GameScene.js
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.selectedBuilding = null;
        this.buildings = [];
        this.workers = [];
        this.resources = { ...CONFIG.resources };
    }

    create() {
        this.createBackground();
        this.createResourcePanel();
        this.createTitle();
        this.createAnimatedAnts();
        this.createBuildMenu();

        // Жерге басуу менен салуу
        this.input.on('pointerdown', (pointer) => {
            if (this.selectedBuilding) {
                this.placeBuilding(pointer.x, pointer.y);
            }
        });

        console.log("🏰 Kumurska Chep — Шедевр версиясы иштели жатат!");
    }

    createBackground() {
        const w = CONFIG.width;
        const h = CONFIG.height;
        this.add.rectangle(w/2, h/2, w, h, 0x0b2a0b);
        this.add.rectangle(w/2, h - 90, w, 180, 0x1e3d1e);
        this.add.rectangle(w/2, h - 130, w, 60, 0x2a5c2a);
    }

    createResourcePanel() {
        const resList = [
            { key: 'leaves', icon: '🍃', color: '#90ee90' },
            { key: 'honey', icon: '🍯', color: '#ffcc00' },
            { key: 'dirt', icon: '🟫', color: '#c19a6b' },
            { key: 'water', icon: '💧', color: '#87cefa' }
        ];

        let x = 40;
        resList.forEach(res => {
            this.add.rectangle(x + 85, 48, 170, 58, 0x112211, 0.9).setStrokeStyle(3, 0x334422);
            this.add.text(x + 25, 38, res.icon + " " + res.key.charAt(0).toUpperCase() + res.key.slice(1), 
                { fontSize: '19px', color: res.color, fontStyle: 'bold' });
            
            this[res.key + 'Text'] = this.add.text(x + 30, 63, this.resources[res.key], 
                { fontSize: '24px', color: '#fff', fontStyle: 'bold' });
            x += 195;
        });
    }

    createTitle() {
        this.add.text(CONFIG.width/2, 75, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '42px', color: '#ffdd77'
        }).setOrigin(0.5).setShadow(3, 3, '#000', 5);
    }

    createAnimatedAnts() {
        for (let i = 0; i < 6; i++) {
            const ant = this.add.text(100 + i*150, 220 + Math.random()*120, '🐜', { fontSize: '58px' }).setOrigin(0.5);
            this.workers.push(ant);
            
            this.tweens.add({
                targets: ant,
                x: 100 + i*150 + 180,
                duration: 2800 + Math.random()*1200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    createBuildMenu() {
        const buildings = [
            { name: "Туннель", emoji: "🕳️", cost: 60, type: "tunnel" },
            { name: "Склад", emoji: "📦", cost: 100, type: "storage" },
            { name: "Казарма", emoji: "⚔️", cost: 150, type: "barracks" },
            { name: "Queen Chamber", emoji: "👑", cost: 250, type: "queen" }
        ];

        let y = 150;
        buildings.forEach(b => {
            const btn = this.add.rectangle(CONFIG.width - 90, y, 135, 82, 0x223322, 0.95)
                .setStrokeStyle(4, 0x55bb55)
                .setInteractive({ useHandCursor: true });

            this.add.text(CONFIG.width - 90, y - 20, b.emoji, { fontSize: '42px' }).setOrigin(0.5);
            this.add.text(CONFIG.width - 90, y + 25, b.name, { fontSize: '14px', color: '#fff' }).setOrigin(0.5);

            btn.on('pointerdown', () => {
                this.selectedBuilding = b;
                console.log(`✅ Тандалды: ${b.name}`);
            });
            y += 100;
        });
    }

    placeBuilding(x, y) {
        if (!this.selectedBuilding) return;
        if (this.resources.leaves < this.selectedBuilding.cost) {
            console.log("❌ Жетиштүү ресурстар жок!");
            return;
        }

        const building = this.add.text(x, y, this.selectedBuilding.emoji, { 
            fontSize: '58px' 
        }).setOrigin(0.5).setInteractive();

        this.buildings.push({
            obj: building,
            type: this.selectedBuilding.type,
            lastCollect: Date.now()
        });

        this.resources.leaves -= this.selectedBuilding.cost;
        this.updateResources();

        console.log(`🏗️ ${this.selectedBuilding.name} салынды!`);
    }

    updateResources() {
        if (this.leavesText) this.leavesText.setText(this.resources.leaves);
        if (this.honeyText) this.honeyText.setText(this.resources.honey);
        if (this.dirtText) this.dirtText.setText(this.resources.dirt);
        if (this.waterText) this.waterText.setText(this.resources.water);
    }
}

// Убактылуу сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); } }
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); } }
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); } }
