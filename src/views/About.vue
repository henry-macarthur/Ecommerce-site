<template>

<div>
  <div class = "nav">
            <router-link to="/"  class = "link"  color = "white">Login</router-link> |
            <router-link to="/signup" class = "link" > Signup</router-link>
  </div>
  <div class="about">
    <form>
      <!-- <label for="fname">User Name</label>
      <input type="text" id="fname" name="fname" placeholder="Henry MacArthur"  v-model="fname" > -->
      <label for="email">Email</label>
      <input type="text" id="email" name="email" placeholder="..." v-model="email" >
      <label for="lname">Password</label>
      <input type="password" id="password" name="password" placeholder="Password" v-model="password" >
      
      <button v-on:click='signIn' class="button button4"  >Login</button>
      
      <!-- <p>{{getToken}}</p> -->
    </form>
  </div>
</div>
</template>

<script>
//import AddTodo from '../components/AddTodo';
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
  components: {
    name: 'Login',
  },
  computed: mapGetters([
    'getToken'
  ]),
  data() {
    return {
      fname: '',
      password: '',
      email: '',
      token: '',
      id: ''
    }
  },
  methods: {
    addUser(data)
    {
      data.preventDefault();
      let newUser = {
        name: this.fname,
        password: this.password,
        email: this.email,
      }
      //console.log(this.fname, this.password, this.email)

      axios.post('http://localhost:8080/users/signup', newUser)
        .then((res) => {
          console.log(res.data);
          //console.log(this.$store.state.token);
          //res.data.token;
          this.$store.state.token = res.data.token;
          this.$store.state.id = res.data.user._id;
          localStorage.token = res.data.token;
          localStorage.id = res.data.user._id;
          //console.log(res.data)
          //console.log(this.$store.state.id)

          //console.log(this.$store.state.token)
          this.$router.push('/addPost')
        })
        .catch(err => console.log(err));

    },
    signIn(data)
    {
      data.preventDefault();
      let user = {
        name: this.fname,
        password: this.password,
        email: this.email,
      }
      console.log(user)

      axios.post('http://localhost:8080/users/login', user)
        .then((res) => {
          console.log(res.data);
          //console.log(this.$store.state.token);
          //res.data.token;
          this.$store.state.token = res.data.token;
          this.$store.state.id = res.data.user._id;
          localStorage.token = res.data.token;
          localStorage.id = res.data.user._id;
          console.log('redirect')
          this.$router.push('/home')
        })
        .catch(err => console.log('login error'));

      //this.$router.push('/home')
    }
  }

}
</script>


<style scoped>
  .about{
    width: 95%;
    height: 300px;
    background: #F8F8F8;
    border: 1px solid black;
    margin-left:auto;
    margin-right:auto;
    border-radius: 3px;
    margin-top: 10px;

  }

  input[type=text] {
    padding-top: 30px;
    width: 98%;
    padding: 12px 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border: 1px solid #555;
    outline: none;
    margin-left:1%;
    margin-right:auto;
 }

input[type=text]:focus {
  background-color: #e7e7e7;
}


input[type=password] {
    width: 98%;
    padding: 12px 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border: 1px solid #555;
    outline: none;
    margin-left:1%;
    margin-right:auto;
 }

input[type=password]:focus {
  background-color: #e7e7e7;
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
  margin: 15px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
}

.button4 {
  margin-left: 1%;
  background-color: white;
  color: black;
  border: 1px solid #555;
}

.button4:hover {background-color: #e7e7e7;}

.button4:hover {background-color: #e7e7e7;}

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

</style>
