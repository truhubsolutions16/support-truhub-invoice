export function toWords(amount: number): string {
  // simple implementation for amounts up to 999999
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine']
  const teens = ['Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']

  function chunk(num: number): string {
    let str = ''
    if (num >= 100) {
      str += ones[Math.floor(num/100)] + ' Hundred '
      num = num % 100
    }
    if (num >= 10 && num < 20) {
      str += teens[num-10] + ' '
    } else if (num >= 20) {
      str += tens[Math.floor(num/10)] + ' '
      if (num % 10) str += ones[num%10] + ' '
    } else if (num > 0) {
      str += ones[num] + ' '
    }
    return str
  }

  if (amount === 0) return 'Zero'
  const parts = [] as string[]
  const lakh = Math.floor(amount / 100000)
  if (lakh) {
    parts.push(chunk(lakh) + 'Lakh')
    amount = amount % 100000
  }
  const thousand = Math.floor(amount / 1000)
  if (thousand) {
    parts.push(chunk(thousand) + 'Thousand')
    amount = amount % 1000
  }
  if (amount) parts.push(chunk(amount))
  return parts.join(' ').trim() + ' Only'
}
