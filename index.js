const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/',(req,res,next)=> {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req,res)=> {
	res.sendFile(path.join(__dirname,'404.html'));
})

app.listen('4000', ()=> console.log('Server is on port 4000...'));
