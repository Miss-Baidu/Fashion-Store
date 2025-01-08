//using insertion sort because it is a small dataset. (3) entities
//It is an O(n^2) operation, change it if your data grows. 
//

function swapElements(input, j){
  const temp = input[j];
  input[j] = input[j-1];
  input[j-1] = temp;
}

export function sortElements(input){
  let i, j;
  for(i = 1; i < input.length; i++){
    j = i;
    while(j > 0 && input[j].product_id < input[j - 1].product_id){
      swapElements(input, j);
      j--;
    }
  }
}


