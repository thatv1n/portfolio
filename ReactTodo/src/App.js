import s from './style.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, delTask } from './redux/slices/taskSlice';
import Modal from './components/modal/Modal';

function App() {
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const dispatch = useDispatch();
  const [toggleWindow, setToggleWindow] = useState(false);
  const [allCheked, setAllCheked] = useState([]);

  const openModal = () => {
    setToggleWindow(!toggleWindow);
  };

  const onAddTask = (index) => {
    dispatch(addNewTask(index));
    setToggleWindow(!toggleWindow);
  };

  const deleteTask = (i, item) => {
    clickChecked(item);
    dispatch(delTask(i));
  };

  const clickChecked = (i) => {
    allCheked.includes(i)
      ? setAllCheked(allCheked.filter((a, index) => a !== i))
      : setAllCheked([...allCheked, i]);
  };

  const AllTasks = tasks.map((item, key) => {
    return (
      <div key={`${item.title}_${key}`}>
        <input type="checkbox" id={key} />
        <label
          className={allCheked.includes(`${item.title}`) ? s.root__modal_body_textChecked : null}
          htmlFor={key}
          onClick={() => clickChecked(`${item.title}`)}>
          №{key + 1} {item.title}
        </label>
        <svg
          onClick={() => deleteTask(key, item.title)}
          className={s.root__modal_svg}
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px">
          <path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z" />
        </svg>
      </div>
    );
  });
  return (
    <div className={s.root}>
      {toggleWindow && <Modal onAddTask={(i) => onAddTask(i)} />}

      <div className={s.root__modal}>
        <div className={s.root__modal_title}>Список задач</div>
        <div className={s.root__modal_body}>{AllTasks}</div>
        <div className={s.root__modal_footer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="48px"
            height="48px"
            onClick={() => openModal()}>
            <path
              fill="#4caf50"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            />
            <path fill="#fff" d="M21,14h6v20h-6V14z" />
            <path fill="#fff" d="M14,21h20v6H14V21z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
