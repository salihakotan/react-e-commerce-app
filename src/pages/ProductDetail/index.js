import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api'
import { Box,Text,Button } from '@chakra-ui/react'
import moment from 'moment'
import ImageGallery from "react-image-gallery"
import { useBasket } from '../../contexts/BasketContext'

function ProductDetail() {

  const {product_id} =useParams()

  const {addToBasket,items} = useBasket()


    const {isLoading,isError,data} = useQuery({
      queryKey:["product",product_id],
      queryFn: () => fetchProduct(product_id)
    })

    if(isLoading) return "Loading..."

    if(isError) return "An error has occured"  + isError.message
    
    console.log(data)

    const findBasketItem = items.find((item) => item._id === product_id)
    const images = data.photos.map((url) => ({original:url}))
  

  return (
    <div>

    <Button colorScheme={findBasketItem ? "pink" : "green"} onClick={()=> addToBasket(data,findBasketItem)}>
      {
        findBasketItem ? "Remove from basket" : "Add to basket"
      }
    </Button>
    <Text as="h2" fontSize="2xl">{data.title}</Text>

    <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>

    <p>
      {data.description}
    </p>

    <Box margin="10">
      <ImageGallery items={images}/>
    </Box>



    </div>
  )
}

export default ProductDetail