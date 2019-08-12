<template>
    <div class = "wrapper">
        <form @submit = "lookup">
            <input type = "text" id = "Search" name="Search" v-model ="data" placeholder="Search...">
            <input type = "submit" value = "submit" class = "btn" @click ="$emit('search-todo', data)">
        </form>
    </div>
</template>

<script>
export default {
    name: "Search",
    data () {
        return {
            data: ''
        }
    },
    methods: {
        lookup(e) {
            e.preventDefault();
            // const data = this.data;
            // //console.log(category);
            // console.log('ok')
            // //$emit('search-todo', data);

        }
    }
}
</script>

<style scoped>
    .wrapper {
        background-color: white;
        margin-top: 5px;
    }
    input[type = "text"] {
        width: 90%;
        height: 30px;
        margin-left:.5%;
        border-radius: 5px;
        border: 1px solid #555;
        margin-right:auto;
    }
    input[type = "submit"] {
        margin-left: .3%;
        height: 30px;
        border-radius: 5px;
        width: 9%;
    }
</style>
