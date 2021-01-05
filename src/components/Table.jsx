import React, { useState } from 'react';

const Table = () => {
  // const [stateRows, setRows] = useState({ rows: [] });
  // const [name, setName] = useState([]);
  // const [mobile, setMobile] = useState([]);

  const [state, setState] = useState({
    rows: [{ name: '', mobile: '' }],
    name: {},
    mobile: [],
  });

  const handleChangeName = (idx) => (e) => {
    const { value } = e.target;
    setState({ ...state, name: { ...state.name, value } });
  };
  const handleChangeMobile = (idx) => (e) => {
    const { value } = e.target;
    setState({ ...state, mobile: { ...state.mobile, value } });
  };
  const handleAddRow = () => {
    const item = {
      name: '',
      mobile: '',
    };
    setState({ ...state, rows: [...state.rows, item] });
  };
  const handleRemoveRow = () => {
    setState({ ...state, rows: state.rows.slice(0, -1) });
  };

  return (
    <div>
      <div className='container'>
        <div className='row clearfix'>
          <div className='col-md-12 column'>
            <table className='table table-bordered table-hover' id='tab_logic'>
              <thead>
                <tr>
                  <th className='text-center'> # </th>
                  <th className='text-center'> Name </th>
                  <th className='text-center'> Mobile </th>
                </tr>
              </thead>
              <tbody>
                {state.rows.map((item, idx) => (
                  <tr id={'addr' + idx} key={idx}>
                    <td>{idx}</td>
                    <td>
                      <input
                        type='text'
                        name='name'
                        value={state.name[idx]}
                        onChange={handleChangeName(idx)}
                        className='form-control'
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        name='mobile'
                        value={state.mobile[idx]}
                        onChange={handleChangeMobile(idx)}
                        className='form-control'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddRow}
              className='btn btn-default pull-left'>
              Add Row
            </button>
            <button
              onClick={handleRemoveRow}
              className='pull-right btn btn-default'>
              Delete Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
