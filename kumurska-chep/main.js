// main.js - Оюнду баштоочу негизги файл

class KumurskaChep {
    constructor() {
        this.game = null;
        this.init();
    }

    init() {
        const config = {
            type: Phaser.AUTO,
            width: CONFIG.width,
            height: CONFIG.height,
            parent: 'game-container',
            backgroundColor: CONFIG.backgroundColor,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: CONFIG.debug
                }
            },
            scene: [
                BootScene,
                PreloadScene,
                MenuScene,
                GameScene
            ],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        this.game = new Phaser.Game(config);
        console.log("🚀 Kumurska Chep оюну иштели жатат...");
    }
}

// Оюнду баштоо
window.onload = () => {
    new KumurskaChep();
};
