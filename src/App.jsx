
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [query, setQuery] = useState("")
  const [data, setData] = useState([])


  useEffect(() => {
 
    if (query === "") return
    const timer = setTimeout(() => {
      axios.get(`https://emoji-api.com/emojis?search=${query}&access_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => {
          console.log(res.data);
          setData(res.data)
        }).catch(e => {
          console.log(e);
        })
    }, 800)

    return () => clearTimeout(timer)

  }, [query])


  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>


      <input style={{
        outline: 0,
        textAlign: "center", borderRadius: "10px",
        fontSize: "1.5rem", padding: "0.5rem",
        boxShadow: "rgba(1, 1, 1, 0.35) 0px 5px 15px"
      }}
        placeholder='Search your emojies' type="text"
        onChange={(e) => { setQuery(e.target.value) }} />

      <div style={{
        height: "80vh", overflowY: "auto",
        margin: "1rem 2rem", display: "flex",
        flexWrap: "wrap", justifyContent: "center",
        alignItems: "center"
      }}>
        {data && data.map(emoji => {

          return <div key={emoji.slug}
            onClick={() => {
              navigator.clipboard.writeText(emoji.character)
              alert(`${emoji.slug} Copied`)
            }}
            style={{ background: "#FFFFFF", fontSize: "5rem", cursor: "pointer", padding: "1rem", margin: "1rem", borderRadius: "10px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}
          >
            {emoji.character}

          </div>
        })}
      </div>
      <p>Made with ❤ BY SJSL</p>
    </div>
  )
}

export default App
