import React from 'react'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

interface Props {
    life: number
}

const Life = (props: Props) => {

    const howManyHearts = (life: number) => {
        return life === 3 ? (<div><FavoriteTwoToneIcon color="error" /> <FavoriteTwoToneIcon color="error" /> <FavoriteTwoToneIcon color="error" /></div>) : 
            life === 2 ? (<div><FavoriteTwoToneIcon color="error" /><FavoriteTwoToneIcon color="error" /><FavoriteBorderOutlinedIcon color="error" /></div>) :
            (<div><FavoriteTwoToneIcon color="error" /><FavoriteBorderOutlinedIcon color="error" /><FavoriteBorderOutlinedIcon color="error" /></div>)
    }

    const hearts = howManyHearts(props.life)

    return (
        <div>
            {hearts}
        </div>
    )
}

export default Life
