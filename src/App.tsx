import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout';
import { Spinner } from './components/ui/spinner';





const Home = lazy(() => import('./Pages/Home/Home'))
const About = lazy(() => import('./Pages/About/About'))
const Contact = lazy(() => import('./Pages/Contact/Contact'))
const Register = lazy(() => import('./Pages/Auth/Register'))
const Login = lazy(() => import('./Pages/Auth/Login'))
const NotFound = lazy(() => import('./Pages/Error/NotFound'))
const Error = lazy(() => import('./Pages/Error/Error'))
const Account = lazy(() => import('./Pages/Client/Account'))
const ProductDetail = lazy(() => import('./components/InfoProductions'))
const AllProducts = lazy(() => import('./components/AllProduct'))
const Like = lazy(() => import('./components/Like'))
const MyOrder = lazy(() => import('./components/Order'))
const Checkout = lazy(() => import('./components/Checkout'))
const Feedback = lazy(() => import('./components/Feedback'))





const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-full gap-4">
      <Spinner className="size-20 text-blue-600" />
      <p className="text-xl font-semibold text-neutral-900">Please wait...</p>
    </div>
  )
}



const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      errorElement: <Suspense fallback={<Loading />}><Error/></Suspense>,
      children: [
        {
          index: true,
          element: <Suspense fallback={<Loading />}>
            <Home/>
          </Suspense>
        },
        {
          path: '/about',
          element: <Suspense fallback={<Loading />}>
            <About/>
          </Suspense>
        },
        {
          path: '/contact',
          element: <Suspense fallback={<Loading />}>
            <Contact/>
          </Suspense>
        },
        {
          path: '/feedback',
          element: <Suspense fallback={<Loading />}>
            <Feedback/>
          </Suspense>
        },
        {
          path: '/register',
          element: <Suspense fallback={<Loading />}>
            <Register/>
          </Suspense>
        },
        {
          path: '/login',
          element: <Suspense fallback={<Loading />}>
            <Login/>
          </Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<Loading />}>
            <NotFound/>
          </Suspense>
        },
        {
          path: '/account',
          element: <Suspense fallback={<Loading />}>
            <Account/>
          </Suspense>
        },
        {
          path: '/product/:id',
          element: <Suspense fallback={<Loading />}>
            <ProductDetail/>
          </Suspense>
        },
        {
          path: '/all-product',
          element: <Suspense fallback={<Loading />}>
            <AllProducts/>
          </Suspense>
        },
        {
          path: '/wishlist',
          element: <Suspense fallback={<Loading />}>
            <Like/>
          </Suspense>
        },
        {
          path: '/my-order',
          element: <Suspense fallback={<Loading />}>
            <MyOrder/>
          </Suspense>
        },
        {
          path: '/checkout',
          element: <Suspense fallback={<Loading />}>
            <Checkout/>
          </Suspense>
        }
      ]
    },
    {
      path: '/error',
      element: <Suspense fallback={<Loading />}>
        <Error/>
      </Suspense>
    }
  ])

  return <RouterProvider router={router}/>
}

export default App;
