//Name : Weilin Yu
//GameTitle : Parkour
//Approximate hours spent : 22
//Creative Tile : 
//1) My game has an unexpected fast obstacle will spawn 10 - 15 seconds after the game started
//   Which I think it is fun and adds difficulty for player. 
//2) I think my game does have a great visual style, I am proud of all the drawings
//   I drew them all by using a mouse, especially the starting page, I spent an hour drawing it

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 540,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [ Menu, Play, ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

let keyspace, keyenter, music, score = 0