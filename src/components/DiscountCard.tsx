import { ChangeEvent, useState } from "react";
import { Product } from "../types/Product";
import { Variant } from "../types/Variant";

interface ProductCardProps  {
    product: Product | Variant;
    discount: number;
}

const DiscountCard = (productCardProps : ProductCardProps) => {

    const [discountFlag, setDiscountFlag] = useState(false);
    const [discountValue, setDiscountValue] = useState<string|number>("10");

    const onChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
        setDiscountValue(e.target.value);
    }
    return (
        <>
            {!discountFlag
             ? 
             <div className="px-6">
                <button 
                    className="flex items-center border-2 border-white text-white bg-[#008060] px-4 py-2" onClick={(flag) => setDiscountFlag(true)}>
                    Add Discount
                </button>
             </div>
            :
            <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 border-2 border-[#008060]">
                            <input value={discountValue} onChange={(e) => onChangeDiscount(e)} className="h-[40px] w-[100px] px-8"/>
                        </div>
                        <div className="bg-gray-200 border-2 border-[#008060]">
                            <select className="h-[40px] w-[100px] px-4">
                                <option id ='1' label="% off">% off</option>
                                <option id ='2' label="flat off">flat off</option>
                            </select>
                        </div>
                    </div>                    
                </div>
            </div>


            }
        
        </>
        
      );
};

export default DiscountCard;