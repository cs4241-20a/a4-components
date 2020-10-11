import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

import ListTable from "components/ListTable.js";

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
          <IndexNavbar />

          <section className="relative bg-gray-800 pt-16 pb-32 items-center flex justify-center">

          </section>

          <section className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="container mx-auto">
              <div className="px-4 md:px-10 mx-auto w-full -m-24">
                <div className="flex flex-wrap mt-4">
                  <div className="w-full mb-12 px-4">
                    <ListTable user={this.props.loginUser}/>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </>
    );
  }
}
