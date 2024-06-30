import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Index from './Pages/Index'
import Login from './Pages/Login';
import Signin from './Pages/Signin';
import Search from './Pages/Search';

const App = () => {
    return (
    	<div>
			<Routes>
				<Route path='/' Component={Index}/>
				<Route path='/login' Component={Login} />
				<Route path='/signin' Component={Signin} />
				<Route path='/buscar' Component={Search} />
			</Routes>
		</div>
    )
}

export default App