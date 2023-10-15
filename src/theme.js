import { extendTheme } from '@chakra-ui/react'
import "@fontsource/open-sans"

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
})

export default theme