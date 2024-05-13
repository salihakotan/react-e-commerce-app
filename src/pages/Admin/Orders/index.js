import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderList } from "../../../api";
import { Table, Thead, Tr, Td, TableCaption, Th,Text, Tbody} from "@chakra-ui/react";

function Orders() {

    ////////////////////////////  ***       Array.from(data)             /////////////////////////////


  const { data,isLoading,isError,error } = useQuery({
    queryKey: ["admin:orders"],
    queryFn: fetchOrderList,
  });



    if(isLoading) return <div>Loading...</div>

    if(isError) return <div>{error.message}</div>
  

  return (
    <div>

    <Text fontSize="2xl">Orders</Text>

      <Table variant="simple" mt={7}>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
                {Array.from(data).map(item =>(  
                        <Tr key={item._id}>
                         <Td>{item.user.email}</Td>
                         <Td>{item.adress}</Td>
                         <Td isNumeric>{item.items.length}</Td>
                        </Tr>)
                    )
                }
        </Tbody>
      </Table>

    </div>
  );
}

export default Orders;
