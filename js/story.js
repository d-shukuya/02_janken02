let nowBattleNum = 1;

const opp1Html = '<img class="opponent_img" src="../img/blanka.jpg" alt="" />'
const opp1LoseHtml = '<img class="opponent_img" src="../img/blanka_lose.png" alt="" />'
const opp2Html = '<img class="opponent_img" src="../img/sagat.jpg" alt="" />'
const opp2LoseHtml = '<img class="opponent_img" src="../img/sagat_lose.png" alt="" />'
const opp3Html = '<img class="opponent_img" src="../img/vega.jpg" alt="" />'
const oppSecret = '<img class="opponent_img" src="../img/secret_opponent.png" alt="" />'

const cssAction = function(num) {
  let imgClassName = '.opponent_list_' + num + '>img';
  let liClassName = '.opponent_list_' + num;

  setInterval(function () {
    $(imgClassName).fadeOut(500, function () {
      $(this).fadeIn(500);
    });
  }, 1);

  $(liClassName).css("border", "10px solid red");
};


// 初回ロード時のイベント
$(window).on("load", function () {
  let query = location.search;
  let val = query.split("=");
  
  if (val.length === 1) {
    nowBattleNum = 1;
  } else {
    nowBattleNum = val[1];
  };

  let battleRoundStr = 'BATTLE ' + nowBattleNum;
  $("#story_title").append(battleRoundStr);

  if (nowBattleNum ==1) {
    $(".opponent_list_1").append(opp1Html);
    $(".opponent_list_2").append(oppSecret);
    $(".opponent_list_3").append(oppSecret);
  } else if (nowBattleNum ==2) {
    $(".opponent_list_1").append(opp1LoseHtml);
    $(".opponent_list_2").append(opp2Html);
    $(".opponent_list_3").append(oppSecret);
  } else if (nowBattleNum ==3) {
    $(".opponent_list_1").append(opp1LoseHtml);
    $(".opponent_list_2").append(opp2LoseHtml);
    $(".opponent_list_3").append(opp3Html);
  } else {
    $(".opponent_list_1").append(oppSecret);
    $(".opponent_list_2").append(oppSecret);
    $(".opponent_list_3").append(oppSecret);
  }

  cssAction(nowBattleNum);

  setTimeout(function () {
    $("main").fadeOut(500, function () {
      window.location.href = "../html/battle.html?btlnum=" + encodeURIComponent(nowBattleNum);
    });
  }, 5000);
});
