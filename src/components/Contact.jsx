import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, EMAIL_JS_PUBLIC_KEY } from "../constants";
import Background from "./Background";

const Contact = () => {
	const formRef = useRef();
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});


	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		// cleaning the form data
		const username = form.name.trim();
		const user_email = form.email.trim();
		const user_message = form.message.trim();

		if (username === '' || user_email === '' || user_message === '') {
			setLoading(false);
			toast.error("Please fill all the fields.", {
				position: 'bottom-right',
			});
			return;
		}
		console.log(username,user_email,user_message)

		emailjs
			.send(
				EMAIL_JS_SERVICE_ID,
				EMAIL_JS_TEMPLATE_ID,
				{
					from_name: username,
					to_name: "Nithin Manda",
					reply_to: user_email,
					to_email: "goudnithin77@gmail.com",
					message: user_message,
				},
				EMAIL_JS_PUBLIC_KEY
			)
			.then(
				() => {
					setLoading(false);
					toast.success("Message sent successfully!", {
						position: 'bottom-right',
					});
					setForm({
						name: "",
						email: "",
						message: "",
					});
				},
				(error) => {
					setLoading(false);
					console.error(error);
					toast.error("Uh, oh! Something went wrong. Please try again later.", {
						position: 'bottom-right',
					});
				}
			);
	};

	return (

        <div className='relative z-0 bg-black w-screen h-screen mt-12'>
            
		<div className='text-white contact overflow-x-hidden py-12 mt-8 ' id='contact'>
			<div className='z-10 w-full sm:w-[650px] m-auto p-8 rounded-2xl' style={{ background: '#120d2b' }}>
				<p className='font-light'>REACH OUT TO ME</p>
				<h2 className='text-5xl font-extrabold mt-2'>Contact.</h2>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className='mt-12 flex flex-col gap-8'
				>
					<label className='flex flex-col'>
						<span className=' font-medium mb-4'>Your Name</span>
						<input
							type='text'
							name='name'
							value={form.name}
							onChange={handleChange}
							placeholder="What's your good name?"
							className='py-4 px-6 rounded-lg outline-none border-none font-medium'
							style={{ background: '#1d1836' }}
							required
						/>
					</label>
					<label className='flex flex-col'>
						<span className=' font-medium mb-4'>Your email</span>
						<input
							type='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder="Please enter your email."
							className='py-4 px-6 rounded-lg outline-none border-none font-medium'
							style={{ background: '#1d1836' }}
							required
						/>
					</label>
					<label className='flex flex-col'>
						<span className='font-medium mb-4'>Your Message</span>
						<textarea
							rows={7}
							name='message'
							value={form.message}
							onChange={handleChange}
							placeholder='Do you have anything to say?'
							className='py-4 px-6 rounded-lg outline-none border-none font-medium'
							style={{ background: '#1d1836' }}
							required
						/>
					</label>

					<button
						type='submit'
						className='py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md'
						style={{ background: '#1d1836' }}
					>
						{loading ? "Sending..." : "Send"}
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
        <Background/>

        </div>
	);
};

export default Contact;