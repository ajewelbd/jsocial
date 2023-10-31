import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthWrapper } from './auth/auth-wrapper';
import router from './auth/router';
import { ContextProvider } from './context/context-provider';

function App() {
  return (
    // <BrowserRouter>
    //   <AuthWrapper />
    //   <Routes />
    // </BrowserRouter>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App
