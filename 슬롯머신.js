function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(msg=='.슬롯머신'){
        let array=['(하하)','(뿌듯)','(신나)','(열받아)','(쑥스)','(꺄아)','(발그레)','⭐'];
        let slot=[];
        for(i=0;i<3;i++) {
            ran=Math.random()*array.length|0;
            slot.push(array[ran]);
        }
        if(slot[0]==slot[1]&&slot[1]==slot[2]) {
            if(slot[0]=='⭐') {
                replier.reply('▸ '+slot[0]+' '+slot[1]+' '+slot[2]+' ◂\n잭팟!! 운이 정말 좋으시군요!');
            } else {
                replier.reply('▸ '+slot[0]+' '+slot[1]+' '+slot[2]+' ◂\n축하합니다!! 꽤 하시네요😏');
            }
        } else if(slot[0]==slot[1] || slot[1]==slot[2] || slot[0] ==slot[2]){
            replier.reply('▸ '+slot[0]+' '+slot[1]+' '+slot[2]+' ◂\n아쉽네요..다음에 다시 시도해 보세요!');
        } else {
            replier.reply('▸ '+slot[0]+' '+slot[1]+' '+slot[2]+' ◂\n아이고..힘내세요..');
        }
    }
}
