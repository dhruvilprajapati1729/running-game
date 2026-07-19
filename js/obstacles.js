// obstacles.js

export default class Obstacles {
    constructor(scene) {
        this.scene = scene;

        // Create a physics group for obstacles
        this.group = scene.physics.add.group();

        // Spawn a new obstacle every 1.5 seconds
        scene.time.addEvent({
            delay: 1500,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });
    }

    spawnObstacle() {
        const obstacle = this.group.create(
            this.scene.scale.width + 50,
            450,              // Adjust to match your ground height
            "obstacle"        // Texture key loaded in preload()
        );

        obstacle.setOrigin(0.5, 1);
        obstacle.setImmovable(true);
        obstacle.body.allowGravity = false;

        // Move left
        obstacle.setVelocityX(-250);
    }

    update() {
        this.group.getChildren().forEach((obstacle) => {
            if (obstacle.x < -100) {
                obstacle.destroy();
            }
        });
    }
}
