import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Loading from "./pages/Loading";
import Container from "./components/UI/Container";
import { useSelector } from "react-redux";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const LiveChat = lazy(() => import("./pages/LiveChat"));
const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  // Get user from store
  const user = useSelector((state) => state.user.user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {user ? (
          <>
            <Header />
            <Container className="vh90">
              <Switch>
                {user.role === "admin" && (
                  <>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/products" component={Products} />
                    <Route path="/products/edit" component={EditProduct} />
                    <Route path="/chat" component={LiveChat} />
                    <Route path="/history/:orderId" component={Order} />
                  </>
                )}
                <Route path="*" component={user.role === "manager" ? LiveChat : NotFound} />
              </Switch>
            </Container>
          </>
        ) : (
          <Route path="*" component={Login} />
        )}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
