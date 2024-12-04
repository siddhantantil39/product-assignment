
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import useProducts from "../hooks/useProducts";


const Products = () => {
    const {products, getSelectedProducts, getSelectedVariants} = useProducts();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAdd = () => {
        setIsOpen((prev) => !prev);
    }

    const selectedProducts = getSelectedProducts();

    

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
                {selectedProducts.map((product) => (
                    <p>{product.title}</p>
                ))}
            </div>
            
        </>
    )
};

export default Products;