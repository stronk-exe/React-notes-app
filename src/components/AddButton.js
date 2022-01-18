import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Addbutton } from '../assets/add.svg'

const AddButton = () => {
    return (
        <div>
            <Link to="/note/new" className="floating-button">
                <Addbutton />
            </Link>
        </div>
    )
}

export default AddButton
