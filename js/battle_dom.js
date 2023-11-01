class BattleDom {
  // sleepメソッド
  Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // HTMLタグをセットするメソッド
  SetTag(tag, prop, content) {
    return "<" + tag + " " + prop + ">" + content + "</" + tag + ">";
  }

  // VS の画像
  #vsImgHtml = '<img src="../img/vs.png" alt="">';

  // ステージ画像
  #stageImgHtml = {
    1: '<img src="../img/stage_blanka.jpg" alt="">',
    2: '<img src="../img/stage_sagat.jpg" alt="">',
    3: '<img src="../img/stage_vega.jpg" alt="">',
  };

  // プレイヤーの画像
  #playerImgHtml = '<img src="../img/ryu_battle.png" alt="" />';
  #playerWinImgHtml = '<img src="../img/ryu_battle_win.png" alt="" />';
  #playerLoseImgHtml = '<img src="../img/ryu_battle_lose.png" alt="" />';

  // 対戦相手の画像
  #opponentImgHtml = {
    1: '<img src="../img/blanka_battle.png" alt="" />',
    2: '<img src="../img/sagat_battle.png" alt="" />',
    3: '<img src="../img/vega_battle.png" alt="" />',
  };
  #opponentWinImgHtml = {
    1: '<img src="../img/blanka_battle_win.png" alt="" />',
    2: '<img src="../img/sagat_battle_win.png" alt="" />',
    3: '<img src="../img/vega_battle_win.png" alt="" />',
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

  // ステージBGM
  #stageBgmId = {
    1: "#stage1_bgm",
    2: "#stage2_bgm",
    3: "#stage3_bgm",
  };

  // ラウンド進行音ID
  #callRoundId = {
    1: "#round1_call",
    2: "#round2_call",
    3: "#round3_call",
  };
  #resultCallId = {
    "YOU WIN": "#win_call",
    "YOU LOSE": "#lose_call",
  };
  #fightCallId = "#fight_call";

  // 攻撃音ID
  #ryuAttackVoiceId = "#ryu_attack_voice";
  #opponentAttackVoiceId = {
    1: "#blanka_attack_voice",
    2: "#sagat_attack_voice",
    3: "#vega_attack_voice",
  };
  #koVoiceId = "#ko_voice";

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

  PlayChengeDemoModeSound() {
    $("#demo_mode_sound").get(0).play();
  }

  SetStage(battleNum) {
    $("#stage_img_flame").append(this.#stageImgHtml[battleNum]);
    $(this.#stageBgmId[battleNum]).get(0).play();
  }

  SetPlayer(battleNum) {
    $("#left_mid").empty();
    $("#left_mid").append(this.#playerImgHtml).hide().fadeIn(500);

    $("#right_mid").empty();
    $("#right_mid").append(this.#opponentImgHtml[battleNum]).hide().fadeIn(500);
  }

  async DisplayJanken(roundNum) {
    $(this.#callRoundId[roundNum]).get(0).play();

    $("#ctr").empty();
    $("#ctr").append(this.GetRoundHtml(roundNum)).hide().fadeIn(1000).fadeOut(1000);

    await this.Sleep(2000);
    $("#ctr").empty();
    $("#ctr").append(this.#jankenStrHtml).hide().fadeIn(500);

    $("#btm").empty();
    $("#btm").append(this.#jankenBtnSet).hide().fadeIn(500);
  }

  DisplayRoundStart(battleNum, roundNum) {
    $("#btm").append(this.#vsImgHtml).hide().fadeIn(500);
    this.SetPlayer(battleNum);
    this.DisplayJanken(roundNum);
  }

  SetWinStar(result) {
    if (result == "YOU WIN") {
      $("#left_top").append(this.#winStarImgHtml);
    } else if (result == "YOU LOSE") {
      $("#right_top").append(this.#winStarImgHtml);
    }
  }

  async DisplayResult(pHand, cHand, result, battleNum) {
    if (result == "YOU WIN") {
      $(this.#ryuAttackVoiceId).get(0).play();
      await this.Sleep(500);
      $(this.#koVoiceId).get(0).play();
      $("#left_mid").empty();
      $("#left_mid").append(this.#playerWinImgHtml);
      $("#right_mid").empty();
      $("#right_mid").append(this.#opponentLoseImgHtml[battleNum]);
    } else if (result == "YOU LOSE") {
      $(this.#opponentAttackVoiceId[battleNum]).get(0).play();
      await this.Sleep(500);
      $(this.#koVoiceId).get(0).play();
      $("#left_mid").empty();
      $("#left_mid").append(this.#playerLoseImgHtml);
      $("#right_mid").empty();
      $("#right_mid").append(this.#opponentWinImgHtml[battleNum]);
    } else {
      $(this.#ryuAttackVoiceId).get(0).play();
      $(this.#opponentAttackVoiceId[battleNum]).get(0).play();
      $("#left_mid").empty();
      $("#left_mid").append(this.#playerWinImgHtml);
      $("#right_mid").empty();
      $("#right_mid").append(this.#opponentWinImgHtml[battleNum]);
    }

    await this.Sleep(1000);
    let resultStrHtml = this.SetTag("p", "", result);
    let resultImgHtml = this.SetTag(
      "ul",
      'id="battle_field_list"',
      this.JankenImgItemHtml[pHand] + this.JankenImgItemHtml[cHand]
    );
    $("#ctr").append(resultStrHtml).hide().fadeIn(150);
    $("#ctr").append(resultImgHtml).hide().fadeIn(150);
    $(this.#resultCallId[result]).get(0).play();
  }

  DisplayDraw(battleNum) {
    this.SetPlayer(battleNum);

    $("#ctr").empty();
    $("#ctr").append(this.#drawJankenStrHtml).hide().fadeIn(500);
    $(this.#fightCallId).get(0).play();

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
