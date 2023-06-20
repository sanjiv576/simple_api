const average = (numbers) =>{
    const total = numbers.reduce((acc, n) => acc + n, 0)
    return numbers.length === 0 
    ? 0 
    : total / numbers.length
}

module.exports = {average}