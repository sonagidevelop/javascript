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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html)



  })
}


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc += cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
}


const calcDisplaySummary = function (acc) {
  const income = acc.movements.filter(mov => mov > 0).reduce((acc, cur) => acc += cur)
  const outcome = acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc += cur)
  labelSumIn.textContent = `${income}€`
  labelSumOut.textContent = `${Math.abs(outcome)}€`
}


const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })

}
createUsernames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
}




//login implement
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();


  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {



    //Display UI and Welcome message
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur();
    //Display movements
    displayMovements(currentAccount.movements);
    //Display balance
    calcDisplayBalance(currentAccount);
    //Display summary
    calcDisplaySummary(currentAccount);
    console.log('LOGIN');
  }



})

//transfer implement
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0
    && receiverAcc
    && amount <= currentAccount.balance
    && receiverAcc !== currentAccount) {
    currentAccount.movements.push(Number(amount) * -1);
    updateUI(currentAccount);
    receiverAcc.movements.push(Number(amount));

  }
})

//loan implementing
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

})



//account closing implement
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value == currentAccount.username &&
    Number(inputClosePin.value) == currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = '';
})

let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})










//////filter
/*
const deposits = account1.movements.filter(function (mov) {
  return mov > 0;
})

const depositsFor = [];
for (const mov of account1.movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor)

const withdrawals = account1.movements.filter(mov => mov < 0);
console.log(withdrawals);
*/



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

//accumulator -> snowball
// const balance = account1.movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration number ${i}:${acc}`);
//   return acc + cur
// }, 0)
// console.log(balance);

/*
const balance = account1.movements.reduce((acc, cur) => acc += cur, 0)
console.log(balance);

let balance2 = 0;
for (const mov of account1.movements) balance2 += mov;
console.log(balance2);
*/
/*
//Maximum value
const findMax = account2.movements.reduce((max, cur) => max < cur ? max = cur : max = max);
console.log(findMax);
*/
/*
const calcAverageHumanAge = function (arr) {
  // const humanAge = arr.map(age => age > 2 ? 16 + age * 4 : 2 * age)
  // const adultDogs = humanAge.filter(function (age) { return age >= 18 })
  // const aveAdultDogs = adultDogs.reduce((acc, cur) => acc += cur) / adultDogs.length

  const aveAdultDogs = arr
    .map(age => age > 2 ? 16 + age * 4 : 2 * age)
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  // arr.filter(age => age > 2).length


  return aveAdultDogs
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));



const giral = Math.trunc(account1.movements.filter(mov => mov > 0).map(mov => mov * 1.1).reduce((acc, cur) => acc += cur))
console.log(giral);
*/
/*
const firstWithdrawal = account1.movements.find(mov => mov < 0)
console.log(firstWithdrawal);

console.log(accounts)
*/
// const account = accounts.find(account => account.owner == "Jessica Davis");
// console.log(account)
/*
const accountMatch = [];
for (const acc of accounts) {
  if (accountMatch.length < 1 && acc.owner == 'Jessica Davis') accountMatch.push(acc)
}

console.log(accountMatch)
*/
/*
//include
console.log(account1.movements);
console.log(account1.movements.includes(-130));

//some
const anyDeposits = account2.movements.some(mov => mov > 5000)
console.log(anyDeposits);

//every
console.log(account4.movements.every(mov => mov > 0));

//Seperate callback
const deposit = mov => mov > 0
console.log(account4.movements.every(deposit));
*/
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc, cur) => acc += cur, 0);
// console.log(overallBalance);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc += cur, 0);
console.log(overallBalance)

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc += cur, 0);
console.log(overallBalance2)
*/
/*
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

console.log(account1.movements);

//return < 0 , a,b (keep order)
//return > 0 , b,a (switch order)

account1.movements.sort((a, b) => b - a);
console.log(account1.movements)
*/
const arr = [1, 2, 3, 4, 5, 6, 7]
const x = new Array(7);
// x.fill(1);
x.fill(8, 3, 5);
console.log(x);

arr.fill(8);
console.log(arr);

//Array.from
Array.from({ length: 7 }, () => 1);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const randomDiceRoll = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1)
console.log(randomDiceRoll);


///////////집중이안돼!!
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'));

})
