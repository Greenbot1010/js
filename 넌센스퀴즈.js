let quizjs={}; //게임 진행중인 방, 힌트, 답 등을 담을 객체생성
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(quizjs[room]==undefined) quizjs[room]={};
    if(quizjs[room]["isStarted"]==undefined) quizjs[room]["isStarted"]=false;
    if (msg == ".넌센스퀴즈") { 
    if(quizjs[room]['isStarted']) { // 만약 게임이 아직 진행중이라면
        replier.reply('아직 게임이 진행중입니다'+'\n► '+quizjs[room]['q']);
        return;
    }
    quizjs[room]["count"]=0; // 틀린횟수 = 0으로 선언
    quizjs[room]['isStarted']=true; // 게임시작
    let quiz=JSON.parse(org.jsoup.Jsoup.connect('http://kaan.dothome.co.kr/nonsense.php').ignoreContentType(true).get().text()); // 넌센스퀴즈를 파싱 후 객체로 변환
    quizjs[room]["q"]=quiz['문제']; 
    quizjs[room]["h"]=quiz['힌트'];
    quizjs[room]["a"]=quiz['정답'];
    quizjs[room]["e"]=quiz['설명'];
    replier.reply(quizjs[room]['q']+'\n► 힌트를 보고 싶으시다면 ".힌트"를 입력\n► 정답을 맞추시려면 ".정답 (답)"을 입력');
    return;
    }

    if(quizjs[room]['isStarted']) { // 만약 게임이 진행중이라면
        if (msg == ".힌트") replier.reply("힌트 : "+quizjs[room]["h"]);

        if(msg.startsWith(".정답")&&msg.substr(3).trim() != ""){ // 만약 메시지가 /정답 으로 시작하고 뒤에 공백이 아니라면
            if(msg.substr(3).trim() != quizjs[room]["a"]) { // 만약 정답이 아니라면
                quizjs[room]["count"]++; // 틀린횟수 +1
                if(quizjs[room]['count']!=3) { // 만약 현재 틀린횟수가 3회가 아니라면
                    replier.reply("오답입니다.");
                } else { // 만약 현재 틀린횟수가 3회라면
                    replier.reply('문제를 3회 이상 틀리셨습니다. 포기하시려면 ".포기" 를 입력해 주세요');
                }
                    return;
            }

            if(msg.substr(3).trim() == quizjs[room]["a"]) { // 만약 정답이라면
                replier.reply('['+sender+'] 님 정답!\n► 해설: '+quizjs[room]['e']);
                quizjs[room]['isStarted']=false; //게임종료
                return;
            }
        }

        if(msg==".포기"){
            if(quizjs[room]["count"] >2) { // 만약 3회 이상 틀렸다면
                replier.reply('정답은 ['+quizjs[room]['a']+'] 였습니다.\n► 해설: '+quizjs[room]['e']);
                quizjs[room]['isStarted']=false; //게임 종료
                return;
            } else { // 만약 3회 미만 틀렸다면
                replier.reply('".포기" 명령어는 3회 이상 틀리셨을 때만 사용 가능합니다.');
                return;
            }
        }
    }
}
