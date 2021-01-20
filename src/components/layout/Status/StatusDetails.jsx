import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const StatusDetails = ({
  od,
  orderType,
  supplyCategories,
  branch,
  users,
  lens,
}) => {
  const formatOrderType = orderType.find((ot) => ot.id === od.orderTypeKey)
    .typeDesc;
  const formatSupplyCategories = supplyCategories.find(
    (sc) => sc.id === od.supplyCategoryKey
  ).desc;
  const formatBranch = branch.find((bh) => bh.id === od.toBranchKey).name;
  const user = users.find((us) => us.id === od.userIdKey).username;

  let formatItem;
  if (od.supplyCategoryKey === 2) {
    formatItem = lens.find((len) => len.id === od.itemKey).name;
  }
  console.log(user);

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
            <td>{od.rxNumber}</td>
            <td>
              <Moment format='ddd, MMMM D YYYY, h:mm a'>
                {od.transactionDetailDate}
              </Moment>
            </td>
            <td>{formatBranch}</td>
            <td>{user}</td>
          </tr>
          <tr>
            <th scope='col'>ORDER TYPE</th>
            <th scope='col'>SUPPLY CATEGORY</th>
            <th scope='col'>ITEM</th>
            <th scope='col'>SIZE</th>
          </tr>
          <tr>
            <td>{formatOrderType}</td>
            <td>{formatSupplyCategories}</td>
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
            <td>{od.odDetails}</td>
            <td>{od.pxName}</td>
            <td>{od.osDetails}</td>
            <td>{od.soDetails}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderType: state.catalogue.orderTypes,
  supplyCategories: state.catalogue.supplyCategories,
  branch: state.catalogue.branchDetails,
  users: state.catalogue.users,
  lens: state.catalogue.lensItems,
});

export default connect(mapStateToProps)(StatusDetails);
