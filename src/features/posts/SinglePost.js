import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const SinglePost = ({ postId }) => {
	const post = useSelector((state) => selectPostById(state, Number(postId)));

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}
	return (
		<article className='w-full md:w-[80%] lg:w-[70%] border border-gray-400 rounded-2xl flex flex-col gap-10 p-4 md:p-10 first-line: overflow-hidden my-32'>
			<h3 className='text-2xl font-semibold font-serif'>{post.title}</h3>
			<p>{post.body.slice(0, 100)}</p>
			<div className='flex justify-between items-center'>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</div>
			<div className='flex flex-col gap-6 items-start'>
				<Link
					to='edit'
					className='px-4 py-2 rounded-full bg-gray-500 text-green-500 hover:bg-gray-400 hover:text-yellow-300'
				>
					Edit post
				</Link>
				<ReactionButtons post={post} />
			</div>
		</article>
	);
};

export default SinglePost;
