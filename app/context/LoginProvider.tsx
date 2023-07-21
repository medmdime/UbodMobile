import React, {createContext, useContext, useEffect, useState} from 'react';
import { load, loadString, save } from "../utils/storage"
import { create } from 'apisauce'
import { defaultUser, User } from "./types"
import { hideAsync } from "expo-splash-screen"

// Define User type


// Define the context type
type LoginContextType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loginPending: boolean;
  setLoginPending: React.Dispatch<React.SetStateAction<boolean>>;
};


const LoginContext = createContext<LoginContextType>({} as LoginContextType);

type LoginProviderProps = {
  children: React.ReactNode;
};

const LoginProvider: React.FC<LoginProviderProps> = ({children}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [loginPending, setLoginPending] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');

  const isConnectedJwt =async () => {

      setLoginPending(true);
      const token = await loadString("jwt");
      setToken(token);
      if (token !== "" && token !== null) {
        const api = create({
          baseURL: "https://ubod.online/api",
          headers: { Authorization: `Bearer ${token}` },
        })
        const response = await api.get("/user/data")
        if (!response.ok) {
            load('user').then((data) => {
            setUser(data as User);
            setIsLogged(true);
          }).catch(() => {
            setUser({} as User);
            setIsLogged(false);
          })
        } else {
          const data = response.data;
          setUser(data as User);

          save("user", data as User).then(() => {
            setIsLogged(true);
          });
        }
      } else {
        setUser({} as User);
        setIsLogged(false);
      }

  }

  useEffect(() => {
    isConnectedJwt()
      .then(() => {
        setTimeout(() => setLoginPending(false), 0);
      });
  }, [token]);

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loginPending,
        setLoginPending,
      }}>
      {children}
    </LoginContext.Provider>
  );
};
const useLogin = () => useContext(LoginContext);

export { LoginProvider , useLogin} ;
