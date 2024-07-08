// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
  username: "",
  favLanguage: "",
  pizza: false,
  spaghetti: false,
  broccoli: false,
  agreement: false,
};
const initialFormErrors = {
  username: "",
  favLanguage: "",
};
const initialDisabled = true;

const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required!")
    .min(3, "Username must be 3 characters long!"),
  favLanguage: yup
    .string()
    .oneOf(["javascrip", "rust"], "Favorit language is required!"),
  pizza: yup.boolean(),
  spaghetti: yup.boolean(),
  broccoli: yup.boolean(),
  agreement: yup.boolean(),
});

export default function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const onSubmit = (evt) => {
    console.log(evt);
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    console.log(checked);
    const valueToUse = type === "checkbox" ? checked : value;
    validate(name, valueToUse);
    setFormValues({ ...formValues, [name]: valueToUse });
  };

  return (
    <div id="root">
      <div>
        <h2>Crate an Account</h2>
        <form onSubmit={onSubmit}>
          <div className="inputGroup">
            <label form="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Type Username"
              onChange={onChange}
              value={formValues.name}
            />
            {!!formValues.username && formValues.username.length < 3 && (
              <div className="validation">{formErrors.username}</div>
            )}
          </div>
          <div className="inputGroup">
            <fieldset>
              <legend>Favorite Language:</legend>
              <label>
                <input
                  type="radio"
                  name="favLanguage"
                  value="javascript"
                  onChange={onChange}
                  checked={formValues.favLanguage === "javascript"}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="radio"
                  name="favLanguage"
                  value="rust"
                  onChange={onChange}
                  checked={formValues.favLanguage === "rust"}
                />
                Rust
              </label>
              {!formValues.favLanguage && (
                <div className="validation">Favorit language is required!</div>
              )}
            </fieldset>
          </div>
          <div className="inputGroup">
            <label htmlFor="favFood">Favorite Food:</label>
            <select id="favFood" name="favFood">
              <option value="">-- Select Favorit Food --</option>
              <option value="pizza">Pizza</option>
              <option value="spaghetti">Spaghetti</option>
              <option value="broccoli">Broccoli</option>
            </select>
            <div className="validation">a favorite food must be selected</div>
          </div>
          <div className="inputGroup">
            <label htmlFor="agreement">
              <input id="agreement" type="checkbox" name="agreement" />
              Agree to our terms
            </label>
            <div className="validation">the agreement must be accepted</div>
          </div>
          <div>
            <input disabled={disabled} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
