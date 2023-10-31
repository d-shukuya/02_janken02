class BattleDom {
  // sleepメソッド
  Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // HTMLタグをセットするメソッド
  SetTag(tag, prop, content) {
    return "<" + tag + " " + prop + ">" + content + "</" + tag + ">";
  }

  // VS の画像
  #vsImgHtml = '<img src="../img/vs.png" alt="">';

  // プレイヤーの画像
  #playerImgHtml = {
    normal: '<img src="../img/ryu_battle.png" alt="" />',
    lose: '<img src="../img/ryu_battle_lose.png" alt="" />',
  };

  // 対戦相手の画像
  #opponentImgHtml = {
    1: '<img src="../img/blanka_battle.png" alt="" />',
    2: '<img src="../img/sagat_battle.png" alt="" />',
    3: '<img src="../img/vega_battle.png" alt="" />',
  };

  #opponentLoseImgHtml = {
    1: '<img src="../img/blanka_battle_lose.png" alt="" />',
    2: '<img src="../img/sagat_battle_lose.png" alt="" />',
    3: '<img src="../img/vega_battle_lose.png" alt="" />',
  };

  // ラウンド数表示
  GetRoundHtml(roundNum) {
    let val = "ROUND " + roundNum;
    return this.SetTag("p", "", val);
  }

  // じゃんけん合図の表記
  #jankenStrHtml = "<p>JANKEN!</p>";
  #drawJankenStrHtml = "<p>AIKO DE!</p>";

  // じゃんけんの選択肢
  #gooImgItemHtml = '<li class="choice" name="goo"><img src="../img/goo_img.png" alt="" />';
  #chokiImgItemHtml = '<li class="choice" name="choki"><img src="../img/choki_img.png" alt="" />';
  #paaImgItemHtml = '<li class="choice" name="paa"><img src="../img/paa_img.png" alt="" />';
  #jankenBtnSet = this.SetTag(
    "ul",
    'id="janken_list"',
    this.#gooImgItemHtml + this.#chokiImgItemHtml + this.#paaImgItemHtml
  );
  JankenImgItemHtml = {
    goo: this.#gooImgItemHtml,
    choki: this.#chokiImgItemHtml,
    paa: this.#paaImgItemHtml,
  };

  // 勝ち星の画像
  #winStarImgHtml = '<img src="../img/win_mark.png" alt="" />';

  // デモモードの表示
  #demoModeHtml = {
    off: "<p>デモモード：off</p>",
    on: "<p>デモモード：on</p>",
  };

  SetDemoMode(demoMode) {
    $("#ctr_top").empty();
    $("#ctr_top").append(this.#demoModeHtml[demoMode]);
  }

  SetPlayer(battleNum) {
    $("#btm").append(this.#vsImgHtml).hide().fadeIn(500);

    $("#left_mid").empty();
    $("#left_mid").append(this.#playerImgHtml["normal"]).hide().fadeIn(500);

    $("#right_mid").empty();
    $("#right_mid").append(this.#opponentImgHtml[battleNum]).hide().fadeIn(500);
  }

  async CallJanken(roundNum) {
    $("#ctr").empty();
    $("#ctr").append(this.GetRoundHtml(roundNum)).hide().fadeIn(1000).fadeOut(1000);

    await this.Sleep(2500);
    $("#ctr").empty();
    $("#ctr").append(this.#jankenStrHtml).hide().fadeIn(500);

    $("#btm").empty();
    $("#btm").append(this.#jankenBtnSet).hide().fadeIn(500);
  }

  DisplayRoundStart(battleNum, roundNum) {
    this.SetPlayer(battleNum);
    this.CallJanken(roundNum);
  }

  SetWinStar(result) {
    if (result == "YOU WIN") {
      $("#left_top").append(this.#winStarImgHtml);
    } else if (result == "YOU LOSE") {
      $("#right_top").append(this.#winStarImgHtml);
    }
  }

  DisplayResult(pHand, cHand, result, battleNum) {
    let resultStrHtml = this.SetTag("p", "", result);
    let resultImgHtml = this.SetTag(
      "ul",
      'id="battle_field_list"',
      this.JankenImgItemHtml[pHand] + this.JankenImgItemHtml[cHand]
    );
    $("#ctr").append(resultStrHtml).hide().fadeIn(150);
    $("#ctr").append(resultImgHtml).hide().fadeIn(150);

    if (result == "YOU WIN") {
      $("#right_mid").empty();
      $("#right_mid").append(this.#opponentLoseImgHtml[battleNum]);
    } else if (result == "YOU LOSE") {
      $("#left_mid").empty();
      $("#left_mid").append(this.#playerImgHtml["lose"]);
    }
  }

  DisplayDraw() {
    $("#ctr").empty();
    $("#ctr").append(this.#drawJankenStrHtml).hide().fadeIn(500);

    $("#btm").empty();
    $("#btm").append(this.#jankenBtnSet).hide().fadeIn(500);
  }

  ReturnStartPage() {
    $("main").fadeOut(500, function () {
      window.location.href = "../html/index.html";
    });
  }

  MoveToGameClearPage() {
    $("main").fadeOut(500, function () {
      window.location.href = "../html/game_clear.html";
    });
  }

  MoveToGameOverPage() {
    $("main").fadeOut(500, function () {
      window.location.href = "../html/game_over.html";
    });
  }

  MoveToNextBattle(battleNum) {
    $("main").fadeOut(500, function () {
      window.location.href = "../html/story.html?btlnum=" + encodeURIComponent(battleNum);
    });
  }
}
