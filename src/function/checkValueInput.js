const checkValueInput = (item) => {
    if (!item.uang) {
        return 'uang';
    }
    else if (!item.jenis) {
        return 'jenis';
    }
    else if (!item.keterangan) {
        return 'keterangan';
    }
    else {
        return 'success';
    }
}

export default checkValueInput