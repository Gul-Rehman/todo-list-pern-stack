import { Button, Dialog, Field, IconButton, Input, Portal, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'

const EditTodoDialog = ({ todo, setAllTodos, allTodos }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [description, setDescription] = useState(todo.description || "")

    const updateTodo = async (id) => {
        try {
            const response = await axios.put(`http://localhost:4000/update-todo/${id}`, { description })
            if (response.status === 200 || response.status === 201) {
                const updatedTodos = allTodos.map(todo => {
                    if (todo.todo_id === id) return { ...todo, description: description }
                    else return todo
                })
                setAllTodos(updatedTodos)
                setIsOpen(false)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    const closeModal = () => {
        setDescription('')
        setIsOpen(false)
    }

    return (
        <>
            <Dialog.Root open={isOpen} onExitComplete={closeModal} onInteractOutside={closeModal}>
                <Dialog.Trigger >
                    <IconButton
                        key={"surface"}
                        variant={"subtle"}
                        size={'md'}
                        onClick={() => {
                            setIsOpen(true)
                            setDescription(todo?.description)
                        }}
                    >
                        <MdEdit />
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Dialog Header</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body pb="4">
                                <Stack gap="4">
                                    <Field.Root>
                                        <Field.Label>Edit Todo</Field.Label>
                                        <Input placeholder="Edit Todo" value={description} onChange={(event) => setDescription(event.target.value)} />
                                    </Field.Root>
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" onClick={closeModal}>Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button onClick={() => updateTodo(todo?.todo_id)}>Update</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default EditTodoDialog