import { Button as ChakraUiButton } from "@chakra-ui/react";

const variants = {
    solid: {bg:"#FFB6C1", color:"white", border: "1px solid #FFB6C1", _hover:{bg: "white", color: "#FFB6C1", border: "1px solid #FFB6C1" }}
}


function Button (props) {
    return <ChakraUiButton {...variants[props.variant]} {...props}/>
}

export default Button;