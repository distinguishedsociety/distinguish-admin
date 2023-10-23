import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import { useHistory } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { getCurrentUser } from "./services/API/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { Route, Redirect } from "react-router-dom";
import { Profile } from "./pages/Profile/Profile";
import { Switch } from "react-router-dom";
import { Users } from "./pages/Users/Users";
import { Products } from "./pages/Products/Products";
import { Orders } from "./pages/Orders/Orders";
import { Inventory } from "./pages/Inventory/Inventory";
import { AddProduct } from "./pages/Products/AddProduct";
import { EditProduct } from "./pages/Products/EditProduct";
import { Category } from "./pages/Categories/Category";
import { Collection } from "./pages/Collections/Collection";
import { Banners } from "./pages/Banners/Banners";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AddBanner } from "./pages/Banners/AddBanner";
import { ViewUserOrders } from "./pages/Users/ViewUserOrders";
import { ViewOrder } from "./pages/Orders/ViewOrder";
import { Blogs } from "./pages/Blogs/index"
import { EditBlog } from "./pages/Blogs/EditBlog";
import { AddBlog } from "./pages/Blogs/AddBlog";
import { IntroBanner } from "./pages/IntroBanner/IntroBanner";
import { Coupons } from "./pages/Coupons/Coupons";
import { AddCoupon } from "./pages/Coupons/AddCoupon";
import { EditCoupon } from "./pages/Coupons/EditCoupon";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/Auth/ResetPassword";



const Dashboard = lazy(() => import("./pages/Dashboard/index"));
const Sidebar = lazy(() => import("./components/Sidebar"));

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('loggedInUser'));
  

  const LoadingMessage = () => (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  useEffect(() => {

    return () => {
      sessionStorage.clear()
    }
  })

  return (
    <>
      <Suspense fallback={<LoadingMessage />}>
        {isAuthenticated && <>
        <Header />
        <Sidebar />
        </>}
        <Switch>
          <Route>
        <PublicRoute
          restricted={true}
          component={Login}
          path="/login"
          exact
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          restricted={true}
          component={Login}
          path="/"
          exact
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute component={Dashboard} path="/dashboard" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={ForgotPassword} path="/reset-password" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Users} path="/users" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Orders} path="/orders" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Products} path="/products" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Inventory} path="/inventory" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={AddProduct} path="/add-product" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={EditProduct} path="/edit-product/:slug" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Coupons} path="/coupons" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={AddCoupon} path="/add-coupon" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={EditCoupon} path="/edit-coupon/:slug" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={ViewUserOrders} path="/user/orders/:id" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={ViewOrder} path="/view-order/:id" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Category} path="/categories" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Collection} path="/collections" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Banners} path="/banners" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={AddBanner} path="/add-banner" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={Blogs} path="/blogs" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={EditBlog} path="/view-blog/:id" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={AddBlog} path="/add-blog" isAuthenticated={isAuthenticated} />
        <PrivateRoute component={IntroBanner} path="/intro-banner" isAuthenticated={isAuthenticated} />
        
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;

