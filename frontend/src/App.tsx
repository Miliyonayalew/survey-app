import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SurveyPage } from './pages/SurveyPage'
import { SubmissionPage } from './pages/SubmissionPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/survey/:id' element={<SurveyPage />} />
        <Route path='/submission/:id' element={<SubmissionPage />} />
      </Routes>
    </>
  )
}

export default App
