import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Pricing from './pages/Pricing'
import StartProject from './pages/StartProject'
import Dashboard from './pages/Dashboard'
import CategoryPage from './pages/CategoryPage'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/start-project" element={<StartProject />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
