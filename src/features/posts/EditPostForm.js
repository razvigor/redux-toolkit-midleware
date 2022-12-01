import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/userSlice';

const EditPostForm = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const post = useSelector((state) => selectPostById(state, Number(postId)));
	const users = useSelector(selectAllUsers);
	const [postData, setPostData] = useState({
		title: post?.title,
		body: post?.body,
		userId: post?.userId,
	});
	const [requestStatus, setRequestStatus] = useState('idle');
	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setPostData({
			...postData,
			[name]: value,
		});
	};

	const canSave =
		[postData.title, postData.body, postData.userId].every(Boolean) &&
		requestStatus === 'idle';

	const submitHandler = (e) => {
		e.preventDefault();
		if (canSave) {
			try {
				setRequestStatus('panding');
				dispatch(
					updatePost({
						id: post.id,
						title: postData.title,
						body: postData.body,
						userId: postData.userId,
						reactions: post.reactions,
					})
				).unwrap();
				setPostData({
					title: '',
					body: '',
					userId: '',
				});
				navigate(`/posts/${postId}`);
			} catch (err) {
				console.error('faild to save the post', err);
			} finally {
				setRequestStatus('idle');
			}
		}
	};
	const deletePostHandler = () => {
		try {
			setRequestStatus('panding');
			dispatch(deletePost({ id: post.id })).unwrap();
			setPostData({
				title: '',
				body: '',
				userId: '',
			});
			navigate('/posts');
		} catch (err) {
			console.error('Faild to delete post', err);
		} finally {
			setRequestStatus('idle');
		}
	};

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}
	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	return (
		<div className='mt-10 mb-16 container mx-auto flex flex-col items-center '>
			<h1 className='text-3xl mb-16'>Edit Post</h1>
			<form
				className='flex flex-col w-full md:w-[50%] gap-10'
				onSubmit={submitHandler}
			>
				<input
					type='text'
					value={postData.title}
					name='title'
					onChange={onChangeHandler}
					className='border border-gray-400 pl-2 h-10 rounded-md'
					placeholder='Title'
				/>
				<select
					name='userId'
					onChange={onChangeHandler}
					defaultValue={postData.userId}
					className='border border-gray-400 pl-2 h-10 rounded-md'
				>
					<option value=''></option>
					{userOptions}
				</select>

				<textarea
					name='body'
					value={postData.body}
					placeholder='Content'
					className='border border-gray-400 pl-2 h-24 rounded-md'
					onChange={onChangeHandler}
				></textarea>
				<button
					type='submit'
					className='py-2 border border-gray-400 rounded-md bg-slate-500 text-slate-200 hover:bg-gray-600 disabled:bg-gray-400'
					disabled={!canSave}
				>
					Edit Post
				</button>
				<button
					type='button'
					className='px-5 py-2 border border-gray-400 rounded-md bg-red-500 text-slate-200 hover:bg-red-700'
					onClick={deletePostHandler}
				>
					Delete Post
				</button>
			</form>
		</div>
	);
};

export default EditPostForm;
