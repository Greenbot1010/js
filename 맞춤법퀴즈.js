let kquiz_json = {};
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(kquiz_json[room]==undefined) kquiz_json[room]={};
    if(kquiz_json[room]["isStarted"]==undefined) kquiz_json[room]["isStarted"]=false;

    if (msg==".맞춤법퀴즈") { 
        if(kquiz_json[room]["isStarted"]) {
            replier.reply('이미 게임이 진행중입니다!\n• '+kquiz_json[room]["q1"]+'\n• '
            +kquiz_json[room]["q2"]);
            return;
        }
        kquiz_json[room]["isStarted"]=true;
        let kquiz = JSON.parse(org.jsoup.Jsoup.connect('http://kaan.dothome.co.kr/kquiz.php').ignoreContentType(true).get().text());
        kquiz_json[room]["num"]=kquiz["번호"];
        kquiz_json[room]["q1"]=kquiz["문제1"];
        kquiz_json[room]["q2"]=kquiz["문제2"];
        replier.reply('• '+kquiz_json[room]["q1"]+'\n• '
        +kquiz_json[room]["q2"]+'\n► ".정답 1" 또는 ".정답 2"를 입력해 맞춰보세요!');
        return;
    }
    
    if(kquiz_json[room]["isStarted"]) {
        if(!msg.startsWith('.정답 ')) return;
        switch(msg.substr(4)){
            case '1':
                (kquiz_json[room]["num"]==1)?replier.reply('['+sender+'] 님 정답!'):replier.reply('오답! 정답은 2번 이었습니다');
                kquiz_json[room]["isStarted"]=false;
                break;

            case '2':
                (kquiz_json[room]["num"]==2)?replier.reply('['+sender+'] 님 정답!'):replier.reply('오답! 정답은 1번 입니다');
                kquiz_json[room]["isStarted"]=false;
                break;

            default:
                break;
        }
    }
}
