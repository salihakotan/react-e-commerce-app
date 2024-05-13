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
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {


  const navigate = useNavigate()
  const {login} = useAuth()


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        console.log(registerResponse)
        login(registerResponse)

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
            <Heading>Sign Up</Heading>
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

              <FormControl>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                  type="password"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.passwordConfirm}
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

export default Signup;
