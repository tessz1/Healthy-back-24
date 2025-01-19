import { useEffect } from 'react';

const useTelegramWebApp = () => {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.init();

      window.Telegram.WebApp.MainButton.setText("Start");
      window.Telegram.WebApp.MainButton.show();

      window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
        alert("Main button clicked!");
      });
    }
  }, []);
};

export default useTelegramWebApp;
