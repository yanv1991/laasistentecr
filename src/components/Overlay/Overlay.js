import React from "react";
import PropTypes from "prop-types";

const Overlay = props => {
  const { open, children, onClose } = props;

  return (
    <React.Fragment>
      <div className="overlay">
        <a className="close" onClick={onClose} />
        <div className="content">{children}</div>
      </div>
      {/* --- STYLES --- */}
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9000;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 25, 40, 0.97);
          opacity: ${open ? 1 : 0};
          transition: opacity 200ms ease-in;
          pointer-events: ${open ? "auto" : "none"};
          backdrop-filter: blur(3px);

          & > :global(.close) {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: block;

            &:before {
              content: "";
              position: absolute;
              top: 40px;
              right: 25px;
              display: block;
              width: 30px;
              height: 2px;
              background: #fff;
              opacity: 0.8;
              transform: rotate(45deg);
            }

            &:after {
              content: "";
              position: absolute;
              top: 40px;
              right: 25px;
              display: block;
              width: 30px;
              height: 2px;
              background: #fff;
              opacity: 0.8;
              transform: rotate(-45deg);
            }

            &:hover {
              cursor: default;
            }
          }

          & > :global(.content) {
            position: relative;
            z-index: 9999;
            margin: 0 0 5vw 0;
            padding: 4vw;
            color: #fff;
            text-align: center;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Overlay.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Overlay;
