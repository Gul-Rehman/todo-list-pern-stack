import { Toaster, toaster } from "../components/ui/toaster"

import { Button, Flex, Input } from "@chakra-ui/react"
import axios from 'axios'
import { useState } from 'react'


const AddDescriptionField = () => {
  const [description, setDescription] = useState("")

  const addTodo = async () => {
    try {
      const response = await axios.post("http://localhost:4000/create-todo", { description })
      if (response.status === 200 || response.status === 201) {
        toaster.create({
          title: "Todo Created",
          description: description,
        })
        setDescription("")
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <Flex direction={'row'} alignItems={'center'} gap={4} >
        <Input placeholder="Enter description" rounded={'md'} value={description} onChange={event => setDescription(event.target.value)} />
        <Button variant={'solid'} colorPalette={'blue'} rounded={'md'} onClick={addTodo}>Add</Button>
      </Flex>
      <Toaster />

    </>
  )
}

export default AddDescriptionField