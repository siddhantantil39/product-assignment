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

    const removeVariant = ( variantId: string) => {
        const filteredProducts  = v.filter((v) => v.id !== variantId);
        setVariants(filteredProducts);
      };

    return (
        <>
            <DragDropContext onDragEnd={(result)=>{
                if (!result.destination) return;
    
                const updatedVariants = Array.from(variants);
                const [reorderedProduct] = updatedVariants.splice(result.source.index, 1);
                updatedVariants.splice(result.destination.index, 0, reorderedProduct);
                setVariants(updatedVariants);
          }}>
            <Droppable droppableId="selected-products">
              {(provided) => (
                <div 
                  className="space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {v.map((variant, index) => (
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
                                        className=" border-gray-300 py-2 px-3 mr-4 focus:outline-none focus:ring focus:border-green-500 rounded-lg"
                                        value={variant.title}
                                        />
                                    
                                </div>
                                <div className="delete px-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => removeVariant(variant.id)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
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