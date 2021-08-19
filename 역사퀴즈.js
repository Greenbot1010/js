Jsoup = org.jsoup.Jsoup;
Ll = "⎼".repeat(40);
quizs = [];
answers = [];
qah = {};
parse = Jsoup.connect("https://m.kin.naver.com/mobile/qna/detail.nhn?d1Id=13&dirId=130102&docId=228171572&qb=7Jet7IKs7YC07KaI&enc=utf8&section=kin&rank=7&search_sort=0&spq=0&from=detailSearch&listType=search").get().select("p");
arr = Array(parse.size()).fill().map((_,_) => parse.get(_).text()).filter(e => e.split(/([0-9]+)+\. /).length == 3).map(e => {
quizs.push(e.split(".")[1].split("?")[0].trim()+"?");
answers.push(e.split("? ")[1]);
});

function response (room, msg, sender, igc, replier) {

if (msg == ".역사퀴즈") {
if (!qah.start) {
qah.start ^= 1;
ran = Math.random()*quizs.length|0;
qah.quiz = quizs[ran];
qah.answer = answers[ran];
qah.hint = qah.answer.length;
replier.reply([
"• "+qah.quiz, Ll,
".답 (정답)",
".힌트",
".포기", Ll
].join("\n"));
} else replier.reply("• 게임이 이미 시작되었습니다!");
}

if (qah.start && msg == ".힌트") {
replier.reply("• "+qah.hint+" 글자 입니다! (띄어쓰기 포함)");
}

if (qah.start && msg == ".포기") {
replier.reply([
"• 문제를 포기하셨습니다!",
"정답은 [ "+qah.answer+" ] 였습니다!"
].join("\n"));
qah = {};
}
if (qah.start && msg.startsWith(".답")) {
if (msg.substr(2).trim() == qah.answer) {
replier.reply([
"• "+sender+" 님 정답!",
"정답은 [ "+qah.answer+" ] 였습니다!"
].join("\n"));
qah = {};
} else replier.reply("• 틀렸습니다!");
}
}
