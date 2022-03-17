import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        historyQuestionnaireId: '',  // 选中历史问卷调查id
        questionnaireId: '' // 新建问卷调查id
    },
    mutations
})
