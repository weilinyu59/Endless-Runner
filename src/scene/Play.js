class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }


    create() {
        this.background = this.add.tileSprite(0, 0, 640, 340, 'background').setOrigin(0)
        this.ground = this.add.tileSprite(0, 350, 640, 120, 'ground').setOrigin(0)
        this.physics.add.existing(this.ground, false)
        this.ground.body.immovable = true
        this.ground.body.allowGravity = false

        this.bgm = this.sound.add('bgm', {loop: true}) //looping the bgm 
        this.bgm.play()

        this.guy1 = this.physics.add.sprite(150, 300, 'guy', 1).setScale(2)
        this.guy1.body.setCollideWorldBounds(true)
        this.guy1.body.setSize(24, 29)
        this.guy1.setBounce(0.1)

        
        this.physics.add.collider(this.guy1, this.ground)
        

        this.guy1.play('walking')

        this.star = this.physics.add.group()
        this.time.addEvent({
            delay: Phaser.Math.Between(10000, 15000),
            callback: this.starplacing,
            callbackScope:this,
            loop: true,
        })

        this.box = this.physics.add.group()
        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 3000),
            callback: this.boxplacing,
            callbackScope: this,
            loop: true,
        })

        this.physics.add.collider(this.ground, this.box)
        this.physics.add.collider(this.guy1, this.box)
        this.physics.add.collider(this.star, this.ground)
        this.physics.add.collider(this.star, this.guy1)


        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        

        this.scoreleft = this.add.text(50, 490, "0", scoreConfig)
        this.add.text(450, 500, 'PRESS \'SPACE\' TO JUMP').setOrigin(0.5)

        keyspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyenter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER) 

        this.gameRunning = true
        this.score = 0
    }

    update() {
        
        if (this.gameRunning) {
            if(this.guy1.x >= this.physics.world.bounds.width || this.guy1.x < 35) {
                this.gameOver()
            }
            
            this.background.tilePositionX +=2
            this.ground.tilePositionX += 2
            this.score += 1
            this.scoreleft.setText(this.score)
            
            if(Phaser.Input.Keyboard.JustDown(keyspace) && this.guy1.body.touching.down) {
                this.guy1.setVelocityY(-300)
                this.sound.play('jump')
            }
            
            if(!this.guy1.body.touching.down) {
                this.guy1.play('jumping', true)
            } else {
                this.guy1.play('walking', true)
            }
        } else {
            if(Phaser.Input.Keyboard.JustDown(keyenter)) {
                this.scene.start('menuScene')
            }
        }
    }


    boxplacing() {
        const obstacleType = ['box', 'box2']
        const randomType = Phaser.Math.RND.pick(obstacleType)

        const obstacle = this.box.create(640, 310, randomType)
        obstacle.setVelocityX(-Phaser.Math.Between(150, 200))

        obstacle.setCollideWorldBounds(false)
        obstacle.outOfBoundsKill = true
        obstacle.checkWorldBounds = true
    }

    starplacing() {
        const obstacle = this.star.create(640, 310, 'star') 
        obstacle.setVelocityX(-400)
        obstacle.setCollideWorldBounds(false)
        this.add.text(this.game.config.width/2, this.game.config.height/2 + 100, 'WATCHOUT THE STAR!!').setOrigin(0.5)
    }

    gameOver() { 
        let finalScore = this.score
        this.gameRunning = false;

        this.add.text(this.game.config.width/2, this.game.config.height/2, 'GAME OVER {PRESS \'ENTER\' TO RESTART}').setOrigin(0.5)
        this.add.text(this.game.config.width/2, this.game.config.height/2 + 50, 'Your Score: ' + finalScore).setOrigin(0.5)

        //in game credits
        this.add.text(this.game.config.width/2, this.game.config.height/2 - 50 , 'Main Page Music : pixabay.com', {
            color: '#000000', 
            fontStyle: 'bold',
            fontSize: '20px'
        }).setOrigin(0.5)

        this.add.text(this.game.config.width/2, this.game.config.height/2 - 75 , 'BackGround Music : pixabay.com', {
            color: '#000000', 
            fontStyle: 'bold',
            fontSize: '20px'
        }).setOrigin(0.5)

        this.add.text(this.game.config.width/2, this.game.config.height/2 - 100 , 'All sound effects : mixkit.com', {
            color: '#000000', 
            fontStyle: 'bold',
            fontSize: '20px'
        }).setOrigin(0.5)
        

        this.physics.pause()
        this.guy1.alpha = 0
        this.bgm.pause()
        this.background.tilePositionX -= 2
        this.ground.tilePositionX -= 2
    } 
}