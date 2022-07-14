import { useAppDispatch, useAppSelector } from "../../hooks";
import Toast from "./Toast";

const ToastContainer = ({ time, showClose }: { time?: number; showClose?: boolean }) => {
	const { queue } = useAppSelector((state) => state.queue);

	return (
		<div className="fixed top-0 right-0 m-2  w-fit h-fit flex flex-col gap-2 items-end z-50">
			{queue.map((item) => (
				<Toast
					message={item.message}
					description={item.description}
					type={item.type}
					id={item.id}
					key={item.id}
					timeout={item.timeout ?? time ?? 2000}
					showClose={item.showClose ?? showClose ?? true}
				/>
			))}
		</div>
	);
};

export default ToastContainer;
