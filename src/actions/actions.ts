import { Reducer } from "react";
import { Product } from "../types/Product";
import { Variant } from "../types/Variant";

export type Action = 
  {type: 'TOGGLE_PRODUCT'; productId: string}
| {type: 'UPDATE_VARIANT'; productId: string; variantId: string}
| {type: 'GET_SELECTED_PRODUCT'; }
| {type: 'GET_SELECTED_VARIANTS'}
| {type: 'SET_PRODUCTS'; payload: Product[]}


export const productReducer : Reducer<Product[], Action> = (products: Product[], action: Action) : Product[] => {
    switch(action.type){
        case 'TOGGLE_PRODUCT':
            return products.map(product => {
                if(product.id === action.productId){
                    const selected = product.selected === null ? true : !product.selected;
                    return{
                        ...product,
                        selected : selected,
                        partial: false,
                        variants: product.variants?.map((variant: Variant) => ({
                            ...variant,
                            selected: selected
                        }))
                    }
                }
                return product;
        });

        case 'UPDATE_VARIANT':
            return products.map(product => {
                if(product.id === action.productId){
                    const updatedVariants = product.variants?.map(variant => 
                        variant.id === action.variantId
                        ? {...variant, selected: variant.selected === null ? true : !variant.selected}
                        : variant
                    );

                    const allSelected = updatedVariants?.every(variant => variant.selected === true);
                    const someSelected = updatedVariants?.some(variant => variant.selected === true);

                    
                    return{
                        ...product,
                        variants: updatedVariants,
                        selected: allSelected ||false,
                        partial: someSelected && !allSelected || false
                    };
                }
                return product;
            });

        case 'SET_PRODUCTS':            
            return action.payload;

        case 'GET_SELECTED_PRODUCT':
            return products.filter((product) => product.selected || product.partial);


        default: products;

    }

    return products;
}