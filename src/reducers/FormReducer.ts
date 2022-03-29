import { combineForms } from 'react-redux-form';

export const FormReducer = combineForms(
    {
        sampleForm: {
            name: '',
        },
    },
    'form',
);
