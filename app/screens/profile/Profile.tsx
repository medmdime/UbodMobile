import React from "react"
import {
  Text,
} from "react-native"
import { useLogin } from "../../context"
import { clear } from "../../utils/storage"
import { Button, Header, Screen } from "../../components"

const Profile = () => {
  const { setUser, setIsLogged, user } = useLogin()
  return (
    <Screen preset={'scroll'} >
      <Header title="Profile"  />
        <Text >{user?.username}</Text>
        <Button
          onPress={() => {
            setIsLogged(false)
            setUser({} as any)
            clear()
          }}>
          <Text >Déconnexion</Text>
        </Button>
    </Screen>
  )
}



export { Profile }
