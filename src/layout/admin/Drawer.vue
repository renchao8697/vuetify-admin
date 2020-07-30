<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant="miniVariant"
    :expand-on-hover="miniVariant"
  >
    <v-list dense nav>
      <v-list-item :class="miniVariant && 'px-0'">
        <v-list-item-avatar contain class="align-self-center" color="white">
          <v-img src="~@/assets/logo.svg" max-height="30" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="text" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >

      <template v-for="(item, i) in drawerItems">
        <base-item-group
          v-if="item.group"
          :key="`group-${i}`"
          :item="item"
        />
        <base-item
          v-else
          :key="`item-${i}`"
          :icon="item.icon"
          :text="item.text"
          :to="item.to"
        />
      </template>

    </v-list>

  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import SettingsModule from '@/store/modules/settings'
import { layoutRoutes } from '@/router'
import { IDrawerItem } from '@/components/base/Item.vue'

@Component({
  name: 'Drawer'
})
export default class extends Vue {
  private text = 'VV-Admin'

  get drawerItems () {
    return this.setDrawers(layoutRoutes)
  }

  private setDrawers (routes: RouteConfig[]): IDrawerItem[] {
    return routes.map(route => {
      let drawerItem: IDrawerItem
      if (route.children) {
        drawerItem = route.meta
        drawerItem.group = route.path.split('/')[1]
        drawerItem.children = this.setDrawers(route.children)
        return drawerItem
      } else {
        drawerItem = route.meta
        const pathArr = route.path.split('/')
        // drawerItem.to = pathArr.length > 3 ? pathArr.slice(2).join('/') : pathArr[pathArr.length - 1]
        drawerItem.to = pathArr[pathArr.length - 1]
        return drawerItem
      }
    })
  }

  get drawer () {
    return SettingsModule.drawer
  }

  set drawer (val) {
    SettingsModule.SET_NAV({ drawer: val })
  }

  get miniVariant () {
    return SettingsModule.miniVariant
  }

  set miniVariant (val) {
    SettingsModule.SET_NAV({ miniVariant: val })
  }
}
</script>

<style>

</style>
