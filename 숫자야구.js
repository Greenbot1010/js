const scriptName = "숫자야구"; 

let answer = []; 
let is_start = 0; 
let count = 0; 
function response(room,msg,sender,isGroupChat,replier,imageDB,packageName) { 
  
  if (msg.startsWith(".숫자야구시작") && is_start === 0) { 
    answer = setNumber(); 
    replier.reply("숫자야구게임을 시작합니다."); 
    is_start = 1; 
    count = 10; 
   }
   if (is_start === 1) { 
     if (!isNaN(Number(msg)) && msg.length == 4) { 
       let result = compare(msg); 
       count -= 1; 
       
       if (result[0] == 4) { 
         replier.reply(sender + "님, 정답입니다!\n게임을 종료합니다."); 
         is_start = 0; 
         count = 10; 
       } else if (result[0] == 0 && result[1] == 0) { 
         replier.reply("아웃!\n\n남은기회 " + count + "번");
       } else { 
         replier.reply(result[0] +" 스트라이크\n" +result[1] +" 볼\n\n남은기회 " +count +"번"); 
       } 
     }
     if (count == 0) { 
       replier.reply("기회를 모두 사용했습니다\n패배! \n정답 : " +String(answer[0]) +String(answer[1]) +String(answer[2]) +String(answer[3])); 
       is_start = 0; 
       count = 10; 
    } 
    if (msg == ".포기") { replier.reply("정답 : " +String(answer[0]) +String(answer[1]) +String(answer[2]) +String(answer[3])); 
    is_start = 0; 
    count = 10; 
    } 
  } 
} 
function setNumber() { 
  let answer = []; 
  let check = true; 
  
  while (answer.length < 4) { 
    let randomNumber = Math.floor(Math.random() * 10); 
    for (let data of answer) { 
      if (data == randomNumber) { 
        check = false; 
        break; 
      } 
    } 
    if (check) { 
      answer.push(randomNumber); 
    } 
    check = true; 
  } 
  return answer; 
}

function compare(msg) { 
  let SB = [0, 0]; 
  for (let i = 0; i < 4; i++) { 
    for (let j = 0; j < 4; j++) { 
      if (answer[i] == msg[j]) { 
        if (i == j) { 
          SB[0] += 1; 
        } else { 
          SB[1] += 1;
        } 
      } 
    } 
  } 
  return SB; 
}
