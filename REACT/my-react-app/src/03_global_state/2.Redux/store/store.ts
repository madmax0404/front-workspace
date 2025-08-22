/**
 * #1. Redux
 *  - 리액트를 통한 복잡한 전역 상태 관리시 자주 사용되는 라이브러리(가장 많이 쓰임). 쉽게 만든 버전: Redux Tool Kit
 *  - Redux는 장바구니, 실시간 알림, 인증 상태 및 권한 등을 관리하며, 컴포넌트 단위로 관리되어야 하는 일반 state 값들은 Redux로 관리하지 않는다.
 * 
 * #2. Redux의 구성요소
 *  1) Store(저장소)
 *   - Redux에서 관리하는 전역 상태를 보관하는 중앙 저장소.
 *   - 어플리케이션에서 "유일"하도록 설정해야 한다.
 *  2) State(상태값)
 *   - Store에 저장된 상태값. (글로벌 상태값).
 *   - 이 상태값은 읽기 전용이며, 직접 변경할 수 없다.
 *  3) Action(명령 객체) / Action Creator(액션 생성 함수)
 *   - 액션은 store에 상태값을 변경하는 요청을 담은 객체.
 *   - 액션 객체의 타입: {type:string, payload?: any}
 *   - 액션 객체는 객체로 표현되며 반드시 type을 가져야 한다.
 *   - 액션 생성 함수를 통해 액션 객체를 생성할 수 있다.
 *  4) Reducer(상태 변경 함수)
 *   - Action을 받아서 상태값을 변경하는 함수.
 *   - (oldState, payload) => newState
 *   - RTK에서는 Reducer와 Action, Action Creator를 함께 정의하는 createSlice 기능을 제공.
 *  5) Dispatch(Action 전송 함수)
 *   - Action을 Store에 전달하는 함수.
 *   - Dispatch를 통해 Action이 전달되면 Action에 정의한 Reducer가 호출된다.
 *  6) Selector(구독)
 *   - Store에 저장된 상태값을 꺼내오는 함수.
 * 
 * #3. Redux의 동작흐름
 *  1) 사용자가 이벤트(click, submit, onchange 등등)를 호출하여 Action Creator가 호출되고, 이로 인해 Action이 생성된다.
 *  2) 생성된 Action은 반드시 dispatch 함수를 통해 store로 전달.
 *     ex) dispatch(actionCreator(payload))
 *  3) Store에서는 Action과 일치하는 reducer를 선별하여, payload를 전달 후 상태 변경 로직을 실행.
 *  4) Reducer는 상태 변경 로직의 결과인 새로운 state를 store에 반환한다.
 *  5) Store는 변경된 state를 저장하고, 이를 구독중인 컴포넌트들에게 알려준다.
 *  6) 구독컴포넌트들은 전역 상태값이 변경시 재 렌더링 된다.
 */

import { configureStore } from "@reduxjs/toolkit";
import counter from "../features/counterSlice";
import todos from "../features/todoSlice";

// store 생성
export const store = configureStore({
    reducer: { // 스토어에 저장할 상태값을 관리하는 리듀서.
        counter,
        todos
    }
});

export type RootState = ReturnType<typeof store.getState>;