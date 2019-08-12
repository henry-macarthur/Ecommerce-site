<template>
    <div class = "todo-item" v-bind:class="{'is-complete': todo.completed}">
        <p>
            <!-- <input type = "checkbox" v-on:change="markComplete"> -->
            Category: {{todo.category}} -- Price: {{todo.cost}}
            <button @click="$emit('del-todo', todo.id)" class = "del">PURCHASE</button>
            <div class = "information"> {{todo.information}}</div>
            
        </p>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: ["todo"],
        methods: {
            markComplete() {
                this.todo.completed = !this.todo.completed;
            }
        }
    }
</script>

<style scoped>
    .information {
        background: white;
        border: 1px #ccc solid;
        width:95%;
        height: 90%;
        margin-left:auto;
        margin-right:auto;
        border-radius: 3px;
        
    }
    .todo-item {
        background: #f4f4f4;
        padding: 10px;
        width: 700px;
        height: 350px;
        border-bottom: 1px #ccc dotted;
        margin-left:auto;
        margin-right:auto;
        border-radius: 5px;
        margin-top: 10px;
    }

    .is-complete {
        text-decoration: line-through;
    }

    .del {
        background: #ff8080;
        color: #fff;
        border: none;
        padding: 2px 9px;
        border-radius: 5%;
        cursor: pointer;
        float: right;
    }
</style>
