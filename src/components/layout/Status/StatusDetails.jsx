import React from 'react';

const StatusDetails = ({ od }) => {
  return (
    <div>
      <table className='table'>
        <tbody>
          <tr>
            <th scope='col'>RX NUMBER</th>
            <th scope='col'>DATE</th>
            <th scope='col'>BRANCH</th>
            <th scope='col'>ENCODE BY</th>
          </tr>
          <tr>
            <th>{od.rxNumber}</th>
            <td>{od.transactionDetailDate}</td>
            <td>{od.toBranchKey}</td>
            <td>{od.userIdKey}</td>
          </tr>
          <tr>
            <th scope='col'>ORDER TYPE</th>
            <th scope='col'>SUPPLY CATEGORY</th>
            <th scope='col'>ITEM</th>
            <th scope='col'>SIZE</th>
          </tr>
          <tr>
            <th>{od.orderTypeKey}</th>
            <td>{od.supplyCategoryKey}</td>
            <td>{od.toBranchKey}</td>
            <td>{od.itemKey}</td>
          </tr>
          <tr>
            <th scope='col'>OD DETAILS</th>
            <th scope='col'>PATIENTS NAME</th>
            <th scope='col'>OS DETAILS</th>
            <th scope='col'>SO DETAILS</th>
          </tr>
          <tr>
            <th>{od.odDetails}</th>
            <td>{od.pxName}</td>
            <td>{od.osDetails}</td>
            <td>{od.soDetails}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatusDetails;
