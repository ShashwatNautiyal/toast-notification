const Toggle = ({
	checked,
	setChecked,
	label,
}: {
	checked: boolean;
	setChecked: () => void;
	label: string;
}) => {
	return (
		<label
			htmlFor="checked-toggle"
			className="inline-flex w-min whitespace-nowrap relative cursor-pointer"
		>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">
				{label}
			</span>
			<input
				type="checkbox"
				value=""
				id="checked-toggle"
				className="sr-only peer"
				checked={checked}
				onChange={setChecked}
			/>
			<div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
		</label>
	);
};

export default Toggle;
