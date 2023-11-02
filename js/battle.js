const dom = new BattleDom();
const state = new BattleStatus();
const logic = new BattleLogic();

let demoMode = "off";

// 初回ロード時のイベント
$(window).on("load", async function () {
  let query = location.search;
  let val = query.split("=");

  if (val.length === 1) {
    state.NowBattleNum = 1;
  } else {
    state.NowBattleNum = val[1];
  }

  dom.SetDemoMode(demoMode);
  dom.SetStage(state.NowBattleNum);
  dom.DisplayRoundStart(state.NowBattleNum, state.NowRound);
});

// デモモードボタン押下時のイベント
$("#ctr_top").on("click", function () {
  dom.PlayChangeDemoModeSound();

  switch (demoMode) {
    case "off":
      demoMode = "on";
      break;
    case "on":
      demoMode = "off";
      break;
  }
  dom.SetDemoMode(demoMode);
});

// じゃんけんボタン押下時のイベント
$("#btm").on("click", ".choice", async function (e) {
  // 表示の初期化
  $("#btm").empty();
  $("#ctr").empty();

  // プレイヤーの手を代入
  state.PlayerHand = e.currentTarget.attributes.name.value;

  // コンピュータの手を取得
  if (state.NowBattleNum == 1) {
    state.ComHand = logic.GetComHandEasy(state.PlayerHand);
  } else if (state.NowBattleNum == 3) {
    state.ComHand = logic.GetComHandHard(state.PlayerHand);
  } else {
    state.ComHand = logic.GetComHandNormal();
  }

  // デモ用
  if (demoMode == "on") {
    state.ComHand = "paa";
  }

  // じゃんけんの実施
  state.Result = logic.GetJankenResult(state.PlayerHand, state.ComHand);

  // 結果を画面に表示
  dom.DisplayResult(state.PlayerHand, state.ComHand, state.Result, state.NowBattleNum);

  await dom.Sleep(3000);
  nextAction[state.CheckNext()]();
});

const nextAction = {
  draw: function () {
    dom.DisplayDraw(state.NowBattleNum);
  },
  winNextRound: function () {
    state.PlayerGotRound++;
    dom.SetWinStar(state.Result);
    dom.DisplayRoundStart(state.NowBattleNum, state.NowRound);
  },
  loseNextRound: function () {
    state.ComGotRound++;
    dom.SetWinStar(state.Result);
    dom.DisplayRoundStart(state.NowBattleNum, state.NowRound);
  },
  nextBattle: function () {
    state.NowBattleNum++;
    dom.MoveToNextBattle(state.NowBattleNum++);
  },
  gameClear: function () {
    dom.MoveToGameClearPage();
  },
  gameOver: function () {
    dom.MoveToGameOverPage();
  },
};
