import React from 'react';
import SinglePost from '../features/posts/SinglePost';
import { useParams } from 'react-router-dom';

const Post = () => {
	const { postId } = useParams();
	return (
		<div className='flex justify-center container mx-auto px-6 md:px-0'>
			<SinglePost postId={postId} />
		</div>
	);
};

export default Post;
