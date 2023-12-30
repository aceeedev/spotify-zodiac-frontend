<template>
    <div style="margin-left: 5%; margin-top: 5%;"> 
        <h1>Zodiac<br>Analyzer</h1>
        <p>
            Paste in a URL to a playlist and using the cosmic connections your predicted zodiac sign will appear
        </p>
        
        <div v-if="Object.keys(responseData).length === 0">
            <input v-model="spotifyUrl" placeholder="Playlist URL" size="150" style="border-radius: 12px; padding: 12px 20px;"/>
            <br>
            <button @click="redirect" style="border-radius: 12px; padding: 12px 20px;">Send</button>
        </div>
        <div v-else>
            <img v-bind:src="responseData.image" class="center-cropped" style="vertical-align: middle;"/>
            <span style="vertical-align: middle;"> {{ responseData.name }} </span>
            <span style="vertical-align: middle;"> {{ responseData.description }} </span>
        </div>
        
        <p style="color: red">{{ error }}</p>


        <div class="footer">
            <div>
                <span style="vertical-align: middle;">Any and all metadata and cover art data is provided by </span>
                <img src="../assets/images/Spotify_Logo_RGB_Green.png" height="24px" style="vertical-align: middle;"/>
            </div>
        </div>
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

    // first value is name, second is emoji
    const zodiacValues = [['Aries', '♈'], ['Taurus', '♉'], ['Gemini', '♊'], ['Cancer', '♋'], ['Leo', '♌'], ['Virgo', '♍'], ['Libra', '♎'], ['Scorpio', '♏'], ['Sagittarius', '♐'], ['Capricorn', '♑'], ['Aquarius', '♒'], ['Pisces', '♓']];

    export default {
        name: 'PredictPage',

        data() { 
            return {
                error: '',
                responseData: {},
            }
        },

        setup() {
            const route = useRoute();
            const router = useRouter();

            let error = ref('')
            let responseData = ref({})

            onMounted(async () => {
                await router.isReady();

                const code = route.query.code;
                if (code !== undefined) {
                    try {
                        let response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v2/callback?code=${code}`);

                        const access_token = response.data['access_token'];
                        const nonce = response.data['nonce'];

                        let uri = getStorage('uri');
                        uri = uri.substring(1, uri.length - 1);

                        response = await axios.get(`https://v519b0wsek.execute-api.us-west-1.amazonaws.com/v2/predict?access_token=${access_token}&nonce=${nonce}&uri=${uri}`);
                        
                        if (response.status === 200) {
                            responseData.value = response.data;
                            responseData.value.zodiacName = zodiacValues[responseData.value.house - 1][0]
                            responseData.value.zodiacEmoji = zodiacValues[responseData.value.house - 1][1]
                            console.log(response.data)
                            console.log(responseData)
                        } else {
                            error = 'Please try again'
                        }
                        
                    } catch (error) {
                        console.log('error');
                        console.log(error);

                        error = 'Please try again'
                    }
                }
            })

            console.log('response data before return')
            console.log(responseData)
            return {
                error,
                responseData,
            }
        },

        methods: {
            async redirect() {
                if (!(this.spotifyUrl.toLowerCase().includes('https://open.spotify.com/playlist/'))) {
                    this.error ='Invalid URL'
                    return;
                }
                
                // parse the URI from URL
                const regex = /\/([^\/?]+)\?/;
                const match = regex.exec(this.spotifyUrl);
                saveStorage('uri', match[1])

                window.location.href='https://accounts.spotify.com/authorize?response_type=code&client_id=280ec2cdd2bd49549c49ee81a7017af3&redirect_uri=https%3A%2F%2Fspotify-zodiac.netlify.app&scope=user-read-private%20user-read-email%20user-top-read'
            },
        }
    }
</script>


<style>
    .footer { 
        position: absolute; 
        bottom: 10px; 
        left: 50%; 
        z-index: 5;
        transform: translate(-50%, 0);
    }

    .row {
        display: flex;
    }

    .column {
        flex: 50%;
        padding: 10px;
    }

    .center-cropped {
        object-fit: cover;
        object-position: center;
        height: 250px;
        width: 250px;
    }
</style>