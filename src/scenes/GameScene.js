// src/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.selectedBuilding = null;
        this.buildings = [];
    }

    create() {
        const w = CONFIG.width;
        const h = CONFIG.height;

        this.createBackground();
        this.createResourcePanel();
        
        this.add.text(w/2, 75, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '42px', color: '#ffdd77'
        }).setOrigin(0.5).setShadow(3, 3, '#000', 5);

        this.createAnimatedAnts();
        this.createBuildMenu();

        // Картага басуу менен имарат салуу
        this.input.on('pointerdown', (pointer) => {
            if (this.selectedBuilding) {
                this.placeBuilding(pointer.x, pointer.y);
            }
        });

        console.log("🏗️ Имарат салуу системасы даяр! Тандоо → Жерге басуу");
    }

    createBackground() {
        const w = CONFIG.width;
        const h = CONFIG.height;
        this.add.rectangle(w/2, h/2, w, h, 0x0b2a0b);
        this.add.rectangle(w/2, h - 90, w, 180, 0x1e3d1e);
        this.add.rectangle(w/2, h - 130, w, 60, 0x2a5c2a);

        this.add.text(150, h - 85, '🌿', { fontSize: '40px' });
        this.add.text(380, h - 115, '🌱', { fontSize: '35px' });
        this.add.text(650, h - 80, '🌿', { fontSize: '45px' });
        this.add.text(920, h - 100, '🍄', { fontSize: '38px' });
    }

    createResourcePanel() { /* ... мурунку код ... */ 
        const resources = [
            { icon: '🍃', name: 'Leaves', value: CONFIG.resources.leaves, color: '#90ee90' },
            { icon: '🍯', name: 'Honey', value: CONFIG.resources.honey, color: '#ffcc00' },
            { icon: '🟫', name: 'Dirt',  value: CONFIG.resources.dirt, color: '#c19a6b' },
            { icon: '💧', name: 'Water', value: CONFIG.resources.water, color: '#87cefa' }
        ];

        let x = 40;
        resources.forEach(res => {
            this.add.rectangle(x + 85, 48, 170, 58, 0x112211, 0.85).setStrokeStyle(3, 0x334422);
            this.add.text(x + 25, 38, res.icon + " " + res.name, { fontSize: '19px', color: res.color, fontStyle: 'bold' });
            this.add.text(x + 30, 63, res.value.toString(), { fontSize: '24px', color: '#ffffff', fontStyle: 'bold' });
            x += 195;
        });
    }

    createAnimatedAnts() { /* ... мурунку код ... */ 
        const antData = [
            { startX: 150, y: 280, delay: 0 },
            { startX: 380, y: 320, delay: 800 },
            { startX: 650, y: 250, delay: 400 },
            { startX: 880, y: 300, delay: 1200 }
        ];

        antData.forEach(data => {
            const ant = this.add.text(data.startX, data.y, '🐜', { fontSize: '65px' }).setOrigin(0.5);
            this.tweens.add({ targets: ant, x: data.startX + 280, duration: 3500, delay: data.delay, yoyo: true, repeat: -1 });
            this.tweens.add({ targets: ant, y: data.y - 12, duration: 800, delay: data.delay, yoyo: true, repeat: -1 });
        });
    }

    createBuildMenu() {
        const buildTypes = [
            { name: "Туннель", emoji: "🕳️", cost: 50 },
            { name: "Склад", emoji: "📦", cost: 80 },
            { name: "Казарма", emoji: "⚔️", cost: 120 },
            { name: "Queen Chamber", emoji: "👑", cost: 200 }
        ];

        let y = 140;
        buildTypes.forEach(building => {
            const btnBg = this.add.rectangle(CONFIG.width - 90, y, 130, 80, 0x223322, 0.95)
                .setStrokeStyle(4, 0x55bb55)
                .setInteractive({ useHandCursor: true });

            this.add.text(CONFIG.width - 90, y - 18, building.emoji, { fontSize: '42px' }).setOrigin(0.5);
            this.add.text(CONFIG.width - 90, y + 22, building.name, { fontSize: '15px', color: '#ffffff' }).setOrigin(0.5);

            btnBg.on('pointerdown', () => {
                this.selectedBuilding = building;
                console.log(`✅ Тандалды: ${building.name}`);
            });

            y += 95;
        });
    }

    placeBuilding(x, y) {
        if (!this.selectedBuilding) return;

        // Имаратты кошуу
        const building = this.add.text(x, y, this.selectedBuilding.emoji, { 
            fontSize: '55px' 
        }).setOrigin(0.5);

        this.buildings.push(building);

        console.log(`🏗️ ${this.selectedBuilding.name} салынды!`);

        // Тандоону тазалоо (бир имараттан кийин)
        // this.selectedBuilding = null;   // Кааласаңыз кийинчерээк ачыңыз
    }
}

// Убактылуу сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); } }
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); } }
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); } }
