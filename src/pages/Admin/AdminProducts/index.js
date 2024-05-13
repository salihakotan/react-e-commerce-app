import { Flex, Text } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { deleteProduct, fetchAllProducts } from '../../../api'
import {Button, Popconfirm, Table} from "antd"
import { Link } from 'react-router-dom'

function AdminProducts() {

  const queryClient = useQueryClient()

    const {data,isLoading,isError,error} = useQuery({
      queryKey: ["admin:products"],
      queryFn:fetchAllProducts
    })

     const deleteMutation = useMutation({
      mutationFn:deleteProduct,
      onSuccess: ()=> {
        queryClient.invalidateQueries("admin:products")
      }
      // refetchQueries: ["admin:products"]
      
     })

    
    const columns = useMemo(()=> {
      return [{
        title:"Title",
        dataIndex:"title",
        key:"title"
      },
      {
        title:"Price",
        dataIndex:"price",
        key:"price"
      },
      {
        title:"Created At",
        key:"createdAt",
        dataIndex:"createdAt"
      },
      {
        title:"Action",
        key:"action",
        dataIndex:"action",
        render: (text,record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>

            <Popconfirm 
            onCancel={()=> console.log("cancel")}
            onConfirm={()=> {
              deleteMutation.mutate(record._id, {
                onSuccess: ()=> {
                  console.log("success")
                 
                }
              })
              
            }}
            okText="Yes"
            cancelText="No"
            title="Are you sure"
            placement="left"
            >
              <a href='#/' style={{marginLeft:"10px"}}>Delete</a>
            </Popconfirm>
          </>
        )
      }
    
    ]
    }, [])


    if(isLoading) return <div>Loading...</div>

    if(isError) return <div>{error.message}</div>



      console.log(data)

  return (
    <div>

     <Flex justifyContent="space-between" alignItems="center">
     <Text fontSize="2xl">Products</Text>
      <Link to="/admin/products/new">
        <Button>New</Button>
      </Link>
     </Flex>

        <Table dataSource={data} columns={columns} rowKey="_id"></Table>

    </div>
  )
}

export default AdminProducts