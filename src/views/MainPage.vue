<template>
    <div>
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

        <button @click="calculateZodiacSign">What's my Zodiac Sign</button>

        <button @click="redirect">Send</button>
    </div>
</template>
  
  
<script>
    import { onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import axios from 'axios';

    const saveStorage = function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const getStorage = function(key) {
        return localStorage.getItem(key);
    };

    const calculateZodiacSign = function() {
        let month = getStorage('month');
        month = parseInt(month.substring(1, month.length - 1));
        let day = getStorage('day');
        day = parseInt(day.substring(1, day.length - 1));

        const zodiacValues = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21]

        let house = (9 + month) % 12
        if (day > zodiacValues[month - 1]) {
            house++
        }
        
        return house
    }

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
                        const response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v2/callback?code=${code}`);

                        const access_token = response.data['access_token'];
                        const nonce = response.data['nonce'];

                        console.log(access_token);
                        console.log(nonce);

                        const house = calculateZodiacSign();
                        console.log(house);

                        response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v2/collect?access_token=${access_token}&nonce=${nonce}&house=${house}`);

                        console.log(response.data)
                        
                    } catch (error) {
                        console.log('error');
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
                window.location.href='https://v519b0wsek.execute-api.us-west-1.amazonaws.com/beta/login'
            },
        }
    }
</script>


<style>

</style>