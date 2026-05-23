// src/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const w = CONFIG.width;
        const h = CONFIG.height;

        // Фон (токойдун жери)
        this.add.rectangle(w/2, h/2, w, h, 0x0a2f0a);

        // Жашыл чөп
        this.add.rectangle(w/2, h - 80, w, 160, 0x1a4d1a);

        // Негизги текст
        this.add.text(w/2, h/2 - 80, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '52px',
            fontFamily: 'Arial',
            color: '#ffdd88'
        }).setOrigin(0.5);

        this.add.text(w/2, h/2 + 10, 'Оюн иштели жатат...\nЖакында база куруу башталат', {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#aaffaa',
            align: 'center'
        }).setOrigin(0.5);

        // Кумурскалар (тест)
        this.add.text(250, 180, '🐜', { fontSize: '70px' });
        this.add.text(480, 220, '🐜', { fontSize: '55px' });
        this.add.text(750, 160, '🐜', { fontSize: '65px' });
        this.add.text(920, 250, '🐜', { fontSize: '50px' });

        console.log("🎮 GameScene ийгиликтүү жүктөлдү!");
    }
}

// Убактылуу башка сценалар
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
