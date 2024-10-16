import React from 'react'
import LoginSignup from '../src/Components/LoginSignup'
import { BrowserRouter ,Router, Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Service from './Components/pages/Service'
import Hamburger from '../src/Components/pages/Hamburger'
import Inventory from './Components/pages/Inventory'
import Customizes from './Components/pages/Customizes'
import AddCategory from './Components/pages/AddCategory'
import ListProduct from './Components/pages/ListProduct'
import History from './Components/pages/History';
import BillingHistoryPage from './Components/pages/History'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes >
            <Route path ='/' element={<LoginSignup/>}/>
            <Route path ='/Service' element={<Service/>}/>
            <Route path ='/Hamburger' element={<Hamburger/>}/>
            <Route path ='/Inventory' element={<Inventory/>}/>
            <Route path ='/Customizes' element={<Customizes/>}/>
            <Route path ='/AddCategory' element={<AddCategory/>}/>
            <Route path='/ListProduct' element={<ListProduct/>}/>
            <Route path="/History" element={<History />} /> 
            <Route path="/billing-history" component={BillingHistoryPage} />

            </Routes>
      
    
    
    
    
    </BrowserRouter>
    
    
    
    
    </>
  )
}

export default App
