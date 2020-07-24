import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

export interface ITagView extends Partial<Route> {
  title?: string;
}

export interface ITagsViewState {
  visitedViews: ITagView[];
}

@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = []

  @Mutation
  private ADD_CACHED_VIEW (view: ITagView) {
    if (this.visitedViews.some(v => v.path === view.path) || !view.meta.tagView) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.text || ''
      })
    )
  }

  @Action
  public addView (view: ITagView) {
    this.ADD_CACHED_VIEW(view)
  }

  @Action
  public addVisitedView (view: ITagView) {
    this.ADD_CACHED_VIEW(view)
  }
}

export const TagsViewModule = getModule(TagsView)
