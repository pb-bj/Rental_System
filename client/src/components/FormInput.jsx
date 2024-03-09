export const FormInput = ({ label, type, value, onChange}) => {
    return (
        <div>
            <label className="m-1">{label}</label>
            <input type={type} className="form-control shadow-none" value={value} onChange={onChange} />
        </div>
    )
}