import classNames from 'classnames';
import { getStatuses } from 'lib/words';
import { useEffect } from 'react';
import styles from './Keyboard.module.scss';

const Keyboard = ({ onEnter, onDelete, onKeyDown, guesses }) => {
  const charStatuses = getStatuses(guesses);

  useEffect(() => {
    const listener = e => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') return onDelete();
      if (key === 'ENTER') return onEnter();
      if (key.length === 1 && key >= '0' && key <= '9') onKeyDown(key); //Was A-Z
    };

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  });

  const handleClick = key => {
    if (key === 'ENTER') return onEnter();
    if (key === 'DELETE') return onDelete();

    onKeyDown(key);
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(char => (
          <Key
            key={char}
            value={char}
            status={charStatuses[char]}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

const Key = ({ value, status, onClick }) => {
  const classes = classNames({
    [styles.key]: true,
    [styles.absent]: status === 'absent',
    [styles.present]: status === 'present',
    [styles.correct]: status === 'correct',
    [styles.action]: status === 'action',
  });

  return (
    <button className={classes} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Keyboard;
