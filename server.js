/*
var express = require('express')
var app = express();

var http = require( 'http' ); // HTTPモジュール読み込み
var socketio = require( 'socket.io' ); // Socket.IOモジュール読み込み
var fs = require( 'fs' ); // ファイル入出力モジュール読み込み

var bodyParser = require('body-parser');
connectedUsers = [];

app.use(express.static('public'));
var jsonParser = bodyParser.json();


// 3000番ポートでHTTPサーバーを立てる
var server = http.createServer( function( req, res ) {
    res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
    res.end( fs.readFileSync('./index.html', 'utf-8') );  // index.htmlの内容を出力
}).listen(process.env.PORT || 3000);
console.log('--Server started.--');
*/


var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
connectedUsers = [];

app.use(express.static('public'));
var jsonParser = bodyParser.json()
server.listen(process.env.PORT || 3000);
console.log('Server started.');






/*
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
  console.log('get');
})
*/

/*
// POST method route
app.post('/send',jsonParser,function (req, res) {
  console.log('post');
  res.send('POST request received by server');
  var decoded_payload = new Buffer(req.body.payload_raw, 'base64').toString('ascii')
  sendMessag({ content:decoded_payload, nickname:"sensor"});
  console.log('req.body');
  console.log(req.body);
  console.log('decoded_payload');
  console.log(decoded_payload);
})
*/


// POST method route
app.post('/send',jsonParser,function (req, res) {
    if( req.body.hasOwnProperty('payload_raw') && req.body.hasOwnProperty('dev_id')){ //for ttn
        console.log('post');
        res.send('POST request received by server');
        var decoded_payload = new Buffer(req.body.payload_raw, 'base64').toString('ascii')
        sendMessag({ content:decoded_payload, nickname:"sensor"});
        console.log('req.body');
        console.log(req.body);
        console.log('decoded_payload');
        console.log(decoded_payload);
    }
})


// サーバーをソケットに紐付ける
////var io = socketio.listen( server );

// 接続確立後の通信処理部分を定義
io.sockets.on( 'connection', function( socket ) {
    console.log('--io.sockets.on--');

    // ボタン1に関するクライアントからサーバーへデータ送信ハンドラ
    socket.on( 'btn1_message', function( data ) {
        console.log('Receive button1.');
    // テキストボックス1に関してサーバーからクライアントへデータを送り返し
    //io.sockets.emit( 'rtn1_message', { value : data.value } );
    io.sockets.emit( 'rtn1_message', { value : "Test1" } );
    console.log('Return of button1.');
    });

    // ボタン2に関するクライアントからサーバーへデータ送信ハンドラ
    socket.on( 'btn2_message', function( data ) {
        console.log('Receive button2.');
    // テキストボックス2に関してサーバーからクライアントへデータを送り返し
    io.sockets.emit( 'rtn2_message', { value : data.value } );
    });

    // ボタン3に関するクライアントからサーバーへデータ送信ハンドラ
    socket.on( 'btn3_message', function( data ) {
        console.log('Receive button3.');
    // テキストボックス3に関してサーバーからクライアントへデータを送り返し
    io.sockets.emit( 'rtn3_message', { value : data.value } );
    });

    // ボタン4に関するクライアントからサーバーへデータ送信ハンドラ
    socket.on( 'btn4_message', function( data ) {
        console.log('Receive button4.');
    // テキストボックス4に関してサーバーからクライアントへデータを送り返し
    io.sockets.emit( 'rtn4_message', { value : data.value } );
    });

    socket.on('send message' , sendMessag);

/*
    socket.on( 'connection', function( data ) {
        console.log('postdata');
    //
    io.sockets.emit('postdata' , message);
    });
*/

});

function sendMessag(message){
    console.log('postdata');
    io.sockets.emit('postdata' , message);
}
