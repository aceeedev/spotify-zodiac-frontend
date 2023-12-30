<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
  },
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0px;
    font-family: 'Inter';
    font-weight: 300;
    font-size: 1rem;
    color: white;

    background-repeat: no-repeat;
    background-image: linear-gradient(45deg, #121212, 90%, #0f7031);
  }

  h1 {
    font-size: 6rem;
    font-weight: 900;
    margin: 0;
    line-height: 1.15;
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 500;
    margin: 5px 0 5px;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 400;
    margin: 0;
  }

  p {
    line-height: 1.85;
    font-size: 1.1rem;
  }
</style>