import * as React from "react";
import "antd/lib/button/style/index.css";

import { SubscribeContext, ScreenWidthContext } from "../../layouts";
import Icon from "../Icon/Icon";

class Sticky extends React.Component {
  state = {
    isCollapsed: false,
    isHoveringsticky: false,
    isHoveringbutton: false
  };

  handleMouseHover = type => () => {
    this.setState(prevState => this.toggleHoverState(prevState[`isHovering${type}`], type));
  };

  toggleHoverState(state, type) {
    return {
      [`isHovering${type}`]: !state
    };
  }

  handleToggle = () => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }));
  };

  render() {
    const { isCollapsed, isHoveringsticky, isHoveringbutton } = this.state;

    return (
      <React.Fragment>
        <ScreenWidthContext.Consumer>
          {width => {
            const isDesktop = width >= 1024;

            return (
              <SubscribeContext.Consumer>
                {({ toggleSubscribe }) => (
                  <div
                    className="sticky"
                    onMouseEnter={this.handleMouseHover("sticky")}
                    onMouseLeave={this.handleMouseHover("sticky")}
                  >
                    <div
                      className={`buttonContainer ${isCollapsed ? "buttoncollapsed" : ""}${
                        isHoveringbutton && isDesktop ? "buttonhovered" : ""
                      }`}
                      onMouseEnter={this.handleMouseHover("button")}
                      onMouseLeave={this.handleMouseHover("button")}
                      onClick={toggleSubscribe}
                    >
                      <Icon iconName="notifications" />
                      <span
                        className={`subscribetext ${isHoveringbutton && isDesktop ? "fade" : ""}`}
                      >
                        Suscribirte
                      </span>
                    </div>
                    <div
                      onClick={this.handleToggle}
                      className={`toggle ${isHoveringsticky ? "open" : ""}`}
                    >
                      {isCollapsed ? (
                        <Icon iconName="chevron_right" />
                      ) : (
                        <Icon iconName="chevron_left" />
                      )}
                    </div>
                  </div>
                )}
              </SubscribeContext.Consumer>
            );
          }}
        </ScreenWidthContext.Consumer>
        {/* --- STYLES --- */}
        <style jsx>{`
          .sticky {
            z-index: 9000;
            position: fixed;
            top: 50%;
            flex-direction: column;
            height: 10rem;
            overflow: hidden;
            min-width: 48px;

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
              display: flex;
              flex-direction: column;
              transition: margin 700ms;
              margin-left: -6rem;
            }

            :global(.open) {
              margin-left: -3rem;
            }

            :global(.buttonContainer) {
              transition: all 0.2s ease-in;
              border: none;
              cursor: pointer;
              display: inline-block;
              font-size: 16px;
              height: 48px;
              line-height: 24px;
              margin-bottom: 0;
              opacity: 1;
              overflow: hidden;
              padding: 12px;
              position: relative;
              text-align: left;
              top: 0;
              vertical-align: top;
              white-space: nowrap;
              width: 48px;
              border-top-right-radius: 4px;
              background-color: #0077b5;
              transition: width 700ms, margin 700ms;

              :global(span) {
                color: white;
                vertical-align: inherit;
              }

              :global(.subscribetext) {
                visibility: hidden;
                opacity: 0;
                transition: visibility 0.5s, opacity 0.5s linear;
              }

              :global(.fade) {
                visibility: visible;
                opacity: 1;
              }
            }

            :global(.buttoncollapsed) {
              margin-left: -3rem;
            }

            :global(.buttonhovered) {
              width: 155px;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Sticky;
