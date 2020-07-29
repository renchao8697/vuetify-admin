import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

export interface ITagView extends Partial<Route> {
  title?: string
}

export interface ITagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | undefined)[]
}

@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = []
  public cachedViews: (string | undefined)[] = []

  @Mutation
  private ADD_VISITED_VIEW (view: ITagView) {
    if (this.visitedViews.some(v => v.path === view.path) || !view.meta.tagView) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.text || ''
      })
    )
  }

  @Mutation
  private ADD_CACHED_VIEW (view: ITagView) {
    if (view.name === null) return
    if (this.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name)
    }
  }

  @Mutation
  private DEL_VISITED_VIEW (view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW (view: ITagView) {
    if (view.name === null) return
    const index = this.cachedViews.indexOf(view.name)
    index > -1 && this.cachedViews.splice(index, 1)
  }

  @Mutation
  private DEL_ALL_VISITED_VIEW () {
    this.visitedViews = this.visitedViews.filter(view => view.meta.affix)
  }

  @Mutation
  private DEL_ALL_CACHED_VIEW () {
    this.cachedViews = this.visitedViews.map(v => v.name || '')
  }

  @Mutation
  private DEL_OTHER_VISITED_VIEW (view: ITagView) {
    this.visitedViews = this.visitedViews.filter(v => v.meta.affix || v.path === view.path)
  }

  @Mutation
  private DEL_OTHER_CACHED_VIEW () {
    this.cachedViews = this.visitedViews.map(v => v.name || '')
  }

  @Action
  public addView (view: ITagView) {
    this.ADD_VISITED_VIEW(view)
    this.ADD_CACHED_VIEW(view)
  }

  @Action
  public addVisitedView (view: ITagView) {
    this.ADD_VISITED_VIEW(view)
  }

  @Action
  public delView (view: ITagView) {
    this.DEL_VISITED_VIEW(view)
    this.DEL_CACHED_VIEW(view)
  }

  @Action
  public delCachedView (view: ITagView) {
    this.DEL_CACHED_VIEW(view)
  }

  @Action
  public delAllView () {
    this.DEL_ALL_VISITED_VIEW()
    this.DEL_ALL_CACHED_VIEW()
  }

  @Action
  public delOtherView (view: ITagView) {
    this.DEL_OTHER_VISITED_VIEW(view)
    this.DEL_OTHER_CACHED_VIEW()
  }
}

export const TagsViewModule = getModule(TagsView)
