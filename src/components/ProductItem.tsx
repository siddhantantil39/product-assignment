import useProducts from "../hooks/useProducts";
import { Product } from "../types/Product";
import { Variant } from "../types/Variant";
import { Check, Minus, Square} from 'lucide-react';

export interface productItemProps {
    product : Product;
}

const ProductItem = (productItemProps : productItemProps) => {
    const {product} = productItemProps;
    const {dispatch} = useProducts();

    return(
        <>
            <div className="product flex flex-row space-x-4">
            <ul className="divide-y">
                <li className="flex items-center">
                    <div onClick={() => dispatch({ type: 'TOGGLE_PRODUCT', productId: product.id })}>
                        {product.selected ? 
                        (
                            <Check className="text-green-500 mr-2" />
                        ) : product.partial ? 
                        (
                            <Minus className="text-yellow-500 mr-2" />
                        ) : 
                        (
                            <Square className="text-gray-400 mr-2" />
                        )}
                    </div>
                    <div className="flex w-full items-center justify-between">
                    <div className="px-2 flex-1">
                        <img className="h-[30px] w-[30px] max-w-full rounded-sm" src={product.image.src} alt=""/>
                    </div>
                    <div className="text-lg">{product.title}</div>
                    </div>
                </li>
            </ul>      
            </div>
            <div className="my-4 border-t border-gray-200 w-full max-w-md hover:bg-gray-700" ></div>
                {
                    product.variants?.map((variant: Variant) => (
                        <>
                            <ul className="divide-y">
                                <li className="py-4 px-10 flex items-center">
                                    <div 
                                        key={variant.id} 
                                        onClick={() => dispatch({ 
                                        type: 'UPDATE_VARIANT', 
                                        productId: product.id, 
                                        variantId: variant.id 
                                        })}
                                    >
                                        {variant.selected ? (
                                        <Check className="text-green-500 mr-2" />
                                        ) : (
                                        <Square className="text-gray-400 mr-2" />
                                        )}   
                                     </div>
                                    <div className="flex w-full items-center justify-between">
                                    <div className="text-sm flex-1">{variant.title}</div>
                                    <div className="text-md flex-1 text-right">{product.variants?.length} available</div>
                                    <div className="text-md flex-1 text-right">₹ {variant.price}</div>
                                    </div>
                                </li>
                            </ul>
                        </>

                        
                        
                    ))
                }
        </>
        
    )
};

export default ProductItem;
