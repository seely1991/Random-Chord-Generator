import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 10,
      qualities: [],
      data: []

    }
    this.updateRows=this.updateRows.bind(this);
    this.updateColumns=this.updateColumns.bind(this);
    this.getChords=this.getChords.bind(this);
    this.updateQualities=this.updateQualities.bind(this);
  }
  updateRows(event) {
    let rows = event.target.value;
    if (rows > 99) {rows = 99}
    this.setState({rows: rows})
    console.log(this.state);
  }
  updateColumns(event) {
    let columns = event.target.value;
    if (columns > 99) {columns = 99}
    this.setState({columns: columns});
    console.log(this.state);
  }
  updateQualities(event) {
    if (event.target.checked == true) {
      let response = this.state.qualities;
      response.push(event.target.value);
      this.setState({qualities: response})
    }else{
      let remove = this.state.qualities.filter(x => x != event.target.value);
      console.log(remove);
      this.setState({qualities: remove})
    }
    console.log(this.state.qualities)
  }
  getChords() {
    const roots = ['A','A','A','B','B','B','C','C','C','D','D','D','E','E','E','F','F','F','G','G','G','A#','Bb','Bb','C#','Db','Db','D#','Eb','Eb','F#','F#','Gb','G#','Ab','Ab'];
    const qualities = ['maj', 'min']
    const getRandomItem = (arr) => {
      const value = arr[Math.floor(Math.random()*arr.length)];
      return (value ? value : '');
    }
    let previousRoot;
    let answerArr = [];
    for (var i=0; i< this.state.rows*this.state.columns; i++) {
      let newRoot = getRandomItem(roots);
      if (previousRoot == newRoot) {
        const rootsWithoutDupes = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C","C#","D","D#","E","F#","G","G#","A","A#","B"];
        newRoot = rootsWithoutDupes[rootsWithoutDupes.indexOf(newRoot) + 1]
      }
      answerArr.push(newRoot + getRandomItem(this.state.qualities));
      previousRoot = newRoot;
    }
    this.setState({
      data: answerArr
    })
  }
  render() {
    return (
      <main>
        <h1>Random Chord Generator</h1>
        <div id="rows">
          <label> rows<input className="rows-cols" type='number' value={this.state.rows} min={1} max={99} onChange={this.updateRows} /></label>
        </div>
        <div id="columns">
          <label> columns<input className="rows-cols" type='number' value={this.state.columns} min={1} max={99} onChange={this.updateColumns} /></label>
        </div>
        <form>
          <label> maj<input type="checkbox" value="maj" onChange={this.updateQualities} /></label>
          <label> min<input type="checkbox" value="min" onChange={this.updateQualities}/></label>
          <label> dim<input type="checkbox" value="dim" onChange={this.updateQualities}/></label>
          <label> aug<input type="checkbox" value="aug" onChange={this.updateQualities}/></label>
          <label> min7<input type="checkbox" value="min7" onChange={this.updateQualities}/></label>
          <label> maj7<input type="checkbox" value="maj7" onChange={this.updateQualities}/></label>
          <label> min7b5<input type="checkbox" value="min7b5" onChange={this.updateQualities}/></label>
          <label> 7<input type="checkbox" value='7' onChange={this.updateQualities}/></label>
        </form>
        <button type='button' onClick={this.getChords}>Get New Chords!</button>
        <Data data={this.state.data} rows={this.state.rows} columns={this.state.columns}/>
      </main>

      )
  }
}

class Data extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data.map(x => <div>{x}</div>);
    const styles = {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + this.props.columns + ', 75px)',
      gridTemplateRows: 'repeat(' + this.props.rows + ', 20px)'
    }
    return (
      <div id="data" style={styles}>
        {data}
      </div>
      )
  }
}

export default App;
