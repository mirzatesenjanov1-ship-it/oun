// main.js
class KumurskaChep {
    constructor() {
        this.init();
    }

    init() {
        const gameConfig = {
            type: Phaser.AUTO,
            width: CONFIG.width,
            height: CONFIG.height,
            parent: 'game-container',
            backgroundColor: CONFIG.backgroundColor,
            physics: {
                default: 'arcade',
                arcade: { debug: CONFIG.debug }
            },
            scene: [BootScene, PreloadScene, MenuScene, GameScene],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        this.game = new Phaser.Game(gameConfig);
        console.log("🚀 Kumurska Chep оюну иштели жатат...");
    }
}

window.onload = () => {
    new KumurskaChep();
};
