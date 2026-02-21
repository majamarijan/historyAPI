const routes = {
	'/': {
		title: 'Home',
		loader: ()=> renderHome()
	},
	'/about': {
		title: "About",
		loader: ()=> importPage('about.html')
	},
	'/projects': {
		title: "Projects",
		loader: ()=> importPage('projects.html')
	}
};

async function render(path) {
console.log(path)
	const root = document.querySelector('#root');
	const route = routes[path];
	// add title
	document.title = route.title;
	//load content
	const content = await route.loader();
	root.innerHTML = content;
}

function Link(path, label) {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.textContent = label;
	a.href = path;
	
	a.addEventListener('click',(e)=> {
		e.preventDefault();
		window.history.pushState({},"",path);
		render(path);
	});
	li.appendChild(a);
	return a;
}

window.onload=()=> {
	const navigationMenu = document.querySelector('nav ul');
	navigationMenu.appendChild(Link('/','Home'));
	navigationMenu.appendChild(Link('/about','About'));
	navigationMenu.appendChild(Link('/projects','Projects'));
	// init render
	render(window.location.pathname);
}

// handle back/forward navigation
window.addEventListener('popstate', ()=> {
	render(window.location.pathname);
});

if(!routes[window.location.pathname]) {
	console.log('404');
	const path = window.location.pathname;
	const back = document.querySelector('.go_home');
	const home = '/';
	back.href= home;
	document.title= 'Not Found'
	
}


function renderHome() {
	return `
		<h1>Home</h1>
		<p>Lorem ipsum</p>
		<a href='/123'>Error link</a>
	`
}
async function importPage(name) {
	return await fetch(name)
	.then(res=> res.text())
	.catch(()=> '<h2>Error loading page.</h2>')
}

