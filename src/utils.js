function formatDate(dateString) {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    const addZero = (num) => {
        if (num < 10) {
            return '0' + num;
        }

        return num;
    };

    day = addZero(day);
    month = addZero(month);

    return `${day}.${month}.${year}`;
}

export {formatDate};