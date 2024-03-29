import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/main';
import BibleBook from './views/book-details';
import HomePage from './views/home';
import ErrorPage from './components/error-page';
import Chapter from './views/book-details/chapter';
import './root.scss'
import { setLanguage } from './store/features/language';
import { config } from './config'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <HomePage /> },
                    {
                        path: '/:bookId',
                        element: <BibleBook />,
                        errorElement: <ErrorPage />,
                        children: [
                            {
                                path: ':chapterId',
                                element: <Chapter />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])


store.dispatch(setLanguage({ lang: config.defaultLang }))
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster position="bottom-left"
                reverseOrder={false} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
