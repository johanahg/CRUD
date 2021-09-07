const itemOperations = {
    items:[],
    add(itemObject){
        /* adds an item into the array items*/
        this.items.push(itemObject);
    },
    remove(){
        /* removes the item which has the "isMarked" field set to true*/
        this.items.forEach(item => {if (item.isMarked === true) this.items.splice(this.items.indexOf(item), 1);});
    },
    search(id){
        /* searches the item with a given argument id */
        return this.items.find(iobj => iobj.id == id);  
    },
    markUnMark(id){
        /* toggle the isMarked field of the item with the given argument id*/
        item = this.search(id);
        item.toggle();
    },
    countTotalMarked(){
       /* counts the total number of marked items */
       var count = 0;
       this.items.forEach(item => { if (item.isMarked) count++;});
       return count;
    },
}