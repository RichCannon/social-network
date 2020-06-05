const SEND_MESSAGE = 'my-app/dialogs/SEND-MESSAGE';

let initialState = { //dialogs
    messageData: [
        {
            id: 1,
            name: 'Jack Stauber',
            imgURL: 'https://7lafa.com/musicians/jack_stauber.jpg',
            message: ['Hello']
        },
        {
            id: 2,
            name: 'Mac DeMarco',
            imgURL: 'https://media.gq.com/photos/5ca78f84e03e8148480e5219/master/w_1600%2Cc_limit/mac-demarco-gq-may-2019-02.jpg',
            message: [`How ya doin'`]
        }
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            return  {
                ...state,
                messageData: state.messageData.map(m => {
                    if (m.id === action.id) {
                        return {...m, message: [...m.message, action.currentMessage]};
                    } else {
                        return {...m, message: [...m.message]};
                    }
                })
            };
        }
        default:
            return state;
    }
}

export const sendMessage = (id, currentMessage) => ({
    type: SEND_MESSAGE,
    id,
    currentMessage
})


export default dialogsReducer;