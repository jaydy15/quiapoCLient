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
  fsItems,
  csaItems,
  fscsaModels,
  colors,
}) => {
  const formatOrderType = orderType.find(
    (ot) => ot.id === items[0].orderTypeKey
  ).typeDesc;
  const formatSupplyCategories = supplyCategories.find(
    (sc) => sc.id === items[0].supplyCategoryKey
  ).desc;
  const formatBranch = branch.find((bh) => bh.id === items[0].toBranchKey).name;
  const user = users.find((us) => us.id === items[0].userIdKey).username;

  let formatItem = [],
    modelKey = [];
  for (let i = 0; i < items.length; i++) {
    console.log(items[i].supplyCategoryKey);
    if (items[i].supplyCategoryKey === 2) {
      formatItem.push(lens.find((len) => len.id === items[i].itemKey).name);
    } else if (
      items[i].supplyCategoryKey === 1 ||
      items[i].supplyCategoryKey === 5 ||
      items[i].supplyCategoryKey === 6
    ) {
      formatItem.push(
        csaItems.find((csa) => csa.id === items[i].itemKey).description
      );
    } else {
      console.log(items[i].itemKey);
      modelKey.push(
        fsItems.find((fs) => fs.id === items[i].itemKey).fsModelKey
      );
      console.log(modelKey);
      formatItem.push(
        fscsaModels.find((fsca) => fsca.id === modelKey[0]).modelName
      );
      console.log(formatItem);
    }
  }
  console.log(items);
  return (
    <div>
      <table className='table'>
        <tbody>
          <tr>
            <th scope='col'>RX NUMBER</th>
            <th scope='col'>DATE</th>
            <th scope='col'>BRANCH</th>
            <th scope='col'>ENCODED BY</th>
          </tr>
          <tr>
            <td>{items[0].rxNumber}</td>
            <td>
              <Moment format='ddd, MMMM D YYYY, h:mm a'>
                {items[0].transactionDetailDate}
              </Moment>
            </td>
            <td>{formatBranch}</td>
            <td>{user}</td>
          </tr>
        </tbody>
      </table>
      {items.map((item, index) => (
        <div>
          <p>{index + 1}</p>
          <table className='table'>
            <tbody>
              <tr>
                <th scope='col'>ORDER TYPE</th>
                <th scope='col'>SUPPLY CATEGORY</th>
                <th scope='col'>ITEM</th>
                <th scope='col'>SIZE</th>
              </tr>
              <tr>
                <td>{formatOrderType}</td>
                <td>
                  {
                    supplyCategories.find(
                      (sc) => sc.id === item.supplyCategoryKey
                    ).desc
                  }
                </td>
                <td>{formatItem[index]}</td>
                <td>{item.size}</td>
              </tr>
              <tr>
                <th scope='col'>OD DETAILS</th>
                <th scope='col'>COLOR</th>
                <th scope='col'>OS DETAILS</th>
                <th scope='col'>SO DETAILS</th>
              </tr>
              <tr>
                <td>{item.odDetails === '|||||' ? null : item.odDetails}</td>
                <td>
                  {
                    colors.find((color) => color.id === item.supplyCategoryKey)
                      .colorName
                  }
                </td>
                <td>{item.osDetails === '|||||' ? null : item.osDetails}</td>
                <td>{item.soDetails === '|||' ? null : item.soDetails}</td>
              </tr>
            </tbody>
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
  fsItems: state.catalogue.fsItems,
  csaItems: state.catalogue.csaItems,
  fscsaModels: state.catalogue.fscsaModels,
  colors: state.catalogue.colors,
});

export default connect(mapStateToProps)(StatusDetails);
