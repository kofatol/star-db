import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageURL !== prevProps.getImageURL
    ) {
      this.setState(() => {
        return {
          loading: true,
        };
      });
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({
      item,
      loading: false,
      image: this.props.getImageUrl(item),
    });
  };

  updateItem = () => {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId).then(this.onItemLoaded);
  };

  render() {
    const { item, loading, image } = this.state;
    const { children } = this.props;

    if (!item) {
      return <span>Select an item from the list </span>;
    }

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? (
      <ItemView item={item} image={image} children={children} />
    ) : null;

    return (
      <div className="item-details card">
        {spinner}
        {content}
        <ErrorButton />
      </div>
    );
  }
}

const ItemView = ({ item, image, children }) => {
  const { name } = item;

  return (
    <React.Fragment>
      <img className="item-image" src={image} alt="item" />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};
