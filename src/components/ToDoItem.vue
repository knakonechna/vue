<template>
  <div class="todo" @mouseover="hover = true" @mouseleave="hover = false">
    <div v-if="!editMode" class="text" :class="{ complete: complete }">
      <input type="checkbox" :id="todo.id" v-model="complete" />
      <label :for="todo.id">
        <span></span>
        {{ todo.text }}
      </label>
    </div>
    <input v-if="editMode" type="text" v-model="editableTodo" v-on:keyup.enter="changeTodo()" />
    <div class="buttons" :class="{ show: hover || editMode }">
      <button v-on:click="removeTodo(todo.id)">Remove</button>
      <button v-on:click="changeTodo()">{{ editMode ? 'Save' : 'Edit' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoListItem',
  props: {
    todo: {
      text: String,
      id: Number,
      complete: Boolean
    },
    removeTodo: Function,
    editTodo: Function,
    toggleCompleted: Function
  },
  data() {
    return {
      editMode: false,
      complete: this.todo.complete,
      editableTodo: this.todo.text,
      hover: false
    };
  },
  methods: {
    changeTodo() {
      this.editMode = !this.editMode;
      this.editMode ? '' : this.editTodo(this.todo.id, this.editableTodo);
    }
  },
  watch: {
    complete: function(newBool) {
      this.toggleCompleted(this.todo.id, newBool);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  .text {
    font-weight: bold;
    color: #585858;
  }
  .buttons {
    opacity: 0;
    transition-duration: 0.15s;
  }
  .buttons button {
    margin: 5px;
  }
  .show {
    opacity: 1;
  }
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    display: flex;
  }
  input[type='checkbox'] + label > span {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    width: 1em;
    height: 1em;
    background: transparent;
    border: 2px solid #9e9e9e;
    border-radius: 4px;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
  }
  input[type='checkbox']:checked + label > span {
    animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
  }
  input[type='checkbox']:checked + label > span:before {
    content: '';
    position: absolute;
    top: 0.4em;
    left: 0.2em;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transform: rotate(45deg);
    transform-origin: 0% 100%;
    animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
  }
  @keyframes shrink-bounce {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes checkbox-check {
    0% {
      width: 0;
      height: 0;
      border-color: #585858;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    33% {
      width: 0.2em;
      height: 0;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    100% {
      width: 0.2em;
      height: 0.5em;
      border-color: #585858;
      transform: translate3d(0, -0.5em, 0) rotate(45deg);
    }
  }
}
</style>
