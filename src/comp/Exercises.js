import React from 'react';

class Exercises extends React.Component {
    render() {
        let keys = Object.keys(this.props.buddy.state.exercises);
        let exercises = [];
        for (let i=0; i<keys.length; i++) {
            let row = (
                <tr key={'key'+i}>
                    <td>{keys[i]}</td>
                    <td><input type="number" id={'amount'+i} value={this.props.buddy.state.exercises[keys[i]]} onChange={()=>{
                            let shallowCopy = Object.assign({}, this.props.buddy.state.exercises);
                            shallowCopy[keys[i]] = document.getElementById('amount'+i).value;
                            this.props.buddy.setState({
                                exercises: shallowCopy
                            });
                    }}></input></td>
                    <td><div className="BigButton" onClick={()=>{
                            // delete this exercise from buddy.state 
                            let shallowCopy = Object.assign({}, this.props.buddy.state.exercises);
                            delete shallowCopy[keys[i]];
                            this.props.buddy.setState({
                                exercises: shallowCopy
                            });
                        }}>Delete</div></td> 
                </tr>
            );
            exercises.push(row);
        }

        return (
            <div>
                <h1>Exercises</h1>
                <table className="padded">
                    <thead>
                        <tr>
                            <td>Exercise</td>
                            <td>Amount</td>
                            <td></td>
                        </tr>
                        {exercises}
                        <tr>
                            <td><input type="text" id="addName"></input></td>
                            <td><input type="number" id="addAmount"></input></td>
                            <td><div className="BigButton" onClick={()=>{
                                let name = document.getElementById('addName').value;
                                let amount = document.getElementById('addAmount').value;
                                let shallowCopy = Object.assign({}, this.props.buddy.state.exercises);
                                shallowCopy[name] = amount;
                                this.props.buddy.setState({
                                    exercises: shallowCopy
                                });
                            }}>Add</div></td>
                        </tr>
                    </thead>
                </table>
                <br/>
                <p>You can save your exercise data to a cookie, for the next time you use the program.</p>
                <div className="BigButton" onClick={()=>{
                    let data = '';
                    let keys = Object.keys(this.props.buddy.state.exercises);
                    keys.forEach((key)=>{
                        if (data.length > 0) data += '|';
                        data += key.replace(' ', '_') + '#' + this.props.buddy.state.exercises[key];
                    });
                    document.cookie = 'bodybuildingbuddy_ex=' + data + '; expires=' + new Date(new Date().getTime() + 1000*3600*24*365*2).toUTCString();
                }}>Save to Cookie</div>
                <div className="BigButton" onClick={()=>{
                    document.cookie = 'bodybuildingbuddy_ex=OMNOMNOM; expires=' + new Date(new Date().getTime() - 1000*3600*24*365*2).toUTCString();
                }}>Delete Cookie</div>
            </div>
        );
    }
}

export default Exercises;