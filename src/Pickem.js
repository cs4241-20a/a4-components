import React from 'react'


class Pickem extends React.Component {
    // our .render() method creates a block of HTML using the .jsx format
    render() {
      let tempData = {}
      tempData["winner"] = "Winner"
      for (let i = 1; i < 5; i++){
          if (i<3){
            tempData["final"+i] = "Final " + i;
          }
          tempData["semi"+i] = "Semis " + i;
      }
      let _data = this.props.data
      console.log(_data)
      Object.keys(_data).forEach(function(key) {
        tempData[key] = _data[key].shortName;
      })


      let table = <table class = "container">
                    <tr>
                        <td id = "seed1" class = "team">{tempData["seed1"]}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td id = "seed5" class = "team">{tempData["seed5"]}</td>
                    </tr>
                
                    <tr>
                        <td></td>
                        <td id = "semi1" class = "team">{tempData["semi1"]}</td>
                        <td></td><td></td><td></td>
                        <td id = "semi3" class = "team">{tempData["semi3"]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id = "seed2" class = "team">{tempData["seed2"]}</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed6" class = "team">{tempData["seed6"]}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td id = "final1" class = "team">{tempData["final1"]}</td>
                        <td></td>
                        <td id = "final2" class = "team">{tempData["final2"]}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id = "seed3" class = "team">{tempData["seed3"]}</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed7" class = "team">{tempData["seed7"]}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td id = "semi2" class = "team">{tempData["semi2"]}</td>
                        <td></td>
                        <td id = "winner" class = "team">{tempData["winner"]}</td>
                        <td></td>
                        <td id = "semi4" class = "team">{tempData["semi4"]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id = "seed4" class = "team">{tempData["seed4"]}</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed8" class = "team">{tempData["seed8"]}</td>
                    </tr>
                    </table>
  
  
      
      return table
    }
    
  }

  export default Pickem;