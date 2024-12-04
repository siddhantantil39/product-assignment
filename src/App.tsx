import './App.css'
import Products from './pages/Products'
import { ProductProvider } from './providers/productContext'

function App() {

  return (
    <ProductProvider>
      <Products/>
    </ProductProvider>
  )
}

export default App
