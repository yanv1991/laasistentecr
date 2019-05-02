import PropTypes from "prop-types";
import React from "react";

const Icon = ({ iconName }) => {
  return (
    <React.Fragment>
      <span className="material-icons">{iconName}</span>
      {/* --- STYLES --- */}
      <style jsx>{`
        .material-icons {
          font-family: "Material Icons";
          font-size: 24px;
        }
      `}</style>
    </React.Fragment>
  );
};

Icon.propTypes = { iconName: PropTypes.string.isRequired };

export default Icon;
