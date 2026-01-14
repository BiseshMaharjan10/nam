import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteUser, getallUser } from "../services/Api";
import { useNavigate } from "react-router-dom";

const AdminDash = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getallUser();
        if (response?.data?.success) {
          setData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try{
      const respose = await deleteUser(id);
      if(respose?.data?.success){
        setData(prevData => prevData.filter( user => user.id !== id));
        return toast.success(respose?.data?.message);
      }
      else{
        return toast.error(respose?.data?.message);
      }
    }catch(error){
      toast.error(error?.respose?.message);

    }

  }

  const handleEdit =(id)=>{
    navigate(`/edituser/${id}`)
  }

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading users...</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              S.N
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((user, index) => (
              <tr
                key={user._id || index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/edituser/${user.id}`)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md 
                                hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>{
                        handleDelete(user.id)
                        
                        console.log(user.id)
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
};

export default AdminDash;