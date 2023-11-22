export const formatCurrencyVND = (number : number) => {
    const formatter = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
  
    return formatter.format(number);
  };