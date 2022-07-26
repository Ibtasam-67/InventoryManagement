import "./App.css";
import Header from "../src/Components/header/header";
import ProductForm from "../src/Components/productForm/productForm";
import StoreForm from "../src/Components/storeForm/storeForm";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../src/Components/landingPage/landingPage";
import ProductTable from "../src/Components/productTable/productTable";
// import ErrorBoundary from "../src/Components/errorBoundary/errorBoundary";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <ErrorBoundary>
      </ErrorBoundary> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/storeform" element={<StoreForm />} />
      </Routes>
      <Routes>
        <Route path="/productform/:id" element={<ProductForm />} />
      </Routes>
      <Routes>
        <Route path="/producttable/:id" element={<ProductTable />} />
      </Routes>
    </div>
  );
}

export default App;
