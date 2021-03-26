import axios from 'axios'

const newData = async (data) => {
    try {
        delete data['id'];
        data = {
            ...data, tanggal: data['tanggal'].getTime()
        }
        // console.log(data)
        // const sampleData = {
        //     "uang": 900,
        //     "keterangan": "Sample Data",
        //     "jenis": "D",
        //     "tanggal": 1614589903000
        // }
        const res = await axios.post('https://api-uang-kuliah.herokuapp.com/api/data/add', data);
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

export default newData