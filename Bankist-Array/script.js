'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

const inputArr = document.querySelectorAll('input')
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
])

const updateUI = account => {
  displayMovements(account.movements)
  calcDisplayBalance(account)
  calcDisplaySummary(account)
}

// to display all transactions done by a user
const displayMovements = (movement, sort = false) => {
  containerMovements.innerHTML = ''

  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement

  movs.forEach((mov, i) => {
    let type = mov > 0 ? 'deposit' : 'withdrawal'
    let html = `<div class="movements__row">
                  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                  <div class="movements__date"></div>
                  <div class="movements__value">${Math.abs(mov)} €</div>
                </div>`

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

// to display current balance of the user
const calcDisplayBalance = account => {
  account.balance = account.movements.reduce((accum, mov) => {
    return accum + mov
  }, 0)
  labelBalance.textContent = `${account.balance} €`
}

// to display summary of the user
const calcDisplaySummary = account => {
  let inn = account.movements
    .filter(mov => mov > 0)
    .reduce((accum, deposit) => accum + deposit, 0)

  let out = account.movements
    .filter(mov => mov < 0)
    .reduce((accum, deposit) => accum + deposit, 0)

  let interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((accum, int) => accum + int, 0)

  labelSumIn.textContent = `${inn} €`
  labelSumOut.textContent = `${Math.abs(out)} €`
  labelSumInterest.textContent = `${interest} €`
}

// to generate username for each user
// acc.username : 姓名缩写(Lower)
const generateUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(value => value[0])
      .join('')
  })
}

generateUsername(accounts)

// login
let currentUser
btnLogin.addEventListener('click', e => {
  e.preventDefault()
  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value)
  if (currentUser && currentUser.pin === Number(inputLoginPin.value)) {
    // if (currentUser?.pin === Number(inputLoginPin.value))
    inputLoginPin.blur()
    inputLoginPin.value = inputLoginUsername.value = ''
    labelWelcome.textContent = `Welcome back ${currentUser.owner.split(' ')[0]
      }`
    containerApp.style.opacity = '100'
    updateUI(currentUser)
  }
})

// transfer money
btnTransfer.addEventListener('click', e => {
  e.preventDefault() // 阻止浏览器默认行为，下同
  let amount = Number(inputTransferAmount.value)
  let receiver = accounts.find(acc => acc.username === inputTransferTo.value)
  if (
    receiver &&
    receiver?.username !== currentUser.username &&
    amount > 0 &&
    currentUser.balance >= amount
  ) {
    inputTransferAmount.value = inputTransferTo.value = ''
    inputTransferAmount.blur()
    receiver.movements.push(amount)
    currentUser.movements.push(-amount)
    updateUI(currentUser)
  }
})

//request loan
btnLoan.addEventListener('click', e => {
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentUser.movements.some(mov => mov >= amount * 0.1)) {
    inputLoanAmount.value = ''
    currentUser.movements.push(amount)
    updateUI(currentUser)
  }
})

// sort the movements
let sorted = false
btnSort.addEventListener('click', e => {
  e.preventDefault()
  displayMovements(currentUser.movements, !sorted)
  sorted = !sorted
})

//close account
btnClose.addEventListener('click', e => {
  e.preventDefault()
  if (
    inputCloseUsername.value === currentUser.username &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    // const index = accounts.findIndex(
    //   acc => acc.username === currentUser.username
    // )
    // accounts.splice(index, 1) // 删除该用户
    inputArr.forEach(input => input.value = '') // 清空所有 input.value
    containerApp.style.opacity = '0'
    labelWelcome.textContent = 'Log in to get started'
  }
})

