import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex justify-between py-7 px-20 border-b-2'>
        <h1 className='text-4xl font-bold text-indigo-900'>
            <NavLink to="/">SHOP</NavLink>
        </h1>
        <nav className='flex sm:justify-center space-x-4'>
            {[
              ['CART', '/cart'],
              ['MY PAGE', '/mypage'],
              ['LOGOUT', '/logout'],  
            ].map(([title, url]) => (
                <a href={url} className='rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900'>{title}</a>
            ))}
        </nav>
    </div>
  )
}

export default Navbar