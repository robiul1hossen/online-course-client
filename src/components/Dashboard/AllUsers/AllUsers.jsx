import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (user) => {
    console.log(user._id);
    fetch(`http://localhost:3000/users/admin/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is removed`,
            showConfirmButton: false,
            timer: 1500,
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
      </div>
    </div>
  );
};

export default AllUsers;
