import React from 'react'
import './Service.css'
import logo from '../assests/logo.png'
import Hamburger from './Hamburger'
import Inventory from './Inventory'
import History from './History'
import { useNavigate } from 'react-router-dom'

function Service() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/Hamburger')

    }
    const clickEvent = () => {
        navigate('/Inventory')
    }
    const customizeClick = () => {
        navigate('/Customizes')
    }

    const Hisstory = () => {
        navigate('/History')
    }


    return ( <
        >

        <
        div className = 'Nav' >
        <
        img src = { logo }  
        /> <
        h1 > Welcome To Acceinfo Billing Software < /h1> <
        /div>



        <
        div className = 'box'  >
        

        <
        div >
        <
        div className = 'box-1' id='btn1' > < button onClick = { handleClick } > < h1 > Billing < /h1></button > < /div> <
        div className = 'box-1' > < button onClick = { clickEvent } > < h1 > Inventory < /h1> </button > < /div> <
        /div> <
        div >
        <
        div className = 'box-2' > < button  onClick={Hisstory}> < h1 > History < /h1></button > < /div> <
        div className = 'box-2' > < button onClick = { customizeClick } > < h1 > Customize < /h1></button > < /div>

        </div>




        </div>


        <div className = 'Footer' >
        <img src = { logo }/> <h1 > Powered By Acceinfo Webcare Private Limited </h1> </div>





        </>  




    )
}

export default Service;