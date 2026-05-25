// String Function

// Length
let name = "Java";
console.log(name.length); // 4
// CharAt
console.log(name.charAt(2)); // v

// Upper Case
let state = "punjab";
console.log(state.toUpperCase()); // PUNJAB

// Lower Case
let city = "LUDHIANA";
console.log(city.toLowerCase()); // ludhiana

// Trim
let msg = "   hello world   ";
console.log(msg.trim()); // "hello world"

// Replace
let line = "I love JS";
console.log(line.replace("JS","JavaScript"));// I love JavaScript


let text = "Learn JavaScript";
// Slice
console.log(text.slice(0,5)); // Learn
// Substring
console.log(text.substring(0,10)); // Learn Java
// Includes
console.log(text.includes("Java")); // true
// StartsWith
console.log(text.startsWith("Learn")); // true
// EndsWith
console.log(text.endsWith("Script")); // true
// index
console.log(text.indexOf("Java")); // 6

// Split
let sentence = "I love coding";
console.log(sentence.split(" ")); // ["I", "love", "coding"]

// Concat
let a = "Hello";
let b = "World";
console.log(a.concat(" ", b)); // Hello World


let username = "  JavaScript ";
let result = username.trim().toUpperCase();
console.log(result);