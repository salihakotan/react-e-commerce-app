import * as yup from "yup"

const validations = yup.object().shape({
        
    email:yup.string().email("Geçerli email girin").required("Zorunlu alan"),
    password:yup.string().min(5,"min 5 karakter").required("Zorunlu alan"),
    passwordConfirm:yup.string().oneOf([yup.ref("password")], "Parolalar uyuşmuyor").required("Zorunlu alan")

})

export default validations;