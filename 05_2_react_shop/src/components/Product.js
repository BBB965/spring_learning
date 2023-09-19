import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { insertItem } from '../store/cartSlice';
import {useParams} from 'react-router';
import { NavLink } from 'react-router-dom';

const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count ,setCount] = useState(1);

    const dispatch = useDispatch();
    const insertProduct = (product) => {
        dispatch(insertItem({id : product.id, price : product.price, image : product.image, title : product.title, checked : true, count:count}));
        console.log(product);
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProduct();
    }, []);

    const Loading = () => {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const ShowProduct = () => {
        return (
            <div>
                <div className='h-screen flex flex-row justify-items-center'>
                    <img src={product.image} alt={product.title} className='max-h-lg mx-12 max-w-lg object-contain'/>
                    <div className='flex flex-col justify-center mx-12'>
                        <h4 className='text-3xl text-gray-500 font-semibold py-2'>{product.category}</h4>
                        <h1 className='text-5xl font-bold py-2'>{product.title}</h1>
                        <h3 className='text-2xl text-gray-800 font-semibold py-2'>$ {product.price}</h3>
                        <p className='text-xl py-2 w-5/6 text-gray-600'>{product.description}</p>
                        <div className='flex w-5/6 justify-between mt-6 mx-2'>
                            <div className='flex w-1/5 items-center'>
                               <button className='px-3 font-semibold text-xl' onClick={() => {
                                   if (count === 1) {return 1;} setCount(count - 1);
                               }}>-</button>
                               <p className='font-bold text-2xl text-purple-950 px-3'>{count}</p>
                               <button className='px-3 font-semibold text-xl' onClick={() => {
                                   setCount(count + 1);
                               }}>+</button>
                            </div>
                            <div className='font-bold text-2xl px-3'>$ {product.price * count}</div>
                        </div>
                        <div className='my-6 flex justify-around'>
                            <button  onClick={() => insertProduct(product)} className='text-xl border px-12 py-5 rounded-md font-semibold hover:text-white hover:bg-gray-400'>장바구니에 담기</button>
                            <NavLink to={`/cart`}>
                                <button className='text-xl border px-12 py-5 rounded-md font-semibold hover:text-white hover:bg-gray-400'>장바구니로 이동</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className='flex justify-center mt-8'>
        <div className='container'>
                {loading ? <Loading/> : <ShowProduct/>}
        </div>
    </div>
  )
}

export default Product