// alert('JS File is connected');



//FUNCTION TO GET A RANDOM ITEM FROM AN ARRAY
// function get_random (list) {
//     return list[Math.floor((Math.random()*list.length))]; 
// }



// // FUNCTION TO SHUFFLE AN ARRAY
// function shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
  
//     // While there remain elements to shuffle.
//     while (currentIndex != 0) {
  
//       // Pick a remaining element.
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }
  
//     return array;

//     // Used like so
//     //   var arr = [2, 11, 37, 42];
//     //   shuffle(arr);
//     //   console.log(arr);

// }



// // FUNCTION TO REMOVE DUPLICATES FROM AN ARRAY OF INTEGERS
// const deleteDupes = (numArr) => {
//     var result = [];
//     for (var i = 0; i < numArr.length; i++) {
//       if(!result.includes(numArr[i])){
//         result.push(numArr[i]);
//       }
//     }
//     return result
//     // Ex:
//     // Input: [1,2,2,3]
//     // Output: [1,2,3]
  
//     // Input: [4,5,4,4,7,5]
//     // Output: [4,5,7]
  
//     // Input: [1,2,3,5]
//     // Output: [1,2,3,5]
// }