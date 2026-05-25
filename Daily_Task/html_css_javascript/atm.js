let balance = 10000;
let showBalance = document.getElementById("balance");
let amount = document.getElementById("money");
let deposit = document.getElementById("deposit");
let withdraw = document.getElementById("withdraw");
let msg = document.getElementById("msg");

showBalance.textContent = "Balance: $" + balance;
deposit.addEventListener("click", () => {
    if(amount.value <= 0){
        msg.textContent = "Invalid Amount";
    }else{
        balance += Number(amount.value);
        msg.textContent = "Deposit Successful";
    }
    showBalance.textContent = "Balance: $" + balance;
    amount.value = "";
});

withdraw.onclick = () =>{
    if(amount.value <= 0 || amount.value > balance){
        msg.textContent = "Invalid Amount";
    }else{
        balance -= Number(amount.value);
        msg.textContent = "Withdraw Successful";
    }
    showBalance.textContent = "Balance: $" + balance;
    amount.value = "";
}