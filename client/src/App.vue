<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="bg-dark text-light borderB">
    Made by Pickle
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

.borderB{
  border: 3px solid gray;
}

body{
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('https://images.unsplash.com/photo-1695768231937-e63546703b21?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D');
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
