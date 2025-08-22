import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { increment, decrement, incrementByAmount, decrementByAmount } from "../features/counterSlice";

export default function Counter() {
    // useSelector
    // - 스토어의 상태를 반환하는 함수.
    // - 반환값은 RootState로 정의하여 추출
    const count = useSelector((state:RootState) => state.counter);
    const dispatch = useDispatch(); // 스토어에 액션객체를 전송하는 함수.

    return (
        <div>
            <div>
                <button type="button" onClick={() => dispatch(increment())}>+</button>
                <button type="button" onClick={() => dispatch(decrement())}>-</button>
                <button type="button" onClick={() => dispatch(incrementByAmount(10))}>+10</button>
                <button type="button" onClick={() => dispatch(decrementByAmount(10))}>-10</button>
                <p>{count.value}</p>
            </div>
        </div>
    )
}