const amount = document.getElementById("expense-amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const expenseList = document.getElementById('users');
const btn = document.querySelector('.btn');

window.addEventListener('load', loadExpenses);

btn.addEventListener('click', onSubmit);
expenseList.addEventListener('click', removeItem);
expenseList.addEventListener('click', editItem);

function onSubmit(e){
    e.preventDefault();
    if(amount.value === '' || description.value === ''){
       alert( "Please enter all fields");
    }else{
        // create list
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${amount.value} - ${description.value} - ${category.value}`));
        // create Delete button
        let delBtn = document.createElement('button');
        delBtn.className = 'delete';
        delBtn.appendChild(document.createTextNode('Delete Expenses'));
        //create edit button
        let editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.appendChild(document.createTextNode('Edit Expenses'));
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        expenseList.appendChild(li)
        let myObj = {amount: amount.value, description: description.value, category:category.value};
        let myObjString = JSON.stringify(myObj);
        localStorage.setItem(description.value, myObjString);
        let myObjDeserialize = JSON.parse(localStorage.getItem(description.value));
        console.log(myObjDeserialize);
        amount.value = '';
        description.value = '';
    }
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
        
          var li = e.target.parentElement;
          expenseList.removeChild(li);
          let description = li.textContent.split(" - ")[1];
        // Remove the user from local storage
        localStorage.removeItem(description);
        amount.value = '';
        description.value = '';
      }
}


function editItem(e) {
    let li = e.target.parentElement;
    let userData = li.textContent.split(" - ");
    amount.value = userData[0];
    description.value = userData[1];
    category.value = userData[2];
    // Remove the list item from the list
    expenseList.removeChild(li);
    // Update the local storage
    localStorage.removeItem(description.value);
  }


  function loadExpenses() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      let myObjDeserialize = JSON.parse(value);
      // create list
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${myObjDeserialize.amount} - ${myObjDeserialize.description} - ${myObjDeserialize.category}`));
      // create Delete button
      let delBtn = document.createElement('button');
      delBtn.className = 'delete';
      delBtn.appendChild(document.createTextNode('Delete'));
      //create edit button
      let editBtn = document.createElement('button');
      editBtn.className = 'edit';
      editBtn.appendChild(document.createTextNode('Edit'));
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      expenseList.appendChild(li);
    }
  }
