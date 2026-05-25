// Function Expression
let square =  function(num){
    return num * num;
};
console.log(square(5));

// Arrow Function
let subtract = (a,b) => a-b;
console.log(subtract(10,4));

let add = (a,b) => a+b;
console.log(add(5,6));

// Check Odd/Even
function checkOddEven(number){
    if(number%2 == 0){
        console.log("Even Number");
    }else{
        console.log("Odd Number");
    }
}
checkOddEven(14);