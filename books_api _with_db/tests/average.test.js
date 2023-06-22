const {average} = require('../for_test')

describe('average test', () => {
    test('test of [1,2,3]', () => {
        const result = average([1,2,3])
        expect(result).toBe(2)
    })
    
    // executes this test only , skip
    test.only('test of [1]', () => {
        expect(average([1])).toBe(1)
    })
    
    test('test of []', () => {
        expect(average([])).toBe(0)
    })
})

