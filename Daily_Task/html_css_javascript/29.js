let balance = 10000;
let choice = prompt(
    "ATM:\n" +
    "1. Balance Check\n" +
    "2. Deposit\n" +
    "3. Withdraw\n" +
    "Enter your choice (1/2/3):"
);
choice = Number(choice);
if (choice === 1) {
    alert("Your Current Balance is: " + balance);
} 
else if (choice === 2) {
    let depositAmount = Number(prompt("Enter amount to deposit:"));
    balance = balance + depositAmount;
    alert("New Balance: " + balance);
} 
else if (choice === 3) {
    let withdrawAmount = Number(prompt("Enter amount to withdraw:"));
    balance = balance - withdrawAmount;
    alert("Remaining Balance: " + balance);
} 
else {
    alert("Invalid Choice");
}