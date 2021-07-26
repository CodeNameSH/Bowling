import "app.css";
var App = (function () {
    function App() {
        this.finalScore = 0;
        this.frameScore = 0;
        this.resetScores();
    }
    App.prototype.resetScores = function () {
        this.score1 = [];
        this.score2 = [];
        this.frameScores = [];
        this.score3 = null;
        this.finalScore = 0;
    };
    App.prototype.bowl = function () {
        this.resetScores();
        var frameScore1 = 0;
        for (var i = 0; i < 10; i++) {
            frameScore1 = this.getRandomInt(0, 10);
            this.score1.push(frameScore1);
            var frameScore2 = this.getRandomInt(0, 10 - frameScore1);
            this.score2.push(frameScore2);
            if (i === 9) {
                if (frameScore1 + frameScore2 === 10) {
                    this.score3 = this.getRandomInt(0, 10);
                }
            }
        }
        this.calculateScore();
    };
    App.prototype.calculateScore = function () {
        this.finalScore = 0;
        for (var frame = 0; frame < 8; frame++) {
            var strike = this.score1[frame] === 10;
            var strike2 = this.score1[frame + 1] === 10;
            var strike3 = this.score1[frame + 2] === 10;
            var score = this.score1[frame] + this.score2[frame];
            var spare = ((this.score1[frame] + this.score2[frame] === 10) && this.score1[frame] < 10);
            if (strike && strike2 && strike3) {
                this.frameScore = 30;
            }
            else if (strike && strike2) {
                this.frameScore = 20 + this.score1[frame + 2];
            }
            else if (strike) {
                this.frameScore = 10 + this.score1[frame + 1] + this.score2[frame + 1];
            }
            else if (spare) {
                this.frameScore = 10 + this.score1[frame + 1];
            }
            else {
                this.frameScore = score;
            }
            this.frameScores.push(this.frameScore);
        }
        for (var frame_1 = 8; frame_1 <= 9; frame_1++) {
            var score = this.score1[frame_1] + this.score2[frame_1];
            if (frame_1 === 8) {
                if (score < 10) {
                    this.frameScore = score;
                }
                else {
                    var strike1 = this.score1[frame_1] === 10;
                    var strike2 = this.score1[frame_1 + 1] === 10;
                    var strike3 = this.score2[frame_1 + 1] === 10;
                    if (strike1 && strike2 && strike3) {
                        this.frameScore = 30;
                    }
                    else if (strike1 && strike2) {
                        this.frameScore = 20 + this.score2[frame_1 + 1];
                    }
                    else if (strike1) {
                        this.frameScore = 10 + this.score1[frame_1 + 1] + this.score2[frame_1 + 1];
                    }
                }
            }
            else {
                if (score < 10) {
                    this.frameScore = score;
                }
                else {
                    this.frameScore = score + this.score3;
                }
            }
            this.frameScores.push(this.frameScore);
        }
        this.finalScore = this.frameScores.reduce(function (score, total) { return score + total; });
    };
    App.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map