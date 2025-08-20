import { useState, type ChangeEvent } from "react";

const useInput = <T extends object>(init:T):[T, (e:ChangeEvent<HTMLInputElement>) => void, () => void] => {
    const [obj, setObj] = useState<T>(init);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setObj({...obj, [name]:value});
    };
    const resetForm = () => setObj(init);

    return [obj, handleChange, resetForm];
};

export default useInput;