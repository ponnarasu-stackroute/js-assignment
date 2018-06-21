/* Write a program to build a `Pyramid of stars` of given height */

// const buildPyramid = (n) => {
// 	// Write your code here
//   //  let n =6;
//   if(typeof n =='number')
//         console.log('');
// for (var i = 0; i < n; i++) {
//     var str = '';
//     for (var j = 1; j < n-i; j++) {
//       str = str + ' ';
//     }
//     for (var k = 1; k <= (2*i+1); k++) {
//         if(k%2!=0)
//             str = str + '*';
//         else
//             str = str + ' ';
//     }
//     console.log(str);
//   }

// };

//aliter

const buildPyramid = (input) => {
    var size = input;
    var row = '';
    for (var i=1; i<=size; i++){
        for(var k=1; (k<=size-i); k++){
            row += ' ';
        }
        for(var j=1; j<=i; j++ ){
            row += ' *';
        }
        row += "  \n";
    }
    console.log(row);
    return row;
};

/* For example,
INPUT - buildPyramid(6)
OUTPUT -
     *
    * * 
   * * *
  * * * *
 * * * * *
* * * * * *

*/

buildPyramid(5);

module.exports = buildPyramid;
