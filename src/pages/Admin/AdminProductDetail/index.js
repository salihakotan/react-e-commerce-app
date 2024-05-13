import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
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
import { editSchema } from "./validations";

import { message } from "antd";

function AdminProductDetail() {



  const { product_id } = useParams();

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["admin:product"],
    product_id,
    queryFn: () => fetchProduct(product_id),
  });

  

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  const handleSubmit = async(values,bag) => {
    console.log("submitting");
    message.loading({content:"Loading...", key:"product_update"})

    try {
        await updateProduct(values,product_id)
        message.success({
            content:"Product succesfully updated",
            key:"product_update",
             duration:2
    })
        

    } catch (error) {
        message.error({content:"Product does not updated", key:"product_update"})
    }

  };

  console.log("detail",data);
  console.log("idd",product_id);


  return (
    <div>
      <Text fontSize="2xl">Edit</Text>

      <Formik
        initialValues={{
          title: data.title,
          price: data.price,
          photos: data.photos,
          description: data.description,
        }}
        validationSchema={editSchema}
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

                  <Button isLoading={isSubmitting} type="submit" width="full" mt="5">Update</Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AdminProductDetail;
