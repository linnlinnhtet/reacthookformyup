import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const Form = () =>{
    const schema = yup.object().shape({
        fullName: yup.string().required("Your full name is required."),
        email: yup.string().email().required("Your email is required."),
        age: yup.number().positive().integer().min(18).required("Your age is required."),
        password: yup.string().min(4).max(20).required("Your password is required."),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password don't match.").required()
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) =>{
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full Name..." {...register("fullName")}/>
            <p style={{color:"red"}}>{errors.fullName?.message}</p>
            <input type="email" placeholder="Email..." {...register("email")}/>
            <p style={{color:"red"}}>{errors.email?.message}</p>
            <input type="number" placeholder="Age..." {...register("age")}/>
            <p style={{color:"red"}}>{errors.age?.message}</p>
            <input type="password" placeholder="Password..." {...register("password")}/>
            <p style={{color:"red"}}>{errors.password?.message}</p>
            <input type="password" placeholder="Confirm Password..." {...register("confirmPassword")}/>   
            <p style={{color:"red"}}>{errors.confirmPassword?.message}</p>
            <input type="Submit" />
        </form>
    )
}