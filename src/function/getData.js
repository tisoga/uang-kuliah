import axios from 'axios';

const getData = async () => {
    try {
        let total = 0;
        const res = await axios.get('https://api-uang-kuliah.herokuapp.com/api/data/');
        res.data.forEach((item, index) => {
            if (item.jenis.toLowerCase() === 'd') {
                total += item.uang;
            }
            else {
                total -= item.uang;
            }
            res.data[index] = {
                ...res.data[index], total: total
            }
        })
        return { data: res.data };
    }
    catch (error) {
        return { error: 'error' }
    }
}

export default getData