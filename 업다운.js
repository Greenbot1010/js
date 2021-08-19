let updown_json={}; //업다운 정보를 담을 객체 생성
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
if(updown_json[room]==undefined) updown_json[room]={}; 
if(updown_json[room]["isStarted"]==undefined) updown_json[room]["isStarted"]=false;

if(msg=='.업다운') {
if(updown_json[room]["isStarted"]) { //만약 이미 ".업다운" 명령어를 입력했다면
if(updown_json[room]["up"]["step"]==0) { //만약 난이도를 고르지 않았다면
replier.reply('".상", ".중", ".하"중 하나를 입력해 난이도를 선택해 주세요!');
return;
} else { //만약 게임이 진행중이라면
replier.reply('아직 게임이 진행중입니다\n► 난이도: '+updown_json[room]['up']['step']+'\n► 남은 횟수: '+updown_json[room]['up']['count']);
return;
}
}
if(updown_json[room]["up"]==undefined) updown_json[room]["up"]={};
updown_json[room]["up"]["step"]=0;
updown_json[room]["up"]["count"]=0;
updown_json[room]["isStarted"]=true;
replier.reply('".상", ".중", ".하"중 하나를 입력해 난이도를 선택해 주세요!');
return;
}

if(msg == ".포기.") {
if(!quizjs[room]["isStarted"]) return replier.reply(pb+"아직 게임이 시작되지 않았습니다. \n[.업다운] 을 입력해서 게임을 시작해 주세요");
if(quizjs[room]['up']['step']==0) return replier.reply(pb+"아직 게임이 시작되지 않았습니다. \n[.상] [.중] [.하] 중 하나를 입력해 난이도를 선택해 주세요!");
replier.reply(pb+"정답은 ["+quizjs[room]['up']['a']+"] 였습니다. 다음에 다시 도전해 보세요!");
quizjs[room]["isStarted"]=false;
return;
}

if(updown_json[room]["isStarted"]) { //만약 게임이 시작되었다면
switch(updown_json[room]['up']['step']) {
case 0: 
if(msg=='.상'){
replier.reply('[난이도 상] 을 고르셨습니다.\n.(숫자)를 입력해 1~4000 사이의 수를 15번 안에 맞춰보세요!');
updown_json[room]['up']['a']=(Math.random()*4000|0)+1;
updown_json[room]['up']['step']='상';
updown_json[room]["up"]['count']=15;
} else if(msg=='.중') {
replier.reply('[난이도 중] 을 고르셨습니다.\n.(숫자)를 입력해 1~2000 사이의 수를 13번 안에 맞춰보세요!');
updown_json[room]['up']['a']=(Math.random()*2000|0)+1;
updown_json[room]['up']['step']='중';
updown_json[room]["up"]['count']=13;
} else if(msg=='.하') {
replier.reply('[난이도 하] 를 고르셨습니다.\n.(숫자)를 입력해 1~1000 사이의 수를 10번 안에 맞춰보세요!');
updown_json[room]['up']['a']=(Math.random()*1000|0)+1;
updown_json[room]['up']['step']='하';
updown_json[room]["up"]['count']=10;
}
break;

case '상':
if(!msg.startsWith('.') || isNaN(msg.substr(1)) || msg.substr(1)<0 || msg.substr(1)==Infinity) break;
updown_json[room]["up"]['count']-=1;
if(Number(msg.substr(1))>updown_json[room]['up']['a']) {
replier.reply(msg.substr(1)+'보다 작습니다!\n► 남은기회: '+updown_json[room]["up"]['count']); 
} else if(Number(msg.substr(1))<updown_json[room]['up']['a']) {
replier.reply(msg.substr(1)+'보다 큽니다!\n► 남은기회: '+updown_json[room]["up"]['count']); 
} else if(Number(msg.substr(1))==updown_json[room]['up']['a']) {
replier.reply('['+sender+'] 님 정답!'); 
updown_json[room]["isStarted"]=false;
break;
}
if(updown_json[room]["up"]['count']==0) {
replier.reply('게임 오버! 정답은 ['+updown_json[room]['up']['a']+'] 였습니다.');
updown_json[room]["isStarted"]=false;
break;
}
break;

case '중':
if(!msg.startsWith('.') || isNaN(msg.substr(1)) || msg.substr(1)<0 || msg.substr(1)==Infinity) break;
updown_json[room]["up"]['count']-=1;
if(Number(msg.substr(1))>updown_json[room]['up']['a']) {
replier.reply(msg.substr(1)+'보다 작습니다!\n► 남은기회: '+updown_json[room]["up"]['count']); 
} else if(Number(msg.substr(1))<updown_json[room]['up']['a']) {
replier.reply(msg.substr(1)+'보다 큽니다!\n► 남은기회: '+updown_json[room]["up"]['count']); 
} else if(Number(msg.substr(1))==updown_json[room]['up']['a']) {
replier.reply('['+sender+'] 님 정답입니다!'); 
updown_json[room]["isStarted"]=false;
break;
}
if(updown_json[room]["up"]['count']==0) {
replier.reply('게임 오버! 정답은 ['+updown_json[room]['up']['a']+'] 였습니다.');
updown_json[room]["isStarted"]=false;
break;
}
break;

case '하':
if(!msg.startsWith('.') || isNaN(msg.substr(1)) || msg.substr(1)<0 || msg.substr(1)==Infinity) break;
updown_json[room]["up"]['count']-=1;
if(Number(msg.substr(1))>updown_json[room]['up']['a']) {
replier.reply(msg.substr(1)+'보다 작습니다!\n► 남은기회: '+updown_json[room]["up"]['count']); 
} else if(Number(msg.substr(1))<updown_json[room]['up']['a']) {
replier.reply(msg.substr(1)+'보다 큽니다!\n► 남은기회: '+updown_json[room]["up"]['count']); 
} else if(Number(msg.substr(1))==updown_json[room]['up']['a']) {
replier.reply('['+sender+'] 님 정답입니다!'); 
updown_json[room]["isStarted"]=false;
break;
}
if(updown_json[room]["up"]['count']==0) {
replier.reply('게임 오버! 정답은 ['+updown_json[room]['up']['a']+'] 였습니다.');
updown_json[room]["isStarted"]=false;
break;
}
break;

default:
break;
}
}
}
