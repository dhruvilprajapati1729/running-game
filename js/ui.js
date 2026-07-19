// ui.js

export default class UI {
    constructor(scene) {
        this.scene = scene;

        this.score = 0;
        this.highScore = localStorage.getItem("highScore") || 0;

        // Score Text
        this.scoreText = scene.add.text(20, 20, "Score: 0", {
            fontSize: "28px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setScrollFactor(0);

        // High Score
        this.highScoreText = scene.add.text(20, 60, "High Score: " + this.highScore, {
            fontSize: "22px",
            fill: "#ffff00"
        }).setScrollFactor(0);

        // Game Over Text
        this.gameOverText = scene.add.text(
            scene.scale.width / 2,
            scene.scale.height / 2,
            "",
            {
                fontSize: "48px",
                fill: "#ff0000",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setVisible(false);
    }

    // Add points
    addScore(points = 1) {
        this.score += points;
        this.scoreText.setText("Score: " + this.score);

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
            this.highScoreText.setText("High Score: " + this.highScore);
        }
    }

    // Show Game Over
    showGameOver() {
        this.gameOverText.setText(
            "GAME OVER\n\nPress SPACE to Restart"
        );

        this.gameOverText.setVisible(true);
    }

    // Reset UI
    reset() {
        this.score = 0;
        this.scoreText.setText("Score: 0");
        this.gameOverText.setVisible(false);
    }
}
