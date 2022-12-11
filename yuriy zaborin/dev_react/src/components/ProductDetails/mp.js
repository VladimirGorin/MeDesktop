// eslint-disable-line
import React from 'react';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

export const MPTable = (props) => {
    const { product, settings, rate } = props;

    if (!(product.mpList && product.mpList.length))
      return (null)

    const style = 'table.mpList { border-collapse: collapse } .mpList td, .mpList th { border: 1px solid #ddd; padding: 5px; } .mpList th {background-color: #eee;} .mpList .active { background: #6AB90C; }'

    return (
      <div>
        <style>{style}</style>
        <table className = 'mpList'>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Цена, ₴</th>
                    <th>Цена, $</th>
                    <th>Код</th>
                </tr>
            </thead>
            <tbody>
                { product.mpList.map(i => (
                  <tr key={i.name}
                    className = { product.useMP && i.is ? 'active' : '' }>
                    <td>{i.name}</td>
                    <td>
                      <FormattedCurrency
                            number = { i.price }
                            settings = { settings }
                        />
                    </td>
                    <td>
                      <FormattedCurrency
                            number = { i.price / rate }
                            settings = {{
                                decimal_number:     2,
                                thousand_separator: ' ',
                                currency_format:    settings.currency_format_usd,
                            }}
                        />
                    </td>
                    <td>{product.id + i.suf}</td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    );
};
