import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchPosts,
	getAllPosts,
	getPostsStatus,
	getPostsError,
} from './postsSlice';
import { Link } from 'react-router-dom';
import PostsExcerpt from './PostsExcerpt';
import Pagination from '../../components/pagination/Pagination';

let PageSize = 10;
const PostList = () => {
	const dispatch = useDispatch();
	const status = useSelector(getPostsStatus);
	const posts = useSelector(getAllPosts);
	const error = useSelector(getPostsError);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);
	const currentPageData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		return orderedPosts.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, posts]);

	let content;

	if (status === 'loading') {
		content = <p>Loading...</p>;
	}
	if (status === 'succeeded') {
		content = currentPageData.map((post) => (
			<PostsExcerpt key={post.id} post={post} />
		));
	}
	if (status === 'failed') {
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
			<div className='flex justify-center mt-16'>
				<Pagination
					className='pagination-bar'
					currentPage={currentPage}
					totalCount={posts.length}
					pageSize={PageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
		</div>
	);
};

export default PostList;
