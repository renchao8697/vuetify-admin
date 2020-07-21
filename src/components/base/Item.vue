<template>
  <v-list-item :to="path" color="primary">
    <v-list-item-icon v-if="icon">
      <v-icon v-text="icon" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
          <span v-text="text" />
      </v-list-item-title>
    </v-list-item-content>

  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseItem',
  inheritAttrs: false
})
export default class extends Vue {
  @Prop({ default: '' }) private text!: string
  @Prop({ default: false }) private icon!: boolean | string
  @Prop({ default: undefined }) private to!: string

  get path () {
    if (!this.to) return ''
    return `/${this.to}`
  }
}
</script>

<style>

</style>
