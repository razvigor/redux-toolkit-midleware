import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
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
						</Route>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
