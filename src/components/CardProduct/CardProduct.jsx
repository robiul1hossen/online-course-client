import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const CardProduct = () => {
  const [carts, setCarts] = useState([]);
  const [cart] = useCart();
  console.log(cart);

  useEffect(() => {
    fetch("http://localhost:3000/carts")
      .then((res) => res.json())
      .then((data) => setCarts(data));
  }, []);
  console.log(carts);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Price</th>
            <th>Details</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={cart.img} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{cart.title}</div>
                  </div>
                </div>
              </td>
              <td>{cart.instructorName}</td>
              <td>${cart.price}</td>
              <th>
                <Link to={`/courseDetails/${cart._id}`}>
                  {" "}
                  <button className="btn btn-ghost btn-xs">Details</button>
                </Link>
              </th>
              <th>
                <Link>
                  {" "}
                  <button className="btn btn-ghost btn-xs">Enroll Now</button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardProduct;
