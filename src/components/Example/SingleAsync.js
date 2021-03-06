import React, { Component } from 'react'
import Selectbox from "../Global/Selectbox"

export default class SingleAsync extends Component {
    constructor(props){
        super(props)
        this.state = { value: 4 }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (val){
        const value = val == null ? null : val.value
        this.setState({ ...this.state, value: value })
    }

    getOptions(input, callback) {
        return fetch(`https://reqres.in/api/users?delay=1&per_page=20`)
            .then((response) => {
                return response.json()
            }).then((json) => {
                const data = json.data
                const options = data.map((v) => {
                return { 
                    value: v.id, 
                    label: `${v.first_name} ${v.last_name}`
                }
            })
            return { options: options }
        })
    }

    render(){
        const value = this.state.value

        return (
            <div>
                <Selectbox
                    isAsync={true}
                    classNameSelect="custom-select"
                    label="Single Async"
                    name="SingleAsync"
                    value={value}
                    onChange={this.handleChange}
                    loadOptions={this.getOptions} />
            </div>
        )
    }
}
