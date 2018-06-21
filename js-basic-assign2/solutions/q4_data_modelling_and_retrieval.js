// Create a list of fruits with their properties (name, color, pricePerKg)
// and convert it into a format so that for a given fruit name
// retrieval of its color and pricePerKg value is fast


// Write your code here
const fruitArray = [
    { name: "apple", color: 'red',pricePerKg:126 },
    { name: "orange", color: 'orange',pricePerKg:52 },
    { name: "lemon", color: 'yellow',pricePerKg:35.5 },
    { name: "mango", color: 'green',pricePerKg:70 },
    { name: "grapes", color: 'black',pricePerKg:40.25 }
    
  ];

  const convert2obj = (fruitArray1, keyField) => 
	// Write your code here
    fruitArray1.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
      }, {});

 const fruitObj = convert2obj(fruitArray, 'name');
  console.log(fruitObj); 
  console.log(fruitObj.mango); 


//aliter
//   const fruits = () => {
//     const fruitsList = [
//         {name: "Apple", color: "Black", pricePerKg:100},
//         {name: "Mango", color: "Yellow", pricePerKg:50},
//         {name: "Orange", color: "Orange", pricePerKg:25}
//     ]
//     const result = (array) => 
//         fruitsList.reduce((obj, item) => {
//                 obj[item.name] = item
//                 return obj
//             }, {})
        
//         const finResult = result(fruitsList)
//         console.log(finResult["Apple"]);
// };