<template>
  <v-breadcrumbs :items="breadcrumbs" />
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

type breadcrumb = {
  disabled: boolean;
  exact: boolean;
  href: string;
  link: boolean;
  title: string | number;
  to: string | object;
}

@Component({
  name: 'BaseBreadcrumb'
})
export default class extends Vue {
  private breadcrumbs: breadcrumb[] = []

  @Watch('$route.path', { immediate: true })
  pathChange () {
    const matcheds = this.$route.matched.filter(item => item.meta && item.meta.text)
    this.breadcrumbs = matcheds.map(matched => matched.meta)
  }
}
</script>

<style>

</style>
