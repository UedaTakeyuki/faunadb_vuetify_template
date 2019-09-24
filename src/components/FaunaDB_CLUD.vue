<template>
  <div>
    <v-list
    :dense=true
    >
      <v-subheader class="display-1">Pokemon</v-subheader>
      <v-list-item
        two-line
        v-for="(poke, i) in pokes" :key="i"
        @click="set_selected(poke.ref.id, poke.data)"
      >
        <v-list-item-content>
        <v-list-item-title>id: {{poke.ref.id}}</v-list-item-title>
        <v-list-item-subtitle>ts: {{poke.ts}}</v-list-item-subtitle>
        {{poke.data}}
        </v-list-item-content>
      </v-list-item>
    </v-list>
    {{selected_id}}
    <v-form>
      <v-textarea label="data" v-model="textarea_data"></v-textarea>
      <v-btn @click="update()">update</v-btn>
      <v-btn @click="add()">add</v-btn>
      <v-btn @click="remove()">remove</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ['secret','collection', 'index'],
  created: function(){
    this.init_faunadb();
    this.update_client(this.secret);
    this.update_pokes();
  },
  data: () => ({
    faunadb: "",
    q: "",
    client: "",
    pokes: "",
    selected_id: "",
    selected_data: "",
    textarea_data: "",
  }),
  methods: {
    init_faunadb: function(){
      this.faunadb = require('faunadb');
      this.q = this.faunadb.query;
    },
    update_client: function(secret){
      this.client = new this.faunadb.Client({ secret: secret});
    },
    update_pokes: function(){
      this.client.query(
        this.q.Map(
        this.q.Paginate(
          this.q.Match(
            this.q.Index("all_pokemon")
          )
        ),
        this.q.Lambda("X", this.q.Get(this.q.Var("X")))
        )
      )
      .then( (ret) => {
        console.log(ret);
        this.poke = ret.data[0].data;
        this.pokes = ret.data;
      })
      .catch((ret) => console.log(ret))
    },
    set_selected: function(id, data){
      this.selected_id = id;
      this.selected_data = data;
      this.textarea_data = JSON.stringify(data)
    },
    clear_selected: function(){
      this.selected_id = "";
      this.selected_data = "";
      this.textarea_data = "";
    },
    update: function(){
      this.client.query(
        this.q.Update(
          this.q.Ref(this.q.Collection(this.collection), this.selected_id),
          { data: JSON.parse(this.textarea_data) }))
      .then( (ret) => {
        console.log(ret);
        this.update_pokes();
      })
      .catch((ret) => console.log(ret))
    },
    add: function(){
      this.client.query(
        this.q.Create(
          this.q.Collection(this.collection), 
          { data: JSON.parse(this.textarea_data) }))
      .then( (ret) => {
        console.log(ret);
//        console.log(ret.ref.value.id);
        this.selected_id = ret.ref.value.id;
        this.update_pokes();
      })
      .catch((ret) => console.log(ret))
    },
    remove: function(){
      this.client.query(
        this.q.Delete(
          this.q.Ref(this.q.Collection(this.collection), this.selected_id)))
      .then( (ret) => {
        console.log(ret);
        this.update_pokes();
        this.clear_selected();
      })
      .catch((ret) => console.log(ret))
    }
  },


}
</script>