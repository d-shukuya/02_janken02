class BattleStatus {
  // 今の回戦数を管理する
  NowBattleNum = 1;

  // ラウンドを管理する
  #playerGotRound = 0;
  set PlayerGotRound(num) {
    this.#playerGotRound = num;
  }
  get PlayerGotRound() {
    return this.#playerGotRound;
  }

  #comGotRound = 0;
  set ComGotRound(num) {
    this.#comGotRound = num;
  }
  get ComGotRound() {
    return this.#comGotRound;
  }

  get NowRound() {
    return this.#playerGotRound + this.#comGotRound + 1;
  }

  ResetRound() {
    this.#playerGotRound = 0;
    this.#comGotRound = 0;
  }

  // プレイヤーの選択した手
  #playerHand = "";
  set PlayerHand(pHand) {
    this.#playerHand = pHand;
  }
  get PlayerHand() {
    return this.#playerHand;
  }

  // プレイヤーの選択した手
  #comHand = "";
  set ComHand(cHand) {
    this.#comHand = cHand;
  }
  get ComHand() {
    return this.#comHand;
  }

  // 勝敗を管理する
  #result = "";
  set Result(res) {
    this.#result = res;
  }
  get Result() {
    return this.#result;
  }

  // 次の状態
  NextStatus = {
    draw: "draw",
    winNextRound: "winNextRound",
    loseNextRound: "loseNextRound",
    nextBattle: "nextBattle",
    gameClear: "gameClear",
    gameOver: "gameOver",
  };

  // 次の状態を確認する
  CheckNext() {
    // ２勝した時
    if (this.#playerGotRound == 1 && this.#result == "YOU WIN") {
      if (this.NowBattleNum == 3) {
        // 全クリの場合
        return this.NextStatus['gameClear'];
      } else {
        // 次の対戦相手へ
        return this.NextStatus['nextBattle'];
      }
      // ２敗した時
    } else if (this.#comGotRound == 1 && this.#result == "YOU LOSE") {
      // ゲームオーバー
      return this.NextStatus['gameOver'];
    } else {
      if (this.#result == "DRAW") {
        // 引き分けで同じラウンドをもう一回
        return this.NextStatus['draw'];
      } else if (this.#result == "YOU WIN") {
        // 勝ちで、次のラウンドへ
        return this.NextStatus['winNextRound'];
      } else {
        // 負けで、次のラウンドへ
        return this.NextStatus['loseNextRound'];
      }
    }
  }
}
