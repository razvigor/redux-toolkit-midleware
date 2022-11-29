import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='bg-slate-500'>
			<div className='container mx-auto'>
				<ul className='h-16 flex gap-4 items-center text-white'>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='posts'>Posts</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
