// let x="week";
// console.log(typeof (x));

// let y=10;
// console.log(typeof (y));

// let a=true;
// console.log(typeof(a));
// let b=false;
// console.log(typeof(b));

// let c=null;
// console.log(typeof (c));

// let d;
// console.log(typeof (d));

//let a=15;
//let b=20;

//Arithmatic Operators
// console.log(a+b);
// console.log(a);
// console.log(a-b);
// console.log(a*b);
// console.log(a/b);
// console.log(a%b);

//Assignment Operators
// console.log(a+=b);
// console.log(a);
// console.log(a-=b);
// console.log(a*=b);
// console.log(a/=b);
// console.log(a%=b);

//Logical Operators
//console.log(a==15 && b==10);
//console.log(a==15 || b==20);
//console.log(a!=10);

//Comparison Operators
// console.log(a==b);
// console.log(a===b);
// console.log(a>b);
// console.log(a<b);
// console.log(a<=b);
// console.log(a>=b);
// console.log(a!=b);
// console.log(a!==b);

//Increment Operators
// console.log(++a);  //pre increment
// console.log(a++);  //post increment 
// console.log(a);

//Decrement Operators
// console.log(--a)  //pre decrement
// console.log(a--)  //post decrement
// console.log(a);

//for loop
// for(a=1; a<=5; a++){
//     console.log(a);
// }

// while loop
// let i=1;
// while(i<=5){
//     console.log(i);
//     i++;
// }

//do-while (condition is true)
// let x=1;
// do{
//     console.log(x);
//     x++;
// }while(x<=5)

// let number=10;
// do{
//     console.log("this will run atleast once even if the condition is false");
// }while(number<=5);

//if else Condition
// let age=19;
// if(age>=18){
//     console.log("valid Age");
// }else{
//     console.log("Underage");
// }

// let msg=alert("this is a message");

//if else elseif 
let score = prompt("Enter your score");
if(score < 0){
    alert("Number is less than zero");
}else if(score > 100){
    alert("Number is more than 100");
}else if(score >=90){
    console.log("Grade A")
}else if(score >=80){
    console.log("Grade B")
}else if(score >=70){
    console.log("Grade C")
}else if(score >=60){
    console.log("Grade D")
}else if(score >=50){
    console.log("Grade E")
}else if(score >=40){
    console.log("Grade F")
}else{
    console.log("you are fail")
}

// Break statement
//for(x=1;x<=10;x++){
//    if(x==7){
//        break;
//    }
//    console.log(x);
//}

// Continue statement
//for(a=1;a<=10;a++){
//    if(a==3 || a==6){
//        continue;
//    }
//    console.log(a)
//}

// Task
//let num = prompt("Enter the number");
//if(num%2==0){
//    console.log("Number is Even");
//}else{
//    console.log("Number is Odd");
//}
