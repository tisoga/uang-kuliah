const FormButton = ({ btnStyle, text, onClickHandler }) => {
    let buttonStyle = ''
    if (btnStyle.toLowerCase() === 'primary') {
        buttonStyle = 'bg-blue-500 hover:bg-blue-700'
    }
    else if (btnStyle.toLowerCase() === 'success') {
        buttonStyle = 'bg-green-500 hover:bg-green-700'
    }
    else if (btnStyle.toLowerCase() === 'danger') {
        buttonStyle = 'bg-red-500 hover:bg-red-700'
    }
    return (
        <button className={'border border-black w-full py-2 mx-1 my-1 text-white rounded hover:text-white font-bold ' + buttonStyle} type={'button'} onClick={() => onClickHandler()}>{text}</button>
    )
}

export default FormButton