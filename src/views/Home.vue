<template>
  <div class="home">
    <h1>Homepage</h1>
    {{poke}}
  </div>
</template>

<script>

export default {
  created: function(){
/*
    this.$client.query(this.$q.Get(this.$q.Ref(this.$q.Collection("pokemon"), "244201187439542801")))
*/
    this.$client.query(
      this.$q.Map(
      this.$q.Paginate(
        this.$q.Match(
          this.$q.Index("all_pokemon")
        )
      ),
      this.$q.Lambda("X", this.$q.Get(this.$q.Var("X")))
      )
    )
    .then( (ret) => {
      console.log(ret);
      this.poke = ret.data[0].data;
    })
    .catch((ret) => console.log(ret))
  },
  data: function () {
    return {
      poke: "",
    }
  }
};
</script>
