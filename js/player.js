// player.js

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "goat");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0.1);

        this.speed = 250;
        this.jumpPower = -500;

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update() {

        // Move Left
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);

            if (this.anims.exists("run")) {
                this.play("run", true);
            }

        // Move Right
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.setFlipX(false);

            if (this.anims.exists("run")) {
                this.play("run", true);
            }

        // Idle
        } else {
            this.setVelocityX(0);

            if (this.anims.exists("idle")) {
                this.play("idle", true);
            }
        }

        // Jump
        if (
            Phaser.Input.Keyboard.JustDown(this.cursors.up) &&
            this.body.blocked.down
        ) {
            this.setVelocityY(this.jumpPower);

            if (this.anims.exists("jump")) {
                this.play("jump");
            }
        }
    }
}
