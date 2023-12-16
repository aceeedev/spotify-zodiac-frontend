<template>
    <h1>Hello</h1>

    <button @click="sendData">send</button>
</template>
  
  
<script>
    import axios from 'axios';

    export default {
        name: 'Mainpage',

        methods: {
            async sendData() {
                try {
                    const response = await axios.get('https://v519b0wsek.execute-api.us-west-1.amazonaws.com/beta/login');
                    // JSON responses are automatically parsed.
                    console.log(response.data)
                } catch (error) {
                    console.log(error);
                }
            

                try {
                    const response = await axios.get('https://v519b0wsek.execute-api.us-west-1.amazonaws.com/beta/login');
                    // JSON responses are automatically parsed.
                    console.log(response.data)
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>


<style>

</style>