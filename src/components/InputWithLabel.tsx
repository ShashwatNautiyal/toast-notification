import React from "react";

type InputWithLabelProps = {
	Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
	type: React.HTMLInputTypeAttribute;
	value: string | number;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	label?: string;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	id: string;
	placeholder?: string;
	refInput?: React.RefObject<HTMLInputElement>;
};

const InputWithLabel = (props: InputWithLabelProps) => {
	const {
		type,
		value,
		onChange,
		disabled,
		id,
		label,
		name,
		placeholder,
		Icon,
		refInput,
		required = false,
	} = props;

	return (
		<div>
			<label htmlFor={id} className="text-sm font-medium text-gray-700 flex justify-between">
				{label}
				<span className="font-normal text-gray-500">
					{required ? "Required" : "Optional"}
				</span>
			</label>
			<div className="relative border rounded shadow-sm">
				{Icon && (
					<div className="absolute z-10 cursor-pointer inset-y-0 left-2 flex items-center">
						<Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
					</div>
				)}
				<input
					ref={refInput}
					value={value}
					type={type}
					required={required}
					disabled={disabled}
					className="block text-left w-full pl-10 px-2 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm rounded-md"
					onChange={onChange}
					id={id}
					placeholder={placeholder}
					name={name}
				/>
			</div>
		</div>
	);
};

export default InputWithLabel;
