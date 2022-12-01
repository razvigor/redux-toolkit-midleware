import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import EditPost from './pages/EditPost';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import Posts from './pages/Posts';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='posts'>
							<Route index element={<Posts />} />
							<Route path='new' element={<NewPost />} />
							<Route path=':postId'>
								<Route index element={<Post />} />
								<Route path='edit' element={<EditPost />} />
							</Route>
						</Route>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
