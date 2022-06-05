import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.loader}>
      <Oval
        ariaLabel="loading-indicator"
        height={40}
        width={40}
        strokeWidth={5}
        color="#ffd166"
        secondaryColor="#ccc"
      />
    </div>
  );
}
