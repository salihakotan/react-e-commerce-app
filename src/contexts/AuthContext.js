import { useEffect,useState,createContext, useContext } from "react";
import { fetchLogout, fetchMe } from "../api";
import {  Flex,Spinner } from "@chakra-ui/react";


const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loggedIn,setLoggedIn] = useState(false)
    const [loading,setLoading] = useState(true)



    useEffect(()=> {
        (async()=> {
            try {
               const me = await  fetchMe()


                setUser(me)
                setLoggedIn(true)
                setLoading(false)

               console.log("me",me)
            } catch (error) {
                
                setLoading(false)
            }
        })()
    },[])


    const login = (data) => {
        setUser(data.user)
        setLoggedIn(true)
        

        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token',data.refreshToken)
    }
        

    const logout = async(callback) => {
        setLoggedIn(false)
        setUser(null)
        

        await fetchLogout()

        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")

        callback()
    }

    const values = {
        user,loggedIn,
        login,logout
    }


    if(loading) {
       return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner color="red.500" emptyColor="gray.200" size="xl" thickness="4px" speed="0.65s"/>
    </Flex>
       )
    }


    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}


const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}


