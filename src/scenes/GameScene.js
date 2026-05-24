// src/scenes/GameScene.js
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.selectedBuilding = null;
        this.buildings = [];
        this.workers = [];
        this.army = [];
        this.resources = { ...CONFIG.resources };
    }

    create() {
        this.createBackground();
        this.createResourcePanel();
        this.createTitle();
        this.spawnWorkers();
        this.createBuildMenu();

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');

        this.input.on('pointerdown', (pointer) => {
            if (this.selectedBuilding) {
                this.placeBuilding(pointer.worldX, pointer.worldY);
            } else {
                this.checkBuildingClick(pointer.worldX, pointer.worldY);
            }
        });

        this.time.addEvent({ delay: 1000, callback: this.collectResources, callbackScope: this, loop: true });

        console.log("🐜 КУМУРСКА ЧЕП — ЖАНДУУ ВЕРСИЯ ИШТЕП ЖАТАТ!");
    }

    createBackground() {
        const w = CONFIG.width * 2;
        const h = CONFIG.height * 1.8;
        this.add.rectangle(w/2, h/2, w, h, 0x0b2a0b);
        this.add.rectangle(w/2, h - 120, w, 240, 0x1e3d1e);
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
        this.add.text(CONFIG.width/2, 72, '🐜 КУМУРСКА ЧЕП 🐜', {
            fontSize: '44px', color: '#ffdd77'
        }).setOrigin(0.5).setShadow(4,4,'#000',6);
    }

    spawnWorkers() {
        for (let i = 0; i < 12; i++) {
            const worker = this.add.text(300 + Math.random()*600, 200 + Math.random()*300, '🐜', {fontSize:'52px'}).setOrigin(0.5);
            worker.isWorker = true;
            this.workers.push(worker);
            
            this.makeAntAlive(worker);
        }
    }

    makeAntAlive(ant) {
        this.tweens.add({
            targets: ant,
            x: ant.x + (Math.random() * 300 - 150),
            y: ant.y + (Math.random() * 200 - 100),
            duration: 1800 + Math.random() * 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createBuildMenu() {
        const buildings = [
            {name:"Туннель", emoji:"🕳️", cost:60, type:"tunnel"},
            {name:"Склад", emoji:"📦", cost:110, type:"storage"},
            {name:"Казарма", emoji:"⚔️", cost:160, type:"barracks"},
            {name:"Queen Chamber", emoji:"👑", cost:280, type:"queen"}
        ];

        let y = 145;
        buildings.forEach(b => {
            const btn = this.add.rectangle(CONFIG.width - 90, y, 135, 82, 0x223322, 0.95)
                .setStrokeStyle(4, 0x55bb55).setInteractive({useHandCursor:true});

            this.add.text(CONFIG.width-90, y-20, b.emoji, {fontSize:'42px'}).setOrigin(0.5);
            this.add.text(CONFIG.width-90, y+25, b.name, {fontSize:'14px', color:'#fff'}).setOrigin(0.5);

            btn.on('pointerdown', () => {
                this.selectedBuilding = b;
                console.log(`✅ Тандалды: ${b.name}`);
            });
            y += 98;
        });
    }

    placeBuilding(x, y) {
        if (!this.selectedBuilding || this.resources.leaves < this.selectedBuilding.cost) return;

        const building = this.add.text(x, y, this.selectedBuilding.emoji, {fontSize:'58px'}).setOrigin(0.5).setInteractive();
        
        this.buildings.push({
            obj: building,
            type: this.selectedBuilding.type,
            level: 1,
            lastCollect: Date.now()
        });

        this.resources.leaves -= this.selectedBuilding.cost;
        this.updateResources();
        console.log(`🏗️ ${this.selectedBuilding.name} (Level 1) салынды!`);
    }

    checkBuildingClick(x, y) {
        for (let building of this.buildings) {
            if (Phaser.Math.Distance.Between(x, y, building.obj.x, building.obj.y) < 50) {
                this.upgradeBuilding(building);
                return;
            }
        }
    }

    upgradeBuilding(building) {
        if (this.resources.leaves < 100) return;
        
        building.level = (building.level || 1) + 1;
        building.obj.setFontSize(58 + building.level * 8);
        
        this.resources.leaves -= 100;
        this.updateResources();
        
        console.log(`⬆️ ${building.type} Level ${building.level} болду!`);
    }

    collectResources() {
        let gain = 0;
        this.buildings.forEach(b => {
            if (b.type === "storage" || b.type === "tunnel") gain += 8 * (b.level || 1);
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
        // Камера башкаруу
        if (this.cursors.left.isDown || this.keys.A.isDown) this.cameras.main.scrollX -= 10;
        if (this.cursors.right.isDown || this.keys.D.isDown) this.cameras.main.scrollX += 10;
        if (this.cursors.up.isDown || this.keys.W.isDown) this.cameras.main.scrollY -= 10;
        if (this.cursors.down.isDown || this.keys.S.isDown) this.cameras.main.scrollY += 10;
    }
}

// Сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); }}
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); }}
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); }}
