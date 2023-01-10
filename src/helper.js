export const NUM_ROLLS = 2

export const randomDice = function (arr) {
    return arr.map(el => {
        if (el.isFreeze) return el;
        return { ...el, num: el.num = Math.floor(Math.random() * 6 + 1) }
    })
}

export const totalOneNumber = function (dice, value) {
    return dice.filter(el => {
        if (el.num === +value) return el.num
    }).reduce((accu, el) => accu + el.num, 0)
}

const frequency = function (dice, value) {
    const map = new Map();
    for (let el of dice) {
        map.set(el.num, (map.get(el.num) || 0) + 1)
    }
    return Array.from(map.values());
}

export const threeOrFourOfKind = function (dice, value) {
    const freq = frequency(dice);
    return freq.some(el => el >= value) ? dice.reduce((accu, el) => accu + el.num, 0) : 0
}

export const fullHouse = function (dice, value) {
    const freq = frequency(dice);
    return freq.includes(2) && freq.includes(3) ? value : 0
}

export const smallStraight = function (dice, value) {
    let arr = [];
    for (let el of dice) arr.push(el.num)
    const set = new Set(arr)

    if (set.has(2) && set.has(3) && set.has(4) && (set.has(1) || set.has(5)))
        return value;

    if (set.has(3) && set.has(4) && set.has(5) && (set.has(2) || set.has(6)))
        return value

    return 0;
}

export const largeStraight = function (dice, value) {
    let arr = [];
    for (let el of dice) arr.push(el.num)
    const set = new Set(arr)
    return set.size === 5 && (!set.has(1) || !set.has(6)) ? value : 0
}

export const yahtzee = function (dice, value) {
    const freq = frequency(dice)
    return freq[0] === 5 ? value : 0;
}

// for (let el of m) console.log(el)
// function test(arr) {
//     let a = [];
//     for (var i = 1; i < arr.length; i++) {
//         if (arr[i - 1] === arr[i])
//             a.push(arr[i])
//         console.log('a is', a)
//     }
//     return a;
// }

// // console.log(test([1, 3, 3, 3, 5]))

// let arr = [1, 3, 3, 5];
// let result = [];
// for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//         console.log('arr i', arr[i], 'arr j', arr[j])
//         if (arr[i] == arr[j]) {
//             // console.log(arr[i])
//             result.push(arr[j])
//         }

//     }
// }
// console.log(result)