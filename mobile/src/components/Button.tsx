import { Button as NButton, IButtonProps, Text } from 'native-base'

interface IProps extends IButtonProps {
  title: string
  type?: "PRIMARY" | "SECONDARY"
}

export function Button({ title, type = "PRIMARY", ...props }: IProps) {
  return (
    <NButton
      w="full"
      h={14}
      rounded="sm"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'
      }}
      {...props}
    >
      <Text
        color={type === 'SECONDARY' ? 'white' : 'black'}
        fontSize="md"
        fontFamily="heading"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </NButton>
  )
}