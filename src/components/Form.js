import React from 'react'

const Form = (props) => {
    return (
        <form onSubmit={props.search}>
            <input type="text" value={props.value} onChange={props.change} />
            <button>Zobacz</button>
        </form>
    );
}

export default Form;