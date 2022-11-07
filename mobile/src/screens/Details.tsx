import { useEffect, useState } from "react"
import { Share } from "react-native"
import { useToast, VStack, HStack } from "native-base"
import { useRoute, useNavigation } from '@react-navigation/native'

import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { Option } from "../components/Option"
import { PoolPros } from "../components/PoolCard"
import { PoolHeader } from "../components/PoolHeader"
import { EmptyMyPoolList } from "../components/EmptyMyPoolList"
import { Guesses } from "../components/Guesses"

import { api } from "../services/api"

interface RouteParams {
  id: string
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<'your_guesses' | 'group_rank'>('your_guesses')
  const [isLoading, setIsLoading] = useState(false)
  const [poolDetails, setPoolDetails] = useState<PoolPros>()

  const { navigate } = useNavigation()
  const route = useRoute()
  const { id } = route.params as RouteParams

  const toast = useToast()

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pool/${id}`)
      setPoolDetails(response.data.pool)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
      navigate('pools')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === 'your_guesses'}
              onPress={() => setOptionSelected('your_guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'group_rank'}
              onPress={() => setOptionSelected('group_rank')}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  )
}
