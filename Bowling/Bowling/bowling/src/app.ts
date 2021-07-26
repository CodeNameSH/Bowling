import "app.css";

export class App {
  score1: number[];
  score2: number[];
  score3: number;
  finalScore: number = 0;
  frameScore: number = 0;
  frameScores: number[];

  constructor() {
    this.resetScores();
  }

  resetScores() {
    this.score1 = [];
    this.score2 = [];
    this.frameScores = [];
    this.score3 = null;
    this.finalScore = 0;
  }

  bowl() {
    this.resetScores();
    let frameScore1 = 0;

    //comment the for loop and uncomment the manual pushes
    //below to test specific outcomes
    for (var i = 0; i < 10; i++) {
      //get a random integer between 0 and 10
      frameScore1 = this.getRandomInt(0, 10);
      this.score1.push(frameScore1);

      //get a random integer between 0 and (10 - framescore1)
      let frameScore2 = this.getRandomInt(0, 10 - frameScore1);
      this.score2.push(frameScore2);

      //final frame
      if (i === 9) {
        //set score 3 if scores 1 and 2 === 10
        if (frameScore1 + frameScore2 === 10) {
          this.score3 = this.getRandomInt(0, 10);
        }
      }
    }

    //code for testing specific scenarios
    //this.score1.push(10, 10, 10, 10, 10, 10, 10, 10, 10, 10);
    //this.score2.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 3);
    //this.score3 = 0;

    this.calculateScore();
  }

  calculateScore() {
    this.finalScore = 0;

    //covers frames 1-8
    for (var frame = 0; frame < 8; frame++) {
      let strike = this.score1[frame] === 10;
      let strike2 = this.score1[frame + 1] === 10;
      let strike3 = this.score1[frame + 2] === 10;
      let score = this.score1[frame] + this.score2[frame];
      let spare = ((this.score1[frame] + this.score2[frame] === 10) && this.score1[frame] < 10);

      //three strikes in a row
      if (strike && strike2 && strike3) {
        this.frameScore = 30;
      }
      //two strikes in a row
      else if (strike && strike2) {
        //score is 20 + score1 2 frames over
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

    for (let frame = 8; frame <= 9; frame++) {
      let score = this.score1[frame] + this.score2[frame];

      if (frame === 8) {
        if (score < 10) {
          this.frameScore = score;
        }
        else {
          let strike1 = this.score1[frame] === 10;
          let strike2 = this.score1[frame + 1] === 10;
          let strike3 = this.score2[frame + 1] === 10;

          if (strike1 && strike2 && strike3) {
            this.frameScore = 30;
          }
          else if (strike1 && strike2) {
            this.frameScore = 20 + this.score2[frame + 1];
          }
          else if (strike1) {
            this.frameScore = 10 + this.score1[frame + 1] + this.score2[frame + 1];
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

    //sum the array members
    this.finalScore = this.frameScores.reduce((score, total) => score + total);
  }

  //from-https://stackoverflow.com/a/1527820
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
