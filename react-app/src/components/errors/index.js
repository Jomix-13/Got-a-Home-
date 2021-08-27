import {useSelector} from 'react-redux'
import './errors.css'

const Errors = () =>{
    // const errors = useSelector((state) => state.errorsReducer.errors)
    const errors = useSelector((state) => state.errorsReducer);
    // console.log('errors',errors)

    return(
        <div className='errors-div'>
            { errors?.map((error,idx) => (
                <div className="errors" key={idx}>
                    {error}
                </div>
            ))}
        </div>
    )
}

export default Errors
