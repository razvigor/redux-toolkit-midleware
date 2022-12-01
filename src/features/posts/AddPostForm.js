import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/userSlice';
import { addNewPost } from './postsSlice';

const AddPostForm = () => {
	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);
	const navigate = useNavigate();
	const [data, setData] = useState({
		id: '',
		userId: '',
		title: '',
		body: '',
	});
	const [addRequestStatus, setAddRequestStatus] = useState('idle');
	const canSave =
		[data.title, data.body, data.userId].every(Boolean) &&
		addRequestStatus === 'idle';

	const addData = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (canSave) {
			try {
				setAddRequestStatus('pending');
				dispatch(addNewPost(data)).unwrap();
				navigate('/posts');
			} catch (err) {
				console.error('Failed to save post', err);
			} finally {
				setAddRequestStatus('idle');
			}
		}
	};
	return (
		<div className='mt-10 container mx-auto flex flex-col items-center  px-4 md:px-0'>
			<h1 className='text-3xl mb-16'>Add Post</h1>
			<form
				className='flex flex-col w-full md:w-[50%] gap-10'
				onSubmit={submitHandler}
			>
				<input
					type='text'
					value={data.title}
					name='title'
					onChange={addData}
					className='border border-gray-400 pl-2 h-10 rounded-md'
					placeholder='Title'
				/>
				<select
					name='userId'
					onChange={addData}
					className='border border-gray-400 pl-2 h-10 rounded-md'
				>
					<option>Author</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>

				<textarea
					name='body'
					value={data.content}
					placeholder='Content'
					className='border border-gray-400 pl-2 h-24 rounded-md'
					onChange={addData}
				></textarea>
				<button
					type='submit'
					className='px-5 py-2 border border-gray-400 rounded-md bg-slate-500 text-slate-200 hover:bg-gray-600 disabled:bg-gray-400'
					disabled={!canSave}
				>
					Add Post
				</button>
			</form>
		</div>
	);
};

export default AddPostForm;
