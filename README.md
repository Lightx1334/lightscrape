# lightscrape
[![Downloads](https://img.shields.io/npm/dt/lightscrape.svg)](https://www.npmjs.com/lightscrape)  
Simple Node.js module for scraping various sites

## Installing
`npm i lightscrape`
`const lightscrape = require('lightscrape');`

## Available functions
Every function returns a promise that resolves to an array of results

- free_proxy_list(): [http]
- live_socks(): [socks5]
- pastebin(language): [id<=49] invalid or empty language results in no filter
- duckduckgo(query): [url<=29] only the first page of results
- google(query): [url] risk for getting temporarily blocked if you search too much

## Scraping 49 javascript pastes
```js
lightscrape.pastebin('javascript').then(ids => {
    console.log(ids.length + ' JavaScript pastes:', ids);
});
```

More samples can be found in [test.js](https://github.com/Lightx1334/lightscrape/blob/master/test.js)