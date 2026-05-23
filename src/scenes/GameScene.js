// src/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const w = CONFIG.width;
        const h = CONFIG.height;

        // Фон
        this.createBackground();

        // Ресурстар
        this.createResourcePanel();

        // Аталыш
        this.add.text(w/2, 75, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '46px',
            color: '#ffdd77'
        }).setOrigin(0.5).setShadow(3, 3, '#000', 5);

        // Анимациялуу кумурскалар
        this.createAnimatedAnts();

        console.log("🐜 Кумурскалар анимация менен иштели жатат!");
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

    createResourcePanel() {
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

    createAnimatedAnts() {
        // Кумурскаларды анимация менен жылдыруу
        const antData = [
            { startX: 150, y: 280, delay: 0 },
            { startX: 380, y: 320, delay: 800 },
            { startX: 650, y: 250, delay: 400 },
            { startX: 880, y: 300, delay: 1200 },
            { startX: 1050, y: 270, delay: 600 }
        ];

        antData.forEach(data => {
            const ant = this.add.text(data.startX, data.y, '🐜', { 
                fontSize: '65px' 
            }).setOrigin(0.5);

            // Солдон оңго жана кайра солго кыймыл
            this.tweens.add({
                targets: ant,
                x: data.startX + 280,
                duration: 3500,
                delay: data.delay,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Кичине өйдө-төмөн термелүү
            this.tweens.add({
                targets: ant,
                y: data.y - 12,
                duration: 800,
                delay: data.delay,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
}

// Убактылуу сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); } }
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); } }
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); } }
