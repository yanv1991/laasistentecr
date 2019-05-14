import PropTypes from "prop-types";
import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import { ThemeContext } from "../layouts";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { NotificationManager } from "react-notifications";

import Article from "../components/Article";
import Headline from "../components/Article/Headline";

const FormItem = Form.Item;
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";

class Subscribe extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;

    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        addToMailchimp(values.email, values)
          .then(({ msg, result }) => {
            if (result !== "success") {
              throw msg;
            }

            form.resetFields();
            NotificationManager.success("Operación exitosa", "Gracias por suscribirte");
          })
          .catch(mailChimpError => {
            console.log("mailChimpError", mailChimpError);
            NotificationManager.success("Error", "Algo ha fallado");
          });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      location
    } = this.props;

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Article theme={theme} slug={location.pathname}>
              <header>
                <Headline title="Suscribirte" theme={theme} />
              </header>
              <p>¡Estar al día! </p>
              <p>
                Obtenga las últimas noticias y promociones enviadas directamente a tu correo
                electrónico.
              </p>
              <div className="form">
                <Form name="subscribe" onSubmit={this.handleSubmit}>
                  <FormItem label="Nombre">
                    {getFieldDecorator("FNAME", {
                      rules: [
                        {
                          whitespace: true
                        }
                      ]
                    })(<Input name="FNAME" />)}
                  </FormItem>
                  <FormItem label="E-mail">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your e-mail address!",
                          whitespace: true,
                          type: "email"
                        }
                      ]
                    })(<Input name="email" />)}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      Enviar
                    </Button>
                  </FormItem>
                </Form>
                {/* --- STYLES --- */}
                <style jsx>{`
                  .form {
                    background: transparent;
                    padding-top: 3rem;
                  }
                  .form :global(.ant-row.ant-form-item) {
                    margin: 0 0 1em;
                  }
                  .form :global(.ant-row.ant-form-item:last-child) {
                    margin-top: 1em;
                  }
                  .form :global(.ant-form-item-control) {
                    line-height: 1em;
                  }
                  .form :global(.ant-form-item-label) {
                    line-height: 1em;
                    margin-bottom: 0.5em;
                  }
                  .form :global(.ant-form-item) {
                    margin: 0;
                  }
                  .form :global(.ant-input) {
                    appearance: none;
                    height: auto;
                    font-size: 1.2em;
                    padding: 0.5em 0.6em;
                  }
                  .form :global(.ant-btn-primary) {
                    height: auto;
                    font-size: 1.2em;
                    padding: 0.5em 3em;
                    background: ${theme.color.brand.primary};
                    border: 1px solid ${theme.color.brand.primary};
                  }
                  .form :global(.ant-form-explain) {
                    margin-top: 0.2em;
                  }

                  @from-width desktop {
                    .form :global(input) {
                      max-width: 50%;
                    }
                  }
                `}</style>
              </div>
            </Article>
          )}
        </ThemeContext.Consumer>
      </React.Fragment>
    );
  }
}

Subscribe.propTypes = {
  form: PropTypes.object
};

const SubscribeForm = Form.create({})(Subscribe);

export default SubscribeForm;
