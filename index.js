const cheerio = require('cheerio');
const fetch = require('node-fetch');
const url = require('url');

function getAllBlogPosts($) { return $('.post-title.entry-title').first().children(); }
function getFirstBlogPostURL($) { return getAllBlogPosts($).first().prop('href'); }

module.exports = {
    async free_proxy_list() {
        const res = await fetch('https://free-proxy-list.net/').then(res => res.text());
        const $ = cheerio.load(res);
        const table = $('#proxylisttable').children().eq(1).children(), proxies = [];
        for(let i = 0; i < table.length; i++) {
            let x = table.eq(i);
            proxies.push($(x).children().eq(0).html() + ':' + $(x).children().eq(1).html());
        }
        return proxies;
    },

    async live_socks() {
        const res = await fetch('http://www.live-socks.net/').then(res => res.text());
        const ress = await fetch(getFirstBlogPostURL(cheerio.load(res))).then(res => res.text());
        const $ = cheerio.load(ress);
        return $('textarea').first().val().trim().split('\n');
    },

    async duckduckgo(query) {
        const res = await fetch('https://duckduckgo.com/html/?q='+encodeURIComponent(query)).then(res => res.text());
        const $ = cheerio.load(res);
        const list = $('.result__url'), results = [];
        for(let i = 1; i < list.length; i++) {
            results.push(url.parse(list.eq(i).prop('href'), true).query.uddg);
        }
        return results;
    },

    async google(query) {
        const res = await fetch('https://www.google.com/search?q='+encodeURIComponent(query)).then(res => res.text());
        const $ = cheerio.load(res);
        const list = $('a[href^="/url?q="]'), results = [];
        for(let i = 0; i < list.length; i++) {
            results.push(url.parse(list.eq(i).prop('href'), true).query.q);
        }
        return results;
    },

    async pastebin(lang) {
        const res = await fetch('https://pastebin.com/archive' + (!lang ? '' : '/' + lang)).then(res => res.text());
        const $ = cheerio.load(res);
        const table = $('.maintable').children().first().children(), ids = [];
        for(let i = 1; i < table.length; i++) {
            ids.push(url.parse(table.eq(i).children().first().children().eq(1).prop('href')).pathname.substr(1));
        }
        return ids;
    }
};