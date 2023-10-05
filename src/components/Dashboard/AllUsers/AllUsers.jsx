import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [, refetch] = useCart();

  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);
  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUsers();
  }, []);

  const handleDelete = (user) => {
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/admin/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", `${user.name} has removed`, "success");
            }
          });
      }
    });
  };

  const handleChangeRole = (user) => {
    const roleData = { userId: user._id, role: user.role };
    fetch(`http://localhost:3000/users/admin/${roleData}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roleData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} in an ${user.role} now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        {users.length > 0 ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th> Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={""} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <>admin</>
                    ) : (
                      <Link to={``}>
                        <button
                          onClick={() => handleChangeRole(user)}
                          className="btn btn-ghost btn-xs text-2xl">
                          <FaUserShield></FaUserShield>
                        </button>
                      </Link>
                    )}
                  </td>
                  <td>
                    <Link>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-xl">
                        <ImCross></ImCross>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="flex justify-center items-center text-2xl font-bold">
            No Users In This List
          </h2>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
