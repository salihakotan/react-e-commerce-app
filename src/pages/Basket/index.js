import React,{useRef, useState} from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Box, Button, Image, Text,
    Modal,
    ModalOverlay,FormControl,FormLabel,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,

 } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { postOrder } from '../../api'

function Basket() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [address,setAddress] = useState('')

    const {items,removeFromBasket,emptyBasket} = useBasket()
    const total = items.reduce((acc,obj) => acc + obj.price, 0)


    const handleSubmitForm = async() => {
        const itemIds = items.map((item) => item._id)
        
        const input = {
            address,
            items:JSON.stringify(itemIds)
        }

       await postOrder(input)
        
       emptyBasket()
       onClose()

       
    }

  return (
    <Box p="5">

    {items.length < 1 && <Alert status='warning'>You have not any items in your basket</Alert>}

    {
        items.length > 0 && (
            <>
            <ul style={{listStyleType:"decimal"}}>
                {
                    items.map((item) => 
                        <li key={item._id} style={{marginBottom:15}}>
                            <Link to={`/product/${item._id}`}>
                                {item.title} - {item.price} TL
                                <Image loading='lazy' htmlWidth={200} src={item.photos[0]} alt="basket image"/>
                            </Link>

                            <Button mt="2" size="sm" onClick={()=> removeFromBasket(item._id)}  colorScheme='pink'>Remove from basket</Button>
                        </li>
                    )
                }
            </ul>


                <Box mt="10">
                    <Text fontSize="22">Total: {total} TL</Text>
                </Box>


                <Button onClick={onOpen} mt="2" size="sm" colorScheme='green'>Order</Button>

                <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea value={address} onChange={(e) => setAddress(e.target.value)} ref={initialRef} placeholder='Address' />
            </FormControl>

          
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmitForm} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

            </>
        )
    }

    </Box>
  )
}

export default Basket