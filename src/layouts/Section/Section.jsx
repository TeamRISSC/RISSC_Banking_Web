import React, {useState, useEffect} from "react"

export default function Section() {
    const [sectionData, setSectionData] = useState({})

    useEffect(() => {
        fetch("/api/users").then(
            res => res.json()
        ).then(
            data => {
                setSectionData(data)
            }
            )
        }, [])
        
    console.log(sectionData.results);
    return(
        <div>
            {typeof sectionData.results === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                sectionData.results.map((user, i) => <p key={i}>{user.name}</p>)
            )}
        </div>
    )
}