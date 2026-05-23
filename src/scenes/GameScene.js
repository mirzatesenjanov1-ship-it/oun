// src/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const w = CONFIG.width;
        const h = CONFIG.height;

        // Фон
        this.add.rectangle(w/2, h/2, w, h, 0x0a2f0a);

        // Жер (чөп)
        this.add.rectangle(w/2, h - 100, w, 200, 0x1a4d1a);

        // ===== РЕСУРСАР ПАНЕЛИ =====
        this.createResourcePanel();

        // Негизги аталыш
        this.add.text(w/2, 80, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '42px',
            fontFamily: 'Arial',
            color: '#ffdd88'
        }).setOrigin(0.5).setShadow(2, 2, '#000', 4);

        // Кумурскалар (тест)
        this.createTestAnts();

        console.log("🎮 GameScene + Ресурстар панели иштели жатат!");
    }

    createResourcePanel() {
        const resources = [
            { name: '🍃 Leaves', value: CONFIG.resources.leaves, color: '#90ee90' },
            { name: '🍯 Honey', value: CONFIG.resources.honey, color: '#ffd700' },
            { name: '🟫 Dirt',   value: CONFIG.resources.dirt, color: '#c19a6b' },
            { name: '💧 Water', value: CONFIG.resources.water, color: '#87ceeb' }
        ];

        let x = 30;
        resources.forEach(res => {
            // Фон
            this.add.rectangle(x + 80, 50, 160, 55, 0x000000, 0.6)
                .setStrokeStyle(2, 0x333333);

            // Иконка + ат
            this.add.text(x + 20, 40, res.name, {
                fontSize: '18px',
                color: res.color
            });

            // Сан
            this.add.text(x + 20, 65, res.value.toString(), {
                fontSize: '22px',
                color: '#ffffff',
                fontStyle: 'bold'
            });

            x += 190;
        });
    }

    createTestAnts() {
        const ants = [
            {x: 200, y: 220, size: 65},
            {x: 450, y: 280, size: 55},
            {x: 720, y: 200, size: 70},
            {x: 950, y: 260, size: 50}
        ];

        ants.forEach(ant => {
            this.add.text(ant.x, ant.y, '🐜', { 
                fontSize: ant.size + 'px' 
            }).setOrigin(0.5);
        });
    }
}

// Убактылуу сценалар
class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }
    create() { this.scene.start('PreloadScene'); }
}

class PreloadScene extends Phaser.Scene {
    constructor() { super('PreloadScene'); }
    create() { this.scene.start('MenuScene'); }
}

class MenuScene extends Phaser.Scene {
    constructor() { super('MenuScene'); }
    create() { this.scene.start('GameScene'); }
}
