import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import axios from 'axios';
import "./style/_component.LoginSignup.css";
import { Redirect } from "react-router-dom";
import { setLoading, setToken } from "../../actions/authentication";

const LoginSignup = (props) => {
	console.log(props.isTrainer)
	// useState
	const [isRegisterForm, setIsRegisterForm] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	// useForm  -- UNCOMPLETED
	const { register, handleSubmit, watch, errors } = useForm();
	// useRef
	const switcher = useRef(isRegisterForm);
	
	// Handler function for LOGIN/SIGNUP switcher
	const checkboxHandler = (e) => {
		setIsRegisterForm(e.target.checked);
	};
	
	//Submit form function based on useForm to collecting data 
	const submitForm = (data, event) => {
		
		// Use a custom attribute on form to determinate the type of request
		const typeOfRequest = event.target.getAttribute('data-req');

		// Encode the form data
		const bodyData = new URLSearchParams();
		if(typeOfRequest === "LOGIN")
		{
			bodyData.append('email', data.email);
			bodyData.append('password', data.password);
			bodyData.append('isTrainer', props.isTrainer);
		} else if(typeOfRequest === "SIGNUP") {
			bodyData.append('firstName', data.firstName);
			bodyData.append('lastName', data.lastName);
			bodyData.append('email', data.email);
			bodyData.append('password', data.password);
			bodyData.append('rePassword', data.rePassword);
			bodyData.append('isTrainer', props.isTrainer);
		}

		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

		// !!!____IF NO ERRORS setLoading(true) and make the request___!!!

		// Send POST custom request for user authentication based on
	    // 'data-req' custom form attribute 
		axios({
			method: 'POST',
			headers,
			data: bodyData,
			url: `http://localhost:8080/api/${typeOfRequest}`,
		})
		.then(function (response) {
			// If the SIGNUP request succeed render the LOGIN form
		  	if(response.data.success === true && response.status === 201) {
				setIsRegisterForm(false);
				switcher.current.checked = false;
				setSuccessMessage(response.data.message)
			}
			// If the LOGIN request succeed set the token and userID in
			// Redux Store, set the token in localStorage and redirect the user
			// to the Homepage
			if(response.data.token && response.status === 200) {
				if(!props.isToken){
					props.setToken(response.data.token);
					const storageObj = {
						'token': response.data.token,
						'isTrainer': props.isTrainer
					};
					window.localStorage.setItem('healthFactory',JSON.stringify(storageObj));
					setRedirect(true);
				}
			}
			
		})
		.catch(function (error) {
			// Handle error   ----> DEFAULT
			console.log(error);
		})
	}

	return (
		<div>
			{
				redirect ?
				<Redirect to="/"/>
				:
				null
			}
			<div className='c-LoginSignup'>
				<div className='c-LoginSignup__form'>
					<div className='c-LoginSignup__switcherContainer'>
						<span className='c-LoginSignup__switcher c-LoginSignup__switcher-1'>
							<input
								type='checkbox'
								id='switcher'
								name='switcher'
								ref={switcher}
								defaultValue={isRegisterForm}
								onChange={checkboxHandler}
							/>
							<label htmlFor='switcher' />
						</span>
					</div>
					{
						isRegisterForm ? 
							<form className='c-form' data-req={"SIGNUP"} onSubmit={handleSubmit(submitForm)}>
								<label htmlFor='name'>
									First Name
									<input
										id='name'
										type='text'
										name='firstName'
										placeholder='First Name'
										ref={register ({required: true})}
									/>
									<div className='c-errors'></div>
								</label>
								<label htmlFor='surname'>
									Last Name
									<input
										id='surname'
										type='text'
										name='lastName'
										placeholder='Last Name'
										ref={register ({required: true})}
									/>
									<div className='c-errors'></div>
								</label>
								<label htmlFor='email'>
									Email Address
									<input
										id='email'
										type='email'
										name='email'
										placeholder='name@example.com'
										ref={register ({required: true})}
									/>
									<div className='c-errors'></div>
								</label>
								<label htmlFor='password'>
									Password
									<input
										id='password'
										type='password'
										name='password'
										placeholder='Insert password'
										ref={register ({required: true})}
									/>
									<div className='c-errors'></div>
								</label>
								<label htmlFor='re-password'>
									Repeat password
									<input
										id='re-password'
										type='password'
										name='rePassword'
										placeholder='Repeat password'
										ref={register ({required: true})}
									/>
									<div className='c-errors'></div>
								</label>
								<label className='u-align-center'>
									<button type='submit' value='Submit'>
										SIGNUP
									</button>
								</label>
							</form>
						: 
							<form className='c-form' data-req={"LOGIN"} onSubmit={handleSubmit(submitForm)} >
								<label htmlFor='email'>
									Email Address
									<input
										id='email'
										type='email'
										name='email'
										placeholder='name@example.com'
										ref={register ({required: true})}
									/>
									{errors.email && <span className='c-Form__error'>Email is required</span>}
								</label>
								<label htmlFor='password'>
									Password
									<input
										id='password'
										type='password'
										name='password'
										placeholder='Insert password'
										ref={register ({required: true})}
									/>
									{errors.password && <span className='c-Form__error'>Password is required</span>}
								</label>
								<label className='u-align-center'>
									<button type='submit' value='Submit'>
										LOGIN
									</button>
								</label>
							</form>
					}
				</div>
				<div>{successMessage}</div>
			</div>
		</div>
	);
}

// Redux middleware
const mapStateToProps = (state) => {
	return {
	  isToken: state.authentication.isToken,
	  isTrainer: state.app.isTrainer
	}
  }
  const mapDispatchToProps = (dispatch) => {
	return {
		setToken(token) {
			dispatch(setToken(token))
		},
		setLoading(boolean) {
			dispatch(setLoading(boolean))
		}
	}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup)