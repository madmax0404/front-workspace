import { createSlice } from "@reduxjs/toolkit";

// createSlice: store에서 관리해야할 상태(state)와, 상태 변경 로직(reducer)을 함께 정의하는 함수.
const counterSlice = createSlice({
    name: "counter", // action의 type에 붙는 접두어
    initialState: {
        value: 0
    },
    /**
     * reducers
     * - Action을 받아서 상태값을 변경하는 함수를 등록하는 영역.
     * - 각 함수 등록시 액션 생성 함수와 액션타입을 자동으로 생성해준다.
     * - 액션 타입은 name/reducers키.
     */
    reducers: {
        increment: (state) => {
            // return {value: state.value + 1};
            // state.value += 1;
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        },
        incrementByAmount(state, action) {
            state.value += action.payload
        },
        decrementByAmount(state, action) {
            state.value -= action.payload
        }
    }
});

// 액션 생성 함수
// - RTK는 reducers의 함수명과 매칭되는 액션함수를 자동으로 생성한다.
export const {increment, decrement, incrementByAmount, decrementByAmount} = counterSlice.actions;

export default counterSlice.reducer; // store 등록용.