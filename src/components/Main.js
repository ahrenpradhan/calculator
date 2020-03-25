import React from 'react';
import CalculatorButton from "./CalculatorButton"

export default class Main extends React.Component {
    state={
        mainContent: '0',
        operator: null,
        val1 : null,
    };
    handleButtonClicked = (val) => {
        if(!isNaN(val)){
            this.setState((prevState)=>( {mainContent : (prevState.mainContent=="0")? val : prevState.mainContent.toString() + val } ))
        }else if(val=="_<" ){
            this.setState((prevState)=>({mainContent : prevState.mainContent.slice(0,-1)}))
        } else if(val=="+-"){
            this.setState((prevState)=>({mainContent : (-1 * parseFloat(prevState.mainContent)).toString()}))
        } else if(val=='.'){
            if(this.state.mainContent.indexOf('.') == -1){
                this.setState((prevState)=>({mainContent : prevState.mainContent + val}))
            }
        }else if(val=="C" || val=="AC"){
            this.setState({
                mainContent : '0',
                operator : null,
                val1 : null
            })
        } else if(val=="="){
            if(this.state.val1!=null){
                this.setState((prevState) => ({
                    mainContent : this.getResult(prevState.val1,prevState.mainContent,prevState.operator),
                    operator: null,
                    val1:null
                }))
            }
        } else {
            if(this.state.mainContent.indexOf('.')!=this.state.mainContent.length-1){
                this.setState((prevState)=>{
                    if(prevState.mainContent!='0'){
                        return {
                            mainContent: '0',
                            operator : val,
                            val1 : (!!prevState.val1)?this.getResult(prevState.val1,prevState.mainContent,prevState.operator) : prevState.mainContent
                        }
                    }
                    return {
                        operator: val
                    }
                })
            }
        }
    };

    getResult(x,y,z){
        x = parseFloat(x);
        y = parseFloat(y);
        switch(z){
            case "+": return (x+y).toString();
            case "-": return (x-y).toString();
            case "*": return (x*y).toString();
            case "/": return (x/y).toString();
        }
    };
    render() {
        return (
            <div className="Main">
                <div className="Main--output">
                    <div className="Main--answer">
                        {this.state.val1} {this.state.operator} {this.state.mainContent}_
                    </div>
                    <div className="Main--answer__button">
                        <CalculatorButton value={'+-'} handleButtonClicked={this.handleButtonClicked} />
                        <CalculatorButton value={'_<'} handleButtonClicked={this.handleButtonClicked} />
                        <CalculatorButton value={(!!this.state.val1)?"AC":"C"} handleButtonClicked={this.handleButtonClicked} />
                    </div>
                </div>
                <table className="Main--input">
                    <tbody>
                        <tr>
                            <td><CalculatorButton value={'1'} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={'2'} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={"3"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={'+'} handleButtonClicked={this.handleButtonClicked} /></td>
                        </tr>
                        <tr>
                            <td><CalculatorButton value={"4"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={"5"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={"6"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={'-'} handleButtonClicked={this.handleButtonClicked} /></td>
                        </tr>
                        <tr>
                            <td><CalculatorButton value={"7"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={"8"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={"9"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={'*'} handleButtonClicked={this.handleButtonClicked} /></td>
                        </tr>
                        <tr>
                            <td><CalculatorButton value={'.'} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={"0"} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={'='} handleButtonClicked={this.handleButtonClicked} /></td>
                            <td><CalculatorButton value={'/'} handleButtonClicked={this.handleButtonClicked} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

    // state={
    //     content: 0,
    //     data: [],
    //     operator : null,
    // };
    // handleButtonClicked = (current) => {
    //     if(current=='C'){
    //         this.setState(()=>({
    //             content: 0,
    //             data: [],
    //             operator : null,
    //         }))
    //     }else if((!isNaN(current) || current==".") && !isNaN(this.state.content)){
    //         const u = (current==".")?".0":current;
    //         const t = this.state.content.toString() + u;
    //         console.log(this.state.content + "---" + t)
    //         this.setState(()=>({'content': parseFloat(t)}));
    //     }else{
    //         this.state.data.push(this.state.content);
    //         if(current!='='){
    //             if(this.state.data.length==2){
    //                 const ans = this.getResult(this.state.data[0], this.state.data[1], this.state.operator)
    //                 this.setState(()=>({
    //                     content : 0,
    //                     data: [ans],
    //                     operator : current
    //                 }))
    //             } else {
    //                 const t = this.state.content
    //                 this.setState(()=>({
    //                     content:0,
    //                     data:[t],
    //                     operator:current
    //                 }))
    //             }
    //         } else{
    //             if(this.state.data.length<=1){
    //                 const t = this.state.content
    //                 this.setState(()=>({
    //                     content: t,
    //                     data: [],
    //                     operator : null,
    //                 }))
    //             } else {
    //                 const ans = this.getResult(this.state.data[0], this.state.data[1], this.state.operator)
    //                 this.setState(()=>({
    //                     content: ans,
    //                     data: [],
    //                     operator : null,
    //                 }))
    //             }
    //         }
    //     }
    // }