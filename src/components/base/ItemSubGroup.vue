<template>
  <base-item-group
    :item="item"
    sub-group
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface Item {
  to: string;
  text: string;
  icon?: string | boolean;
  group?: string;
}

@Component({
  name: 'BaseItemSubGroup'
})
export default class extends Vue {
  @Prop({ default: { text: '', icon: false } }) private item!: Item
}
</script>

<style>

</style>
