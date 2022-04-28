var f = require('./dice.js');
//console.log(f.hello());

// 正常系
console.log(f.roleDice('3d4'));

console.log(f.roleDice('3D4'));

console.log(f.roleDice('10d4'));

// 異常系
console.log(f.roleDice('d4'));  // dの前に値無し

console.log(f.roleDice('3d'));  // dの後ろに値無し

console.log(f.roleDice('1da'));  // dの後ろが数字じゃない

console.log(f.roleDice('ad4'));  // dの前が数字じゃない

console.log(f.roleDice('1aD4')); // dの前に数字と文字列が入ってる。

console.log(f.roleDice('1Da4')); // dの後ろに数字と文字列が入ってる。

console.log(f.roleDice('11d4')); // dの後ろに数字と文字列が入ってる。
