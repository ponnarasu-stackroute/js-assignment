let arr1 = [1, 2, 3];
let arr2 = [100,2,1,10];

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


console.log(arr2.diff(arr1));
//common elements
let intersection = arr1.filter(x => arr2.includes(x));
console.log(intersection);
//arr1 alone
let difference = arr1.filter(x => !arr2.includes(x));
//not include commons
let symdiff = arr1
                 .filter(x => !arr2.includes(x))
                 .concat(arr2.filter(x => !arr1.includes(x)));
console.log(symdiff);