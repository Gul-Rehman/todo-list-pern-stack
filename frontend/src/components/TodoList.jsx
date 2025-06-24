import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Heading, Table } from "@chakra-ui/react"


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

    return (
        <>
            {allTodos.length > 0 ? <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>No</Table.ColumnHeader>
                        <Table.ColumnHeader>Description</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {allTodos.map((item, index) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
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