<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
    :subGroup="subGroup"
    no-action
  >
  <template v-slot:activator>
    <v-list-item-content>
      <v-list-item-title v-text="item.text" />
    </v-list-item-content>
  </template>
  <template v-for="(child, i) in children">
    <base-item-sub-group
      v-if="child.group"
      :key="`sub-group-${i}`"
      :item="child"
    />

    <base-item
      v-else
      :key="`item-${i}`"
      :icon="child.icon"
      :to="child.to"
      :text="child.text"
    />
  </template>

  </v-list-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Item } from './ItemSubGroup.vue'

interface GroupItem extends Item {
  children: GroupItem[];
}

@Component({
  name: 'BaseItemGroup',
  inheritAttrs: false
})
export default class extends Vue {
  @Prop({ default: { group: '', text: '', children: [] } }) private item!: GroupItem
  @Prop({ default: false }) private subGroup!: boolean

  get children () {
    return this.item.children.map(item => ({
      ...item,
      to: `${this.item.group}/${item.to}`
    }))
  }

  get group () {
    return this.genGroup(this.item.children)
  }

  private genGroup (children: GroupItem[]) {
    return children.map(item => {
      const parent = item.group || this.item.group
      let group = `${parent}/${item.to}`

      if (item.children) {
        group = `${group}|${this.genGroup(item.children)}`
      }

      return group
    }).join('|')
  }
}
</script>

<style>

</style>
