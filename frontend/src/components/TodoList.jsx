import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { Heading, IconButton, Table } from "@chakra-ui/react"
import { MdDelete, MdEdit } from "react-icons/md";
import EditTodoDialog from './EditTodoDialog';



const TodoList = () => {
    const [allTodos, setAllTodos] = useState([])
    const getTodoList = async () => {
        try {
            const response = await axios.get("http://localhost:4000/get-all-todos",)
            if (response.status === 200 || response.status === 201) {

                setAllTodos(response.data)
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getTodoList()
    }, [])


    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/delete-todo/${id}`,)
            if (response.status === 200 || response.status === 201) {
                const updatedTodos = allTodos.filter(todo => todo.todo_id !== id)
                setAllTodos(updatedTodos)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            {allTodos.length > 0 ? <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>No</Table.ColumnHeader>
                        <Table.ColumnHeader>Description</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {allTodos.map((item, index) => (
                        <Table.Row key={item?.todo_id}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell spaceX={2}>
                                <IconButton
                                    key={"surface"}
                                    variant={"subtle"}
                                    size={'md'}
                                    onClick={() => deleteTodo(item?.todo_id)}
                                >
                                    <MdDelete />
                                </IconButton>
                                <EditTodoDialog todo={item} allTodos={allTodos} setAllTodos={setAllTodos} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root> :
                <Heading fontSize="sm" my={10} color={'orange.600'}>No to-do to show, Start creating</Heading>

            }
        </>
    )
}

export default TodoList