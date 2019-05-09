import * as React from "react";
import Button from "antd/lib/button";
import "antd/lib/button/style/index.css";

import { SubscribeContext } from "../../layouts";
import Icon from "../Icon/Icon";

const Sticky = () => {
  return (
    <React.Fragment>
      <SubscribeContext.Consumer>
        {({ toggleSubscribe }) => (
          <div className="sticky">
            <div className="buttonContainer">
              <Button className="sticky" onClick={toggleSubscribe} type="primary">
                SUSCRIBIRTE
              </Button>
            </div>
            <div className="toggle">
              <Icon iconName="chevron_right" />
              <Icon iconName="chevron_left" />
            </div>
          </div>
        )}
      </SubscribeContext.Consumer>
      {/* --- STYLES --- */}
      <style jsx>{`
        .sticky {
          z-index: 9000;
          position: sticky;
          top: 50%;
          display: flex;
          margin: -3rem;
          width: 8rem;
          flex-direction: column;

          :global(.buttonContainer) {
            transform: rotate(90deg);
          }

          :global(.toggle) {
            transition: all 0.2s ease-in;
            background: #ccc;
            border-bottom-right-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 24px;
            line-height: 24px;
            position: relative;
            text-align: center;
            width: 48px;
            left: 3rem;
            top: 2.9rem;
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default Sticky;
