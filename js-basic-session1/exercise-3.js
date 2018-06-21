const myArray = [10,4,7,9,2,3,1,8,6,5];  
// sort default arrange alphabetically. to sort number give a function inside the sort.
// Array.prototype.sort() - actual implementation
myArray.sort((a,b)=>a-b);
console.log(myArray);