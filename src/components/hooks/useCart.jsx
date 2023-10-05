// import { useContext } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
// import { useQuery } from "@tanstack/react-query";

// // const queryClient = new QueryClient();

// const useCart = () => {
//   const { user } = useContext(AuthContext);

//   const { refetch, data: cart = [] } = useQuery({
//     queryKey: ["cart", user?.email],
//     queryFn: async () => {
//       const response = await fetch(
//         `http://localhost:3000/carts?email=${user.email}`
//       );
//       return response.json();
//     },
//   });
//   return [cart, refetch];
// };
// export default useCart;

import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (!user || !user.email) {
        return { data: [] };
      }
      const response = await fetch(
        `http://localhost:3000/carts?email=${user?.email}`
      );
      return response.json();
    },
  });

  return [cart, refetch];
};

export default useCart;
