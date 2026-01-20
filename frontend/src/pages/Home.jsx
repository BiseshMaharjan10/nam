import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { createProduct, getAllProduct } from '../services/Api';

const Home = () => {

    const [data,setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        rate: ""
    });
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData); // send to backend here

        setFormData({ name: "", quantity: "", rate: "" });
        setShowForm(false);
    };

    const fetchData = async() => {
        try {
            const response = await getAllProduct();
            if (response?.data?.success) {
                setData(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            return toast.error(error.message);
        }
    }

    const addProduct = async() => {
        try {
            const dataToSubmit = {
                productName : formData.name,
                quantity : formData.quantity,
                rate : formData.rate
            }
            const response = await createProduct(dataToSubmit);
            if (response?.data?.success) {
                window.location.reload();
                return toast.success("Product Added Sucessfully!!");
            } else {
                return toast.error(response.data.message);
            }
        } catch (error) {
            return toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

   return (
    <div className="overflow-x-auto">
        {/* Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md 
                     hover:bg-blue-700 transition-colors m-5"
        >
          + Add Product
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="number"
                name="rate"
                placeholder="Rate"
                value={formData.rate}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={()=>{
                    addProduct();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              S.N
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Rate
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((product, index) => (
              <tr
                key={product._id || index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {product.productName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.rate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        //navigate(`/edit/${product.id}`)
                      }}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md 
                                hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>{
                        //handleDelete(product.id)
                      }}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md 
                                hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home