function time(){
            

}
setInterval(time(), 100)



setInterval(() => {
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let seconds = date.getSeconds()
    // console.log(seconds);
    // document.getElementById("date").innerText =`${hour} : ${minute} : ${seconds}`
}, 1000);












const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; 
console.log(itemsArray);
//creating an event listener for the enter button
document.querySelector("#enter").addEventListener("click", ()=>{
    const item = document.querySelector("#item")
    createItem(item)
})

//writing a function to display the items on the page
function displayItems(){
    let items = "";
    for (let i = 0; i < itemsArray.length; i++){
       items += ` <div class="items">
                    <div class="input-controller">
                        <textarea disabled>${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                            <span class="editBtn">Edit</span>
                            <span class="deleteBtn">Delete</span>                                
                        </div>
                    </div>
                    <div class="update-controller">
                            <button class="saveBtn">save</button>
                            <button class="cancelBtn">cancel</button>
                        </div>
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items;
    //calling the various listeners functions i created below
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()

}
//creating a delete listener
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) =>{
        db.addEventListener("click", () =>{deleteItem(i)})
    })
}
//creating an edit listener
function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", ()=>{
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })

} 
//creating a save listener
function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", ()=>{
            updateItem(inputs[i].value, i)
        })
    })
}
//creating a cancel listener
function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", ()=>{
            updateController[i].style.display = "none"
            inputs[i].disabled = true
        })
    })
}
//writing a function to save the new item written on the page
function updateItem(text, i){
    itemsArray[i] = text
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}
//writing a function to delete each of the items on the page
function deleteItem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}
function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}
window.onload = ()=>{
    displayItems()
}