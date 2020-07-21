import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

interface SettingsState {
  drawer?: boolean;
  miniVariant?: boolean;
  miniNav?: boolean;
}

@Module({ store, name: 'settings', namespaced: true, dynamic: true })
class Settings extends VuexModule implements SettingsState {
  public drawer: boolean | undefined = true
  public miniVariant: boolean | undefined = false
  public miniNav: boolean | undefined = true

  @Mutation
  public SET_NAV (payload: SettingsState) {
    if (this.miniNav) {
      this.miniVariant = payload.miniVariant
    } else {
      this.drawer = payload.drawer
    }
  }

  @Mutation
  public SET_MINI_NAV (payload: boolean) {
    this.miniNav = payload
    this.drawer = true
    this.miniVariant = false
  }
}

// const settings = {
//   state: {
//     drawer: true,
//     miniVariant: false,
//     miniNav: true
//   },
//   mutations: {
//     SET_NAV (state: SettingsState, payload: SettingsState) {
//       if (state.miniNav) {
//         state.miniVariant = payload.miniVariant
//       } else {
//         state.drawer = payload.drawer
//       }
//     },
//     SET_MINI_NAV (state: SettingsState, payload: boolean) {
//       state.miniNav = payload
//       state.drawer = true
//       state.miniVariant = false
//     }
//   },
//   actions: {
//   }
// }

export default getModule(Settings)
