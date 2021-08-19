const Lw = '\u200b'.repeat(500); //전체보기 문자
const line = '\u2501'.repeat(16);
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg.startsWith('.오픈챗 ')) {
        let name=msg.substr(5).trim();
        if(name=='') {
            replier.reply('".오픈챗 오픈채팅방이름" 형식으로 입력해 주세요.');
            return;
        }
        let data=JSON.parse(org.jsoup.Jsoup.connect('https://open.kakao.com/c/search/unified?q='+name).ignoreContentType(true).get().text());

        if(data['count'] < 1) { 
            replier.reply('존재하지 않는 오픈채팅방입니다.');
            return;
        } else {
            let array = [];
            for(let i=0; i<data['count']; i++) {
                if(data['items'][i]['lt']==1) {
                    array.push('▸ 방이름: '+data['items'][i]['ln']+'\n▸ 방장: '+data['items'][i]['nn']+'\n▸ 방타입: 1:1 채팅방\n▸ 설명: '+data['items'][i]['desc']+'\n▸ 배경이미지: '+data['items'][i]['liu']+'\n▸ 방 링크: '+data['items'][i]['lu']);
                } else if(data['items'][i]['lt']==2) {
                    array.push('▸ 방이름: '+data['items'][i]['ln']+'\n▸ 방장: '+data['items'][i]['nn']+'\n▸ 방타입: 그룹 오픈채팅방\n▸ 인원: '+data['items'][i]['mcnt']+'\n▸ 설명: '+data['items'][i]['desc']+'\n▸ 배경이미지: '+data['items'][i]['liu']+'\n▸ 방 링크: '+data['items'][i]['lu']);
                }
            }
            replier.reply('검색결과입니다: (총'+data['count']+'개 검색됨)'+Lw+'\n'+line+'\n'+array.join('\n'+line+'\n'));
            return;
        }
    }
}
