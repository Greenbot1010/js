function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg == ".한강수온" || msg=="한강 수온") {
    parse = org.jsoup.Jsoup.connect("http://hangang.dkserver.wo.tc/").get().text();
    json = JSON.parse(parse);
replier.reply("현재 한강 수온은 "+json.temp+"도 입니다.");
    }
}
