import React, { Component } from 'react'

//Components
import Select from '../select/Select.js'

//styles
import '../../assests/css/conversor.css';
import currency from "../../assests/src/currency.json";

export class Conversor extends Component {
    constructor(props) {
        super(props)

        this.currency = currency

        this.state = {
            'from': 'USD',
            'to': 'EUR',
            'q': '1',
            'result': '?',
            'symbolFrom': '$',
            'symbolTo': '€'

        }
    }

    handleQuantityChange = event => {
        let num = event.target.value.replace(/,/g, '');
        num = num.replace('$', '');
        num = Number(num).toLocaleString(undefined)
        this.setState({
            q: num
        })
    }

    handleFromChange = event => {
        let c = this.currency[event];
        if (c['currencySymbol'] === undefined) {
            this.setState({
                from: event,
                symbolFrom: event
            })
        } else {
            this.setState({
                from: event,
                symbolFrom: c['currencySymbol']
            })
        }
    }

    handleToChange = event => {
        let c = this.currency[event];
        if (c['currencySymbol'] === undefined) {
            this.setState({
                to: event,
                symbolTo: event
            })
        } else {
            this.setState({
                to: event,
                symbolTo: c['currencySymbol']
            })
        }
    }

    handleSubmit = event => {
        let from = this.state.from.toUpperCase();
        let to = this.state.to.toUpperCase();
        let url = new Request(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=ee01d974fc7aeb3cf5f6`);
        event.preventDefault();
        fetch(url)
            .then(response =>
                response.json()
            )
            .then(data => {
                let q = this.state.q.replace(/,/g, '');
                q = q.replace('$', '');
                let num = q * data[`${from}_${to}`];
                this.setState({
                    result: num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                })
            }
            )
            .catch(err => console.log(err))
    }

    handleInvertClicked = () => {
        let aux = this.state.to
        let auxSymbol = this.state.symbolTo
        let auxResult = this.state.result
        this.setState({
            to: this.state.from,
            from: aux,
            symbolTo: this.state.symbolFrom,
            symbolFrom: auxSymbol,
            result: this.state.q,
            q: auxResult
        })
    }

    render() {
        const curr = [];
        for (let c in this.currency) {
            curr.push(this.currency[c]);
        }
        curr.sort(function (a, b) {
            if (a.currencyName > b.currencyName) {
                return 1;
            }
            if (a.currencyName < b.currencyName) {
                return -1;
            }
            return 0;
        });

        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <Select data={curr} value={this.state.from} onSubmit={this.handleFromChange} />

                        <div className='btn double-arrow mouseHover' onClick={this.handleInvertClicked}></div>

                        <Select data={curr} value={this.state.to} onSubmit={this.handleToChange} />
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className='row'>
                        <input className='box mouseHover' type='text' value={this.state.symbolFrom + ' ' + this.state.q} onChange={this.handleQuantityChange} autoFocus />
                        <button type='submit' className='btn arrow mouseHover' ></button>
                        <input className='box mouseHover' value={this.state.symbolTo + ' ' + this.state.result} type='text' disabled />
                    </div>
                </form>
            </div>
        )
    }
}

export default Conversor
