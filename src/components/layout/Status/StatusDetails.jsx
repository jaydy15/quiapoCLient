import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const StatusDetails = ({
  items,
  orderType,
  supplyCategories,
  branch,
  users,
  lens,
}) => {
  if (items.length > 1) {
    for (let i = 0; i < items.length; i++) {
      let formatOrderType = orderType.find(
        (ot) => ot.id === items[i].orderTypeKey
      ).typeDesc;
      let formatSupplyCategories = supplyCategories.find(
        (sc) => sc.id === items[i].supplyCategoryKey
      ).desc;
      let formatBranch = branch.find((bh) => bh.id === items[i].toBranchKey)
        .name;
      let user = users.find((us) => us.id === items[i].userIdKey).username;

      let formatItem;
      if (items[0].supplyCategoryKey === 2) {
        formatItem = lens.find((len) => len.id === items[i].itemKey).name;
      }
      console.log(user);
    }
  }

  const formatOrderType = orderType.find(
    (ot) => ot.id === items[0].orderTypeKey
  ).typeDesc;
  const formatSupplyCategories = supplyCategories.find(
    (sc) => sc.id === items[0].supplyCategoryKey
  ).desc;
  const formatBranch = branch.find((bh) => bh.id === items[0].toBranchKey).name;
  const user = users.find((us) => us.id === items[0].userIdKey).username;

  let formatItem;
  if (items[0].supplyCategoryKey === 2) {
    formatItem = lens.find((len) => len.id === items[0].itemKey).name;
  }
  console.log(user);

  return (
    <div>
      {items.map((item) => (
        <div>
          <table className='table'>
            <tbitemy>
              <tr>
                <th scope='col'>RX NUMBER</th>
                <th scope='col'>DATE</th>
                <th scope='col'>BRANCH</th>
                <th scope='col'>ENCODED BY</th>
              </tr>
              <tr>
                <td>{item.rxNumber}</td>
                <td>
                  <Moment format='ddd, MMMM D YYYY, h:mm a'>
                    {item.transactionDetailDate}
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
                <td>{item.itemKey}</td>
                <td>{item.size}</td>
              </tr>
              <tr>
                <th scope='col'>OD DETAILS</th>
                <th scope='col'>PATIENTS NAME</th>
                <th scope='col'>OS DETAILS</th>
                <th scope='col'>SO DETAILS</th>
              </tr>
              <tr>
                <td>{item.odDetails}</td>
                <td>{item.pxName}</td>
                <td>{item.osDetails}</td>
                <td>{item.soDetails}</td>
              </tr>
            </tbitemy>
          </table>
        </div>
      ))}
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
