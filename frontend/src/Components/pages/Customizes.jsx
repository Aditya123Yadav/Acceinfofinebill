import React from 'react'

import { useNavigate } from 'react-router-dom'
import AddCategory from './AddCategory'
import ListProduct from './ListProduct'
import logo from '../assests/logo.png'
import './Customizes.css'

function Customizes() {
    const navigate = useNavigate()
    const AddClick = () => {
        navigate('/AddCategory')

    }
    const deleteClick = () => {
        navigate('/ListProduct')
    }




    return ( <>
         
        <div className='nav'>

            <img src={logo} />
            <h1>Welcome To Acceinfo Billing Software</h1>


        </div>
        
        <button onClick = { deleteClick } className='btn'> Delete < /button> 
        <button onClick = { AddClick } className='btn'> Add < /button> 
       
        </>
    )
}

export default Customizes;  