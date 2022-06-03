import React, { useState } from 'react';
import s from './modal.module.scss';
import mainStyle from '../../style.module.scss';

const Modal = ({ onAddTask }) => {
  const [text, setText] = useState('');
  return (
    <div className={s.root}>
      <div className={s.root__modal}>
        <div className={mainStyle.root__modal_title}>Добавление задачи</div>
        <div className={mainStyle.root__modal_body}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={() => onAddTask({ title: text })}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
