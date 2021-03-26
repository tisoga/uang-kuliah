import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalSuccess = (title, msg) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        icon: 'success',
        title: title,
        html: <p>{msg}</p>
    })
}

export default ModalSuccess