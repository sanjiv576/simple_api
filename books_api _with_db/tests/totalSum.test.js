const {totalSum} = require('../for_test');


describe('test for counting total sum', () => {
    test('test of [4,3,2,4]', () => {
        expect(totalSum([4,3,2,4])).toBe(13)
    })

    test('test of [4,3]', () => {
        expect(totalSum([4,3])).toBe(7)
    })

    test('test of []', () => {
        expect(totalSum([])).toBe(0)
    })
})