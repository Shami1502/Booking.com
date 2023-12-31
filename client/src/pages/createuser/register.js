import {useContext, useState} from "react";
import { RegisterContext } from "../../context/RegisterContext";

import axios from "axios";

const Register = (props) => {
    const {username , email , password, dispatch} = useContext(RegisterContext);
    const [state, setState] = useState({
        username: '',
        email: '',
        password:''
    });

    const registerForm = async(e) =>{
        e.preventDefault();
        const res = await axios.post("/auth/register", state);
      dispatch({ type: "CREATE", payload: res.data.details });
    }
    return (<form onSubmit={registerForm}>
            <div className="model__heading">
            <h3>Create a new account</h3>
        </div>
        <div className='group'>
            <input
                type="text"
                name=""
                className="group__control"
                placeholder="username"
                value={state.username}
                onChange={(e) => setState({ ...state, username: e.target.value })}
            />
        </div>
        <div className='group'>
            <input
                type="email"
                name=""
                className="group__control"
                placeholder="email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
            />
        </div>
        <div className='group'>
            <input
                type="password"
                name=""
                className="group__control"
                placeholder="password"
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
            />
        </div>
        <div className='group model__row'>
            <input type="submit" name="" className="btn-dark" value="Subscribe" />
        </div>
        </form>)
}

export default Register;
