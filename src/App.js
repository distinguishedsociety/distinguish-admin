import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import { useHistory } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { getCurrentUser } from "./services/API/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { Route } from "react-router-dom";
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



const Dashboard = lazy(() => import("./pages/Dashboard/index"));
const Sidebar = lazy(() => import("./components/Sidebar"));

function App() {
  const dispatch = useDispatch();
  // const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  // useEffect(() => {
  //   async function getUser() {
  //     const el = document.querySelector(".loader-container");
  //     var { user, error } = await getCurrentUser();
  //     if (error) {
  //       // history.push("/moas/login");
  //     }

  //     if (user) {
  //       if (el) {
  //         el.remove();
  //         setLoading(!isLoading);
  //       }
  //       const cap = [];

  //       Object.values(user.userCapabilitiesStringHashMap).forEach((item) => {
  //         if (item.isAllowed) {
  //           cap.push(item.userCapability);
  //         }
  //       });
  //       user = { ...user, cap };
  //       console.log(user);
  //       dispatch(setUser(user));
  //     }
  //   }

  //   getUser();
  // }, []);

  // if (isLoading)
  //   return (
  //     <div class="loader-container">
  //       <div class="loader"></div>
  //     </div>
  //   );

  const LoadingMessage = () => (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <>
      <Suspense fallback={<LoadingMessage />}>
        <Header />
        <Switch>
          <Route>
            <Sidebar />
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/inventory">
              <Inventory />
            </Route>
            <Route exact path="/add-product">
              <AddProduct />
            </Route>
            <Route exact path="/edit-product/:slug">
              <EditProduct />
            </Route>
            <Route exact path="/coupons">
              <Coupons />
            </Route>
            <Route exact path="/add-coupon">
              <AddCoupon />
            </Route>
            <Route exact path="/edit-coupon/:slug">
              <EditCoupon />
            </Route>
            <Route exact path="/user/orders/:id">
              <ViewUserOrders />
            </Route>
            <Route exact path="/view-order/:id">
              <ViewOrder />
            </Route>
            <Route exact path="/categories">
              <Category />
            </Route>
            <Route exact path="/collections">
              <Collection />
            </Route>
            <Route exact path="/banners">
              <Banners />
            </Route>
            <Route exact path="/add-banner">
              <AddBanner />
            </Route>
            <Route exact path="/blogs">
              <Blogs />
            </Route>
            <Route exact path="/view-blog/:id">
              <EditBlog />
            </Route>
            <Route exact path="/add-blog">
              <AddBlog />
            </Route>
            <Route exact path="/intro-banner">
              <IntroBanner />
            </Route>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
