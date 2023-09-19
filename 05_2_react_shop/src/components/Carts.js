import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Cart from './Cart';
//import { allCheckedFalse, allCheckedTrue } from '../store/cartSlice';

export default function Carts() {

    const navigate = useNavigate();
    let list = useSelector((state) => state.cart);
    console.log(list);
    const dispatch = useDispatch();

    // const checkedList = list.filter((item) => item.checked === true);
    
    // const handleAllCheck = (checked) => {
    //     if (checked) {
    //         list.forEach((item) => dispatch(allCheckedTrue(item.id)));
    //     } else {
    //         list.forEach((item) => dispatch(allCheckedFalse(item.id)));
    //     }
    // };

  return (
    <div className='flex flex-col justify-center'>
        {list.length > 0 ? (
            list.map((item) => {
                console.log(item);
                return <Cart key={item.id} item={item}/>
              })
            ) : (
                <div>
                    <p>장바구니가 비었습니다.</p>
                    <button onClick={() => {navigate('/')}}>Go Shopping</button>
                </div>
            )
        }
      {}
    </div>
  )
}
