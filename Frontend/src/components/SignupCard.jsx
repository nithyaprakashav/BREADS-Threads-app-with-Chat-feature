'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'

export default function SignupCard() {
  const showToast = useShowToast()
  const [showPassword, setShowPassword] = useState(false)
  const [authScreen,setAuthScreen] = useRecoilState(authScreenAtom)
  const [user , setUser ] = useRecoilState(userAtom)
  const toast = useToast()
  const[isLoading , setIsLoading] = useState(false)

  const [inputs , setInputs] = useState({
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:""
  })

  const handleSubmit =async () => {
    setIsLoading(true)
    // console.log(inputs)
    try {
      const response = await fetch("/api/users/signup" , {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inputs)
      })
      const data= await response.json()
      if(data.error){
        showToast("Error" , data.error , "error")
        return
      }

      localStorage.setItem("userinfo" , JSON.stringify(data))
      setUser(data)
    } catch (err) {
      showToast("Error" , err , "error")
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={2} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={(e) => setInputs({...inputs , firstname:e.target.value})} value={inputs.firstname}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e) => setInputs({...inputs , lastname:e.target.value})} value={inputs.lastname}/>
                </FormControl>
              </Box>
            </HStack>

            <FormControl isRequired>
              <FormLabel> Username</FormLabel>
              <Input type="email" onChange={(e) => setInputs({...inputs , username:e.target.value})} value={inputs.username} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setInputs({...inputs , email:e.target.value})} value={inputs.email}/>
            </FormControl>
            
            <FormControl  isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({...inputs , password:e.target.value})} value={inputs.password} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600" , "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700" , "gray.800"),
                }}
                onClick={handleSubmit}
                isLoading={isLoading}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={()=> setAuthScreen("login")}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}