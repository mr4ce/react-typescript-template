import * as React from 'react';
import { APP_VERSION } from 'configs/environment.config';

import styles from './App.module.less';

const App: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  return (
    <div className={styles.App}>
      <p className={styles.App__Description}>
        <strong>Simple Application Component</strong>
      </p>
      <div>
        <label htmlFor="testInput">Test input:&nbsp;</label>
        <input id="testInput" value={inputValue} type="text" onChange={handleInputChange} />
      </div>
      <div>Value:&nbsp;{inputValue}</div>
      <p>Version: {APP_VERSION}</p>
    </div>
  );
};

export default App;
