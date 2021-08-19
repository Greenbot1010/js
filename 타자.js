var taja_gameon = false;
var taja_wordpush = null;
var taja_sentence = null;
var ta_s = null;
var player = null;
var taja_soonwi = {"10":[], "20":[], "40":[]};
function taja_word(a){
  var taja_list = [];
  for (ta=0; ta<a; ta++){
    var ta_num = Math.floor(Math.random()*11171)+44032;
    taja_list.push(String.fromCharCode(ta_num));
  }
  return taja_list;
}
function response (room, msg, sender, igc, replier) {
  if (msg.startsWith(".타자 ")){
    if (!taja_gameon){
      if (player==null){
        switch(msg.substr(4)){
          case "쉬움": 
          taja_sentence = taja_word(10);
          replier.reply(sender+"님의 제시 문장 : "+taja_sentence.join("\u200b"));
          ta_s =Date.now();
          player = sender;
          taja_gameon = true;
          break;
          case "보통":
          taja_sentence = taja_word(20);
          replier.reply(sender+"님의 제시 문장 : "+taja_sentence.join("\u200b"));
          ta_s =Date.now();
          player = sender;
          taja_gameon = true;
          break;
          case "어려움":
          taja_sentence = taja_word(40);
          replier.reply(sender+"님의 제시 문장 : "+taja_sentence.join("\u200b"));
          ta_s =Date.now();
          player = sender;
          taja_gameon = true;
          break;
          default: replier.reply("난이도는 쉬움/보통/어려움 선택 가능합니다.\nex) .타자 보통");
          break;
        }
      }else replier.reply("이미 게임이 진행중입니다.");
    }else replier.reply("다른 참가자가 진행중입니다.");
  }
  if (taja_gameon && sender==player && !msg.startsWith(".타자 ")){
    if (msg == taja_sentence.join("")){
      var ta_s1 = Date.now();
      var ta_s2 =((ta_s1-ta_s)/1000);
      replier.reply("정답입니다! 게임을 종료합니다.\n응답 시간 : "+ta_s2+"초");
      if (Number(taja_soonwi[String(msg.length)])<=ta_s2){
        taja_soonwi[String(msg.length)] = [ta_s2];
        replier.reply("현재 기록 1등입니다.");
      }
      taja_gameon = false;
      taja_wordpush = null;
      taja_sentence = null;
      player = null;
      ta_s = null;
    }else replier.reply("틀렸습니다!");
  }else if (msg==".타자 포기"){
    if (taja_gameon){
      if (sender == player){
        taja_gameon = false;
        taja_wordpush = null;
        taja_sentence = null;
        player = null;
        ta_s = null;
        replier.reply("타자게임이 종료되었습니다.");
      }else replier.reply("참가자가 아닙니다.");
    }else replier.reply("진행중인 타자게임이 없습니다.");
  }
}
