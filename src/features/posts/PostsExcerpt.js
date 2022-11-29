import React from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsExcerpt = ({ post }) => {
	return (
		<article className='w-full md:w-[48%] lg:w-[32%] border border-gray-400 rounded-2xl flex flex-wrap flex-col gap-6 p-4 md:p-10 first-line: overflow-hidden'>
			<h3 className='text-2xl font-semibold font-serif'>{post.title}</h3>
			<p>{post.body}</p>
			<div className='flex justify-between items-center'>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</div>
			<ReactionButtons post={post} />
		</article>
	);
};

export default PostsExcerpt;
