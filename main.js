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
            scene: [BootScene, PreloadScene, MenuScene, GameScene],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        this.game = new Phaser.Game(gameConfig);
        console.log("🚀 Kumurska Chep - Оюн башталды!");
    }
}

window.onload = () => {
    new KumurskaChep();
};
