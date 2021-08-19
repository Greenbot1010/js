// 롤 전적 불러오기 
function lolTierInfo(pos) { 
  try { 
     var data = org.jsoup.Jsoup.connect("https://www.op.gg/summoner/userName="+pos.replace(/ /g, "+")).get(); 
    
     var name = data.select("span.Name").text(); 
     var solorank = "솔로랭크 - "; 
     var teamrank = "자유 5:5 랭크 - "; 
     
     try { 
         var solotier = data.select("div.TierRank").text(); 
         var solopoint = data.select("div.TierInfo").text().split("/"); 
         var record = solopoint[1].trim().split(" "); 
        
         solorank += solotier; 
         solorank += "("+solopoint[0].trim()+")\n"; 
         solorank += record[0]+" / "+record[1] +" (승률 "+record[4]+")"; 
      } 
      catch(e) { 
         solorank += "Unranked"; 
      } 
      
      try { 
          var teamtier = data.select("div.sub-tier__rank-tier").text(); 
          var teampoint = data.select("div.sub-tier__league-point").text().split("/"); 
          var teamrecord = teampoint[1].trim().split(" "); 
          
          teamrank += teamtier; 
          teamrank += "("+teampoint[0].trim()+")\n"; 
          teamrank += teamrecord[0]+" / "+teamrecord[1] +" (승률 "+data.select("div.sub-tier__gray-text").text().split(" ")[2]+")";
      } 
      catch(e) { 
          teamrank += "Unranked"; 
      } 
      
      var result = "["+name +" 랭크 정보]\n\n"+solorank+"\n\n"+teamrank; 
      
      return result; 
   } 
   catch(e) { 
       return null; 
   } 
} 

function response(room, msg, sender, isGroupChat, replier, ImageDB) { 
    msg = msg.trim(); 
    var cmd = msg.split(" ")[0]; 
    var data = msg.replace(cmd+" ",""); 
    
    if(cmd==".롤") { 
        var result = lolTierInfo(data); 
        if(result == null) { replier.reply("등록되지 않은 소환사입니다.\n오타를 확인 후 다시 검색해주세요."); 
        } 
        else { 
            replier.reply(result); 
        } 
    } 
}
