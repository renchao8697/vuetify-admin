<template>
  <v-main>
    <tag-view></tag-view>
    <router-view />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TagView from './TagView.vue'

@Component({
  name: 'MainView',
  components: {
    TagView
  }
})
export default class extends Vue {

}
</script>

<style>

</style>
