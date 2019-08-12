
<template>
    <div class = "wrapper">
        <div class = "nav">
            <router-link to="/home"  class = "link"  color = "white">Dashboard</router-link> |
            <router-link to="/addPost" class = "link" >Add Post</router-link>
        </div>
        <div class = "post">
            <form>
                <label for="category" margin-left= "50px">CATEGORY </label>
                <input type="text" id="category" name="category" placeholder="Category"  v-model="category" >
                <label for="cost" margin-left= "50px">COST </label>
                <input type="text" id="cost" name="cost" placeholder="Cost"  v-model="cost" >
                <label for="information" margin-left= "50px">INFORMATION </label>
                <textarea v-model= "information"></textarea>
                <button v-on:click='post' class="button button4"  type="button" >Post</button>
                <!-- <input textarea="text" id="information" name="information" placeholder="Category"  v-model="information" > -->

            </form>
        </div>
    </div>
</template>

<script>
import Header from '../components/layout/Header';
import axios from 'axios';
export default {
    components: {
        name: 'search'
    },
    data()
    {
        return {
            category: '',
            information: '',
            cost: ''
        }
    },
    methods: {
        post(data)
    {
        //console.log(this.category, this.information, this.cost)
        let category = this.category;
        let information = this.information;
        let cost = this.cost;
        //this.category 
        //const {category, information, cost} = data;
        //console.log(data.category)
        //console.log(this.$store.state.token);

        axios.post('http://localhost:8080/posts', {category, information, cost}, {headers: {
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
       }})
      .then((res) => {
          this.$router.push('/home');
    //     //console.log(res.data)
    //    // console.log(this.$store.state.token)
    //     //console.log(res.data[0].title);
    //     console.log(res)
    //     this.todos = [...this.todos, res.data]
      
        
      }) //load with the todos we get
      .catch(err => console.log(err))

      
    }
    }
    
}
</script>

<style scoped>
    /* .warapper{
        color: black
    } */
    .link{
       color: white;
       text-decoration: none;
    }
    .link:hover {text-decoration: underline}
    .link:visited { text-decoration: none; }
    .nav {
        width: 100%;
        height: 35px;
        background-color: #333;
        color: white;
        text-align: center;
        /* text-decoration-color: white; */
    }
    .post{
        width: 70%;
        height: 700px;
        margin-left:auto;
        margin-right:auto;
        background: #f2f2f2;
        margin-top: 20px;
        border: 2px solid #ccc;
        border-radius: 5px;
    }
    input[type=text] {
        width: 98%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid #ccc;
        outline: none;
        margin-left:1%;
        margin-right:auto;
    }
    label {
        margin-left:1%;
        margin-top: 50px;
    }

    textarea {
        width: 98%;
        height: 400px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        resize: none;
        margin-left:1%;
        margin-right:auto;
    }
    .button {
        background-color: #4CAF50; /* Green */
        border: none;
        
        color: white;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 10px;
        margin: 4px 2px;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        cursor: pointer;
        }

        .button4 {
        margin-left: 45%;
        margin-right: auto;
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        }

        .button4:hover {background-color: #666666;}
</style>
