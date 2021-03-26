import axios from 'axios'

const editData = async (data) => {
    try {
        const id = data['id']
        delete data['id'];
        // const sample = {
        //     test: 'test'
        // }
        const res = await axios.patch(`https://api-uang-kuliah.herokuapp.com/api/data/detail/${id}`, data);
        return { data: res.data }
    }
    catch (error) {
        if (error.response) {
            return { error: error.response.data }
        }
        else if (error.request) {
            return { error: 'Periksa Koneksi Anda atau Coba beberapa saat lagi' }
        }
        else {
            return { error: 'Terjadi Kesalahan' }
        }
    }
}

export default editData