// src/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Фон
        this.add.rectangle(
            CONFIG.width / 2, 
            CONFIG.height / 2, 
            CONFIG.width, 
            CONFIG.height, 
            0x0a2f0a
        ).setAlpha(0.9);

        // Убактылуу текст (оюн иштеп жатканын көрсөтүү үчүн)
        this.add.text(CONFIG.width / 2, CONFIG.height / 2 - 50, '🐜 Кумурска Чеп', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(CONFIG.width / 2, CONFIG.height / 2 + 20, 'Оюн жаратылып жатат...\nБаза куруу жакында башталат', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#aaffaa',
            align: 'center'
        }).setOrigin(0.5);

        // Жашыл жер (grass)
        this.add.rectangle(CONFIG.width / 2, CONFIG.height - 100, CONFIG.width, 200, 0x1a4d1a);

        console.log("🎮 GameScene иштели жатат!");
        
        // Тест үчүн кумурска
        this.add.text(200, 150, '🐜', { fontSize: '60px' }).setOrigin(0.5);
        this.add.text(400, 200, '🐜', { fontSize: '50px' }).setOrigin(0.5);
        this.add.text(700, 180, '🐜', { fontSize: '55px' }).setOrigin(0.5);
    }
}

// Башка сценаларды убактылуу жөнөкөй кылып коёбуз
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
