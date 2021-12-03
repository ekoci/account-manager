import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../firebase";
import apiGtw from "../../api";
import axios from 'axios';
const Signup = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const headers = {headers: {'Content-type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'}};
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            await apiGtw.post(
                'spotify/user/addNew', {
                    email:email.value,
                    password:password.value,
                    username: "test",
                    role:"user",
                    uuid: "Ina"
                },{headers}
            );
            const result = await apiGtw.get(
                'spotify/product/allProductsAndAccounts',
            );
            console.log(result)
            // axios({
            //     method: 'post',
            //     url: 'http://localhost:8080/spotify/user/addNew',
            //     data: {
            //         email:email.value,
            //         password:password.value,
            //         username: "test",
            //         role:"user",
            //         uuid: "Ina1"
            //     }
            // }).then(resp => console.log('test')).catch(err=>console.log(err));
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className="w-75 mx-auto my-5">
            <h1>Sign up</h1>

            <form onSubmit={handleSignUp}>
                <div className="form-group  d-flex flex-column">
                    <label>
                        Email
                        <input name="email" class="form-control" type="email" placeholder="Email" />
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" class="form-control" placeholder="Password" />
                    </label>
                    <button className="bg-primary-outline" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(Signup);