loaded = false
var ws = new WebSocket('wss://api.bitfinex.com/ws');
ws.onopen = function (event) {
  var msg = {
    "event":"subscribe",
    "channel":"ticker",
    "pair":"IOTUSD"
  };
  ws.send(JSON.stringify(msg));
};
ws.onmessage = function (event) {
    var a = JSON.parse(event.data);
    if (a.length === 11) {
      rate = a[7];
      document.getElementById('rate').innerHTML = rate;
      if (!loaded) {
        loaded = true;
        iotaValueConv(document.getElementById('iota_iotas'));
      }
    }
};
