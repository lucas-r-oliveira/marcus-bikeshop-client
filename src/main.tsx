//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import BikeGridPage from './pages/BikeGridPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import CartPage from './pages/CartPage.tsx'
import BikeManagementPage from './pages/BikeManagementPage.tsx'
import ProductConfigPage from './pages/ProductConfigPage.tsx'
import ProductProvider from './contexts/ProductContext.tsx'
import CartProvider from './contexts/CartContext.tsx'
import ConfifgurationProvider from './contexts/ConfigurationContext.tsx'

//TODO: show cart in every page (icon + badge)
createRoot(document.getElementById('root')!).render(
	<ProductProvider>
		<ConfifgurationProvider>
			<CartProvider>
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
								<Route path="bicycles" element={<BikeManagementPage />}>
								</Route>
								<Route path=":productId" element={<ProductConfigPage />} />
								<Route path="create" element={<ProductConfigPage />}/>
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</ConfifgurationProvider>
	</ProductProvider>
)
