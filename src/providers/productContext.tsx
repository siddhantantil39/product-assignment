import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Product } from "../types/Product";
import { Action, productReducer } from "../actions/actions";
import { Variant } from "../types/Variant";

interface productContextProps{
    products : Product[];
    dispatch: Dispatch<Action>;
    getSelectedProduct : () => Product;
    getSelectedVariants: () => Variant[];
    setProducts: (p : Product[]) =>void
};

interface productProviderProps{
    children: ReactNode;
}

const initialProduct  = {
    id: "0",
    title: "",
    variants: [],
    image: {
        id: "",
        product_id: "",
        src: ""
    },
    selected: false,
    partial: false
};

export const initialProducts: Product[] = [
    initialProduct
];

export const ProductContext = createContext<productContextProps>({
    products: initialProducts,
    dispatch: () => null,
    getSelectedProduct: () => initialProduct,
    getSelectedVariants: () => [],
    setProducts: (p: Product[]) => {}
});

export const ProductProvider = (productProviderProps: productProviderProps) => {
    
    const [products, dispatch] = useReducer(productReducer, initialProducts);
    const {children} = productProviderProps;

    const getSelectedProduct = () => {
        const selectedProduct =  productReducer(products, { type: 'GET_SELECTED_PRODUCT' })[0];
        console.log(selectedProduct);
        return selectedProduct;
        
    };

    const getSelectedVariants = () => {
         let variants : Variant[]= [];   
         products.map(product => {
            variants = product.variants.filter(variant => variant.selected)
         });
         return variants;
    };

    const setProducts = (p : Product[]) => {
        console.log("here");
        dispatch({type: 'SET_PRODUCTS', payload: p});
    }



    return(
        <ProductContext.Provider value={{
            products,
            dispatch,
            getSelectedProduct,
            getSelectedVariants,
            setProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
};