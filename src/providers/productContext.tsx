import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Product } from "../types/Product";
import { Action, productReducer } from "../actions/actions";
import { Variant } from "../types/Variant";

interface productContextProps{
    products : Product[];
    dispatch: Dispatch<Action>;
    getSelectedProducts : () => Product[];
    getSelectedVariants: () => Variant[];
    setProducts: (p : Product[]) =>void
};

interface productProviderProps{
    children: ReactNode;
}


export const initialProducts: Product[] = [
    {
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
    }
];

export const ProductContext = createContext<productContextProps>({
    products: initialProducts,
    dispatch: () => null,
    getSelectedProducts: () => [],
    getSelectedVariants: () => [],
    setProducts: (p: Product[]) => {}
});

export const ProductProvider = (productProviderProps: productProviderProps) => {
    
    const [products, dispatch] = useReducer(productReducer, initialProducts);
    const {children} = productProviderProps;

    const getSelectedProducts = () => {
        return products.filter(product => product.selected || product.partial)
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
            getSelectedProducts,
            getSelectedVariants,
            setProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
};