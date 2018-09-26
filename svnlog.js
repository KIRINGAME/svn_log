const express = require('express')
var exec = require('child_process').exec; 
const app = express()
const port = 3000

function replace(stdout){	
	var out = stdout.replace(/Changed paths:\n/g,"")
	out = out.replace( /------------------------------------------------------------------------/g,"</td></tr><tr><td>")
	out = out.replace( /\n/g,"<br>")
	out = out.replace(/1 line/g,"")
	out = '<table border="1">'+out+'</table>'
    return out;
}
app.get('/', (request, response) => {
  response.send('沙盒svnlog信息查看 v0.1\
					<br>\<br>\<br>\
					<table border="1">\
					<tr><td>\
					<br>\
					<a href="/trunk">&nbsp&nbsp主支&nbsp&nbsp&nbsp&nbsp</a>\
					<br>\<br>\
					</td></tr><tr><td>\
					<br>\
					<a href="/sep_trunk">&nbsp&nbsp9月分支&nbsp&nbsp</a>\
					<br>\<br>\
					</td></tr>\
					</table>\
					<br>\<br>\<br>\
					@xuequn\
				')
})

app.get('/trunk', (request, response) => {
  
	var cmdStr = 'svn log -l 100 -v svn://bigsvr2/nmmo/new/trunk/'
	exec(cmdStr, function(err,stdout,stderr){
	    if(err) {
	        console.log('error:'+stderr);
	    } else {
			var out = replace(stdout)
			response.send('<a href="/">返回</a>\
			<br>\
			主支'+out)
	    }
	});

})
app.get('/sep_trunk', (request, response) => {
	var cmdStr = 'svn log -l 100 -v svn://bigsvr2/nmmo/new/sep_trunk/'
	exec(cmdStr, function(err,stdout,stderr){
	    if(err) {
	        console.log('error:'+stderr);
	    } else {
			var out = replace(stdout)
			response.send('<a href="/">返回</a>\
			<br>\
			分支'+out)
	    }
	});
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
