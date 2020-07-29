<template>
  <v-main>
    <!-- <tag-view></tag-view> -->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TagsViewModule } from '@/store/modules/tags-view'
import TagView from './TagView.vue'

@Component({
  name: 'MainView',
  components: {
    TagView
  }
})
export default class extends Vue {
  get cachedViews () {
    return TagsViewModule.cachedViews
  }

  get key () {
    return this.$route.path
  }
}
</script>

<style>

</style>
