module.exports.hello = function() {
    console.log('hello world.')
    return "hoge,fuga"
}

const errMsg = '【入力値がおかしいです】\n振る回数を10回以下にする、\nもしくはフォーマットを「1d3」のようにしてください。'

module.exports.roleDice = function (inputDice) {
    console.log('入力値は 「' + inputDice + '」');
    if (!checkInput(inputDice)) {
        return errMsg;
    }
    return roleDice(inputDice);
}

function checkInput(inputDice) {

    const maxRollDice = 10;

    if (!inputDice.includes('D') && !inputDice.includes('d')) {
        console.log("d or D 入ってない");
        return false;
    }

    const splitDice = inputDice.split(/D|d/g);
    if (2 !== splitDice.length) {
        console.log("d or D が2つ以上");
        return false;
    }

    if (!splitDice[0] || !splitDice[1]) {
        console.log("dの前か後ろに値がない");
        return false;
    }

    if (isNaN(Number(splitDice[0])) || isNaN(Number(splitDice[1]))) {
        console.log("dの前後数字じゃない");
        return false;
    }

    if (Number(splitDice[0]) > maxRollDice) {
        console.log("10回より多く振りません");
        return false;
    }

    return true;

}

function roleDice(inputDice) {
    const splitDice = inputDice.split(/D|d/g);
    const rollCount = splitDice[0];
    const numberOfFaces = splitDice[1];
    const minDiceEyes = 1;
    let results = [];

    for (let index = 0; index < rollCount; index++) {
        let result = Math.floor( Math.random() * (numberOfFaces - minDiceEyes + 1) + minDiceEyes);
        results.push(index + 1 + '回目 : ' + result);
    }
    // Stringで返却する。
    return results.join(`\n`);
}


