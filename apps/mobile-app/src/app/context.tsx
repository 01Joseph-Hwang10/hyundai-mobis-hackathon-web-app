import { Vehicle } from '@hyundai-mobis-hackathon-web-app/firebase';
import { Maybe } from '@hyundai-mobis-hackathon-web-app/utils';
import { createContext, useState } from 'react';

interface GlobalContextType {
  vehicle: Maybe<Vehicle>;
  setVehicle: (vehicle: Maybe<Vehicle>) => void;
  loadedDeformationId: Maybe<string>;
  setLoadedDeformationId: (deformationId: Maybe<string>) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  vehicle: null,
  setVehicle: () => null,
  loadedDeformationId: null,
  setLoadedDeformationId: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [vehicle, setVehicle] = useState<Maybe<Vehicle>>(null);
  const [loadedDeformationId, setLoadedDeformationId] = useState<Maybe<string>>(null);

  const providerValue: GlobalContextType = {
    vehicle,
    setVehicle,
    loadedDeformationId,
    setLoadedDeformationId,
  };

  return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>;
};
