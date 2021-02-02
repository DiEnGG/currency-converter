import React, { useState } from 'react'
import '../../assests/css/select.css'

export default function Test(props) {

    const findNameByCurrency = (currency) => {
        return props.data.find(c => {
            return c.id === currency
        });
    }

    const curr = findNameByCurrency(props.value);
    const [currency, setCurrency] = useState({
        curr: curr.id,
        name: curr.currencyName
    });

    const [active, setActive] = useState(false);

    const handleSelectClicked = () => {
        let currentState = active;
        setActive(!currentState);
    }

    const handleSelectedOption = event => {
        props.onSubmit(event.target.id)
        handleSelectClicked();
    }

    let optionTag = [];
    for (let c of props.data) {
        optionTag.push(
            <div className='opt' key={c.id}>
                <input id={c.id} defaultValue={c.currencyName} onClick={handleSelectedOption} />
                <hr />
            </div>
        );
    }

    if(currency.curr !== curr.id){
        setCurrency({curr: curr.id, name: curr.currencyName});
    }
    
    return (
        <div className='class'>
            <div className='selectbox mouseHover' onClick={handleSelectClicked}>
                <h2>{currency.name}</h2>
            </div>
            <div className={active ? 'options active' : 'options'}>
                {optionTag}
            </div>
        </div>
    )
}