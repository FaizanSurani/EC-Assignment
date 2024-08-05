import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import axios from "axios";

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const repsonse = await axios.get(
        "https://intern-task-api.bravo68web.workers.dev/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(repsonse.data.products);
      setProducts(repsonse.data.products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchEmail = async () => {
      const response = await axios.get(
        "https://intern-task-api.bravo68web.workers.dev/api/me"
      );
      setEmail(response.data.user.sub);
    };

    fetchEmail();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexofLastProduct = page * productsPerPage;
  const indexofFirstProduct = indexofLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexofFirstProduct,
    indexofLastProduct
  );

  const paginate = (pageNumber) => setPage(pageNumber);

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <h2 className="text-center text-4xl font-bold mb-4 p-4">
            Product Listing
          </h2>
          <p className="mb-4 text-center">Logged in as: {email}</p>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProducts.map((items) => (
              <ProductItem id={items.id} title={items.title} url={items.url} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({
              length: Math.ceil(filteredProducts.length / productsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 border roundex mx-1 ${
                  index + 1 === page ? "bg-blue-500 text-white" : "bg-white"
                }`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
