import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Dropdown from 'components/TableDropdown';
import AddModal from 'components/AddModal';


export default class ListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  load() {
    fetch('/list', {method: 'get'})
      .then(response => response.json())
      .then(result => {

        let data = result;

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
          data[i].n = i + 1;
          sum += parseFloat(data[i].score);
        }

        this.setState({ data: data });
      });
  }

  delete(id) {
    alert(id);
  }

  renderBody = (entry) => {
    return (
      <tr key={entry.id}>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
          <span
            className={
              "ml-3 font-bold " + (this.props.color === "light" ? "text-gray-700" : "text-white")
            }
          >
            {entry.n}
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          {this.htmlDecode(entry.name)}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          {entry.score}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          {entry.date}
        </td>

        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
          <Dropdown entry={entry}
                    recall={this.load}
          />
        </td>

      </tr>
    );
  };

  render() {

    const data = this.state.data;

    const tableBody = data.map(this.renderBody);

    return (
      <>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (this.props.color === "light" ? "bg-white" : "bg-blue-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (this.props.color === "light" ? "text-gray-800" : "text-white")
                  }
                >
                  <AddModal recall={this.load}/>

                  &nbsp;&nbsp;

                  <Link to={"/profile/" + this.props.user} target="_blank">
                    <button
                      className="bg-gray-300 text-black active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button">
                      Profile Page
                    </button>
                  </Link>

                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  #
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Title
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  ★
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                ></th>
              </tr>
              </thead>
              <tbody>
              {tableBody}
              </tbody>
            </table>
          </div>
        </div>

      </>
    );
  }

};

ListTable.defaultProps = {
  color: "light",
};

ListTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
