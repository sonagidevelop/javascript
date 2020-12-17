'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''

  movements.forEach(function (mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html)



  })
}
displayMovements(account1.movements)

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    console.log(acc.username);
  })

}

createUsernames(accounts);







/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//slice
console.log(
  arr.slice(2),
  arr.slice(2, 4),
  arr.slice(-2),
  arr.slice(1, -2),
  arr.slice() //shallow copy를 얻을 수도 있다.
)
*/
//splice
/*
console.log(
  arr.splice(2),  //2,3,4번째를 떼어내어 지워버림
  arr.splice(2,2) //2번째부터 2개를 지움   즉 두 번째 parameter가 끝나는 지점이 아닌 '개수'를 의미함

);
*/
/*
//reverse
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
// console.log(arr2);

//concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);   //concat과 같은 결과

//Join
console.log(letters.join('-'));


//////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////for of
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {    //counting 을 하고 싶을때, entries() 이용
  if (movement > 0) {
    console.log(`Movement ${i + 1}:you deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}:you withdrew ${Math.abs(movement)}`)
  }
}

///////forEach
console.log('--------For Each----------')
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}:you deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}:you withdrew ${Math.abs(mov)}`)
  }
})


////////////////////////////
///map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`)
})

//set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}`)
})
*/


//coding challenge
/*
const dogsJulia = [9, 16, 6, 8, 3];
const dogsKate = [10, 5, 6, 1, 4];

const checkDogs = function (arr1, arr2) {
  const newArr1 = arr1.slice(1, 3);
  const mergedArr = [...newArr1, ...arr2];
  mergedArr.forEach(function (dog, i) {
    const judge = Number(dog) >= 3 ? ` is an adult, and is ${dog} years old` : ' is still a puppy'

    console.log(`Dog number ${i + 1}` + judge);
  })

}

checkDogs(dogsJulia, dogsKate);
*/
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const exchanged = movements.map(function(mov){
//   return mov * eurToUsd;
// })

const exchanged = movements.map(mov => mov * eurToUsd)
console.log(exchanged);

//map 안 쓰고 똑같이 하기
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

//forEach와 map으로 같은 기능을 구현 할 수 있다.
const movementsDescription = movements.map((mov, i) => {
  //화살표 함수 + 삼항 연산자 + map
  return `Movement ${i + 1}:you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;



  // if (mov > 0) {
  //   `Movement ${i + 1}:you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
  //   return `Movement ${i + 1}:you deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}:you withdrew ${Math.abs(mov)}`;
  // }
})

console.log(movementsDescription)
*/
