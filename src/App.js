import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Index from './Pages/Index';

const App = () => {
    return (
    	<div>
			<Routes>
				<Route path="/" Component={Index}/>
			</Routes>
		</div>
    )
}

export default App