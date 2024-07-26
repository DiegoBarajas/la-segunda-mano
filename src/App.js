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
import CreateAnnouncement from './Pages/CreateAnnouncement';
import ShouldLogin from './Components/ShouldLogin';
import CreateProducto from './Pages/CreateProducto';
import CreateService from './Pages/CreateService';
import CreateVehicle from './Pages/CreateVehicle';
import CreateGratis from './Pages/CreateGratis';
import CreateInmueble from './Pages/CreateInmueble';
import ShowPublicacion from './Pages/ShowAnnouncement';
import MyAnnoucements from './Pages/MyAnnoucements';
import Politicas from './Pages/Politicas';
import Condiciones from './Pages/Condiciones';
import Favoritos from './Pages/Favoritos';
import Categorias from './Pages/Categorias';
import EditProfile from './Pages/EditProfile';
import AnnoucementsBySeller from './Pages/AnnoucementsBySeller';
import MyNotifications from './Pages/MyNotifications';

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

				<Route path='/anuncio/:id' Component={ShowPublicacion} />
				<Route path='/vendedor/:id' Component={AnnoucementsBySeller} />

				<Route path='/vender' element={<LoggedRoute notLoggedElement={<ShouldLogin/>}> <CreateAnnouncement/> </LoggedRoute>} />
				<Route path='/vender/producto' element={<LoggedRoute notLoggedElement={<ShouldLogin/>}> <CreateProducto/> </LoggedRoute>} />
				<Route path='/vender/servicio' element={<LoggedRoute notLoggedElement={<ShouldLogin/>}> <CreateService/> </LoggedRoute>} />
				<Route path='/vender/gratis' element={<LoggedRoute notLoggedElement={<ShouldLogin/>}> <CreateGratis/> </LoggedRoute>} />
				<Route path='/vender/vehiculo' element={<LoggedRoute notLoggedElement={<ShouldLogin/>}> <CreateVehicle/> </LoggedRoute>} />
				<Route path='/vender/inmueble' element={<LoggedRoute notLoggedElement={<ShouldLogin/>}> <CreateInmueble/> </LoggedRoute>} />

				<Route path='/logout' element={ <Logout/> } />
				<Route path='/favoritos' element={ <LoggedRoute> <Favoritos/> </LoggedRoute> } />
				<Route path='/perfil' element={ <LoggedRoute> <Profile/> </LoggedRoute> } />
				<Route path='/perfil/editar' element={ <LoggedRoute> <EditProfile/> </LoggedRoute> } />
				<Route path='/perfil/anuncios' element={ <LoggedRoute> <MyAnnoucements/> </LoggedRoute> } />
				<Route path='/notificaciones' element={ <LoggedRoute> <MyNotifications/> </LoggedRoute> } />			

				<Route path='/buscar' Component={Search} />
				<Route path='/categorias' Component={Categorias} />

				<Route path='/politicas' Component={Politicas} />
				<Route path='/condiciones' Component={Condiciones} />

				<Route path='*' Component={PageNotFound} />
			</Routes>
		</div>
    )
}

export default App