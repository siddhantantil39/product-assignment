import { ReactNode, useEffect, useState } from "react";
import SearchProducts from "./SearchProducts";
import { Product } from "../types/Product";
import ProductItem from "./ProductItem";


const initialProducts: Product[] = [{
    id: "",
    title: "",
    variants: [],
    image: {
        id: "",
        product_id: "",
        src: ""
    }
}];

interface ModalProps {
    isOpen: boolean,
    onClose: any,
    children: ReactNode
};

const ProductModal = (modalProps: ModalProps) => {

    const {isOpen, onClose, children} = modalProps;
    const [query, setQuery] = useState('');

    const [products, setProducts] = useState<Product[]>(initialProducts);

    const getProducts = async () => {
        const response = fetch('https://stageapi.monkcommerce.app/task/products/search?' + new URLSearchParams({
            search: query, page: '0'
        }).toString(), {
            method: 'GET',
            headers: {
                "x-api-key": "72njgfa948d9aS7gs5"
            }
        }
        );

        await response
        .then((res) => {
            if(res.ok) return res.json();
        })
        .then((data) => {
            setProducts(data);
        })
        .catch(() =>{
            console.log("Error in fetching Products")
        });

    };


    useEffect(()=>{
        getProducts();
    }, [query]);

    if(!isOpen) return null;


    return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[800px] max-w-md  h-[600px] p-6">
            <h3 className="absolute top-3 left-3 text-md font-semibold text-gray-800">Add Products</h3>
                <button 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none" 
                onClick={onClose}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <div className="my-4 border-t border-gray-200 w-full max-w-md"></div>
                <SearchProducts query={query} setQuery={setQuery}/>
                <div className="my-4 border-t border-gray-200 w-full max-w-md"></div>
                
                    <div className=" overflow-y-scroll h-[400px] no-scrollbar">
                    {
                         products.map((product: Product)=>{ 
                            return(
                                <div className="">
                                    <ProductItem product= {product}/>
                                    <div className="my-4 border-t border-gray-200 w-full max-w-md"/>
                                </div>    
                                
                        )
                    })
                    }    
                   
                </div>
                
                <div className="mt-6 flex justify-end">
                <button 
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={onClose}
                    >
                    Cancel
                </button>
                <button 
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={onClose}
                    >
                    Add
                </button>
                </div>
            </div>
            </div>


        </>
    )
};

export default ProductModal;