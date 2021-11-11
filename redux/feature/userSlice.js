import { createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

//modernizr's approach
function testForLocal(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

let biscuit = null;
if (testForLocal() && localStorage.getItem('user')) biscuit = JSON.parse(localStorage.getItem('user'));
else if (Cookie.get('user')) biscuit = JSON.parse(Cookie.get('user')); 


export const userSlice = createSlice({
    name: 'User',
    initialState: {
        value: biscuit
    },
    reducers: {
        login: (state, action) => {
            // console.log(JSON.stringify(action.payload))
            Cookie.set('user', JSON.stringify(action.payload), {expires: 7});
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.value = action.payload;
            // console.log(action, state.value, biscuit)
        },
        logout: (state) => {
            state.value = null;
            Cookie.remove('user');
            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;