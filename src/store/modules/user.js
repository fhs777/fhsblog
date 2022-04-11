

export const user = {
    namespaced: true,
    state: () => ({
        account: 'bar'
    }),
    getters: {
      twoBars: state => state.account.repeat(2)
    }
  }