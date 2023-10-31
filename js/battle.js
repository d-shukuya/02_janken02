// ラウンド表記
const round1Html = "<p>ROUND 1</p>";
const round2Html = "<p>ROUND 2</p>";
const round3Html = "<p>ROUND 3</p>";

// じゃんけん開始表記
const jankenStrHtml = "<p>JANKEN!</p>";
const drawJankenStrHtml = "<p>AIKO DE!</p>";

// VSの画像
const vsImgHtml = '<img src="../img/vs.png" alt="">';

// じゃんけんの手のリストアイテム
const gooItem = '<li class="choice" name="goo"><img src="../img/goo_img.png" alt="" />';
const chokiItem = '<li class="choice" name="choki"><img src="../img/choki_img.png" alt="" />';
const paaItem = '<li class="choice" name="paa"><img src="../img/paa_img.png" alt="" />';

// じゃんけんボタンセットのリスト
const jankenBtn = '<ul id="janken_list">' + gooItem + chokiItem + paaItem + "</ul>";

// 勝ち星の画像
const winImgHtml = '<img src="../img/win_mark.png" alt="" />';

// 出した手のリストアイテムをラップするためのリスト
const resultImgBra = '<ul id="battle_field_list">';
const resultImgCket = "</ul>";

// 対戦者画像
const playerImgHtml = '<img src="../img/ryu_battle.png" alt="" />';
const playerLoseImgHtml = '<img src="../img/ryu_battle_lose.png" alt="" />';
const opp1ImgHtml = '<img src="../img/blanka_battle.png" alt="" />';
const opp1LoseImgHtml = '<img src="../img/blanka_battle_lose.png" alt="" />';
const opp2ImgHtml = '<img src="../img/sagat_battle.png" alt="" />';
const opp2LoseImgHtml = '<img src="../img/sagat_battle_lose.png" alt="" />';
const opp3ImgHtml = '<img src="../img/vega_battle.png" alt="" />';
const opp3LoseImgHtml = '<img src="../img/vega_battle_lose.png" alt="" />';

// 変数
let nowBattleNum = 1;
let playerHand = "";
let comHand = "";
let playerItem = "";
let comItem = "";
let playerGotRound = 0;
let comGotRound = 0;
let nowRound = 1;
let resultStr = "";
let resultStrHtml = "";
let resultImgHtml = "";

// 7割勝てるロジック (2割あいこ)
const getComHandEasy = function (pHand) {
  let rdm = Math.ceil(Math.random() * 12);

  if (1 <= rdm && rdm <= 7) {
    return getLoseHand(pHand);
  } else if (8 <= rdm && rdm <= 10) {
    return getWinHand(pHand);
  } else {
    return pHand;
  }
};

// ふつうのジャンケンと同じ
const getComHandNormal = function () {
  let rdm = Math.ceil(Math.random() * 3);
  if (rdm === 1) {
    return "goo";
  } else if (rdm === 2) {
    return "choki";
  } else {
    return "paa";
  }
};

// 3割勝てるロジック (2割あいこ)
const getComHandHard = function (pHand) {
  let rdm = Math.ceil(Math.random() * 12);

  if (1 <= rdm && rdm <= 3) {
    return getLoseHand(pHand);
  } else if (4 <= rdm && rdm <= 10) {
    return getWinHand(pHand);
  } else {
    return pHand;
  }
};

const getWinHand = function (pHand) {
  if (pHand == "goo") {
    return "paa";
  } else if (pHand == "choki") {
    return "goo";
  } else {
    return "choki";
  }
};

const getLoseHand = function (pHand) {
  if (pHand == "goo") {
    return "choki";
  } else if (pHand == "choki") {
    return "paa";
  } else {
    return "goo";
  }
};

const doJanken = function (pHand, cHand) {
  if (pHand === "goo") {
    if (cHand === "goo") {
      playerItem = gooItem;
      comItem = gooItem;
      resultStr = "DRAW";
    } else if (cHand === "choki") {
      playerItem = gooItem;
      comItem = chokiItem;
      resultStr = "YOU WIN";
    } else {
      playerItem = gooItem;
      comItem = paaItem;
      resultStr = "YOU LOSE";
    }
  } else if (pHand === "choki") {
    if (cHand === "goo") {
      playerItem = chokiItem;
      comItem = gooItem;
      resultStr = "YOU LOSE";
    } else if (cHand === "choki") {
      playerItem = chokiItem;
      comItem = chokiItem;
      resultStr = "DRAW";
    } else {
      playerItem = chokiItem;
      comItem = paaItem;
      resultStr = "YOU WIN";
    }
  } else {
    if (cHand === "goo") {
      playerItem = paaItem;
      comItem = gooItem;
      resultStr = "YOU WIN";
    } else if (cHand === "choki") {
      playerItem = paaItem;
      comItem = chokiItem;
      resultStr = "YOU LOSE";
    } else {
      playerItem = paaItem;
      comItem = paaItem;
      resultStr = "DRAW";
    }
  }
};

