
function MergeSort(arr) {
  
  let len     = arr.length,       // number of items in the array 
      middle,                     // middle of the array
      left,                       // left side of the array 
      right,                      // right side of the array 

  // Arrays with 0 or 1 elements don't need sorting
  if (len < 2) {
    return arr
  }

  middle = Math.floor(len/2)


  left = arr.slice(0, middle)   // left side, from 0 to the middle  
  right = arr.slice(middle)     // right side, from the middle to the end

  return merge(MergeSort(left), MergeSort(right))

}


// Merges 2 sorted arrays
function merge(left, right) {
  let result = [],
      i = 0,
      j = 0

  while(i < left.length && j < right.length) {

    // Elements in both arrays are compared against each other.
    // Whichever element is smaller it's inserted in the results.
    
    if(left[i] < right[j]) {
      result.push(left[i++])       // Each time a value from one array is added, it's 
    } else {                       // corresponding index variable is incremented.
      result.push(right[j++])
    }
  }

  // As soon as one of the arrays has been finished, the
  // remaining values are added to the end of the result array

  return result.concat(left.slice(i)).concat(right.slice(j))

}