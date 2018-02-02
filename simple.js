var http = require('http');
var express=require('express');
var path=require('path')
var app = express();
var opn = require('opn');
app.use(express.static('dist'));
app.listen(8000, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:8000' + '\n')
    opn('http://localhost:8000');
  })
  