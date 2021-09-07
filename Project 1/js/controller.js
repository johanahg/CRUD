window.addEventListener("load",init);
function init(){
    clearAll();
    loadId();
    showTotal();
    bindEvents();  
}

/* this function clears the contents of the form except the ID (since ID is auto generated)*/
function clearAll(){
    document.getElementById('name').value = "";
    document.getElementById('price').value = "";
    document.getElementById('exchange').value = "NZD";
    document.getElementById('desc').value = "";
    document.getElementById('color').value = "#000000";
    document.getElementById('url').value = "";
}

let auto = autoGen();

 /* this function automatically sets the value of ID */
function loadId(){
    console.log("here");
    document.querySelector('#id').innerText = auto.next().value;
}

/* this function populates the values of #total, #mark and #unmark ids of the form */
function showTotal(){
    document.getElementById('total').innerHTML = itemOperations.items.length;
    document.getElementById('mark').innerHTML = itemOperations.countTotalMarked();
    document.getElementById('unmark').innerHTML = itemOperations.items.length - itemOperations.countTotalMarked();
}

function bindEvents(){
    document.querySelector('#remove').addEventListener('click',deleteRecords);
    document.querySelector('#add').addEventListener('click',addRecord);
    document.querySelector('#update').addEventListener('click',updateRecord)
    document.querySelector('#exchange').addEventListener('change',getExchangerate)
}

/* this function deletes the selected record from itemOperations and prints the table using the function printTable*/
function deleteRecords(){
    itemOperations.remove();
    // deletes all the items in the table and prints them again with printTable() if there are items in the list.
    var tbody = document.querySelector('#items');
    let count = 0;
    while (count <= itemOperations.items.length) {
        tbody.deleteRow(0);
        count++;
    }
    printTable(itemOperations.items);
}

/* this function adds a new record in itemOperations and then calls printRecord(). showTotal(), loadId() and clearAll()*/
function addRecord(){
    let i = new Item();
    i.id = document.querySelector('#id').innerText;
    for (let k in i) {
        if (k != "isMarked" && k != "id") {
            i[k] = document.querySelector('#'+k).value;
        }
    }
    itemOperations.add(i);
    printRecord(i);
    showTotal();
    loadId();
    clearAll();
}

/*this function fills (calls fillFields()) the form with the values of the item to edit after searching it in items */ 
    
function edit() {
    let item = itemOperations.search(this.getAttribute('data-itemid'));
    fillFields(item);
}

/*this function fills the form with the details of itemObject*/
function fillFields(itemObject){
    document.getElementById('id').textContent = itemObject.id;
    document.getElementById('name').value = itemObject.name;
    document.getElementById('price').value = itemObject.price;
    document.getElementById('desc').value = itemObject.desc;
    document.getElementById('color').value = itemObject.color;
    document.getElementById('url').value = itemObject.url;
}

/* this function creates icons for edit and trash for each record in the table*/
function createIcon(className,fn, id){
    // <i class="fas fa-trash"></i>
    // <i class="fas fa-edit"></i>
    var iTag = document.createElement("i");
    iTag.className = className;
    iTag.addEventListener('click',fn);
    iTag.setAttribute("data-itemid", id) ;

    return iTag;
}

/*this function updates the record that is edited and then prints the table using printTable()*/
function updateRecord(){
    // gets the item and reassigns updated values
    let item = itemOperations.search(document.getElementById('id').textContent);
    item.id = document.getElementById('id').textContent;
    for (let k in item) {
        if (k != "id" && k != "isMarked") {
            item[k] = document.querySelector('#'+k).value;
        }
    }

    // deletes all the items in the table and prints them again with printTable() if there are items in the list.
    var tbody = document.querySelector('#items');
    let count = 0;
    while (count < itemOperations.items.length) {
        tbody.deleteRow(0);
        count++;
    }
    printTable(itemOperations.items);
    loadId();
    clearAll();
}

/*this function toggles the color of the row when its trash button is selected and updates the marked and unmarked fields */
function trash(){
    let id = this.getAttribute('data-itemid');
    itemOperations.markUnMark(id);
    showTotal();
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    console.log("I am Trash ",this.getAttribute('data-itemid'))
}

/* this function calls printRecord for each item of items and then calls the showTotal function*/
function printTable(items){
    items.forEach(item => {
        printRecord(item); 
    });
    showTotal();
}

function printRecord(item){
    var tbody = document.querySelector('#items');
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in item){
        if(key=='isMarked'){
            continue;
        }
        let cell = tr.insertCell(index);
        cell.innerText = item[key] ;
        index++;
    }
    var lastTD = tr.insertCell(index);
    lastTD.appendChild(createIcon('fas fa-trash mr-2',trash,item.id));
    lastTD.appendChild(createIcon('fas fa-edit',edit,item.id));
}

/* this function makes an AJAX call to http://apilayer.net/api/live to fetch and display the exchange rate for the currency selected*/
function getExchangerate(){
}