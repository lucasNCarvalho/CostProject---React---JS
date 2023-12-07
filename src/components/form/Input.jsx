import styles from "./input.module.css";

const Input = ({ type, text, name, placeHolder, handleOnChange, value }) => {
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeHolder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export default Input;