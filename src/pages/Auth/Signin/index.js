import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Input,
  Button,
  FormControl,
  Alert,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signin() {


  const navigate = useNavigate()
  const {login} = useAuth()


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        console.log(loginResponse)
        login(loginResponse)

          navigate("/profile")

      } catch (error) {
        bag.setErrors({general:error.response.data.message})
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt="10">
          <Box textAlign="center">
            <Heading>Signin</Heading>
          </Box>

          <Box my="5">
            {formik.errors.general && 

            <Alert status="error">
              {formik.errors.general}
            </Alert>
            }
          </Box>

          <Box my="5" textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  isInvalid={formik.touched.email && formik.errors.email}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.email}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  isInvalid={formik.touched.password && formik.errors.password}
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.password}
                />
              </FormControl>

             
              <Button mt="4" width="full" type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
