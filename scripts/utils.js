export function convertDate(dateStr) {
    const [datePart] = dateStr.split(', ');
    const [_day, month, year] = datePart.split('.').map(Number);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const formattedMonth = monthNames[month - 1];
    return `${formattedMonth}  ${year}`;
}
