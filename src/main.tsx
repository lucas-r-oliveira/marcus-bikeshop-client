import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import BikeGridPage from './pages/BikeGridPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import CartPage from './pages/CartPage.tsx'
import BikeListConfigPage from './pages/BikeListConfigPage.tsx'
import ProductConfigPage from './pages/ProductConfigPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
			<Route path="products">
				<Route path="bicycles" element={<BikeGridPage />}/>
				<Route path=":productId" element={<ProductPage />} />
			</Route>
			<Route path="cart" element={<CartPage/>} />
			<Route path="admin">
				<Route path="products">
					<Route path="bicycles" element={<BikeListConfigPage />}/>
					<Route path=":productId" element={<ProductConfigPage />} />
				</Route>
			</Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
