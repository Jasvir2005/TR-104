// Pattern
for (let i=1; i<=5; i++){
    let stars ="";
    for (let j=1; j<=i; j++){
        stars +="*";
    }
    console.log(stars);
}

// Reverse pattern
for (let i=5; i>=1; i--){
    let stars ="";
    for (let j=1; j<=i; j++){
        stars +="*";
    }
    console.log(stars);
}

// Pyramid (method 1)
let rows = 5;
for(let i=1; i<=rows; i++){
    let space ="";
    let star ="";
    for(let j=1; j<=rows-i; j++){
        space +=" ";
    }
    for(let k=1; k<=(2*i-1); k++){
        star +="*";
    }
    console.log(space + star);
}

// Pyramid (method 2)
for(let i=1;i<=5;i++){
    let line="";
    for(let s=1;s<=5-i;s++){
        line=line+" ";
    }
    for(let j=1;j<=(2*i)-1;j++){
        line=line+"*"
    }
    console.log(line)
}

// Swap two values without using third variable
let x = 10;
let y = 15;
x = x + y;
y = x - y;
x = x - y;

console.log("x = " + x );
console.log("y = " + y);