<template>
  <v-app-bar app flat elevation="4"  extension-height="32" hide-on-scroll class="white">
    <v-btn class="mr-3" elevation="1" fab small @click="setNav({drawer: !drawer, miniVariant: !miniVariant})">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <base-breadcrumbs />

    <v-spacer />

    <v-text-field
      label="search"
      color="secondary"
      hide-details
      style="max-width: 180px;"
    >
      <template
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          fab
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            v-show="notices.length"
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>{{notices.length}}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <v-list-item
          v-for="notice in notices"
          :key="`notify-${notice.id}`"
          @click="viewNotice(notice.id)"
        >
          <v-list-item-title
            class="text-truncate"
            style="max-width: 150px;"
            v-text="notice.title"
          />
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 个人信息 -->
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          fab
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item @click="goSetting">
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>个人设置</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item @click="exit">
          <v-list-item-icon>
            <v-icon>mdi-location-exit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>退出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-slot:extension>
      <tag-view />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TagView from './TagView.vue'
import SettingsModule from '@/store/modules/settings'

@Component({
  name: 'AppBar',
  components: {
    TagView
  }
})
export default class extends Vue {
  private notices = [
    {
      id: 1,
      title: 'title1111111111111111111'
    },
    {
      id: 2,
      title: 'title22222222222222222'
    },
    {
      id: 3,
      title: 'title33333333333333333'
    }
  ]

  get drawer () {
    return SettingsModule.drawer
  }

  get miniVariant () {
    return SettingsModule.miniVariant
  }

  private setNav = SettingsModule.SET_NAV

  private goSetting () {
    console.log('set')
  }

  private exit () {
    console.log('exit')
  }

  private viewNotice (id: string | number) {
    console.log(`go ${id}`)
  }
}
</script>

<style>

</style>
