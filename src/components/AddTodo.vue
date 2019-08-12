<template>
    <div>
        <form @submit="addTodo">
            <input type = "text" v-model="category" name = "category" id = "" placeholder="Add Category...">
            <input type = "text" v-model="information" name = "information" id = "" placeholder="Add Information...">
            <input type = "text" v-model="cost" name = "price" id = "" placeholder="Add Price...">
            <input type = "submit" value = "submit" class = "btn">
        </form>
    </div>
</template>

<script>
//import uuid from 'uuid'

export default {
    name : "AddTodo",
    data() {
        return {
            category: '',
            information: '',
            cost: ''

        }
    },
    methods: {
        addTodo(e) { //event parameter
        e.preventDefault(); //prevent default behavior of trying to add to a file
            const newPost = {
               // id: uuid.v4(),
                category: this.category,
                information: this.information,
                cost: this.cost
            }
            //send up to the parent
            this.$emit('add-todo', newPost);

            this.category = '';
        }
    }
}
</script>

<style scoped>
    form {
        display: flex;
    }

    input[type="text"] {
        flex: 10;
        padding: 5px;
    }

    input[type = "submit"] {
        flex: 2;
    }
</style>
