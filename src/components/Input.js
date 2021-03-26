import { forwardRef } from "react";
import DatePicker from "react-datepicker";

const Input = ({ inputType, name, value, setter }, ref) => {
    const onChangeHandler = (e) => {
        if (inputType === 'tanggal') {
            setter({
                ...value, [name]: e
            })
        }
        else {
            setter({
                ...value, [name]: e.target.value
            })
        }
    }
    if (inputType === 'tanggal') {
        return (
            <DatePicker
                selected={value[name]}
                className='bg-white border border-black rounded my-2 py-2 px-1 w-full'
                onChange={onChangeHandler}
                maxDate={new Date()}
                dateFormat={'dd/MM/yyyy'}
                ref={ref}
            />
        )
    }
    return (
        <input className='bg-white border border-black rounded my-2 py-2 px-1 w-full' type={inputType} value={value[name]} onChange={onChangeHandler} ref={ref} />
    )
}

export default forwardRef(Input)