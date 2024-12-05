
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import useProducts from "../hooks/useProducts";
import ProductList from "../components/ProductList";


const Products = () => {
    const {products} = useProducts();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAdd = () => {
        setIsOpen((prev) => !prev);
    }


    

    return(
        <>
            <button onClick={handleAdd}>Add</button>
            <ProductModal
                isOpen={isOpen}
                onClose={handleAdd} 
                children={undefined}            
                />
            <h1>Products</h1>
            <div>
               
            </div>
            <ProductList/>
            
        </>
    )
};

export default Products;