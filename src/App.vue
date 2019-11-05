<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem='toggleOneItem'></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoFooter from './components/TodoFooter.vue'
import TodoList from './components/TodoList.vue'
import TodoInput from './components/TodoInput.vue'

export default {
  data(){
    return{
      todoItems:[]
    }
  },
  methods:{
    addOneItem(todoItem){
      const obj={
          completed:false,
          item:todoItem
        };
        localStorage.setItem(todoItem,JSON.stringify(obj));
        this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index){
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index,1); //변경한 후 변경된 배열을 반환 (slice 는 변경하고 변환되지않은 배열을 반환)
    },
    toggleOneItem(todoItem,index){
      this.todoItems[index].completed=!this.todoItems[index].completed;
      // todoItem.completed= !todoItem.completed;
      localStorage.setItem(this.todoItems[index].item,JSON.stringify(this.todoItems[index]));
    },
    clearAllItems(){
      this.todoItems=[];
      localStorage.clear();
    }
  },
  created(){
    if(localStorage.length>0){
      for(let i=0;i<localStorage.length;i++){
        if(localStorage.key(i)!=='loglevel:webpack-dev-server'){
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    
  },
  components:{
    TodoHeader,
    TodoFooter,
    TodoList,
    TodoInput
  }  
}
</script>

<style>

body{
  text-align: center;
  background-color: #F6F6F6;
}

input{
  border-style: groove;
  width:200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
