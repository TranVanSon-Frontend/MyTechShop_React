import { useState, useEffect } from "react";
import ProductService from "../services/ProductService";

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await ProductService.getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
