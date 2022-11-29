import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
	posts: [],
	status: 'idle',
	error: null,
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	try {
		const res = await axios.get(POSTS_URL);
		return res.data;
	} catch (err) {
		return err.message;
	}
});
export const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	async (initialPost) => {
		try {
			const res = await axios.post(POSTS_URL, initialPost);
			return res.data;
		} catch (err) {
			return err.message;
		}
	}
);
export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};
					return post;
				});
				state.posts = [...loadedPosts];
				console.log([...state.posts]);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				state.posts.push(action.payload);
			});
	},
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;