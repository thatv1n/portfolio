import React from 'react';
import { useState } from "react";


const Cat = React.memo(
  function Catogyres({ activeCategory, items, onClick }) {

    // const [active, setActive] = useState(null);

    const onSelectItem = index => {
      // setActive(index);
      onClick(index);
    }
    return (
      <div>
        <div className="categories">
          <ul>
            <li
              onClick={() => onSelectItem(null)}
              className={activeCategory === null ? 'active' : ''}>
              Все
            </li>
            {items.map((item, key) => (
              <li
                className={activeCategory === key ? 'active' : ''}
                onClick={() => onSelectItem(key)}
                key={`${item}_${key}`}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
)

export default Cat;