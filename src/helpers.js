export const categoryOptions = [
  "Health",
  "Electronics",
  "Travel",
  "Education",
  "Books",
  "Grocery",
  "Payment",
  "Apparels",
  "Home",
];
export const serialize = (data) =>{
  console.log(data)
  if(data.length === 0 ) return [];
  
  let finalArray = [];
  
  for(let i= 0;i<data.length;i++){
  
  let obj = {
  expenseName:data[i].expenseName,
  category:data[i].category,
  dateOfexpense:data[i].dateOfexpense,
  amount:data[i].amount,
  expenseDes:data[i].expenseDes,
  updatedAt:data[i].updatedAt,
  createdAt:data[i].createdAt,
  user:data[i].user,
  id:data[i]._id,
  sr:i+1
  }
  
  finalArray = [...finalArray,obj];
  
  }
  
  return finalArray;
  }