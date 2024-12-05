import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Variant } from '../types/Variant';
import drag from '../assets/drag.png'
import DiscountCard from './DiscountCard';
import { useState } from 'react';

interface VariantCardProps {
    variants: Variant[]
}

const VariantCard = (variantCardProps: VariantCardProps) => {
    const {variants} = variantCardProps;

    const [v, setVariants] = useState(variants);
    return (
        <>
            <DragDropContext onDragEnd={(result)=>{
                if (!result.destination) return;
    
                const updatedSelectedProducts = Array.from(variants);
                const [reorderedProduct] = updatedSelectedProducts.splice(result.source.index, 1);
                updatedSelectedProducts.splice(result.destination.index, 0, reorderedProduct);
    
                const updatedProducts = variants.map(variant => {
                const foundInSelected = updatedSelectedProducts.find(p => p.id === variant.id);
                return foundInSelected ? foundInSelected : variant;
                });
    
                setVariants(updatedProducts);
          }}>
            <Droppable droppableId="selected-products">
              {(provided) => (
                <div 
                  className="space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {variants.map((variant, index) => (
                    <Draggable 
                      key={variant.id} 
                      draggableId={`variant-${variant.id}`} 
                      index={index}
                    >
                      {(provided) => (
                        <div className="flex flex-col items-center space-y-4">
                                                <div className="flex items-center">
                            <div 
                            {...provided.dragHandleProps} 
                            className="flex items-center space-x-4 cursor-move w-60 flex-shrink-0 rounded-lg"
                          >
                                <img src={drag} alt="drag" className="mr-2" />
                                </div>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="flex items-center bg-white p-2 rounded-lg shadow-md"
                                >
                                    <input
                                        type="text"
                                        placeholder="Select Product"
                                        className=" border-gray-300 rounded py-2 px-3 mr-4 focus:outline-none focus:ring focus:border-green-500 rounded-lg"
                                        value={variant.title}
                                        // onChange={(e) => handleProductChange(index, e.target.value)}
                                        />
                                </div>
                                <DiscountCard product={variant} discount={10} />
    
                            </div>
    
                        </div>
    
    
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>

      );

};

export default VariantCard;