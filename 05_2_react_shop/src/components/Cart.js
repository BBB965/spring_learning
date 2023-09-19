import React from 'react'
import { useDispatch } from 'react-redux'
import { decreaseCount, increaseCount } from '../store/cartSlice';
import { NavLink } from 'react-router-dom';

const Cart = ({item}) => {
  console.log(item);
  const dispatch = useDispatch();

  const formatPrice = (target) => {
    if(target) {
      let result = target.toLocaleString('en-US');
      return result;
    }
  }

  return (
    <div className='flex justify-around items-center mx-12 mt-6'>
      <NavLink to={`/${item.id}`}>
        <div className='flex items-center'>
          <img className="w-1/6 p-5" src={item.image} alt={item.title}/>
          <div className='font-semibold'>{item.title}</div>
        </div>
        </NavLink>
        <div>
          <div className='flex mx-6 px-6'>
            <button className="mx-3 px-2 rounded-3xl border font-semibold" onClick={() => {item.count === 1 ? item.count = 1 : dispatch(decreaseCount(item.id))}}>-</button>
            <p className='mx-3 fond-bold text-xl'>{item.count}</p>
            <button className="mx-3 px-2 rounded-3xl border font-semibold" onClick={()=> {dispatch(increaseCount(item.id))}}>+</button>
          </div>
        </div>
        <div className='mx-3 fond-bold text-xl'>${formatPrice(item.price * item.count)}</div>
        <button className='mx-12 border text-xl px-3 rounded text-white bg-gray-700'>DELETE</button>
    </div>
  )
}

export default Cart