# lightscrape
[![Downloads](https://img.shields.io/npm/dt/lightscrape.svg)](https://www.npmjs.com/lightscrape)  
Simple package for scraping both FreeProxyList.net and Pastebin

## Installing
`npm install lightscrape`

## Usage
`lightscrape.pastebin.scrape_links(callback)`  
Callback: links (array)

`lightscrape.pastebin.scrape_content(links, cooldown, callback);`  
Links: Array of links (callback from scrape_links can be used)  
Cooldown: How many milliseconds to wait before each scrape  
Callback: page, content

`lightscrape.proxy.freeproxylist(amount, callback)`
Amount: Number of proxies (range 1 to 301)  
Callback: proxies in ip:port format (array)

## Simple snippet that downloads 49 pastes from Pastebin
```js
const lightscrape = require('lightscrape');
const fs = require('fs');

lightscrape.pastebin.scrape_links(function(links){
    lightscrape.pastebin.scrape_contents(links, cooldown, function(page, content){
        fs.writeFile('./pastes/' + page + '.txt', content, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });
});
```

## Simple snippet that fetches 20 proxies from FreeProxyList.net
```js
const lightscrape = require('lightscrape');

lightscrape.proxy.freeproxylist(20, function(proxies){
    console.log(proxies);
})
```

## License (OpenBSD)
```
 Copyright (c) 2018 Lightx1334
 
 Permission to use, copy, modify, and distribute this software for any
 purpose with or without fee is hereby granted, provided that the above
 copyright notice and this permission notice appear in all copies.
 
 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```