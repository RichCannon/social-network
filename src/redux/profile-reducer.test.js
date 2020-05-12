import React from "react";
import profileReducer, {addPost} from "./profile-reducer";

it('Must add post in state', () => {
    let action = addPost('pupa lupa');
    let state = { //profilePage
        postData:
            [
                {id: 1, message: 'Zdarova, Kisa, kak dela?', likeCount: '15'},
                {id: 2, message: 'Hto? Ya? A da? Nu da', likeCount: '20'}
            ],
    }
    let newState = profileReducer(state, action);
    let newnewState = profileReducer(newState, action);
    expect(newnewState.postData.length).toBe(4);
})