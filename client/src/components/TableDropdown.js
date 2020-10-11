import React from "react";
import { createPopper } from "@popperjs/core";
import EditModal from "./EditModal";

export default function Dropdown(props) {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-gray-600 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >

          <EditModal entry={props.entry}
                     closeDropdown={closeDropdownPopover}
                     recall={props.recall}
          />

        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => {
            e.preventDefault();

            if (window.confirm('Are you sure to delete?')) {
              fetch('/del', {
                method:'POST',
                body: JSON.stringify({
                  id: props.entry.id
                }),
                headers: { 'Content-Type': 'application/json' }
              }).then(() => {
                props.recall();
              });
            }
          }}
        >
          Delete
        </a>
      </div>
    </>
  );
};
