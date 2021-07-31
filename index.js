const request = require('request');

let brl = 'BRL'
let usd = 'USD'
const parseJSON = (data) => {
  try{
    return JSON.parse(data)
  }catch(error) {
    return null
  }
}

const formatValue = (value, currencySymbol) => {
  const parsedValue = (isNaN(value)) ? 0 : parseFloat(value, 10);
  return `${currencySymbol} ${parsedValue.toFixed(2)}`
}

const doRequest = (url, dataResolver) => {

  const promiseCallback = (resolve, reject) => {
  const callback = (error, httpResponse, body) => {
    if (error) return reject(error);
    const response = parseJSON(body)
    const price = (response) ? dataResolver(response) : null;
 
    resolve(price)
  }
    request(url, callback)
  }
  return new Promise(promiseCallback);
}

const getPriceCoinBase = () => {

  const url = 'http://api.coinbase.com/v2/prices/spot?currency=USD';
  const dataResolver = (response) => formatValue(response.data.amount, 'USD');
  return doRequest(url, dataResolver)
};


const getPriceBitcoinTrade = () => {

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  const callback = (error, httpResponse, body) => {
  const response = parseJSON(body)
  response.forEach(valor => {
    //console.log(valor.current_price)

    let btc = formatValue(valor.current_price, 'BRL')
    

    console.log(btc)

  })
}
request(url, callback)
  }

getPriceCoinBase().then(console.log);
getPriceBitcoinTrade();
