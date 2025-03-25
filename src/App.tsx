import { useNavigate } from 'react-router'
import './App.css'

function App() {
	const navigate = useNavigate();

  return (
    <>
		<div>
			<h1>WELCOME!</h1>
			<h3>To Marcus' Bikeshop. Buy bikes and more!</h3>
			<button onClick={() => navigate("/products/bicycles")}>Get Started</button>
		</div>
    </>
  )
}

export default App
