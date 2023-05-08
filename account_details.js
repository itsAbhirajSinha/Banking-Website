const account1 = {
    owner: "Abhiraj Sinha"
    , movements: [200, -450, 400, 3000, -650, -130, 70, 1300]
    , pin: 1111
}
const account2 = {
    owner: "Jimmy Kimmel"
    , movements: [300, -550, 800, 1000, 650, -120, 70, 300]
    , pin: 2222
}
const account3 = {
    owner: "Van Dawson"
    , movements: [1200, -1450, 1400, 300, -1650, -130, 780, 234]
    , pin: 3333
}
const account4 = {
    owner: "Rickey Ramson"
    , movements: [-400, 450, 400, 5000, -1650, -1230, -70, 564]
    , pin: 4444
}

const accounts = [account1, account2, account3, account4]

const labelWelcome = document.querySelector('.welcome')
const inputLoginUsername = document.querySelector('.login__label')
const inputLoginPin = document.querySelector('.password__label')
const btnLogin = document.querySelector('.login')
const containerApp = document.querySelector('.app')
const labelBalance = document.querySelector('.balance__value')
const btnTransfer = document.querySelector('.form__btn--transfer');
const labelDate = document.querySelector('.date')
const containerMovements = document.querySelector('.movement')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputTransferTo = document.querySelector('.form__input--to')
const tt = document.querySelector('.tt')

// movements
const displayMovements = function (movements) {
    containerMovements.innerHTML = ''
    tt.innerText = "Transactions"
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'

        const html = `
      <div class="movement__row">
     <div class="movement__type movement__type--${type}">${i + 1} ${type}</div>
    
     <div class="movement__value">Rs ${mov}</div>
   </div>`

        containerMovements.insertAdjacentHTML('beforeend', html)
    })
}

// display balance
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((ac, mov) => {
        return ac + mov
    }, 0)

    // console.log('balance' ,balance)
    labelBalance.textContent = `Rs ${acc.balance} `
}


// dispaly current date and time
function updateTime() {
    var now = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss z");

    labelDate.textContent = now;
    setTimeout(updateTime, 1000);
}

// Creating Username
const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
    })
}
createUsername(accounts);


// Update Ui function
const updateUI = function (acc) {

    displayMovements(acc.movements);

    calcDisplayBalance(acc);

}



let currentAccount;
// Event handlers
btnLogin.addEventListener('click', function (e) {
    e.preventDefault()
    console.log("clcicked")
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back ${currentAccount.owner} `
        containerApp.style.opacity = 100;

        updateTime();



        // clear login fields
        inputLoginUsername.value = inputLoginPin.value = "";

        updateUI(currentAccount)


    }
})

// Transfer Money
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault()

    const amount = Number(inputTransferAmount.value);
    // inputTransferTo.value 
    const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value)
    console.log(receiverAccount)
    inputTransferTo.value = inputTransferAmount.value = ''

    if (amount > 0 &&
        receiverAccount &&
        currentAccount.balance > amount &&
        receiverAccount.username !== currentAccount.username) {
        console.log("valid transfer")
        currentAccount.movements.push(-amount)
        receiverAccount.movements.push(amount)
        updateUI(currentAccount)
    }

})


