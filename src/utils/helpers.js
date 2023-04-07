const formatUsd = (number) => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
   }).format(number).replace('$', '$ ');
}

const formatTL = (number) => {
   return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
   }).format(number).replace('₺', '₺ ');
}

const setToken = (key, value) => {
   document.cookie = `${key}=${value}`
}

export { formatUsd, setToken }