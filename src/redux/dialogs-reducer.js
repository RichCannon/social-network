const SEND_MESSAGE = 'my-app/dialogs/SEND-MESSAGE';

let initialState = { //dialogs
    messageData: [
        {
            id: 1,
            name: 'Chpekun',
            imgURL: 'https://sun9-60.userapi.com/c841621/v841621742/41562/b_hg5W14Mio.jpg',
            message: ['Kak zhe hochetsya...']
        },
        {
            id: 2,
            name: 'Lyaseg',
            imgURL: 'https://sun9-60.userapi.com/c856128/v856128830/609c0/Ma8ekfEy168.jpg',
            message: ['zarabativayu 300k sec']
        },
        {
            id: 3,
            name: 'Pukicj',
            imgURL: 'https://sun9-6.userapi.com/c631426/v631426535/173b/KFLNPAcI3K8.jpg',
            message: ['*/me raskrivayu fantik*']
        },
        {
            id: 4,
            name: 'Tyanochka',
            imgURL: 'https://sun9-21.userapi.com/c627431/v627431683/350a7/6YwWDNXJZio.jpg',
            message: ['pokazhi chlen']
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