import React from 'react';
import './CSVButton.css';

class CSVButton extends React.Component {
  render(){
    return (
        <button className="csv_button button is-link" onClick={handle_csv}>Download as CSV</button>
    );
  }
}


/**
 * Downloads all of the current user's stats from the database as a CSV
 * file called "stats.csv".
 */
function handle_csv(){
    /*
     * This source explained to me that you can't just use the "Content-Disposition"
     * header to download files from GET requests:
     * https://stackoverflow.com/questions/26737883/content-dispositionattachment-not-triggering-download-dialog
     *
     * The top answer from the following source taught me how to download
     * a file using fetch. It essentially says to download the response,
     * get the blob with the file data, create a URL to it, and then create
     * an <a> element that, when clicked, downloads the object at the URL,
     * which is our file. The code between lines 140-151 comes from this source,
     * and the comments that start with "OA" are comments from the original post
     * by that Original Author. The original post used arrow shorthand notation
     * but I changed cause I didn't like it :)
     *
     * https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
     */
    fetch( '/csv', {
        method:'GET'
    }).then(function(response){
        return response.blob()
    })
        .then(function(blob) {
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = "stats.csv";
            document.body.appendChild(a);// OA: we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();// OA: afterwards we remove the element again
        });
}

export default CSVButton;