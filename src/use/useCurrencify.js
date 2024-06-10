export function useCurrencify(amount) {
  // format: "+ $ 4,999.99" | "- $ 999.00"

  let posNegSymbol = ''
  if (amount > 0) posNegSymbol = '+'
  else if (amount < 0) posNegSymbol = '-'

  const currencySymbol = '$',
        amountPositive = Math.abs(amount),
        amountFormatted = amountPositive.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigis: 2
        })

  return `${ posNegSymbol } ${ currencySymbol } ${ amountFormatted }`
}