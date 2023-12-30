<template>
    <div style="margin-left: 10%; margin-right: 10%;"> 
        <h1>Zodiac<br>Analyzer</h1>
        <p>
            Unlock the power of your musical stars! Your musical journey is written in the stars, 
            and by sharing your favorite tunes, you'll help discover the cosmic connections between your 
            zodiac sign and the beats that move you. Don't miss out on this unique opportunity to explore 
            the harmony between your zodiac sign and your favorite songs. Submitting your Spotify data is 
            completely anonymous and helps find the connection between zodiac signs and music.
        </p>
        

        <p v-if="submitted" ref="submitted">
            Thank you for being apart of the solution &lt;3
        </p>
        <div v-else>
            <p>Please enter your birth date:</p>
            <label for="Month">Month: </label>
            <select name="Month" @change="onMonthChange($event)" class="form-control" v-model="key">
                <option v-for="(item, index) in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']" v-bind:value="index + 1" v-bind:key="item">
                    {{ item }}
                </option>
            </select>
            <br>
            <label for="Day">Day: </label>
            <select name="Day" @change="onDayChange($event)" class="form-control" v-model="key">
                <option v-for="index in 31" v-bind:value="index" v-bind:key="index">
                    {{ index }}
                </option>
            </select>

            <br>
            <button @click="redirect" style="border-radius: 12px; padding: 12px 20px;">Send</button>
        </div>
        
        <p style="color: red">{{ error }}</p>
    </div>
</template>
  
  
<script>
    import { onMounted, ref } from 'vue'
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
        name: 'MainPage',

        data() { 
            return {
                error: '',
                submitted: false,
            }
        },

        setup() {
            const route = useRoute();
            const router = useRouter();

            let submitted = ref(false)

            onMounted(async () => {
                await router.isReady();

                const code = route.query.code;
                if (code !== undefined) {
                    try {
                        let response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v2/callback?code=${code}`);

                        const access_token = response.data['access_token'];
                        const nonce = response.data['nonce'];

                        const house = calculateZodiacSign();

                        response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v2/collect?access_token=${access_token}&nonce=${nonce}&house=${house}`);
                        
                        if (response.data === "success") {
                            submitted.value = true;
                        }
                        
                    } catch (error) {
                        console.log('error');
                        console.log(error);
                    }
                }
            })

            return {
                submitted
            }
        },

        methods: {
            onMonthChange(event) {
                saveStorage('month', event.target.value)
            },
            onDayChange(event) {
                saveStorage('day', event.target.value)
            },
            async redirect() {
                const month = getStorage('month');
                const day = getStorage('day');
                
                if (month === null || day === null) {
                    this.error = 'Please enter your birth date'
                    return;
                }
                window.location.href='https://accounts.spotify.com/authorize?response_type=code&client_id=280ec2cdd2bd49549c49ee81a7017af3&redirect_uri=https%3A%2F%2Fspotify-zodiac.netlify.app&scope=user-read-private%20user-read-email%20user-top-read'
            },
        }
    }
</script>


<style>

</style>