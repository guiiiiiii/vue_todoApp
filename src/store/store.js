import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage={
    fetch(){
        const arr=[];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                        arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }     
};

export const store=new Vuex.Store({
    state:{
        todoItems:storage.fetch()
    },
    getters:{
        storedTodoItems(state){
            return state.todoItems;
        }
    },
    mutations:{
        addOneItem(state, todoItem){
            const obj = {
                completed: false,
                item: todoItem
            };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
            console.log(state.todoItems);
            
        },
        removeOneItem(state, obj) {
            localStorage.removeItem(obj.todoItem.item);
            state.todoItems.splice(obj.index, 1); //변경한 후 변경된 배열을 반환 (slice 는 변경하고 변환되지않은 배열을 반환)
        },
        toggleItem(state, obj){
            state.todoItems[obj.index].completed = !state.todoItems[obj.index].completed;
            // todoItem.completed= !todoItem.completed;
            localStorage.setItem(state.todoItems[obj.index].item, JSON.stringify(state.todoItems[obj.index]));
        },
        clearAllItems(state) {
            state.todoItems = [];
            localStorage.clear();
        }
    }
});