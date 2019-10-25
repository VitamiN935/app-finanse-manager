export default function currencyFilter(value, cur='RUB') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: cur
  }).format(value);
}