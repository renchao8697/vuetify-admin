<template>
  <div>
    <v-card
      id="settings"
      class="py-2 px-2"
      color="rgba(0, 0, 0, .3)"
      flat
      dark
      link
      min-width="100"
    >
      <v-icon>mdi-cog-outline</v-icon>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card class="text-center mb-0" width="300">
        <v-card-text>
          <strong class="mb-3 d-inline-block">Settings</strong>
          <v-divider class="my-4"></v-divider>
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              Mini Nav
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-switch
                v-model="miniNav"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SettingsModule from '@/store/modules/settings'

@Component({
  name: 'Settings'
})
export default class extends Vue {
  private menu = false

  get miniNav () {
    return SettingsModule.miniNav || false
  }

  set miniNav (val) {
    SettingsModule.SET_MINI_NAV(val)
  }
}
</script>

<style lang="scss">
  #settings {
    position: fixed;
    top: 115px;
    right: -55px;
    border-radius: 8px;
  }
</style>
