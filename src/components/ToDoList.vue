<template>
  <div class="layout">
    <div class="input-wrap">
      <input class="create-todo-input" type="text" v-model="newTodo" v-on:keyup.enter="addTodo()" />
    </div>

    <ToDoListItem
      v-for="todo in todoList"
      v-bind:todo="todo"
      v-bind:key="todo.id"
      :removeTodo="removeTodo"
      :toggleCompleted="toggleCompleted"
      :editTodo="editTodo"
    ></ToDoListItem>
    <div class="button-layout">
      <button v-if="hideCompleted" v-on:click="hideComplete">Remove completed</button>
    </div>
  </div>
</template>

<script>
import ToDoListItem from '@/components/ToDoItem.vue';

export default {
  name: 'todo-page',
  data() {
    return {
      todoList: [
        {
          text: 'Create ToDo`s',
          id: 1,
          complete: false
        },
        {
          text: 'Create task',
          id: 2,
          complete: false
        },
        {
          text: 'Forget all of them',
          id: 3,
          complete: true
        }
      ],
      hideCompletedTodos: false,
      error: null,
      newTodo: ''
    };
  },
  methods: {
    removeTodo: function(id) {
      this.todoList = this.todoList.filter(todo => todo.id !== id);
    },
    addTodo: function() {
      this.todoList.push({ text: this.newTodo, id: this.todoList.length + 1 });
      this.newTodo = '';
    },
    editTodo: function(id, editableText) {
      const index = this.todoList.findIndex(todo => todo.id === id);
      this.todoList[index].text = editableText;
    },
    hideComplete: function() {
      this.todoList = this.todoList.filter(todo => !todo.complete);
    },
    toggleCompleted: function(id, bool) {
      const index = this.todoList.findIndex(todo => todo.id === id);
      this.todoList[index].complete = bool;
    }
  },
  computed: {
    hideCompleted: function() {
      return this.todoList.filter(todo => todo.complete).length > 0;
    }
  },
  components: {
    ToDoListItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layout {
  background: #f0f0f0;
  border-radius: 5px;
  padding: 20px 50px;
  max-width: 50%;
  margin: auto;
}
.input-wrap {
  display: flex;
}
.create-todo-input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  box-shadow: none;
  border: 2px solid#a5a5a5;
  margin-bottom: 10px;
  font-size: 18px;
  padding-left: 10px;
  color: #585858;
  letter-spacing: 1px;
}
.create-todo-input:focus {
  outline: none;
}
.button-layout {
  height: 40px;
}
.button-layout button {
  height: 100%;
  width: 120px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  border: 2px solid#a5a5aa;
  color: #737373;
  cursor: pointer;
}
</style>
