<template>
  <base-item-group
    :item="item"
    sub-group
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IDrawerItem } from './Item.vue'

@Component({
  name: 'BaseItemSubGroup'
})
export default class extends Vue {
  @Prop({ default: { text: '', icon: false } }) private item!: IDrawerItem
}
</script>

<style>

</style>
