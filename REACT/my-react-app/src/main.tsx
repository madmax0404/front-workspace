// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Practice from './Practice.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './03_global_state/2.Redux/store/store.ts'

createRoot(document.getElementById('root')!).render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                {/* <Practice/> */}
            </BrowserRouter>
        </Provider>
    </>,
)
