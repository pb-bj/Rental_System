// export const FormInput = ({ register, label, name, errors, type, }) => {
//     return (
//         <div>
//             <label className="m-1">{label}</label>
//             <input type={type} className="form-control shadow-none" {...register(name)} />
//             {errors[name] && <span className="text-danger" style={{ fontSize : '13px'}}>{errors[name].message}</span>}
//         </div>
//     )
// }

export const FormInput = ({ label, type, value, onChange}) => {
    return (
        <div>
            <label className="m-1">{label}</label>
            <input type={type} className="form-control shadow-none" value={value} onChange={onChange} />
        </div>
    )
}