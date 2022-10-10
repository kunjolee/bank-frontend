import { useState, ChangeEvent } from 'react'
// should receive always an object
export const useForm = <T extends Object> (initState: T) => {
    const [form, setForm] = useState( initState );


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }   

    return {
        form,
        handleChange,
        ...form
    }

}