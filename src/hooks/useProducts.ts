import { useContext } from "react"
import { ProductContext } from "../providers/productContext"

const useProducts = () => {
    const context = useContext(ProductContext);
    if(!context){
        throw new Error('useProducts hook gone wrong!')
    }
    
    return context;
}

export default useProducts;

