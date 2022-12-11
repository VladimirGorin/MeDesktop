// eslint-disable-line
import React from 'react';
import { IS_KTK } from '../../config';

export const Cashless  = (props) => {
    const { authorized, isManager, currentLang, cashless, setCashless } = props;

    return authorized && isManager && !IS_KTK ? (
        <label className = 'cashless m-checkbox m-checkbox--switch'>
            <input
                checked = { cashless }
                className = 'm-checkbox__input m-checkbox--switch__input'
                type = 'checkbox'
                onChange = { () => setCashless(!cashless) }
            />
            <div className = 'label'>
                { window[ currentLang ].cashlessCheckbox }
            </div>
        </label>
    ) : null;
};
