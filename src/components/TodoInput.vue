<template>
  <div class='inputBox shadow'>
      <input type="text" v-model="newTodoItem" v-on:keyup.enter='addTodo'>
      <span class='addContainer' v-on:click='addTodo'>
        <i class="far fa-plus-square addBtn"></i>
      </span>

    <Modal v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">
      경고!
      <i class="closeModalBtn fas fa-times" @click="showModal= false"></i>
    </h3>
    <div slot="body">작성 후 클릭해주세요</div>
    
  </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
  data(){
    return{
      newTodoItem:"",
      showModal:false
    }
  },
  methods:{
    addTodo(){
      if(this.newTodoItem !== ''){
        // this.$emit('addTodoItem',this.newTodoItem);
        this.$store.commit('addOneItem', this.newTodoItem)
        this.clearInput();
      }else{
        this.showModal=true;
      }
    },
    clearInput(){
      this.newTodoItem=''; 
    } 
  },
  components:{
    Modal
  }
}
</script>

<style scoped>
  input:focus{
    outline: none;
  }
  .inputBox{
    background: white;
    height:50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input{
    border-style:none;
    font-size: 0.9rem;
  }
  .addContainer{
    float:right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width:3rem;
    border-radius: 0 5px 5px 0;
  }
  .addBtn{
    color:white;
    vertical-align: middle;
  }
  .shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
  .closeModalBtn{
    color:#42b983;
  }
</style>