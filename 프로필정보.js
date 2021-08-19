const Lw = '\u200b'.repeat(500); //전체보기 문자 
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) { 
  if(msg.startsWith('.정보 ')) { 
    let url=msg.substr(4).trim(); 
    if(url=='') return replier.reply('".정보 오픈프로필url" 형식으로 입력해 주세요.'); let data=JSON.parse(org.jsoup.Jsoup.connect('https://open.kakao.com/c/search/unified?q='+url).ignoreContentType(true).get().text()); if(data['count']<1) return replier.reply('정보를 불러올 수 없는 프로필입니다.');
    return replier.reply('· 이름: '+data['items'][0]['nn']+'\n· 상태메시지: '+((data['items'][0]['desc']=='')?'없음':data['items'][0]['desc'])+'\n· 하트갯수: ❤ '+data['items'][0]['rc']+'개\n· 게시물개수: '+data['items'][0]['profilePostCount']+'개'+Lw+'\n· 프로필사진: '+data['items'][0]['liu']+'\n· 태그: '+data['items'][0]['op']['tags'].map(e=>e['c']).join(' ')); 
    } 
    }
