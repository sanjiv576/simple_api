const average = (numbers) =>{
    const total = numbers.reduce((acc, n) => acc + n, 0)
    return numbers.length === 0 
    ? 0 
    : total / numbers.length
}


const totalSum = (array) => {
    return array.reduce((prev, curr) => prev + curr, 0);
}

module.exports = {average, totalSum}