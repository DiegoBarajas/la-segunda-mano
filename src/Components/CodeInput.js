import React, { useEffect } from 'react'
import '../Styles/Components/CodeInput.css'

const CodeInput = ({ length=6, code, setCode }) => {


    useEffect(() => {
        const changeFocus = () => {
            if(code.length === length) return;

            const input = document.querySelector(`#input-code-${code.length}`);
            input.focus();
        }    

        changeFocus();
    }, [code, length]);

    const handleUpdateCode = (e) => {
        const { value } = e.target;

        if (/^[0-9]*$/.test(value)) {
            let codigo = code+value;
            setCode(codigo);
        }
    }

    const handleKeyDown = (e) => {
        const { key } = e;

        if((key === 'Backspace') || (key === 'Delete')){
            const newCode = code.slice(0, -1)
            setCode(newCode);
        }
    }

    return (
        <section className='code-input-container'>
            <label className='code-input-label' htmlFor={`input-code-${code.length}`}><b>Codigo:</b></label>
            <section className='code-inputs'>
                {
                    Array.from({ length }, (_, index) => (
                        <input
                            id={`input-code-${index}`}
                            autoFocus={index===0}
                            key={`input-code-${index}`}
                            className='code-input'
                            maxLength='1'
                            type='text'
                            onChange={handleUpdateCode}
                            onKeyDown={handleKeyDown}
                            inputMode='numeric'

                            value={code.charAt(index)}
                        />                
                    ))
                }
                
                <input type='hidden' value={code} name='code'/>
            </section>
        </section>
    )
}

export default CodeInput