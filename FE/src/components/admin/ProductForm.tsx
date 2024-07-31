import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "./ImageUploader";
import { Category } from "../../interfaces/Category";
import { ProductContext } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";
import productSchema from "../../utils/productSchema";
import instance from "../../api";

const ProductForm = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([] as Category[]);
  const { handleProduct } = useContext(ProductContext);
  const [cateSelected, setCateSelected] = useState({} as Category);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const [productImage, setProductImage] = useState<string>("");

  const handleImageChange = (newImage: string) => {
    setProductImage(newImage);
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        setCateSelected(data.data.category);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  const onSubmit = async (product: Product) => {
    try {
      const updatedProduct = { ...product, thumbnail: productImage };
      handleProduct(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/categories");
      setCategories(data.data);
    })();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit" : "Add"} Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-semibold mb-1"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            {...register("category")}
          >
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                selected={cateSelected._id === category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <ImageUploader
            initialImage={productImage}
            onImageChange={handleImageChange}
          />
        </div>
        {productImage && (
          <img
            src={productImage}
            alt="Product Thumbnail"
            className="mb-4 max-w-full h-auto rounded-md"
          />
        )}
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          type="submit"
        >
          {id ? "Edit" : "Add"} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
