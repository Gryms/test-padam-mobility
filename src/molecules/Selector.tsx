import { FC } from "react";

import Dropdown from "react-bootstrap/Dropdown";

type SelectorProps = {
  selectedItem: string;
  setSelectedItem: (selectedItem: string) => void;
  items: string[];
  defaultToggleText?: string;
};

const Selector: FC<SelectorProps> = ({selectedItem, setSelectedItem, items, defaultToggleText}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {!!selectedItem ? selectedItem : defaultToggleText || "Dropdown Button"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item key={item} onClick={() => setSelectedItem(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Selector;
