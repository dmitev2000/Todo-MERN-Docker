import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ReloadContext = createContext({
  value: true,
  updateValue: () => {},
});

export const ReloadContextProvider = (props) => {
  const [value, setValue] = useState(true);

  const updateValue = () => {
    setValue((prev) => !prev);
  };

  const context = {
    value,
    updateValue,
  };

  return (
    <ReloadContext.Provider value={context}>
      {props.children}
    </ReloadContext.Provider>
  );
};

ReloadContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReloadContext;
