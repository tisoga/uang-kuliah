import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalError = (title, msg) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        icon: 'error',
        title: title,
        html: msg
    })
}

export default ModalError