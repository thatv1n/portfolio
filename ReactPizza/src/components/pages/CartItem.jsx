import React from 'react';
import Button from "../Button";

const CartItem = ({ name, size, type, image, totalPrice, totalCount, onRemove, id, onMinus, onPlus }) => {

  const handleRemoveClick = () => {
    onRemove(id)
  }

  const handlePlusItem = () => {
    onPlus(id)
  }

  const handleMinusItem = () => {
    onMinus(id)
  }

  return (
    <div className="cart__item" >
      <div className="cart__item-img">
        <img
          className="pizza-block__image"
          src={image}
          alt="Pizza"
        />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>{`${type} тесто,  ${size} см.`}</p>
      </div>
      <div className="cart__item-count">
        <div className="button button--outline button--circle cart__item-count-minus" onClick={handleMinusItem}>
          -
        </div>
        <b>{totalCount}</b>
        <div className="button button--outline button--circle cart__item-count-plus" onClick={handlePlusItem}>
          +
        </div>
      </div>
      <div className="cart__item-price">
        <b>{totalPrice} ₽</b>
      </div>
      <div className="cart__item-remove" style={{ color: "#dddddd" }}>
        <Button className="button--circle" outline onClick={handleRemoveClick} style={{ color: "#dddddd" }}>
          x
        </Button>
      </div>
    </div>
  );
};

export default CartItem;