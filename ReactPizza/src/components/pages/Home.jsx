import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Catogyres, SortPopup, PizzaBlock, LoadingBlock, } from "../../components";
import { fetchPizzas } from '../../redux/action/pizzas';
import { setCategory, setSortBy } from '../../redux/action/filters';



const Home = () => {
  const dispatch = useDispatch();

  const pizzas = useSelector(state => state.pizzas.items);
  const cartItems = useSelector(state => state.cart.items);
  const isLoaded = useSelector(state => state.pizzas.isLoaded);
  const { category, sortBy } = useSelector(state => state.filters);

  console.log();

  const SortItems = [
    { name: 'популярности', type: 'rating' },
    { name: 'цене', type: 'price' },
    { name: 'алфавиту', type: 'name' }
  ];
  const items = [
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);


  const onSelectSort = useCallback((name) => {
    dispatch(setCategory(name))
  }, [])


  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type))
  }, [])

  const hadnleAddPizza = obj => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    })
  }

  return (
    <div className="container">
      <div className="content__top">
        <Catogyres
          activeCategory={category}
          onClick={onSelectSort}
          items={items} />
        <SortPopup
          activeSortType={sortBy}
          onClickSortPopup={onSelectSortType}
          items={SortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {isLoaded ? pizzas.map((obj) =>
          <PizzaBlock
            onClickAddPizza={hadnleAddPizza}
            addedCountCart={cartItems[obj.id] && cartItems[obj.id].items.length}
            key={obj.id} {...obj}

          />
        ) : Array.from(Array(10), (_, i) => <LoadingBlock key={i} />)}
      </div>
    </div>
  )
}

export default Home;