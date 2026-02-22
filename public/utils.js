async function fetchPosts() {
	const posts = await fetch('/api/posts');
	const data = await posts.json();
	return data;
}

async function fetchPost(id) {
	const posts = await fetch('/api/post/'+id);
	const data = await posts.json();
	return data;
}

export {fetchPosts, fetchPost}
