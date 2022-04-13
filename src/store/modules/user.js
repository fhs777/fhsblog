

export const user = {
    namespaced: true,
    state: () => ({
      loginState: false,
      user_name: '',
      user_id: '',
      address: '',
      equipment: '',

    }),

    getters: {
      twoBars: state => state.account.user_name(2)
    },

    mutations: {
      userInfoSet(state, params) {
        state.user_name = params.user_name
        state.user_id = params.user_id
        state.address = params.address
        state.equipment = params.equipment       
      },

      loginStateChange(state, status) {
        state.loginState = status
      },

      initUserInfo(state) {
        state.user_name=''
        state.user_id= ''
        state.address= '浙江省嘉兴市'
        state.equipment= 'chrome'
      }
    }
    
  }