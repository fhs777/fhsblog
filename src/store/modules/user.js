

export const user = {
    namespaced: true,
    state: () => ({
      loginState: false,
      user_name: '',
      user_id: '',
      user_ip: '',
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
      },

      userIpSet(state, ip) {
        state.user_ip = ip
      },

      userAddressSet(state, address) {
        state.address = address
      },

      userequipmentSet(state, equipment) {
        state.equipment = equipment
      },

      loginStateChange(state, status) {
        state.loginState = status
      },

      initUserInfo(state) {
        state.user_name=''
        state.user_id= ''
        state.address= ''
        state.equipment= ''
      }
    }
    
  }