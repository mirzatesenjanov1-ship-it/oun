// src/scenes/GameScene.js
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.selectedBuilding = null;
        this.buildings = [];
        this.workers = [];
        this.army = [];
        this.resources = { leaves: 800, honey: 400, dirt: 500, water: 250 };
    }

    create() {
        this.createBackground();
        this.createResourcePanel();
        this.createTitle();
        this.spawnWorkers();
        this.createBuildMenu();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');

        this.input.on('pointerdown', (pointer) => {
            if (this.selectedBuilding) {
                this.placeBuilding(pointer.worldX, pointer.worldY);
            } else {
                this.handleClick(pointer.worldX, pointer.worldY);
            }
        });

        this.time.addEvent({ delay: 800, callback: this.gameTick, callbackScope: this, loop: true });

        console.log("🎮 Кумурска Чеп — Clash of Clans стили иштели жатат!");
    }

    createBackground() {
        const w = CONFIG.width * 2.2;
        const h = CONFIG.height * 2;
        this.add.rectangle(w/2, h/2, w, h, 0x0b2a0b);
        this.add.rectangle(w/2, h - 140, w, 280, 0x1e3d1e);
    }

    createResourcePanel() {
        const list = [
            {key:'leaves', icon:'🍃', color:'#90ee90'},
            {key:'honey', icon:'🍯', color:'#ffcc00'},
            {key:'dirt', icon:'🟫', color:'#c19a6b'},
            {key:'water', icon:'💧', color:'#87cefa'}
        ];
        let x = 40;
        list.forEach(r => {
            this.add.rectangle(x+85, 48, 170, 58, 0x112211, 0.9).setStrokeStyle(3, 0x334422);
            this.add.text(x+25, 38, r.icon + " " + r.key.charAt(0).toUpperCase() + r.key.slice(1), 
                {fontSize:'19px', color:r.color, fontStyle:'bold'});
            this[r.key+'Text'] = this.add.text(x+30, 63, this.resources[r.key], 
                {fontSize:'24px', color:'#fff', fontStyle:'bold'});
            x += 195;
        });
    }

    createTitle() {
        this.add.text(CONFIG.width/2, 65, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '46px', color: '#ffdd77'
        }).setOrigin(0.5).setShadow(4,4,'#000',8);
    }

    spawnWorkers() {
        for (let i = 0; i < 15; i++) {
            const worker = this.add.text(400 + Math.random()*500, 250 + Math.random()*250, '🐜', {fontSize:'48px'}).setOrigin(0.5);
            this.workers.push(worker);
            this.makeAntMove(worker);
        }
    }

    makeAntMove(ant) {
        this.tweens.add({
            targets: ant,
            x: ant.x + (Math.random() * 400 - 200),
            y: ant.y + (Math.random() * 300 - 150),
            duration: 1400 + Math.random() * 1600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createBuildMenu() {
        const list = [
            {name:"Туннель", emoji:"🕳️", cost:70, type:"tunnel"},
            {name:"Склад", emoji:"📦", cost:120, type:"storage"},
            {name:"Казарма", emoji:"⚔️", cost:180, type:"barracks"},
            {name:"Queen", emoji:"👑", cost:320, type:"queen"}
        ];

        let y = 140;
        list.forEach(b => {
            const btn = this.add.rectangle(CONFIG.width - 85, y, 130, 78, 0x223322, 0.95)
                .setStrokeStyle(4, 0x55bb55).setInteractive({useHandCursor:true});

            this.add.text(CONFIG.width-85, y-18, b.emoji, {fontSize:'40px'}).setOrigin(0.5);
            this.add.text(CONFIG.width-85, y+22, b.name, {fontSize:'14px', color:'#fff'}).setOrigin(0.5);

            btn.on('pointerdown', () => { this.selectedBuilding = b; });
            y += 95;
        });
    }

    placeBuilding(x, y) {
        if (!this.selectedBuilding || this.resources.leaves < this.selectedBuilding.cost) return;

        const b = this.add.text(x, y, this.selectedBuilding.emoji, {fontSize:'56px'}).setOrigin(0.5).setInteractive();
        
        this.buildings.push({obj: b, type: this.selectedBuilding.type, level: 1});

        this.resources.leaves -= this.selectedBuilding.cost;
        this.updateResources();
    }

    handleClick(x, y) {
        for (let b of this.buildings) {
            if (Phaser.Math.Distance.Between(x, y, b.obj.x, b.obj.y) < 60) {
                if (b.type === "barracks") this.trainArmy(b);
                else this.upgradeBuilding(b);
                return;
            }
        }
    }

    upgradeBuilding(building) {
        if (this.resources.leaves < 120) return;
        building.level++;
        building.obj.setFontSize(56 + building.level * 6);
        this.resources.leaves -= 120;
        this.updateResources();
        console.log(`⬆️ ${building.type} Level ${building.level}`);
    }

    trainArmy(barracks) {
        if (this.resources.honey < 50) return;
        const soldier = this.add.text(barracks.obj.x + 60, barracks.obj.y, '🐜⚔️', {fontSize:'45px'}).setOrigin(0.5);
        this.army.push(soldier);
        this.resources.honey -= 50;
        this.updateResources();
        console.log("⚔️ Жаңы согушчу чыкты!");
    }

    collectResources() {
        let gain = 0;
        this.buildings.forEach(b => {
            if (b.type === "storage" || b.type === "tunnel") gain += 15 * (b.level || 1);
        });
        if (gain > 0) {
            this.resources.leaves += gain;
            this.updateResources();
        }
    }

    updateResources() {
        if (this.leavesText) this.leavesText.setText(Math.floor(this.resources.leaves));
        if (this.honeyText) this.honeyText.setText(Math.floor(this.resources.honey));
        if (this.dirtText) this.dirtText.setText(Math.floor(this.resources.dirt));
        if (this.waterText) this.waterText.setText(Math.floor(this.resources.water));
    }

    update() {
        if (this.cursors.left.isDown || this.keys.A.isDown) this.cameras.main.scrollX -= 12;
        if (this.cursors.right.isDown || this.keys.D.isDown) this.cameras.main.scrollX += 12;
        if (this.cursors.up.isDown || this.keys.W.isDown) this.cameras.main.scrollY -= 12;
        if (this.cursors.down.isDown || this.keys.S.isDown) this.cameras.main.scrollY += 12;
    }
}

// Сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); }}
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); }}
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); }}
