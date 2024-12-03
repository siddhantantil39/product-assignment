import { Product } from "../types/Product";

export interface productItemProps {
    product : Product;
}

const ProductItem = (productItemProps : productItemProps) => {

    const {product} = productItemProps;

    return(
        <div className="product flex flex-row space-x-4">
            <input id="product-checkbox" type="checkbox" value="" className="w-4 text-blue-600 bg-gray-100 border-gray-300 "/>
            <img className="h-[25px] w-[25px] max-w-full rounded-sm" src={product.image.src} alt=""/>
            <p>{product.title}</p>
        </div>
    )
};

export default ProductItem;
