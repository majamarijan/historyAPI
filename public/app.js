import {fetchPosts, fetchPost} from './utils.js';
import Router from './router/router.js';
import {Home, About, Posts, Post} from './pages.js';

const routes= [
	{
		url: '/',
		pattern: /^\/$/,
		title: 'Home',
		component: Home()
	},
	{
		url: '/about_me',
		pattern:  /^\/about_me$/,
		title: 'About',
		component: About()
	},
	{
		url: '/posts',
		pattern: /^\/posts$/,
		title: "Posts",
		loader: async()=> await fetchPosts(),
		component: Posts()
	},
	{
		pattern: /^\/posts\/post\/(\d+)$/,
		title: 'Post',
		loader: async(id)=> fetchPost(id),
		component: Post(1)
	},
	
	{errorPage: async()=> await ErrorBoundary()},
];

///
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

window.onload=()=>{
console.log('loaded')
}

const router = new Router(routes);
router.init();
router.render(window.location.pathname);






