import React, { useState, useEffect } from "react";
import "./style/_component.LoginSignup.css";

function LoginSignup({ isTrainer, isToken }) {
	const [isRegisterForm, setIsRegisterForm] = useState(false);
	const checkboxHandler = (e) => {
		setIsRegisterForm(!isRegisterForm);
		console.log(e.currentTarget);
	};
	return (
		<div className='c-LoginSignup'>
			<div className='c-LoginSignup__form'>
				<div className='c-LoginSignup__switcherContainer'>
					<span className='c-LoginSignup__switcher c-LoginSignup__switcher-1'>
						<input
							type='checkbox'
							id='switcher'
							name='switcher'
							defaultValue={isRegisterForm}
							onChange={checkboxHandler}
						/>
						<label htmlFor='switcher' />
					</span>
				</div>
				{isRegisterForm ? (
					<form className='c-form'>
						<label htmlFor='name'>
							First Name
							<input
								id='name'
								type='text'
								name='name'
								placeholder='First Name'
								required
							/>
							<div className='c-errors'></div>
						</label>
						<label htmlFor='surname'>
							Last Name
							<input
								id='surname'
								type='text'
								name='surname'
								placeholder='Last Name'
								required
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
								required
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
								required
							/>
							<div className='c-errors'></div>
						</label>
						<label htmlFor='re-password'>
							Repeat password
							<input
								id='re-password'
								type='password'
								name='re-password'
								placeholder='Repeat password'
								required
							/>
							<div className='c-errors'></div>
						</label>
						<label className='u-align-center'>
							<button type='submit' value='Submit'>
								SIGNUP
							</button>
						</label>
					</form>
				) : (
					<form className='c-form'>
						<label htmlFor='email'>
							Email Address
							<input
								id='email'
								type='email'
								name='email'
								placeholder='name@example.com'
								required
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
								required
							/>
							<div className='c-errors'></div>
						</label>
						<label className='u-align-center'>
							<button type='submit' value='Submit'>
								LOGIN
							</button>
						</label>
					</form>
				)}
			</div>
		</div>
	);
}

export default LoginSignup;
