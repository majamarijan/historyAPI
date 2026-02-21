class Router {
	constructor(routes) {
		this.routes = routes;
		this.root = document.querySelector('#root');
	}
	
	init() {
		window.addEventListener('popstate',(event)=> {
			this.render(window.location.pathname);
		})
	}
	
	async loader(fn) {
	try{
		const res = await fn();
		return res;
		}catch(err) {
			console.log(err);
		}
	}
	
	async render(path) {
		const page = await this.routes.find(p=> p.url === path);
		this.root.innerHTML = '';
		if(!page || !page.url) {
			const errPage = this.ErrorBoundary();
			this.addComponent(errPage);
			window.history.pushState({},'','/');
		}else {
			document.title = page.title;
			this.createNavigation();
			this.addComponent(page.component);
		if(page.loader) {
				const data = await this.loader(page.loader);
				this.addLoaderData(data, page.component);
			}
		}
	}
	
	addLoaderData(data, component) {
		const posts = component.querySelector('.posts');
		posts.innerHTML = `
		${data.posts.map(p=> (
			`<div class="post" id=${p.id}>
				<div class="tags">${p.tags.map(t=> `<span>${t}</span>${" "}`).join('')}</div>
				<div class="views">Views: ${p.views}</div>
				<h2>${p.title}</h2>
				<p>${p.body}</p>
			</div>`
		)).join('')}
		`;
	}
	
	addComponent(component) {
		this.root.appendChild(component);
	}
	
	createNavigation() {
		const header = document.createElement('header');
		const nav = document.createElement('nav');
		const ul = document.createElement('ul');
		this.routes.forEach(route=> {
		if(route.url) {
			ul.appendChild(this.Link(route.url, route.title));
		}
		});
		ul.appendChild(this.Link('/12', "ErrorPage"));
		nav.appendChild(ul);
		header.appendChild(nav);
		this.root.appendChild(header);
	}
	
	Link(path,label) {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = path;
		a.textContent = label;
		a.addEventListener('click',(e)=> {
			e.preventDefault();
			window.history.pushState({},"",path);
			this.render(path);
		});
		li.appendChild(a);
		return a;
	}
	ErrorBoundary() {
		const div = document.createElement('div');
		const h1 = document.createElement('h1');
		h1.textContent = 'Not Found';
		div.appendChild(h1);
		div.appendChild(this.Link('/','Back Home'));
		return div;
	}
}

const routes= [
	{
		url: '/',
		title: 'Home',
		component: Home()
	},
	{
		url: '/about_me',
		title: 'About',
		component: About()
	},
	{
		url: '/posts',
		title: "Posts",
		loader: async()=> await fetchPosts(),
		component: Posts()
	},
	{errorPage: async()=> await ErrorBoundary()},
];

///COMPONENTS
function Home() {
	const div = document.createElement('div');
	div.className= 'app';
	const h1 = document.createElement('h1');
	h1.textContent = 'Welcome';
	div.appendChild(h1);
	return div;
}
function About() {
	const div = document.createElement('div');
	div.className= 'app';
	const h1 = document.createElement('h1');
	h1.textContent = 'About me';
	div.appendChild(h1);
	return div;
}
function Posts() {
	const div = document.createElement('div');
	div.className= 'app';
	const h1 = document.createElement('h1');
	h1.textContent = 'Posts';
	const posts = document.createElement('div');
	posts.className = 'posts';
	posts.innerHTML = '<div class="loader"></div>';
	div.appendChild(h1);
	div.appendChild(posts);
	return div;
}
function ErrorBoundary() {
		const div = document.createElement('div');
		const h1 = document.createElement('h1');
		h1.textContent = 'Not Found';
		const a = document.createElement('a');
		a.href='/';
		a.textContent = 'Back';
		a.onclick=(e)=> {
			e.preventDefault();
			window.history.replaceState({},"",'/');
			window.location.pathname= '/'
		}
		div.appendChild(h1);
		div.appendChild(a);
		return div;
}

async function fetchPosts() {
	const posts = await fetch('/api/posts');
	const data = await posts.json();
	return data;
}

window.onload=()=>{
console.log('loaded')
	const router = new Router(routes);
	router.init();
	router.render(window.location.pathname);
}






