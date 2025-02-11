class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.image('parkour', 'assets/parkour.png')
        this.load.image('ground', 'assets/ground.png')
        this.load.image('box', 'assets/box.png')
        this.load.image('box2', 'assets/box2.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('background', 'assets/background.png')
        this.load.spritesheet('guy', 'assets/running.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        this.load.audio('start', 'assets/starting.mp3')
        this.load.audio('bgm', 'assets/ingame_bgm.mp3')
        this.load.audio('playsound', 'assets/play.wav')
        this.load.audio('upgrade', 'assets/upgrade.wav')
        this.load.audio('jump', 'assets/jump.wav')
        this.load.audio('pointstage', 'assets/pointstage.wav')

    }


    create() {
        this.parkour = this.add.image(0, 0, 'parkour').setOrigin(0)
        keyspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        music = this.sound.add('start', {loop : true})  // looping the music
        music.play()

        //walking anims
        this.anims.create({
            key: 'walking',
            frameRate: 4,
            repeat:-1,
            frames: this.anims.generateFrameNames('guy', {start: 0, end: 1}),
        })
        //jumping anims
        this.anims.create({
            key: 'jumping',
            frameRate: 4,
            repeat:0,
            frames: this.anims.generateFrameNames('guy', {start: 2, end: 3}),
        })
    }


    update() {
        if(Phaser.Input.Keyboard.JustDown(keyspace)) {
            this.scene.start('PlayScene')
            this.sound.play('playsound')
            music.pause() 
        } 
        
    }
}

