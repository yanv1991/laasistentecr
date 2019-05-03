import * as React from "react";

const SubscribeForm = ({ handleSubmit, handleChange, email }) => {
  return (
    <React.Fragment>
      <form
        className="subscribeForm"
        onSubmit={handleSubmit}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        {/* This is required for the form to work correctly  */}
        <div className="formGroup">
          <input
            className="subscribe-email"
            type="email"
            name="email"
            value={email}
            placeholder="youremail@example.com"
            onChange={handleChange}
          />
        </div>
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" name="email" tabIndex={-1} />
        </div>
        <button className="button" type="submit">
          <span>Subscribe</span>
        </button>
      </form>
      {/* --- STYLES --- */}
      <style jsx>{`
        .subscribeForm {
          display: flex;
          align-items: center;
          justify-content: center;
          @media (max-width: 500px) {
            -ms-flex-direction: column;
            flex-direction: column;
          }
        }

        & > :global(.formGroup) {
          max-width: 36rem;
          @media (max-width: 500px) {
            width: 100%;
          }

          & > :global(input) {
            display: block;
            padding: 10px;
            width: 100%;
            /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
            font-size: 1rem;
            line-height: 1em;
            font-weight: normal;
            user-select: text;
            border-radius: 8px;
            transition: border-color 0.15s linear;

            -webkit-appearance: none;
            :focus {
              outline: 0;
              /* border-color: color(var(--lightgrey) l(-2%)); */
            }
          }

          @from-width tablet {
            & > :global(input) {
              font-size: 1.8rem;
            }
          }
        }

        & > :global(.button) {
          max-width: 12.5rem;
          min-height: 2.7rem;
          display: inline-block;
          margin: 0 0 0 10px;
          padding: 0 20px;
          height: 41px;
          outline: none;
          color: #fff;
          font-size: 1.5rem;
          line-height: 37px;
          font-weight: 400;
          text-align: center;
          text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
          /* background: linear-gradient(
            color(var(--blue) whiteness(+7%)),
            color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
            color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
            color(var(--blue) lightness(-4%) saturation(-10%))
          ); */
          background-color: #51b7f0;
          border-radius: 5px;
          box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.14);

          -webkit-font-smoothing: subpixel-antialiased;

          :active,
          :focus {
            /* background: color(var(--blue) lightness(-9%) saturation(-10%)); */
          }
          @media (max-width: 500px) {
            margin: 10px 0 0;
            width: 100%;
          }
        }

        @from-width tablet {
          & > :global(.button) {
            font-size: 1.5rem;
            min-height: 3.7rem;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default SubscribeForm;
