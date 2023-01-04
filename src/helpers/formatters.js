export function currency(value) {
    const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'});
    return formatter.format(value).replace("LKR", "Rs.")
  };

export function date(date) {
const display = new Date(date)
return display.toLocaleDateString('en-GB');
}