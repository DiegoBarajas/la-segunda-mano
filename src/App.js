import React from 'react'
import { Routes, Route } from 'react-router-dom';

import UnloggedRoute from './Routes/UnloggedRoute';
import LoggedRoute from './Routes/LoggedRoute';

import Index from './Pages/Index'
import Login from './Pages/Login';
import Signin from './Pages/Signin';
import Search from './Pages/Search';
import SigninCode from './Pages/SigninCode';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import PageNotFound from './Pages/PageNotFound';
import SigninLastSteps from './Pages/SigninLastSteps';
import Forgot from './Pages/Forgot';
import ForgotCode from './Pages/ForgotCode';

const App = () => {
    return (
    	<div>
			<Routes>
				<Route path='/' Component={Index}/>
				<Route path='/login' element={<UnloggedRoute> <Login/> </UnloggedRoute>} />
				<Route path='/forgot' element={<UnloggedRoute> <Forgot/> </UnloggedRoute>} />
				<Route path='/forgot/code' element={<UnloggedRoute> <ForgotCode/> </UnloggedRoute>} />


				<Route path='/signin' element={<UnloggedRoute> <Signin/> </UnloggedRoute>} />
				<Route path='/signin/code' element={<UnloggedRoute> <SigninCode/> </UnloggedRoute>} />

				<Route path='/signin/last' element={<LoggedRoute> <SigninLastSteps/> </LoggedRoute>} />


				<Route path='/logout' element={ <Logout/> } />
				<Route path='/perfil' element={ <LoggedRoute> <Profile/> </LoggedRoute> } />

				<Route path='/buscar' Component={Search} />

				<Route path='*' Component={PageNotFound} />
			</Routes>
		</div>
    )
}

export default App