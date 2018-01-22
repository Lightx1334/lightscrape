const cheerio = require('cheerio');
const unirest = require('unirest');

exports.pastebin = {
    scrape_links: function(callback){
        unirest.get('https://pastebin.com/archive').end((res) => {
            var $ = cheerio.load(res.body);
            var table = $(".maintable").children().eq(0).children();
            var links = [];
            for(var i = 1; i < 50; i++){
                var page = table.eq(i).children().eq(0).children().eq(1).attr("href").substring(1);
                links.push(page);
            }
            callback(links);
        });
    },
    scrape_contents: function(links, cooldown, callback){
        var i = 0;
        var loop = setInterval(() => {
            unirest.get('https://pastebin.com/raw/' + links[i]).end((res) => {
                callback(links[i], res.body);
            });
            if(i == links.length+1) clearInterval(loop);
            i++;
        }, cooldown);
    }
};