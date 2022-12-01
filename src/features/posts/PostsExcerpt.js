import React from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
	return (
		<article className='w-full md:w-[48%] lg:w-[32.6%] border border-gray-400 rounded-2xl p-4 md:p-10 first-line: overflow-hidden'>
			<Link
				to={`${post.id}`}
				className='flex flex-col gap-6 hover:text-gray-500'
			>
				<h3 className='text-2xl font-semibold font-serif'>{post.title}</h3>
				<p>{post.body.slice(0, 75)}...</p>
				<div className='flex justify-between items-center mb-10'>
					<PostAuthor userId={post.userId} />
					<TimeAgo timestamp={post.date} />
				</div>
			</Link>
			<ReactionButtons post={post} />
		</article>
	);
};

export default PostsExcerpt;
