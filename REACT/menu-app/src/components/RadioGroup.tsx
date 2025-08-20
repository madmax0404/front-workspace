import type { ChangeEvent } from "react";

export default function RadioGroup(
    {name, id, value, checked, onChange, label}:{name:string, id:string, value:string, checked:boolean, onChange:(e:ChangeEvent<HTMLInputElement>) => void, label:string}
) {
    return (
        <>
            <input type="radio" name={name} id={id} className="form-check-input" value={value} checked={checked} onChange={onChange} />
            <label htmlFor={id} className="form-check-label">{label}</label>
        </>
    )
}