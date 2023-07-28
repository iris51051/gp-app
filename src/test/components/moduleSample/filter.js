import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown, Input, Menu,Affix } from "antd";
import { DownOutlined } from "@ant-design/icons";

const CheckboxGroup = Checkbox.Group;

const DropdownFilter = ({ name, options, onValueChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([...options.map(option => option.value),"selectAll"]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    onValueChange(selectedOptions);
  }, [selectedOptions, onValueChange]);

  let clickSel = "";

  const setSelect = (event) => {
    clickSel = event.target.value;
  };

  const handleCheckboxChange = (checkedValues) => {
    if (
      checkedValues.filter((option) => option !== "selectAll").length ===
      options.length
    ) {
      setSelectedOptions([...checkedValues, "selectAll"]);
    } else if (filteredOptions.length === options.length) {
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );
    } else {
      if (selectedOptions.includes(clickSel))
        setSelectedOptions(
          selectedOptions.filter(
            (option) => option !== clickSel && option !== "selectAll"
          )
        );
      else {
        if (selectedOptions.length === options.length - 1) {
          setSelectedOptions([...selectedOptions, clickSel, "selectAll"]);
        } else {
          setSelectedOptions([...selectedOptions, clickSel]);
        }
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
    if (!visible) {
      setSearchValue("");
    }
  };

  const handleSelectAll = (e) => {
    const allOptionValues = options.map((option) => option.value);
    const allSelected = selectedOptions.includes("selectAll");
    if (allSelected) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...allOptionValues, "selectAll"]);
    }
  };

  const filteredOptions = options.filter((option) =>
  typeof option.name === "string" &&
  option.name.toLowerCase().includes(searchValue.toLowerCase())
);

const modifiedOptions = options.map((option) => ({
  label: option.name,
  value: option.value,
}));

  const menu = (
    <div className="FilterDiv">
      <Menu>
        <Menu.Item key="search">
          <Input
            className="Searcher"
            placeholder="검색"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ color: "black", width:'241.828px',display: "flex", }}
          />
        </Menu.Item>
        {!searchValue && (
          <Menu.Item key="selectAll">
            <Checkbox
              style={{
                  display: "flex",
                  width : 'auto',
               }}
              checked={selectedOptions.length === options.length + 1}
              indeterminate={
                selectedOptions.length > 0 &&
                selectedOptions.length < options.length + 1
              }
              onChange={handleSelectAll}
            >
           전체 선택
            </Checkbox>
          </Menu.Item>
        )}
        <Menu.Divider style={{ marginTop: -4 }} />
        {filteredOptions.length === 0 ? (
          <div style={{ marginLeft: 10 }}>검색 결과 없음.</div>
        ) : (
          <div onClick={setSelect}>
          <CheckboxGroup
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          className="adCheckboxGroup"
          options={modifiedOptions}
          value={selectedOptions.filter((value) => value !== "selectAll")}
          onChange={handleCheckboxChange}
        />
        </div>
        )}
      </Menu>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      open={dropdownVisible}
      onOpenChange={handleDropdownVisibleChange}
      trigger={["click"]}
      className="FilterDropdown"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Input
          className="Filterdisp"
          size="small"
          value={`${name} 선택 (${
            selectedOptions.length > options.length
              ? selectedOptions.length - 1
              : selectedOptions.length
          }/${options.length})`}
          onClick={() => setDropdownVisible(!dropdownVisible)}
          readOnly

        />
        <DownOutlined
          style={{
            position: "absolute",
            right: "12px",
            fontSize: "11px",
            color: "#c2c2c2",
          }}
        />
      </div>
    </Dropdown>
  );
};

export const Adfilter = (props) =>        <DropdownFilter name="광고주" {...props} />

export const AdSitefilter = (props) => (
  <DropdownFilter name="사이트" {...props} />
);

export const Mdfilter = (props) => (
  <DropdownFilter name="광고매체사" {...props} />
);
