import Card from "../../components/Card";
import { Box, Flex, Grid, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../api";
import React from "react";

function Products() {


  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn:  fetchProductList,
    
    getNextPageParam: (lastGroup, allGroups) => 
        // lastGroup.length === 0 ? null : allGroups.length + 1,
      {  const morePagesExist = lastGroup?.length === 12;

        if(!morePagesExist) {
            return
        }
       
        return allGroups.length + 1
}
    
  })

  const contentt = data && data.pages ? data.pages.flatMap((pagex => pagex)): [];



  if (status === "loading") return "Loading...";

  if (status === "error") return "En error has occured: " + error.message;

  return (
    <div>
    {
        
        <Grid m="10" templateColumns="repeat(3,1fr)">

       { 
        contentt.map((item) => 
            <Card key={item._id} item={item} />
        )}

        </Grid>

   

    }

    <Flex mt="10" justifyContent="center">
        <Button
        isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
