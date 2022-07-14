import { useEffect, useLayoutEffect, useState } from "react";
import InputWithLabel from "./components/InputWithLabel";
import { RiNotificationBadgeFill } from "react-icons/ri";
import PrimaryButton from "./components/PrimaryButton";
import { useAppDispatch, useAppSelector } from "./hooks";
import { toast } from "./reducers/toast.reducer";
import { MdAccessTimeFilled, MdDescription } from "react-icons/md";
import Toggle from "./components/Toggle";
import { setMode } from "./reducers/theme.reducer";

function App() {
	const [description, setDescription] = useState("");
	const [message, setMessage] = useState("");
	const [timer, setTimer] = useState("");
	const [showClose, setShowClose] = useState(true);
	const dispatch = useAppDispatch();
	const mode = useAppSelector((state) => state.theme.mode);

	useLayoutEffect(() => {
		if (mode === "dark") document.documentElement.classList.add("dark");
		else if (mode === "light") document.documentElement.classList.remove("dark");
	}, [mode]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (!message) return;
				dispatch(
					toast({
						message: message,
						description: description,
						timeout: Number(timer === "" ? "2000" : timer),
						showClose: showClose,
						// @ts-ignore
						type: e.nativeEvent.submitter.name,
					})
				);
			}}
			className="flex justify-center items-center flex-col h-screen w-screen gap-8 bg-gradient-to-r from-rose-100 to-cyan-100 dark:from-slate-800 dark:to-slate-900"
		>
			<h1 className="bg-clip-text text-transparent font-bold md:text-4xl text-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-green-500 dark:from-fuchsia-500 dark:to-red-500">
				React Toast Notification
			</h1>
			<div className="flex flex-col gap-3 w-full max-w-md md:px-0 px-2">
				<InputWithLabel
					Icon={RiNotificationBadgeFill}
					id="toast-message"
					required
					name="toastMessage"
					type={"text"}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					label="Message"
					placeholder="Enter text to show on notification toast"
				/>
				<InputWithLabel
					Icon={MdDescription}
					id="toast-description"
					name="toastDescription"
					type={"text"}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					label="Description"
					placeholder="Enter text to show a description"
				/>
				<InputWithLabel
					Icon={MdAccessTimeFilled}
					id="toast-timer"
					name="toastTimer"
					type={"text"}
					value={timer}
					onChange={(e) => {
						let regex = new RegExp("^[0-9]+$");

						if (regex.test(e.target.value) || e.target.value === "")
							setTimer(e.target.value);
					}}
					label="Timeout"
					placeholder="Default: 2000ms"
				/>
				<div className="flex justify-between mt-2">
					<Toggle
						id="close-btn"
						label="Show Close Button"
						checked={showClose}
						setChecked={() => setShowClose((prev) => !prev)}
					/>
					<Toggle
						id="mode-btn"
						label="Dark Mode"
						checked={mode === "dark"}
						setChecked={() => dispatch(setMode(mode === "dark" ? "light" : "dark"))}
					/>
				</div>
			</div>
			<div className="grid gap-2 md:grid-cols-4 grid-cols-2 md:px-0 px-2">
				<PrimaryButton
					text="Toast"
					type="submit"
					disabled={!message}
					bgColor="bg-slate-500"
				/>
				<PrimaryButton
					name="success"
					text="Success"
					type="submit"
					disabled={!message}
					bgColor="bg-green-500"
				/>
				<PrimaryButton
					text="Error"
					name="error"
					type="submit"
					disabled={!message}
					bgColor="bg-red-500"
				/>
				<PrimaryButton
					name="info"
					text="Info"
					type="submit"
					disabled={!message}
					bgColor="bg-blue-500"
				/>
			</div>
		</form>
	);
}

export default App;
