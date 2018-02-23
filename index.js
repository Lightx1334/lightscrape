const cheerio = require('cheerio');
const snekfetch = require('snekfetch');

module.exports = {
    proxy: {
        freeproxylist: async function(amount, callback){
            if(amount < 1 || amount > 301){
                console.error('Proxy amount range is 1 to 301!');
                return;
            }
            const res = await snekfetch.get('https://free-proxy-list.net/');
            const $ = cheerio.load(res.body);
            var proxies = [];
            for(var i = 0; i < amount; i++){
                var x = $('#proxylisttable').children().eq(1).children().eq(i);
                proxies.push($(x).children().eq(0).html() + ':' + $(x).children().eq(1).html());
            }
            callback(proxies);
        }
    },
    pastebin: {
        scrape_links: async function(callback){
            const res = await snekfetch.get('https://pastebin.com/archive');
            const $ = cheerio.load(res.body);
            var table = $(".maintable").children().eq(0).children();
            var links = [];
            for(var i = 1; i < 50; i++){
                var page = table.eq(i).children().eq(0).children().eq(1).attr("href").substring(1);
                links.push(page);
            }
            callback(links);
        },
        scrape_contents: async function(links, cooldown, callback){
            var i = 0;
            var loop = setInterval(async () => {
                const res = await snekfetch.get('https://pastebin.com/raw/' + links[i]);
                callback(links[i], res.body);
                if(i == links.length+1) clearInterval(loop);
                i++;
            }, cooldown);
        }
    }
};