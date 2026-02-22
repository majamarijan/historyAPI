export function Home() {
	const div = document.createElement('div');
	div.className= 'app';
	const h1 = document.createElement('h1');
	h1.textContent = 'Welcome';
	div.appendChild(h1);
	return div;
};
	
export function About() {
	const div = document.createElement('div');
	div.className= 'app';
	const h1 = document.createElement('h1');
	h1.textContent = 'About me';
	div.appendChild(h1);
	return div;
}
export function Posts() {
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

export function Post(id) {
	const div = document.createElement('div');
	div.className= 'app';
	const h1 = document.createElement('h1');
	h1.textContent = `Post ${id}`;
	const post = document.createElement('div');
	post.className = 'post';
	post.innerHTML = '<div class="loader"></div>';
	div.appendChild(h1);
	div.appendChild(post);
	return div;
}
