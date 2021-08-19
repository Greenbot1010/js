function response(room, msg, sender, isGroupChat, replier, ImageDB) { 
    if (msg.indexOf(".ip ")==0) { 
      try { 
          var sub = msg.substr(4); 
          var ip = org.jsoup.Jsoup.connect("https://www.ipipipip.net/index.php?ln=ko&menu=ip-address-location-geolocation-lookup-home&ipaddress=" + encodeURI(sub)).get().select("tbody").get(1).text().replace(/ : /g, ":").replace(/ /g, "\n").replace(/:/g, " : ");
          replier.reply(ip);
      } catch(e) { 
          replier.reply("요청하신 ip의 정보가 없습니다"); 
      } 
    } 
 }
