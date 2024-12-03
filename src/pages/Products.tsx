
import { useState } from "react";
import ProductModal from "../components/ProductModal";


const Products = () => {

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
            
        </>
    )
};

export default Products;