import React from 'react';
import Modal from 'react-modal';

let customStyles;

if (window.screen.width >= 1280) {
  customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)',
      border: '',
      padding: '',
      borderRadius: ''
    }
  };
} else {
  customStyles = {
    content : {
      top: '70px',
      border: '',
      padding: '',
      borderRadius: ''
    }
  };
}


Modal.setAppElement('#root');

export default function AddModal(props) {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  function doAdd(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const ps = document.getElementById("ps").value;
    const ms = document.getElementById("ms").value;
    const ss = document.getElementById("ss").value;
    const es = document.getElementById("es").value;

    fetch('/add', {
      method:'POST',
      body: JSON.stringify({
        name: name,
        date: date,
        ps: ps,
        ms: ms,
        ss: ss,
        es: es
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      props.recall();
      closeModal();
    });
  }

  return (
    <>
      <button className="bg-gray-900 text-white active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}>
        <i className="fas fa-plus"></i> Add
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit"
      >

        <div className="bg-gray-300 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">New Movie</h6>
            </div>
          </div>

          <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase"></h6>

          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={doAdd}>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      id="name"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Date Watched
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      defaultValue={
                        (new Date()).toLocaleDateString().split("/")[2] + '-' +
                        (new Date()).toLocaleDateString().split("/")[0] + '-' +
                        (new Date()).toLocaleDateString().split("/")[1]
                      }
                      id="date"
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-gray-400" />

              <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase"></h6>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Plot Score
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      id="ps"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Meaning Score
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      id="ms"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Sound Score
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      id="ss"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Enjoyment Score
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      id="es"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit">
                  Add
                </button>&nbsp;

                <button
                  className="bg-gray-300 text-black active:bg-gray-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                }}>Cancel
                </button>
              </div>

            </form>
          </div>
        </div>

      </Modal>
    </>
  );
}
