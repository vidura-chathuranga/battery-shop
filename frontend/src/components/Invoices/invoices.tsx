import { useQuery } from "@tanstack/react-query";
import CartAPI from "../../API/cartAPI/cart.api";

const Invoices=()=>{

    const { data, isLoading, isError, refetch } = useQuery(["stockData"], () => {
        return CartAPI.getAllCart().then((res) => res.data);
      });


};

export default Invoices;