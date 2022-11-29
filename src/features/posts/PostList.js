import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchPosts,
	getAllPosts,
	getPostsStatus,
	getPostsError,
} from './postsSlice';
import { Link } from 'react-router-dom';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
	const dispatch = useDispatch();
	const status = useSelector(getPostsStatus);
	const posts = useSelector(getAllPosts);
	const error = useSelector(getPostsError);
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);

	let content;

	if (status === 'loading') {
		content = <p>Loading...</p>;
	} else if (status === 'succeeded') {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((post) => (
			<PostsExcerpt key={post.id} post={post} />
		));
	} else if (status === 'failed') {
		content = <p>{error}</p>;
	}
	return (
		<div className='container mx-auto mt-16 px-8 md:px-0 mb-24'>
			<h1 className='text-4xl mb-14 font-semibold font-serif'>Posts</h1>
			<Link
				to='new'
				className='block text-center p-4 border border-gray-400 mb-4 rounded-md bg-slate-400 text-slate-50 hover:bg-slate-500'
			>
				New Post
			</Link>
			<div className='flex gap-4 flex-wrap'>{content}</div>
		</div>
	);
};

export default PostList;
