import { store } from "./store";
import { setFields, setphoneError, resetFields } from "./formSlice";

export const handleInput = (key, value) => {
  store.dispatch(setFields({ values: { [key]: value } }));
};

export const handleReset = () => {
  store.dispatch(resetFields());
};

export const handlePhoneError = (bool) => {
  store.dispatch(setphoneError(bool));
};



