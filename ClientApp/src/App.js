import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Livechat from "./layouts/Livechat";
import Loading from "./pages/Loading";
import Container from "./components/UI/Container";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Detail = lazy(() => import("./pages/Detail"));
const Cart = lazy(() => import("./pages/Cart"));
const History = lazy(() => import("./pages/History"));
const Order = lazy(() => import("./pages/Order"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container className="vh90">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route path="/shop/:category" component={Shop} />
            <Route path="/detail/:productId" component={Detail} />
            <Route path="/cart" component={Cart} />
            <Route path="/history/:orderId" component={Order} />
            <Route path="/history" component={History} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </Container>
      <Footer />
      <Livechat />
    </BrowserRouter>
  );
}

export default App;
