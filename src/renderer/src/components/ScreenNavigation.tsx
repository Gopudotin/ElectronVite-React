import React, { useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';

const ScreenNavigation: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  useEffect(() => {
    const handleNavigation = (_event: IpcRendererEvent, screen: string): void => {
      setCurrentScreen(screen);
    };

    window.api.ipcRenderer.on('navigate', handleNavigation);

    return () => {
      window.api.ipcRenderer.removeListener('navigate', handleNavigation);
    };
  }, []);

  return (
    <div>
      {currentScreen === 'screenOne' && <ScreenOne />}
      {currentScreen === 'screenTwo' && <ScreenTwo />}
      {currentScreen === 'screenThree' && <ScreenThree />}
    </div>
  );
};

export default ScreenNavigation;
