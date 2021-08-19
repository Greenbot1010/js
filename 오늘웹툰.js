function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg == '.오늘웹툰') {
        let today=new Date().getDay(); //오늘 요일
        if(today==0) today=7;
        let kday=["월요웹툰","화요웹툰","수요웹툰","목요웹툰","금요웹툰","토요웹툰", "일요웹툰"];
        let eday=['mon','tue','wed','thu','fri','sat','sun'];
        let sitewt=org.jsoup.Jsoup.connect("https://comic.naver.com/webtoon/weekdayList.nhn?week="+eday[(today-1)]).ignoreContentType(true).get().select('ul[class="img_list"]>li');
        let wtList = [];

        for(let i=0; i<sitewt.size(); i++){
            try{
                let url ='https://comic.naver.com'+sitewt.get(i).select('dd[class="more"]>a').attr('href');
                let title=sitewt.get(i).select('dl>dt>a').text();
                let assessment ='⭐'+sitewt.get(i).select('div[class="rating_type"]>strong').text();
                wtList.push('['+title+'] ['+assessment+']\n'+'바로가기: '+url);
            }catch(e){}
        }
        replier.reply(kday[today-1]+'\u200b'.repeat(500)+'\n\n'+wtList.join('\n\n'));
        return;
    }
}
