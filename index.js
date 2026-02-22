const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

app.get('/api/posts',async (req,res)=> {
	try{
		const data= await fetch('https://dummyjson.com/posts?limit=10');
		const json = await data.json();
		res.json(json);
	}catch(err) {
		throw new Error('Something went wrong!');
	}
});

app.get('/api/post/:id',async (req,res)=> {
	const id = req.params.id;
	console.log(id);
	/*try{
		const data= await fetch('https://dummyjson.com/posts?limit=10');
		const json = await data.json();
		res.json(json);
	}catch(err) {
		throw new Error('Something went wrong!');
	}*/
});

app.get(/.*/,(req,res)=> {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen('4000', ()=> console.log('Server is on port 4000...'));
