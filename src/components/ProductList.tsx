import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ProductModal from './ProductModal';
import useProducts from '../hooks/useProducts';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import drag from '../assets/drag.png';
import edit from '../assets/Edit.png';
import VariantCard from './VariantCard';
import DiscountCard from './DiscountCard';
import { initialProducts } from '../providers/productContext';
import { Product } from '../types/Product';

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerTimerEnabled, setOfferTimerEnabled] = useState(false);
  const { products, setProducts } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);


  const handleOpenModal = (productId?: string) => {    
    setSelectedProductId(productId || null);
    setIsModalOpen((prev) => !prev);
  };

  const handleProductChange = (productId: string, value: string) => {
    const updatedProducts = products.map(product => 
      product.id === productId ? { ...product, title: value } : product
    );
    setProducts(updatedProducts);
  };

  const handleAddProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProducts((prev) => [...prev,...initialProducts]);
};

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedSelectedProducts = Array.from(selectedProducts);
    const [reorderedProduct] = updatedSelectedProducts.splice(result.source.index, 1);
    updatedSelectedProducts.splice(result.destination.index, 0, reorderedProduct);

    setSelectedProducts(updatedSelectedProducts);
  };

  const preventReload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onClickVariants = (product: Product) => {
    setSelectedProductId(product.id);
  };


  return (
    <div className="bg-gray-100 p-6">
      <div className='grid grid-cols-1 divide-y-[2px] mb-6'>
        <div>
          <h3 className="text-lg font-semibold">Video Reviews</h3>
        </div>
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-bold">Offer Funnel</h2>
          <div>
            <a href="#" className="text-gray-500 underline mr-4">
              Support |
            </a>
            <a href="#" className="text-gray-500 underline">
              Talk to an Expert
            </a>
          </div>
        </div>

        <p className="text-black-500 py-4 text-left">
          Offer Bundle will be shown to the customer whenever any of the bundle
          products are added to the cart.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
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
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center">
                        <div 
                          {...provided.dragHandleProps} 
                          className="flex items-center space-x-4 cursor-move w-60 flex-shrink-0"
                        >
                          <img src={drag} alt="drag" className="mr-2" />
                          {index + 1}.
                        </div>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center bg-white p-2 rounded-lg shadow-md"
                        >
                          <input
                            type="text"
                            placeholder="Select Product"
                            readOnly
                            className="border-gray-300 rounded py-2 px-3 mr-4 focus:outline-none focus:ring focus:border-green-500"
                            value={product.title}
                            onChange={(e) => handleProductChange(product.id, e.target.value)}
                          />
                          <button 
                            onClick={(e) => {
                              preventReload(e);
                              handleOpenModal(product.id);
                            }}
                          >
                            <img src={edit} alt='edit' className="mr-2" />
                          </button>
                          {isModalOpen && selectedProductId === product.id && (
                            <ProductModal
                              isOpen={isModalOpen}
                              onClose={() => handleOpenModal()}
                              selectedProducts={selectedProducts}
                              setSelectedProducts={setSelectedProducts}
                            />
                          )}
                        </div>
                        <DiscountCard />

                      </div>
                      <div className="cursor-pointer ml-[652.5px] flex items-center space-x-1"  onClick={() => onClickVariants(product)}>
                        <span>{ product.id ===selectedProductId ? "Hide" : "Show"} variants</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-6 w-6 transform ${product.id ===selectedProductId  ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </div>
                      {product.id === selectedProductId && <VariantCard variants={product.variants || []} />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-end items-center mt-4">
        <button 
          onClick={handleAddProduct}
          className="flex items-center border-2 border-[#008060] text-[#008060] bg-white px-4 py-2  hover:bg-[#008060] hover:text-white transition-colors ">
            Add Product
        </button>
      </div>

      <div className="flex items-center mt-4">
        <input 
          type="checkbox" 
          id="compare-price-discount" 
          className="mr-2" 
        />
        <label htmlFor="compare-price-discount">Apply discount on compare price</label>
        <div className="ml-2 text-gray-500 cursor-pointer hover:underline">
          <Info size={16} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Advanced offer customizations</h3>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="offer-timer"
            className="mr-2"
            checked={offerTimerEnabled}
            onChange={() => setOfferTimerEnabled(!offerTimerEnabled)}
          />
          <label htmlFor="offer-timer">Enable timer for this offer</label>
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