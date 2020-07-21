<template>
  <v-sheet
    class="mb-2 py-1"
    max-width="100%"
    elevation="4"
  >
    <v-slide-group mandatory show-arrows>
      <v-slide-item
        v-for="n in 20"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-btn
          class="mx-1"
          :input-value="active"
          active-class="primary white--text"
          depressed
          small
          @click="toggle"
        >
          Options {{ n }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'TagView'
})
export default class extends Vue {

}
</script>

<style>

</style>
