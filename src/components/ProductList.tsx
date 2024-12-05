import React, { useState } from 'react';
import { Info, Plus, Trash2 } from 'lucide-react';
import ProductModal from './ProductModal';
import useProducts from '../hooks/useProducts';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import drag from '../assets/drag.png'

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerTimerEnabled, setOfferTimerEnabled] = useState(false);
  const { products, setProducts } = useProducts();

  const selectedProducts = products.filter(product => product.selected || product.partial);

  const handleOpenModal = () => {
    setIsModalOpen((prev)=> !prev);
  };

  const handleProductChange = (index: number, value: string) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].title = value;
    
    const updatedSelectedProducts = products.map(p => 
      p.id === updatedProducts[index].id ? { ...p, title: value } : p
    );
    setProducts(updatedSelectedProducts);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Offer Funnel</h2>
        <div>
          <a href="#" className="text-green-500 hover:underline mr-4">
            Support
          </a>
          <a href="#" className="text-green-500 hover:underline">
            Talk to an Expert
          </a>
        </div>
      </div>

      <p className="text-yellow-500 mb-4">
        Offer Bundle will be shown to the customer whenever any of the bundle
        products are added to the cart.
      </p>

      <DragDropContext onDragEnd={(result)=>{
            if (!result.destination) return;

            const updatedSelectedProducts = Array.from(selectedProducts);
            const [reorderedProduct] = updatedSelectedProducts.splice(result.source.index, 1);
            updatedSelectedProducts.splice(result.destination.index, 0, reorderedProduct);

            const updatedProducts = products.map(product => {
            const foundInSelected = updatedSelectedProducts.find(p => p.id === product.id);
            return foundInSelected ? foundInSelected : product;
            });

            setProducts(updatedProducts);
      }}>
        <Droppable droppableId="selected-products">
          {(provided) => (
            <div 
              className="space-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {selectedProducts.map((product, index) => (
                <Draggable 
                  key={product.id} 
                  draggableId={`product-${product.id}`} 
                  index={index}
                >
                  {(provided) => (
                    <div className="flex items-center">
                      <div 
                        {...provided.dragHandleProps} 
                        className="flex items-center mr-4 cursor-move w-12 flex-shrink-0"
                      >
                        <img src={drag} alt="drag" className="mr-2" />
                        {index + 1}.
                      </div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex-1 flex items-center bg-white p-4 rounded-lg shadow-md"
                      >
                        <input
                          type="text"
                          placeholder="Select Product"
                          className="flex-1 border-gray-300 rounded py-2 px-3 mr-4 focus:outline-none focus:ring focus:border-green-500"
                          value={product.title}
                          onChange={(e) => handleProductChange(index, e.target.value)}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-2 rounded"
                          onClick={handleOpenModal}
                        >
                          <Plus className="mr-2" />
                        </button>
                        <ProductModal
                          isOpen={isModalOpen}
                          onClose={handleOpenModal} 
                          children={undefined}            
                        />
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

      <div className="flex items-center mt-4">
        <input type="checkbox" className="mr-2" />
        <span>Apply discount on compare price.</span>
        <div className="ml-2 text-gray-500 cursor-pointer hover:underline">
          <Info size={16} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Advanced offer customizations</h3>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={offerTimerEnabled}
            onChange={() => setOfferTimerEnabled(!offerTimerEnabled)}
          />
          <span>Enable timer for this offer.</span>
        </div>
      </div>

      {offerTimerEnabled && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Offer Timer</h3>
          {/* Add timer UI here */}
        </div>
      )}
    </div>
  );
};

export default ProductList;