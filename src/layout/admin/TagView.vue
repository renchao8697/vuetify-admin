<template>
  <v-sheet
    class="py-1 mx-n4"
    max-width="100%"
  >
    <v-slide-group show-arrows>
      <v-slide-item
        v-for="tag in visitedViews"
        :key="tag.path"
      >
        <v-btn
          class="mx-1 pa-3 text-caption text-none"
          active-class="primary white--text"
          depressed
          x-small
          :to="tag.path"
          @contextmenu="openMenu(tag, $event)"
        >
          {{tag.meta.text}}
          <v-icon
            v-if="!isAffix(tag)"
            top
            right
            dark
            x-small
            title="关闭"
            v-text="'mdi-close'"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </v-btn>
      </v-slide-item>
    </v-slide-group>

    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list dense>
        <v-list-item dense @click="refreshSelectedTag(selectedTag)">
          <v-list-item-title>刷新</v-list-item-title>
        </v-list-item>
        <v-list-item dense @click="closeSelectedTag(selectedTag)" v-if="!isAffix(selectedTag)">
          <v-list-item-title>关闭</v-list-item-title>
        </v-list-item>
        <v-list-item dense @click="closeOtherTag(selectedTag)">
          <v-list-item-title>关闭其他</v-list-item-title>
        </v-list-item>
        <v-list-item dense @click="closeAllTag(selectedTag)">
          <v-list-item-title>关闭所有</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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

  private showMenu = false
  private x = 0
  private y = 0
  private selectedTag: ITagView = {}

  private openMenu (tag: ITagView, e: MouseEvent) {
    this.selectedTag = tag

    e.preventDefault()
    this.showMenu = false
    this.x = e.clientX
    this.y = e.clientY
    this.$nextTick(() => {
      this.showMenu = true
    })
  }

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

  private isActive (route: ITagView) {
    return route.path === this.$route.path
  }

  private isAffix (tag: ITagView) {
    return tag.meta?.affix
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
    return false
  }

  private closeSelectedTag (view: ITagView) {
    TagsViewModule.delView(view)
    if (this.isActive(view)) {
      this.toLastView(TagsViewModule.visitedViews, view)
    }
  }

  private toLastView (visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath)
    } else {
      if (view.name === 'Dashboard') {
        this.$router.replace({ path: '/redirect' + view.fullPath })
      } else {
        this.$router.push('/')
      }
    }
  }

  private refreshSelectedTag (tagView: ITagView) {
    TagsViewModule.delCachedView(tagView)
    const { fullPath } = tagView
    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + fullPath
      })
    })
  }

  private closeOtherTag (tagView: ITagView) {
    TagsViewModule.delOtherView(tagView)
    if (!this.isActive(tagView)) {
      this.toLastView(TagsViewModule.visitedViews, tagView)
    }
  }

  private closeAllTag (tagView: ITagView) {
    TagsViewModule.delAllView()
    this.toLastView(this.visitedViews, tagView)
  }
}
</script>

<style>

</style>