const showResult = function (pItem, cItem, resStr) {
  resultImgHtml = resultImgBra + pItem + cItem + resultImgCket;
  resultHtml = "<p>" + resStr + "</p>";
  $("#ctr").append(resultHtml).hide().fadeIn(150);
  $("#ctr").append(resultImgHtml).hide().fadeIn(150);

  if (resStr === "YOU WIN") {
    $("#right_mid").empty();
    if (nowBattleNum == 3) {
      $("#right_mid").append(opp3LoseImgHtml);
    } else if (nowBattleNum == 2) {
      $("#right_mid").append(opp2LoseImgHtml);
    } else {
      $("#right_mid").append(opp1LoseImgHtml);
    }
  } else if (resStr === "YOU LOSE") {
    $("#left_mid").empty();
    $("#left_mid").append(playerLoseImgHtml);
  }
};

const drawAction = function () {
  setTimeout(function () {
    $("#ctr").empty();
    $("#ctr").append(drawJankenStrHtml).hide().fadeIn(500);

    $("#btm").empty();
    $("#btm").append(jankenBtn).hide().fadeIn(500);
  }, 2000);
};

const startAction = function (roundNumHtml) {
  $("#btm").append(vsImgHtml).hide().fadeIn(500);

  $("#left_mid").empty();
  $("#left_mid").append(playerImgHtml);

  $("#right_mid").empty();
  if (nowBattleNum == 3) {
    $("#right_mid").append(opp3ImgHtml);
  } else if (nowBattleNum == 2) {
    $("#right_mid").append(opp2ImgHtml);
  } else {
    $("#right_mid").append(opp1ImgHtml);
  }

  setTimeout(function () {
    if (playerGotRound == 1 && resultStr == "YOU WIN") {
      $("#left_top").append(winImgHtml);
    }

    if (comGotRound == 1 && resultStr == "YOU LOSE") {
      $("#right_top").append(winImgHtml);
    }

    $("#ctr").empty();
    $("#ctr").append(roundNumHtml).hide().fadeIn(1000).fadeOut(1000);

    setTimeout(function () {
      $("#ctr").empty();
      $("#ctr").append(jankenStrHtml).hide().fadeIn(700);

      $("#btm").empty();
      $("#btm").append(jankenBtn).hide().fadeIn(700);
    }, 2000);
  }, 500);
};

const getRoundHtml = function (num) {
  if (num == 1) {
    return round1Html;
  } else if (num == 2) {
    return round2Html;
  } else {
    return round3Html;
  }
};

const moveNextPage = function (resStr) {
  setTimeout(function () {
    // 次のバトルへ進むか？
    if (
      (playerGotRound === 1 && resStr === "YOU WIN") ||
      (comGotRound === 1 && resStr === "YOU LOSE")
    ) {
      playerGotRound = 0;
      comGotRound = 0;

      if (resStr === "YOU WIN") {
        // 全クリチェック
        if (nowBattleNum == 3) {
          $("main").fadeOut(500, function () {
            window.location.href = "../html/game_clear.html";
          });
        } else {
          nowBattleNum++;
          $("main").fadeOut(500, function () {
            window.location.href = "../html/story.html?btlnum=" + encodeURIComponent(nowBattleNum);
          });
        }
      } else {
        $("main").fadeOut(500, function () {
          window.location.href = "../html/game_over.html";
        });
      }
    } else {
      // 次のラウンドへ進むか？
      if (resStr === "DRAW") {
        startAction(getRoundHtml(nowRound));
      } else if (resStr === "YOU WIN") {
        playerGotRound++;
        nowRound = playerGotRound + comGotRound + 1;
        startAction(getRoundHtml(nowRound));
      } else {
        comGotRound++;
        nowRound = playerGotRound + comGotRound + 1;
        startAction(getRoundHtml(nowRound));
      }
    }
  }, 2000);
};

// 初回ロード時のイベント
$(window).on("load", function () {
  let query = location.search;
  let val = query.split("=");

  if (val.length === 1) {
    nowBattleNum = 1;
  } else {
    nowBattleNum = val[1];
  }

  startAction(round1Html);
});

// ボタン押下時のイベント
$("#btm").on("click", ".choice", function (e) {
  // 表示の初期化
  $("#btm").empty();
  $("#ctr").empty();

  // プレイヤーの手を代入
  playerHand = e.currentTarget.attributes.name.value;

  // コンピュータの手を取得
  if (nowBattleNum == 1) {
    comHand = getComHandEasy(playerHand);
  } else if (nowBattleNum == 3) {
    comHand = getComHandHard(playerHand);
  } else {
    comHand = getComHandNormal();
  }

  // デモ用
  // comHand = "paa";

  // じゃんけんの実施
  doJanken(playerHand, comHand);

  // 結果を画面に表示
  showResult(playerItem, comItem, resultStr);

  if (resultStr == "DRAW") {
    drawAction();
  } else {
    // 次の画面へ遷移
    moveNextPage(resultStr);
  }
});
