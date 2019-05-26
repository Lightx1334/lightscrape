const lightscrape = require('./index');

// first arg overwrites both queries
const duckDuckGoQuery = process.argv[2] || '"lightscrape" github';
const googleQuery = process.argv[2] || 'lightscrape npm';
const pasteLanguage = process.argv[3] || 'javascript';

lightscrape.free_proxy_list().then(proxies =>
    console.log(proxies.length + ' Free-Proxy-List HTTP proxies (' + proxies[0] + '...)'));

lightscrape.live_socks().then(proxies =>
    console.log(proxies.length + ' Live-Socks SOCKS5 proxies (' + proxies[0] + '...)'));

lightscrape.pastebin(pasteLanguage).then(pastes =>
    console.log(pastes.length + ' Pastebin ' + pasteLanguage + ' pastes (' + pastes[0] + '...)'));

lightscrape.duckduckgo(duckDuckGoQuery).then(results =>
    console.log(results.length + ' DuckDuckGo "' + duckDuckGoQuery + '" results (' + results[0] + '...)'));

lightscrape.google(googleQuery).then(results =>
    console.log(results.length + ' Google "' + googleQuery + '" results (' + results[0] + '...)'));