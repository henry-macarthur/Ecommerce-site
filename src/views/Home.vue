<template>
  <div id="app">
    <!-- <AddTodo v-on:add-todo="addTodo"/> -->
   
    <div class = "nav">
      <router-link to="/home"  class = "link"  color = "white">Dashboard</router-link> |
      <router-link to="/addPost" class = "link" >Add Post</router-link> | 
      <a class = "logout" v-on:click = 'logout'> Logout </a>
    </div>
     <Search v-on:search-todo= "displayTodo" />
    <Todos v-bind:todos = "todos" v-on:del-todo= "deleteTodo"/>
  </div>
</template>

<script>
//import Header from '../components/layout/Header';
import Todos from '../components/Todos';
import AddTodo from '../components/AddTodo';
import axios from 'axios';
import Search from '../components/Search';
import {mapGetters} from 'vuex';

export default {
  name: 'Home',
  components: {
    //Header,
    Todos,
    AddTodo,
    Search
  }, 
  computed: mapGetters([
    'getToken'
  ]),
  data() {
    return {
      todos: [], 
      id: '',
      search: ''
    }
  }, 
  methods: {
    logout(data) {
      console.log(this.$store.state.token)
      axios.post('http://localhost:8080/users/logout', {}, {headers: {
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
       }})
      .then((res) => {
        console.log('asdfas')
        this.$router.push('/');
      })
      .catch(err => console.log(err));
    },
    deleteTodo(id) {
      //console.log(this.$store.state.token)
      axios.post(`http://localhost:8080/users/makePayment/${id}`, {}, {
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    })
      .then((res) => { 
        console.log('ok')
        if(res.status === 406)
          alert('cannot buy your own stuff')
      })
      .catch((err) => {
        alert('cannot buy your own stuff')
        console.log('cannot buy your own stuff')
      })

    //   axios.delete(`http://localhost:8080/posts/${id}`, {
    //   headers: {
    //     'Access-Control-Allow-Origin': "*",
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + this.$store.state.token
    //   }
    // })
    //   .then((res) => { 
    //     console.log(res.status)
    //     this.todos = this.todos.filter(todo => todo.id !== id)
    //   })
    //   .catch(err => console.log(err))
      //this.todos = this.todos.filter(todo => todo.id !== id)
    },
    addTodo(data) {
      console.log(this.id)

      //axios.get
      const {category, information, cost } = data;
      console.log(this.$store.state.token)
      // axios.post('http://localhost:8080/posts', {
      //   headers: {
      //   'Access-Control-Allow-Origin': "*",
      //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      //   'Accept': 'application/json, text/plain, */*',
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer ' + this.$store.state.token
      // },
      //   data: {
      //     category,
      //     information,
      //     price,
      //   }
      // })
      //   .then(res => this.todos = [...this.todos, res.data])
      //   .catch(err => console.log(err));

      axios.post('http://localhost:8080/posts', {category, information, cost}, {headers: {
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
       }})
      .then((res) => {
        //console.log(res.data)
       // console.log(this.$store.state.token)
        //console.log(res.data[0].title);
        console.log(res)
        this.todos = [...this.todos, res.data]
      
        
      }) //load with the todos we get
      .catch(err => console.log(err))

      
    },
    displayTodo(input)
    {
      console.log(input)
      axios.get(`http://localhost:8080/posts?category=${input}`, {
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    })
      .then((res) => {
        //console.log(res.data)
       // console.log(this.$store.state.token)
        //console.log(res.data[0].title);
        
        for(let i = 0; i< res.data.length; i++)
        {
          res.data[i].id = res.data[i]._id
        }
        this.todos = res.data
        console.log(res.data)
      
        
      }) //load with the todos we get
      .catch(err => console.log(err))
    },
  }, 
  mounted() {
    //console.log('sdfas')
  },
  
  created() {
    //console.log(this.$store.state.token)
    if(!this.$store.state.token)
      this.$store.state.token = localStorage.token;//res.data.token;
    if(!this.$store.state.id)
      this.$store.state.id = localStorage.id;
    //console.log(localStorage.token)
      // this.$store.state.token = localStorage.token;//res.data.token;
      // this.$store.state.id = localStorage.id;//res.data.user._id;
    //localhost:3000/posts
    // headers: {
    //   'Accept': 'application/json, text/plain, */*',
    //   'Content-Type': 'application/json'
    // },
    // axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    //   .then((req,res) => {
    //     console.log(res.data)
    //   }) //load with the todos we get
    //   .catch(err => console.log(err))
  
    axios.get('http://localhost:8080/posts', {
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    })
      .then((res) => {
        //console.log(res.data)
       // console.log(this.$store.state.token)
        //console.log(res.data[0].title);
        
        for(let i = 0; i< res.data.length; i++)
        {
          res.data[i].id = res.data[i]._id
        }
        this.todos = res.data
        console.log(res.data)
      
        
      }) //load with the todos we get
      .catch(err => console.log(err))
  }

}
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .link{
       color: white;
       text-decoration: none;
    }
    .link:hover {text-decoration: underline}
    .link:visited { text-decoration: none; }
    .logout:hover {text-decoration: underline}
    .logout:visited { text-decoration: none; }
    .nav {
        width: 100%;
        height: 35px;
        background-color: #333;
        color: white;
        text-align: center;
        /* text-decoration-color: white; */
    }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .btn:hover {
    background: #666;
  }


</style>
