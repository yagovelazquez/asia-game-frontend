import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import theme from './theme';
import Home from './views/Home';
import SpinWheelGame from './views/SpinWheelGame';
import { initializeApp } from "firebase/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/spin-wheel-game',
    element: <SpinWheelGame />,
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCjB8spvVbxGlFyePhlUFWPIMo2jLNEsc",
  authDomain: "asiagame-48d9c.firebaseapp.com",
  projectId: "asiagame-48d9c",
  storageBucket: "asiagame-48d9c.appspot.com",
  messagingSenderId: "11385678944",
  appId: "1:11385678944:web:bf7775473c72a67e592705",
  measurementId: "G-LRZGHJTPBT"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const queryClient = new QueryClient(  {defaultOptions: {
  queries: {
    refetchOnWindowFocus: false, // default: true
  },
},})

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
