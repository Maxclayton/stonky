import React from "react";
import Plot from "react-plotly.js";
import FadeIn from 'react-fade-in';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXvalues: [],
      stockChartYvalues: [],
      messagePos: "increase",
      messageNeg: "decrease"
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = "6BD4CACW3019J9SF";
    let StockSymbol = "AMC";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["4. close"]
          );
        
        }

        
        pointerToThis.setState({
          newValX: stockChartXValuesFunction.join("\n"),
          newValY: stockChartYValuesFunction.join("\n"),
          percent: (stockChartYValuesFunction[0] - stockChartYValuesFunction[1]) / stockChartYValuesFunction[1] * 100,
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          
        });
        
      });
      
  }
  render() {
    return (
      <div className="holder">
        <FadeIn>
        <div className="text2">
          <h1 className="page-title">
           
            <span style={{color: this.state.percent > "0" ? "Green" : "Red"}}>$</span>AMC
          </h1>
        </div>
        <Plot
          className="graph"
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "green" },
              
            },
          ]}
        />
        

        <h1 className="title">Prices reflect price at time of closing </h1>
       
        <div className="percent"style={{color: this.state.percent > "0" ? "Green" : "Red"}}>
          There is a {Math.round(this.state.percent)}% {this.state.percent > "0" ? this.state.messagePos : this.state.messageNeg} since the previous day.</div>
        <div className="text1">
          <div className="xval">{this.state.newValX}</div>
          <div className="yval" >{this.state.newValY}</div>
        
        </div>
        </FadeIn>
      </div>
    );
  }
}

export default Stock;
