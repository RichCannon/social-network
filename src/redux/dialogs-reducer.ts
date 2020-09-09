

const SEND_MESSAGE = 'my-app/dialogs/SEND-MESSAGE'




type DialogType = {
    id: number
    name:string
    imgURL: string
    message: Array<string>
}

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
    ] as Array<DialogType>
};

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:ActionCreatorsType):InitialStateType => {

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

type ActionCreatorsType = SendMessageType

type SendMessageType = {
    type: typeof SEND_MESSAGE
    id: number,
    currentMessage: string
}

export const sendMessage = (id:number, currentMessage:string):SendMessageType => ({
    type: SEND_MESSAGE,
    id,
    currentMessage
})


export default dialogsReducer;
