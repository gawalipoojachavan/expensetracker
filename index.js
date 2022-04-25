
var onSubmit=document.querySelector('#btnAddExpenses')
var category=document.getElementById("optcategory")
document.addEventListener("domcontentloaded",()=>{
    console.log('refresh')
//localStorage.getItem();
if(document.readyState!=="loading"){
    var keys=Object.keys(localStorage)
    var i=keys.length
    let stringifyExpenses,detailExpenses
    Object.keys(localStorage).forEach((key)=>{
        if(key.match(/expenses/g))
        stringifyExpenses=localStorage.getItem(key)
        detailExpenses=JSON.parse(stringifyExpenses)
        addNewLineElement(detailExpenses)
    })
}})
onSubmit.addEventListener("click",AddExpenses)
function AddExpenses(e){
    e.preventDefault();
const expenseamount=document.querySelector("#txtExpenseAmount").value
const expenseDescription=document.querySelector('#txtDescription').value
const expenseCategory=category.options[category.selectedIndex].value
if(expenseCategory.length>0&&expenseDescription.length>0&&expenseamount.length>0){
const obj={
    expenseamount:expenseamount,
    expenseDescription:expenseDescription,
    expenseCategory:expenseCategory
}
localStorage.setItem('expenses'+expenseamount,JSON.stringify(obj))
//document.querySelector("#txtExpenseAmount").value =' '
//document.querySelector('#txtDescription').value=' '
//document.getElementById("optcategory").value=' '
addNewLineElement(obj)
}
else{
    alert("All fields need to be filled")
}  
}
addNewLineElement=function(obj){
const ul=document.querySelector('#listOfExpenses')
const li=document.createElement("li")
li.appendChild(document.createTextNode(obj.expenseamount+' '+obj.expenseDescription+' '+obj.expenseCategory))
const btnDelete=document.createElement("input")
btnDelete.type="button"
btnDelete.id="btnDelete"
btnDelete.value="Delete Expense"
btnDelete.addEventListener("click",()=>{
    localStorage.removeItem(obj.expenseamount)
    li.remove();
})
const btnEdit=document.createElement("input")
btnEdit.type="button"
btnEdit.id="btnEdit"
btnEdit.value="Edit Expense"
btnEdit.addEventListener("click",()=>{
var expenseamount=document.querySelector("#txtExpenseAmount")
var expenseDescription=document.querySelector('#txtDescription')
expenseamount.value=obj.expenseamount
expenseDescription.value=obj.expenseDescription
category.value=obj.expenseCategory
li.remove()
})
li.appendChild(btnDelete)
li.appendChild(btnEdit)
ul.appendChild(li)
}