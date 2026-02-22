export default class Router {
	constructor(routes) {
		this.routes = routes;
		this.root = document.querySelector('#root');
	}
	
	init() {
		window.addEventListener('popstate',(event)=> {
			this.render(window.location.pathname);
		})
	}
	
	async render(path) {
		const page = await this.routes.find(p=> p.pattern ? p.pattern.test(path) : p.url === path);
		this.root.innerHTML = '';
		if(!page) {
			const errPage = this.ErrorBoundary();
			this.addComponent(errPage);
		}else {
			document.title = page.title;
			this.createNavigation();
			this.addComponent(page.component);
			console.log(window.location.pathname)
		if(page.loader) {
				const data = await page.loader();
				this.addLoaderData(data, page.component);
			}
		}
	}
	
	addLoaderData(data, component) {
		const posts = component.querySelector('.posts');
		posts.innerHTML = '';
		data.posts.forEach(post=> {
			const postElm = document.createElement('div');
			postElm.id = post.id;
			const link = this.Link('/posts/post/'+post.id,post.title);
			postElm.appendChild(link);
			posts.appendChild(postElm);
		});
		/*posts.innerHTML = `
		${data.posts.map(p=> (
			`<div class="post" id=${p.id}>
				<div class="tags">${p.tags.map(t=> `<span>${t}</span>${" "}`).join('')}</div>
				<div class="views">Views: ${p.views}</div>
				<h2>${p.title}</h2>
				<p>${p.body}</p>
			</div>`
		)).join('')}
		`;*/
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
		const link = document.createElement('a');
		link.href='/';
		link.onclick=(e)=> {
			e.preventDefault();
			window.history.pushState({},"",'/');
			this.render('/');
		}
		link.textContent = 'Back';
		h1.textContent = 'Not Found';
		div.appendChild(h1);
		div.appendChild(link);
		return div;
	}
}

