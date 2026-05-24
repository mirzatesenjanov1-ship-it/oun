// src/scenes/GameScene.js
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.selectedBuilding = null;
        this.buildings = [];
        this.workers = [];
        this.resources = { ...CONFIG.resources };
        this.lastResourceTick = Date.now();
    }

    create() {
        this.createBackground();
        this.createResourcePanel();
        this.createTitle();
        this.spawnWorkers();
        this.createBuildMenu();

        this.input.on('pointerdown', (pointer) => {
            if (this.selectedBuilding) this.placeBuilding(pointer.x, pointer.y);
        });

        // Ресурстарды автоматтык чогултуу
        this.time.addEvent({ delay: 1500, callback: this.collectResources, callbackScope: this, loop: true });

        console.log("🐜 КУМУРСКА ЧЕП — ТОЛУК ВЕРСИЯ ИШТЕП ЖАТАТ!");
    }

    createBackground() {
        const w = CONFIG.width, h = CONFIG.height;
        this.add.rectangle(w/2, h/2, w, h, 0x0b2a0b);
        this.add.rectangle(w/2, h - 90, w, 180, 0x1e3d1e);
        this.add.rectangle(w/2, h - 130, w, 60, 0x2a5c2a);
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
        for (let i = 0; i < 8; i++) {
            const worker = this.add.text(100 + i*110, 240 + Math.random()*140, '🐜', {fontSize:'52px'}).setOrigin(0.5);
            this.workers.push(worker);
            
            this.tweens.add({
                targets: worker,
                x: 100 + i*110 + 160,
                duration: 2500 + Math.random()*1500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
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

        const building = this.add.text(x, y, this.selectedBuilding.emoji, {fontSize:'56px'}).setOrigin(0.5);
        
        this.buildings.push({
            obj: building,
            type: this.selectedBuilding.type,
            level: 1,
            lastCollect: Date.now()
        });

        this.resources.leaves -= this.selectedBuilding.cost;
        this.updateResources();
        console.log(`🏗️ ${this.selectedBuilding.name} салынды!`);
    }

    collectResources() {
        let totalLeaves = 0;
        this.buildings.forEach(b => {
            if (b.type === "storage" || b.type === "tunnel") {
                totalLeaves += 8;
            }
        });
        if (totalLeaves > 0) {
            this.resources.leaves += totalLeaves;
            this.updateResources();
        }
    }

    updateResources() {
        if (this.leavesText) this.leavesText.setText(Math.floor(this.resources.leaves));
        if (this.honeyText) this.honeyText.setText(Math.floor(this.resources.honey));
        if (this.dirtText) this.dirtText.setText(Math.floor(this.resources.dirt));
        if (this.waterText) this.waterText.setText(Math.floor(this.resources.water));
    }
}

// Сценалар
class BootScene extends Phaser.Scene { constructor() { super('BootScene'); } create() { this.scene.start('PreloadScene'); }}
class PreloadScene extends Phaser.Scene { constructor() { super('PreloadScene'); } create() { this.scene.start('MenuScene'); }}
class MenuScene extends Phaser.Scene { constructor() { super('MenuScene'); } create() { this.scene.start('GameScene'); }}
