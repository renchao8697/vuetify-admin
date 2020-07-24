<template>
  <v-sheet
    class="mb-2 py-1"
    max-width="100%"
    elevation="4"
  >
    <v-slide-group show-arrows>
      <v-slide-item
        v-for="tab in visitedViews"
        :key="tab.path"
      >
        <v-btn
          class="mx-1"
          active-class="primary white--text"
          depressed
          small
          :to="tab.path"
        >
          {{tab.meta.text}}
          <v-icon
            v-if="!tab.meta.affix"
            top
            right
            dark
            x-small
            title="关闭"
            v-text="'mdi-close'"
          />
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
// import path from 'path'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { layoutRoutes } from '@/router/index'

@Component({
  name: 'TagView'
})
export default class extends Vue {
  private affixTags: ITagView[] = []

  get visitedViews () {
    return TagsViewModule.visitedViews
  }

  get routes () {
    return layoutRoutes
  }

  @Watch('$route')
  private onRouteChange () {
    this.addTags()
  }

  mounted () {
    this.initTags()
    this.addTags()
  }

  private filterAffixTags (routes: RouteConfig[]): ITagView[] {
    const tags: ITagView[] = []
    routes.forEach(route => {
      if (route.meta?.affix) {
        const tagPath = route.path
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
    })
    return tags
  }

  private initTags () {
    this.affixTags = this.filterAffixTags(this.routes)
    for (const tag of this.affixTags) {
      if (tag.name) {
        TagsViewModule.addVisitedView(tag)
      }
    }
  }

  private addTags () {
    const { name } = this.$route
    if (name) {
      TagsViewModule.addView(this.$route)
    }
  }
}
</script>

<style>

</style>
