// storage.js

export default class Storage {

    static HIGH_SCORE_KEY = "goatRunnerHighScore";
    static COINS_KEY = "goatRunnerCoins";

    // ---------- High Score ----------

    static getHighScore() {
        const score = localStorage.getItem(this.HIGH_SCORE_KEY);
        return score ? parseInt(score, 10) : 0;
    }

    static saveHighScore(score) {
        if (score > this.getHighScore()) {
            localStorage.setItem(this.HIGH_SCORE_KEY, score);
        }
    }

    // ---------- Coins ----------

    static getCoins() {
        const coins = localStorage.getItem(this.COINS_KEY);
        return coins ? parseInt(coins, 10) : 0;
    }

    static saveCoins(coins) {
        localStorage.setItem(this.COINS_KEY, coins);
    }

    static addCoins(amount) {
        const total = this.getCoins() + amount;
        this.saveCoins(total);
    }

    static resetCoins() {
        localStorage.setItem(this.COINS_KEY, 0);
    }

    // ---------- Clear All Game Data ----------

    static clearGameData() {
        localStorage.removeItem(this.HIGH_SCORE_KEY);
        localStorage.removeItem(this.COINS_KEY);
    }
}
