import { NavigationContainer } from '@react-navigation/native'
import { Box } from 'native-base'

import { useAuth } from '../contexts/AuthContext'
import { SignIn } from '../screens/SignIn'

import { AppRoutes } from './app.routes'

export function Routes() {
  const { user } = useAuth()

  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {user ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}