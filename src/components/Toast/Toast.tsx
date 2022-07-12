import { IoMdCloseCircle } from "react-icons/io";
import { MdInfo, MdOutlineClose } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { remove } from "../../reducers/toast.reducer";
import { RiNotificationFill } from "react-icons/ri";

const Toast = ({
	message,
	id,
	timeout,
	showClose,
	description,
	type,
}: {
	message: string;
	id: number;
	timeout: number;
	showClose: boolean;
	description?: string;
	type?: "success" | "error" | "info";
}) => {
	const [show, setShow] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const timeoutEnd = setTimeout(() => {
			setShow(false);
		}, timeout);

		return () => {
			clearTimeout(timeoutEnd);
		};
	}, []);

	return (
		<Transition
			show={show}
			appear={true}
			afterLeave={() => dispatch(remove(id))}
			enter="transition ease-in-out duration-300 transform"
			enterFrom="-translate-y-full"
			enterTo="translate-y-0"
			leave="transition ease-in-out duration-300 transform"
			leaveFrom="translate-x-0"
			leaveTo="translate-x-full"
		>
			{type === "success" && (
				<CustomToast
					gradient="linear-gradient(90deg, rgb(0 255 131 / 30%) 0%, rgb(255 255 255 / 60%) 40%)"
					message={message}
					description={description}
					setShow={setShow}
					showClose={showClose}
					textColor={"text-green-500"}
					Icon={HiCheckCircle}
				/>
			)}
			{type === "error" && (
				<CustomToast
					gradient="linear-gradient(90deg, rgb(255 151 0 / 30%) 0%, rgb(255 255 255 / 60%) 40%)"
					message={message}
					description={description}
					setShow={setShow}
					showClose={showClose}
					textColor={"text-red-500"}
					Icon={IoMdCloseCircle}
				/>
			)}

			{type === "info" && (
				<CustomToast
					gradient="linear-gradient(90deg, rgb(0 205 255 / 30%) 0%, rgb(255 255 255 / 60%) 40%)"
					message={message}
					description={description}
					setShow={setShow}
					showClose={showClose}
					textColor={"text-blue-500"}
					Icon={MdInfo}
				/>
			)}
			{!type && (
				<CustomToast
					gradient="linear-gradient(90deg, rgb(0 255 230 / 30%) 0%, rgb(255 255 255 / 70%) 40%)"
					message={message}
					description={description}
					setShow={setShow}
					Icon={RiNotificationFill}
					showClose={showClose}
					textColor={"text-gray-500"}
				/>
			)}
		</Transition>
	);
};

const CustomToast = ({
	gradient,
	message,
	description,
	showClose,
	setShow,
	textColor,
	Icon,
}: {
	gradient: string;
	message: string;
	description?: string;
	showClose: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	textColor: string;
	Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
}) => {
	return (
		<div
			style={{
				backgroundImage: gradient,
			}}
			className={`px-5 py-3 flex justify-center items-center gap-3 backdrop-blur bg-opacity-70 shadow-md rounded leading-5 ${textColor} max-w-md`}
		>
			{Icon && (
				<div className="">
					<Icon className="h-7 w-7" />
				</div>
			)}

			<div className="[&>p]:leading-5">
				<p className="text-lg font-semibold overflow-hidden text-ellipsis max-w-md">
					{message}
				</p>
				<p className="text-sm font-medium text-gray-600">{description}</p>
			</div>
			{showClose && (
				<MdOutlineClose
					className="h-7 w-7 cursor-pointer flex-shrink-0"
					onClick={() => {
						setShow(false);
					}}
				/>
			)}
		</div>
	);
};

export default Toast;
