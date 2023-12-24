<template>
    <h1>Hello</h1>

    <select name="Month" @change="onMonthChange($event)" class="form-control" v-model="key">
        <option v-for="(item, index) in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']" v-bind:value="index + 1" v-bind:key="item">
            {{ item }}
        </option>
    </select>
    <select name="Day" @change="onDayChange($event)" class="form-control" v-model="key">
        <option v-for="index in 31" v-bind:value="index" v-bind:key="index">
            {{ index }}
        </option>
    </select>

    <button @click="redirect">Send</button>
</template>
  
  
<script>
    import { onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import axios from 'axios';

    const saveStorage = function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };

    export default {
        name: 'Mainpage',

        setup() {
            const route = useRoute()
            const router = useRouter()

            onMounted(async () => {
                await router.isReady();

                const code = route.query.code;
                if (code !== undefined) {
                    try {
                        const response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v1/callback?code=${code}`);
                        // JSON responses are automatically parsed.
                        console.log("data")
                        console.log(response.data)
                    } catch (error) {
                        console.log("error")
                        console.log(error);
                    }
                }
            })
        },

        methods: {
            onMonthChange(event) {
                saveStorage('month', event.target.value)
            },
            onDayChange(event) {
                saveStorage('day', event.target.value)
            },
            async redirect() {
                window.location.href="https://v519b0wsek.execute-api.us-west-1.amazonaws.com/beta/login"
            }
        }
    }
</script>


<style>

</style>