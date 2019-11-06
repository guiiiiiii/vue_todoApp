const addOneItem=(state, todoItem)=>{
    const obj = {
        completed: false,
        item: todoItem
    };
    localStorage.setItem(todoItem, JSON.stringify(obj));
    state.todoItems.push(obj);
    console.log(state.todoItems);
}
const removeOneItem=(state, obj)=> {
    localStorage.removeItem(obj.todoItem.item);
    state.todoItems.splice(obj.index, 1); //변경한 후 변경된 배열을 반환 (slice 는 변경하고 변환되지않은 배열을 반환)
}
const toggleItem=(state, obj)=>{
    state.todoItems[obj.index].completed = !state.todoItems[obj.index].completed;
    // todoItem.completed= !todoItem.completed;
    localStorage.setItem(state.todoItems[obj.index].item, JSON.stringify(state.todoItems[obj.index]));
}
const clearAllItems=(state)=> {
    state.todoItems = [];
    localStorage.clear();
}


export {addOneItem , removeOneItem, toggleItem, clearAllItems}