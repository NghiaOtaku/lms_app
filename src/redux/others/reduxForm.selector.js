import { formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';

export const ReduxFormSelector = (formName, fieldName) => {
    const selector = formValueSelector(formName);
    const result = useSelector((state) => selector(state, fieldName));
    return result;
};
// --save-dev
