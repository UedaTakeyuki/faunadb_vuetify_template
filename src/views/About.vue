<template>
  <div class="about">
    <h1>This is an about page</h1>
<!--    <FaunaDB_CRUD 
                  :secret = "fnADY47y_RACEVrSDZcfA3TxW6r9vSArYlbWatoa"
                  :collection = "pokemon"
                  :index = "all_pokemon"
    />-->
    <FaunaDB_CLUD 
                  secret = "fnADY47y_RACEVrSDZcfA3TxW6r9vSArYlbWatoa"
                  collection = "pokemon"
                  index = "all_pokemon"
    />
  </div>
</template>

<script>
import FaunaDB_CLUD from '@/components/FaunaDB_CLUD';

export default {
  components: {
    FaunaDB_CLUD
  }
}
</script>