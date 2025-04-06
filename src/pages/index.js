"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {

  const [todo, setTodo] = useState([])
  const [title, settitle] = useState("")
  const [new1, setNew1] = useState(true)
  const [currentId, setcurrentId] = useState("")

  useEffect(() => {
    getTodo()
  }, [])

  const addTodo = async () => {

    const myHeaders = {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RlOTU5MmUzODJlZDY2M2IzY2M0MDUiLCJpYXQiOjE3NDM5NDYwMDksImV4cCI6MTc0Mzk1MzIwOX0.x34A1RhcCI3casRtpE-xcO_yhN0LM_ZvNNVIAHyEcNU",
      "Content-Type": "application/json"
    };

    const response = await axios.post(
      "http://localhost:5000/todo/create",
      { title: title }, // Request body
      { headers: myHeaders } // Config with headers
    );
    console.log(response)
    settitle("")

    getTodo()

  }

  const getTodo = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RlOTU5MmUzODJlZDY2M2IzY2M0MDUiLCJpYXQiOjE3NDM5NDYwMDksImV4cCI6MTc0Mzk1MzIwOX0.x34A1RhcCI3casRtpE-xcO_yhN0LM_ZvNNVIAHyEcNU");
    var response = await axios.get("http://localhost:5000/todo/get", {
      headers: myHeaders
    })
    console.log(response.data.data)
    setTodo(response.data.data)

  }

  const editTodo = (data) => {
    console.log(data)
    setNew1(false)
    settitle(data.title)
    setcurrentId(data._id)


  }

  const updateTodo = async () => {

    const myHeaders = {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RlOTU5MmUzODJlZDY2M2IzY2M0MDUiLCJpYXQiOjE3NDM5NDYwMDksImV4cCI6MTc0Mzk1MzIwOX0.x34A1RhcCI3casRtpE-xcO_yhN0LM_ZvNNVIAHyEcNU",
      "Content-Type": "application/json"
    };

    const response = await axios.put(
      `http://localhost:5000/todo/update/${currentId}`,
      { title: title }, // Request body
      { headers: myHeaders } // Config with headers
    );
    console.log(response)
    setNew1(true)
    settitle("")
    getTodo()

  }

  const deleteTodo = async (id) => {

    const myHeaders = {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RlOTU5MmUzODJlZDY2M2IzY2M0MDUiLCJpYXQiOjE3NDM5NDYwMDksImV4cCI6MTc0Mzk1MzIwOX0.x34A1RhcCI3casRtpE-xcO_yhN0LM_ZvNNVIAHyEcNU",
      "Content-Type": "application/json"
    };

    const response = await axios.delete(
      `http://localhost:5000/todo/delete/${id}`,
     
      { headers: myHeaders } // Config with headers
    );
    console.log(response)
    getTodo()

  }

  return (
    <>
      <h1>Hello next js</h1>
      <input type="text" placeholder="enter todos" value={title} onChange={(e) => settitle(e.target.value)} />
      {
        new1 ?
          <button onClick={() => addTodo()}>Submit</button> :
          <button onClick={() => updateTodo()}>Update Todo</button>
      }



      {
        todo.map((v, i) => {
          return (
            <div key={i}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {i + 1}
                <b
                  style={{
                    width: "40%",
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {v.title}
                </b>
                <button style={{ border: "1px solid red", marginLeft: "20px" }}
                  onClick={() => editTodo(v)}
                >Edit</button>
                  <button style={{ border: "1px solid red", marginLeft: "20px" }}
                  onClick={() => deleteTodo(v._id)}
                >Delete</button>
              </h3>

            </div>
          )
        })

      }
    </>

  );
}
