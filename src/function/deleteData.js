import axios from 'axios'

const deleteData = async (data) => {
    try {
        const id = data['id']
        delete data['id'];
        // const sample = {
        //     test: 'test'
        // }
        const res = await axios.delete(`https://api-uang-kuliah.herokuapp.com/api/data/detail/${id}`);
        return { data: 'Delete Success' }
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

export default deleteData