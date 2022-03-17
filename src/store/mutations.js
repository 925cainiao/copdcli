const HISTORYQUESTIONNAIREID = 'HISTORYQUESTIONNAIREID'
const QUESTIONNAIREID = 'QUESTIONNAIREID'
export default {
    [HISTORYQUESTIONNAIREID] (state, payload) {
        state.historyQuestionnaireId = payload
    },
    [QUESTIONNAIREID] (state, payload) {
        state.questionnaireId = payload
    }
}
