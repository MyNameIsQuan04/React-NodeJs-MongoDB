import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";
import { Category } from "../../interfaces/Category";
import categorySchema from "../../utils/categorySchema";
import instance from "../../api";

const CategoryForm = () => {
  const { id } = useParams();
  const { handleCategory } = useContext(CategoryContext);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/categories/${id}`);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <form
        onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}
      >
        <h1 className="text-2xl font-bold mb-4">
          {id ? "Edit" : "Add"} Category
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name", { required: true })}
          />
          {errors.name?.message && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            type="submit"
          >
            {id ? "Edit" : "Add"} Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
