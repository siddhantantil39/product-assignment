import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchProducts from "./SearchProducts";
import ProductItem from "./ProductItem";
import { useDebounce } from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";
import { Product } from "../types/Product";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    selectedProducts: Product[],
    setSelectedProducts: Dispatch<SetStateAction<Product[]>>
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, setSelectedProducts }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const { products, setProducts } = useProducts();

    const getProducts = async () => {
        if (!debouncedQuery) return;

        setIsLoading(true);
        try {
            const response = await fetch(`https://stageapi.monkcommerce.app/task/products/search?${new URLSearchParams({
                search: debouncedQuery,
                page: '0',
                limit: '10'
            }).toString()}`, {
                method: 'GET',
                headers: {
                    "x-api-key": "72njgfa948d9aS7gs5"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error("Failed to fetch products");
                setProducts([]);
            }
        } catch (error) {
            console.error("Error in fetching Products", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedQuery) {
            getProducts();
        } else {
            setProducts([]);
        }
    }, [debouncedQuery]);

    const handleModalClose = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedProducts((prev) => [...prev,...[]]);
        onClose();
    };

    const handleAddProduct = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const selectedProducts  = products.filter((p) => p.selected || p.partial);
        setSelectedProducts((prev) => [...prev,...selectedProducts]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[1400px] max-w-lg h-[600px] p-6">
                <h3 className="absolute top-3 left-3 text-md font-semibold text-gray-800">Add Products</h3>
                <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none" 
                    onClick={handleModalClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="my-4 border-t border-gray-200 w-full max-w-md"></div>
                
                <SearchProducts 
                    query={query} 
                    setQuery={(newQuery) => {
                        // Prevent default form submission
                        if (window.event) {
                            window.event.preventDefault();
                        }
                        setQuery(newQuery);
                    }}
                />
                
                <div className="my-4 border-t border-gray-200 w-full max-w-md"></div>
                
                <div className="overflow-y-scroll h-[400px]">
                    {isLoading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={product.id || index}>
                                <ProductItem product={product} />
                                <div className="my-4 border-t border-gray-200 w-full max-w-md"/>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4">No products found</div>
                    )}
                </div>
                
                <div className="mt-6 flex justify-end space-x-2">
                    <button 
                        className="flex items-center border-2 border-[#008060] text-[#008060] bg-white px-4 py-2"
                        onClick={handleModalClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="flex items-center border-2 border-white text-white bg-[#008060] px-4 py-2"
                        onClick={handleAddProduct}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;