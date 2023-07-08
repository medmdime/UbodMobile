import React, {createContext, useContext, useEffect, useState} from 'react';
import { loadString } from "../utils/storage"
import { create } from 'apisauce'

// Define User type
export type User = {
  activity_level: number;
  address: string;
  date_birth: string;
  username: string;
  email: string;
  gender: number;
  height: number;
  objective: number;
  weight: number;
  startWeight :number;
  weeklyObjective : number;
  imageLink : string;
  weight_obj: number;
  zipcode: number;
  FoodConsumed ?: any;
  Workouts?: any;
};

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
  const [user, setUser] = useState<User>({} as User);
  const [loginPending, setLoginPending] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');

  const isConnectedJwt =async () => {

    try {
      setLoginPending(true)
      const token = await loadString("jwt");
      setToken(token);
      if (token !== "") {
        const api = create({
          baseURL: "https://ubod.online/api",
          headers: { Authorization: `Bearer ${token}` },
        })
        const response = await api.get("/user/data")
        if (!response.ok) {
          setUser({} as User);
          setIsLogged(false);
          setLoginPending(false)  // Hide the spinner if the response is not OK
        } else {
          const data = response.data;
          setUser(data as User);
          setIsLogged(true);
          setLoginPending(false)  // Hide the spinner if everything is OK
        }
      } else {
        setUser({} as User)
        setIsLogged(false)
        setLoginPending(false)  // Hide the spinner if the token is empty
      }
    } catch (error) {
      setUser({} as User)
      setIsLogged(false)
      setLoginPending(false)
    }
  }

  useEffect(() => {
    isConnectedJwt().catch();
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
