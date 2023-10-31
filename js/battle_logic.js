class BattleLogic {
  #getWinHand(pHand) {
    if (pHand == "goo") {
      return "paa";
    } else if (pHand == "choki") {
      return "goo";
    } else {
      return "choki";
    }
  }

  #getLoseHand(pHand) {
    if (pHand == "goo") {
      return "choki";
    } else if (pHand == "choki") {
      return "paa";
    } else {
      return "goo";
    }
  }

  // 7割勝てるロジック (2割あいこ)
  GetComHandEasy(pHand) {
    let rdm = Math.ceil(Math.random() * 12);

    if (1 <= rdm && rdm <= 7) {
      return this.#getLoseHand(pHand);
    } else if (8 <= rdm && rdm <= 10) {
      return this.#getWinHand(pHand);
    } else {
      return pHand;
    }
  }

  // ふつうのジャンケンと同じ
  GetComHandNormal() {
    let rdm = Math.ceil(Math.random() * 3);
    if (rdm === 1) {
      return "goo";
    } else if (rdm === 2) {
      return "choki";
    } else {
      return "paa";
    }
  }

  // 3割勝てるロジック (2割あいこ)
  GetComHandHard(pHand) {
    let rdm = Math.ceil(Math.random() * 12);
    if (1 <= rdm && rdm <= 3) {
      return this.#getLoseHand(pHand);
    } else if (4 <= rdm && rdm <= 10) {
      return this.#getWinHand(pHand);
    } else {
      return pHand;
    }
  }

  // じゃんけんの勝敗
  GetJankenResult(pHand, cHand) {
    if (pHand == "goo") {
      if (cHand == "goo") {
        return "DRAW";
      } else if (cHand == "choki") {
        return "YOU WIN";
      } else {
        return "YOU LOSE";
      }
    } else if (pHand == "choki") {
      if (cHand == "goo") {
        return "YOU LOSE";
      } else if (cHand == "choki") {
        return "DRAW";
      } else {
        return "YOU WIN";
      }
    } else {
      if (cHand == "goo") {
        return "YOU WIN";
      } else if (cHand == "choki") {
        return "YOU LOSE";
      } else {
        return "DRAW";
      }
    }
  }
}
