const convertDate = (oldDate, ts = false) => {
    const objDate = new Date(oldDate);
    if (ts) {
        return objDate
    }
    else {
        const date = objDate.getDate() > 9 ? objDate.getDate() : '0' + objDate.getDate();
        const month = objDate.getMonth().length < 2 ? objDate.getMonth() : '0' + (objDate.getMonth() + 1);
        const year = objDate.getFullYear();
        return `${date}-${month}-${year}`;
    }
}

export default convertDate