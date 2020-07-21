<template>
  <v-app>
    <layout-app-bar />

    <layout-drawer />

    <layout-main-view />

    <v-footer app>footer</v-footer>

    <layout-settings></layout-settings>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutAppBar from './AppBar.vue'
import LayoutDrawer from './Drawer.vue'
import LayoutMainView from './MainView.vue'
import LayoutSettings from './Settings.vue'

@Component({
  name: 'Index',
  components: {
    LayoutAppBar,
    LayoutDrawer,
    LayoutMainView,
    LayoutSettings
  }
})
export default class extends Vue {
}
</script>

<style>

</style>
