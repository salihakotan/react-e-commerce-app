import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, newProduct, updateProduct } from "../../../api";
import { FieldArray, Formik } from "formik";
import {
    Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { newProductSchema } from "./validations";

import { message } from "antd";

function NewProduct() {

    const queryClient = useQueryClient()

    const newProductMutation = useMutation({
        mutationFn:newProduct,
        onSuccess: ()=> {
            queryClient.invalidateQueries("admin:products")
        }
    })


  

  const handleSubmit = async(values,bag) => {

    const newValues = {
        ...values,
        photos: JSON.stringify(values.photos)
    }
    console.log("submitting");
   
    message.loading({content:"loading...",key:"new_product"})

        try {
            
            newProductMutation.mutate(newValues,{
                onSuccess: ()=> {
                    console.log("success")

                    message.success ({
                        content:"product added",
                        key:"new_product",
                        duration:2
                    })
                }
            })

        } catch (error) {
            message.error({content:"error",key:"new_product"})
        }

  };


  return (
    <div>
      <Text fontSize="2xl">New Product</Text>

      <Formik
        initialValues={{
          title: "test",
          price: "333",
          photos: [],
          description: "zzzzzz",
        }}
        validationSchema={newProductSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          errors,
          values,
          isSubmitting,
          touched,
          handleBlur,
        }) => (
          <>
            <Box>
              <Box mt="10">
                <form onSubmit={handleSubmit}>


                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input 
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    disabled={isSubmitting}
                    isInvalid={touched.title && errors.title}
                     />

                    {touched.title && errors.title && (
                        <Alert height="30px" status="error">{errors.title}</Alert>
                    )}

                  </FormControl>

                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea 
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    disabled={isSubmitting}
                    isInvalid={touched.description && errors.description}
                     />

                    {touched.description && errors.description && (
                        <Alert height="30px" status="error">{errors.description}</Alert>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Input 
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    disabled={isSubmitting}
                    isInvalid={touched.price && errors.price}
                     />

                    {touched.price && errors.price && (
                        <Alert height="30px" status="error">{errors.price}</Alert>
                    )}

                  </FormControl>

                  <FormControl>
                    <FormLabel>Photos</FormLabel>
                        <FieldArray 
                            name="photos"
                            render={(arrayHelpers) => (

                                <div>

                                    {
                                        values.photos && values.photos.map((photo,index)=> (
                                            <div key={index}>
                                                <Input
                                                    name={`photos.${index}`}
                                                    value={photo}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                    width="3xl"

                                                />

                                                <Button ml="5" onClick={()=> arrayHelpers.remove(index)} colorScheme="red">Remove</Button>
                                            </div>
                                        ))
                                    }

                                    <Button onClick={()=> arrayHelpers.push('')}>Add a photo</Button>

                                </div>
                            )}

                        />
                  </FormControl>

                  <Button isLoading={isSubmitting} type="submit" width="full" mt="5">Add</Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
