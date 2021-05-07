import { useState, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/duck'
import { setFilters } from '../../redux/duck/app'

const Wrapper = styled.form`
display: flex;
flex-direction: column;
margin: auto;
max-width: 280px;
& > input, & > select{
    background-color: ${p=>p.theme.colors.backgroundColor};
    border: 1px solid #494E6E;
    padding: 15px;
    color: white;
    height: 50px;
}
& > select{
    margin-top: 25px;
}
${p=>p.theme.media.tablet}{
    flex-direction: row;
    max-width: 400px;
    & > input{
        width: 250px;
    }
    & > select{
        width: 125px;
        margin-top: 0px;
        margin-left: 25px;
    }
}
${p=>p.theme.media.desktop}{
    max-width: 500px;
    & > input, & > select{
        font-size: 1rem;
    }
    & > input{
        width: 350px;
    }
}
`

const Filters:React.FC = () => {
    const [stateFilters, setStateFilters] = useState({name: '', gender: ''})
    const dispatch = useDispatch()
    const state = useSelector((state:AppState)=>state.app)

    const inputHandler = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>)=>{
        const {name, value} = e.target
        setStateFilters(prev=>({...prev, [name]: value}))
        if(name==='gender'){
            submitHandler(e)
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        const genderVal =  e.target.name === 'gender' ? e.target.value : stateFilters.gender 
        const nameVal = stateFilters.name.trim() ? stateFilters.name : '' 
        dispatch(setFilters({name: nameVal, gender: genderVal}))
    }
    console.log(state)
    return (
        <Wrapper onSubmit={submitHandler}>
            <input name='name' placeholder='name' type='text' value={stateFilters.name} onChange={inputHandler} />
            <select name='gender' value={stateFilters.gender} onChange={inputHandler}>
                <option value=''>gender</option>
                <option value='male'>male</option>
                <option value='female'>female</option>
            </select>
        </Wrapper>
    )
}

export default Filters
