import useProducts from "../hooks/useProducts";
import { Product } from "../types/Product";
import { Variant } from "../types/Variant";

export interface productItemProps {
    product : Product;
}

const ProductItem = (productItemProps : productItemProps) => {
    const {product} = productItemProps;
    


    return(
        <>
            <div className="product flex flex-row space-x-4">
            <input id="product-checkbox" type="checkbox" value="" className="w-4 text-blue-600 bg-gray-100 border-gray-300 "/>
            <img className="h-[25px] w-[25px] max-w-full rounded-sm" src={product.image.src} alt=""/>
            <p>{product.title}</p>
            </div>
            <div className="my-4 border-t border-gray-200 w-full max-w-md hover:bg-gray-700" ></div>
                {
                    product.variants.map((variant: Variant) => (
                        <>
                            <div className="variant flex flex-row space-x-4">
                            <input id={variant.id} type="checkbox" value="" className="w-4 text-blue-600 bg-gray-100 border-gray-300 "/>
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
