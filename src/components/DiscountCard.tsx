import { Product } from "../types/Product";
import { Variant } from "../types/Variant";

interface ProductCardProps  {
    product: Product | Variant;
    discount: number;
}

const DiscountCard = (productCardProps : ProductCardProps) => {

    const {product, discount} = productCardProps;
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5"></div>
                    <div>{product.title}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <div>{discount}%</div>
                    <div className="px-4 py-2 bg-gray-200 rounded-md">flat Off</div>
                </div>
                <br/>
                <div className="cursor-pointer" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

        </div>

      );
};

export default DiscountCard;