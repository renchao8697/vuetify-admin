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

      <template v-for="(item, i) in items">
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
import SettingsModule from '@/store/modules/settings'
import { layoutRoutes } from '@/router'

@Component({
  name: 'Drawer'
})
export default class extends Vue {
  private text = 'VV-Admin'
  private items = [
    {
      icon: 'mdi-palette',
      text: 'Dashboard',
      to: 'dashboard'
    },
    {
      icon: 'mdi-chart-timeline-variant',
      text: 'Charts',
      to: 'charts'
    },
    {
      icon: 'mdi-menu',
      text: '多级菜单',
      group: 'multiple',
      children: [
        {
          text: '二级菜单1',
          to: 'second-menu'
        },
        {
          text: '二级菜单2',
          group: 'multiple',
          children: [
            {
              text: '三级菜单',
              to: 'third-menu'
            }
          ]
        }
      ]
    }
  ]

  ceated () {
    console.log(layoutRoutes)
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
