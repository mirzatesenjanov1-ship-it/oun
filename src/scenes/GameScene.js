// src/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const w = CONFIG.width;
        const h = CONFIG.height;

        // === ФОН ===
        this.createBackground();

        // === РЕСУРСАР ПАНЕЛИ ===
        this.createResourcePanel();

        // === АТАЛЫШ ===
        this.add.text(w/2, 75, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '46px',
            fontFamily: 'Arial',
            color: '#ffdd77'
        }).setOrigin(0.5).setShadow(3, 3, '#000000', 5);

        // === КУМУРСКАЛАР ===
        this.createTestAnts();

        console.log("🌲 GameScene жакшыртылды!");
    }

    createBackground() {
        const w = CONFIG.width;
        const h = CONFIG.height;

        // Негизги фон (кара-жашыл)
        this.add.rectangle(w/2, h/2, w, h, 0x0b2a0b);

        // Жер (топурак + чөп)
        this.add.rectangle(w/2, h - 90, w, 180, 0x1e3d1e);
        
        // Чөптүн үстү (жарыкыраак)
        this.add.rectangle(w/2, h - 130, w, 60, 0x2a5c2a);

        // Жөнөкөй декоративдик элементтер
        this.add.text(150, h - 80, '🌿', { fontSize: '40px' });
        this.add.text(380, h - 110, '🌱', { fontSize: '35px' });
        this.add.text(650, h - 75, '🌿', { fontSize: '45px' });
        this.add.text(920, h - 95, '🍄', { fontSize: '38px' });
    }

    createResourcePanel() {
        const resources = [
            { icon: '🍃', name: 'Leaves', value: CONFIG.resources.leaves, color: '#90ee90' },
            { icon: '🍯', name: 'Honey', value: CONFIG.resources.honey, color: '#ffcc00' },
            { icon: '🟫', name: 'Dirt',  value: CONFIG.resources.dirt, color: '#c19a6b' },
            { icon: '💧', name: 'Water', value: CONFIG.resources.water, color: '#87cefa' }
        ];

        let x = 40;
        resources.forEach(res => {
            const box = this.add.rectangle(x + 85, 48, 170, 58, 0x112211, 0.85)
                .setStrokeStyle(3, 0x334422);

            this.add.text(x + 25, 38, res.icon + " " + res.name, {
                fontSize: '19px',
                color: res.color,
                fontStyle: 'bold'
            });

            this.add.text(x + 30, 63, res.value.toString(), {
                fontSize: '24px',
                color: '#ffffff',
                fontStyle: 'bold'
            });

            x += 195;
        });
    }

    createTestAnts() {
        const positions = [
            {x: 180, y: 240, size: 68},
            {x: 420, y: 290, size: 52},
            {x: 680, y: 210, size: 72},
            {x: 880, y: 265, size: 58},
            {x: 1050, y: 230, size: 48}
        ];

        positions.forEach(p => {
            this.add.text(p.x, p.y, '🐜', { fontSize: p.size + 'px' }).setOrigin(0.5);
        });
    }
}

// Убактылуу сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); } }
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); } }
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); } }
