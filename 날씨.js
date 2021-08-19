const ZoneID = {
    "서울": 1159068000,
    "부산": 2611053000,
    "춘천": 4211070500,
    "강릉": 4215052000,
    "인천": 2811058500,
    "수원": 4111356000,
    "청주": 4311374100,
    "홍성": 4480025600,
    "대전": 3017063000,
    "안동": 4514053000,
    "포항": 4711155000,
    "울산": 3111058500,
    "대구": 2714059000,
    "전주": 4511357000,
    "목포": 4611055400,
    "광주": 2917060200,
    "여수": 4613057000,
    "창원": 4812552000,
    "제주": 5011059000
};

function response(room, msg, sender, isGroupChat, replier) {
    if (msg == ".날씨") {
        replier.reply("날씨는 이렇게 물어보세요.\n\n" +
            "\"예시) .날씨 서울\"\n\n" +
            "위치 리스트\n" +
            "서울,부산,춘천,강릉,인천,수원,청주,홍성,대전,안동,포항,울산,대구,전주,목포,광주,여수,창원,제주");
    } else if (msg.startsWith(".날씨 ")) {
        var name = msg.replace(".날씨 ", "");
        if (!ZoneID.hasOwnProperty(name)) {
            replier.reply("해당 위치를 찾을 수 없어요");
            return;
        }
        var data = org.jsoup.Jsoup.connect("http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=" + ZoneID[name])
            .get();
        var time = data.select("pubDate").text();
        time = time.substring(time.indexOf(" ") + 1);
        var location = data.select("category").text();
        data = data.select("data").get(0);
        var status = data.select("wfKor").text();
        var tmp = data.select("temp").text();
        var hum = data.select("reh").text();

        var result = "현재날씨 \"" + status + "\"\n\n";
        result += "기온 - " + tmp + "도\n";
        result += "습도 - " + hum + "%\n\n";
        result += "기상청 측정시간 :\n";
        result += time + "\n\n";
        result += "기상청 측정위치 :\n";
        result += location;
        replier.reply(result);
    }
}
