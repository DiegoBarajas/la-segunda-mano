import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Index from './Pages/Index'
import Login from './Pages/Login';

const App = () => {
    return (
    	<div>
			<Routes>
				<Route path='/' Component={Index}/>
				<Route path='/login' Component={Login} />
			</Routes>
		</div>
    )
}

export default App