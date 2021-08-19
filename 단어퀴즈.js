Jsoup = org.jsoup.Jsoup;
File = FileStream;
Lw = "\u200b".repeat(500);
Ll = "⎼".repeat(50);
path = "sdcard/doami/wordquiz_point";
dbpath = "sdcard/doami/wordquiz_db";
num = 4;
json = {};

if (!File.read(path)) File.write(path, "{}");
if (!File.read(dbpath)) {
words = Array.from(new Set(Jsoup.connect("https://raw.githubusercontent.com/acidsound/korean_wordlist/master/wordslist.txt").get().text().replace(/【([^】])+】/g, "").replace(/[ ]{2,}/g, " ").split(" "))).filter(w => !("ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ".split("").some(c => w.includes(c)))).join("\n");
File.write(dbpath, words);
}

words = File.read(dbpath).split("\n").filter(w => w.length >= num);

Array.prototype.shuffle = function() {
a = this;
for (i = a.length; i; i -= 1) {
j = Math.random()*i|0;
x = a[i - 1];
a[i - 1] = a[j];
a[j] = x;
}
return a;
}

function response (room, msg, sender, igc, replier) {

json[room] || (json[room] = {});
msg2 = msg.replace(/ /g, "");

if (msg2 == ".단어퀴즈") {
if (!json[room]["start"]) {
json[room]["start"] = true;
json[room]["answer"] = words[Math.random()*words.length|0];
json[room]["quiz"] = json[room]["answer"].split("").shuffle().join("");
replier.reply([
"• '"+json[room]["quiz"]+"' 를 알맞게 배열해보세요!", Ll,
".단어 정답 (단어)",
".단어 힌트",
".단어 포기", Ll
].join("\n"));
} else replier.reply("• 이미 게임이 진행중입니다!");
}

if (msg2 == ".단어힌트") {
if (json[room]["start"]) {
if (json[room]["tried"] >= 3) {
kor = ["첫", "두", "세", "네", "다섯"];
ran = Math.random()*json[room]["answer"].length|0;
replier.reply("• "+kor[ran]+"번째 글자는 '"+json[room]["answer"][ran]+"' 입니다!");
json[room]["tried"] -= 3;
} else replier.reply([
"• 3번 이상 틀려야 힌트 사용이 가능합니다!",
"현재 틀린 횟수 : "+(json[room]["tried"]?json[room]["tried"]:0)+"회"
].join("\n"));
} else replier.reply("• 게임이 시작되지 않았습니다!");
}

if (msg2 == ".단어포기") {
if (json[room]["start"]) {
json[room]["start"]= false;
replier.reply([
"• 게임을 포기하셨습니다!",
"정답은 바로 '"+json[room]["answer"]+"' 이었습니다!"
].join("\n"));
json[room] = {};
} else replier.reply("• 게임이 시작되지 않았습니다!");
}

if (msg2.startsWith(".단어정답")) {
if (json[room]["start"]) {
if (msg2.substr(5).trim() == json[room]["answer"]) {
scores = JSON.parse(File.read(path));
scores[sender] ? scores[sender]++ : scores[sender] = 1;
File.write(path, JSON.stringify(scores, null, 4));
replier.reply([
"• "+sender+" 님 정답!",
"정답은 바로 '"+json[room]["answer"]+"' 이었습니다!",
"'"+sender+"' 님의 점수가 1점 올랐습니다.",
"('.점수판' 으로 확인)"
].join("\n"));
json[room] = {};
} else {
replier.reply("• "+sender+" 님 틀렸습니다!");
json[room]["tried"] ? json[room]["tried"]++ : json[room]["tried"] = 1;
}
} else replier.reply("• 게임이 시작되지 않았습니다!");
}

if (msg == ".점수판") {
scores = JSON.parse(File.read(path));
result = Object.keys(scores).sort((n1, n2) => scores[n2] - scores[n1]).map((n, i) => (i+1)+"위 | "+n+" : "+scores[n]+"점").join("\n");
replier.reply("• 단어 퀴즈 점수판입니다."+[Lw, Ll, (result ? result : "기록이 없습니다,,"), Ll].join("\n\n"));
}

}
