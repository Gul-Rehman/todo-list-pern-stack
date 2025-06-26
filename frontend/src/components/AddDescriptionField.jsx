import { Toaster, toaster } from "../components/ui/toaster"

import { Button, Flex, Input } from "@chakra-ui/react"
import axios from 'axios'
import { useState } from 'react'


const AddDescriptionField = ({getTodoList}) => {
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
        getTodoList()
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo()
    }
  };

  return (
    <>
      <Flex direction={'row'} alignItems={'center'} gap={4} >
        <Input placeholder="Enter description" rounded={'md'} value={description} onChange={event => setDescription(event.target.value)} onKeyDown={handleKeyDown}/>
        <Button variant={'solid'} colorPalette={'blue'} rounded={'md'} onClick={addTodo}>Add</Button>
      </Flex>
      <Toaster />

    </>
  )
}

export default AddDescriptionField