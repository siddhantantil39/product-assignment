import useProducts from "../hooks/useProducts";
import { Product } from "../types/Product";
import { Variant } from "../types/Variant";
import { Check, Minus, Square} from 'lucide-react';

export interface productItemProps {
    product : Product;
}

const ProductItem = (productItemProps : productItemProps) => {
    const {product} = productItemProps;
    const {dispatch,} = useProducts();

    return(
        <>
            <div className="product flex flex-row space-x-4">
            <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"onClick={() => dispatch({ type: 'TOGGLE_PRODUCT', productId: product.id })} >
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
            <img className="h-[25px] w-[25px] max-w-full rounded-sm" src={product.image.src} alt=""/>
            <p>{product.title}</p>
            </div>
            <div className="my-4 border-t border-gray-200 w-full max-w-md hover:bg-gray-700" ></div>
                {
                    product.variants.map((variant: Variant) => (
                        <>
                            <div className="variant flex flex-row space-x-4">
                            <div 
                                key={variant.id} 
                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
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
                            <div className="variant-title flex flex-row space-x-20">
                                <p>{variant.title}</p>
                                <p>{variant.price}</p>
                            </div>
                            </div>
                            <div className="my-4 border-t border-gray-200 w-full max-w-md"></div>
                        </>

                        
                        
                    ))
                }
        </>
        
    )
};

export default ProductItem;
