import React,{useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentsMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://fakestoreapi.com/products");
            if(componentsMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }
            return () => {
                componentsMounted = false;
            }
        }

        getProducts();
    }, []);

    const Loading = () => {
        return (
            <div>
                LOADING...
            </div>
        )
    }

    const filterProduct = (cg) => {
        const updatedList = data.filter((x) => x.category === cg);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <div className='w-full flex flex-col justify-center'>
                <div className=' flex flex-row justify-center'>
                    <button onClick={() => setFilter(data)} className='border px-7 py-3 m-3 rounded text-xl font-semibold hover:bg-gray-400 hover:text-white' >모두</button>
                    <button onClick={() => filterProduct("electronics")} className='border px-7 py-3 m-3 rounded text-xl font-semibold hover:bg-gray-400 hover:text-white'>전자기기</button>
                    <button onClick={() => filterProduct("jewelery")} className='border px-7 py-3 m-3 rounded text-xl font-semibold hover:bg-gray-400 hover:text-white'>쥬얼리</button>
                    <button onClick={() => filterProduct("men's clothing")} className='border px-7 py-3 m-3 rounded text-xl font-semibold hover:bg-gray-400 hover:text-white'>남성의류</button>
                    <button onClick={() => filterProduct("women's clothing")} className='border px-7 py-3 m-3 rounded text-xl font-semibold hover:bg-gray-400 hover:text-white'>여성의류</button>
                </div>
            
            <div className='container my-8 mx-auto px-4 md:px-12 '>
                <p className='pb-6 text-xl text-gray-500'>Showing : <span className='text-black font-semibold'>{filter.length} </span>items </p>
                <div className='grid grid-cols-4 gap-x-14 gap-y-20 justify-items-center justify-center'>
            {filter.map((product) => {
                return (
                    <NavLink to={`/${product.id}`}>
                        <div className='w-72 bg-white rounded-xl duration-500 hover:sacle-105 hover:shadow-xl border flex flex-col justify-center'>
                            <img className="py-4 px-5 w-45 h-80 object-cover rounded-t-xl" src={product.image}/>
                                <div className="px-4 py-3 w-72">
                                    <p className='text-lg fond-bold text-black truncate block capitalize'>{product.title}</p>
                                    <div className='flex items-center'>
                                        <p className='text-lg font-semibold text-black cursor-auto my-3'>${product.price}</p>
                                        <div className="ml-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                )
            })}
            </div>
            </div>
            </div>
        )
    }

  return (
    <div>
        <div className='mx-10 my-6'>
            <div className='text-3xl flex justify-center'>
                Products
            </div>
        </div>
        <div>
            {loading ? <Loading/> : <ShowProducts/>}
        </div>
    </div>
  )
}

export default Products