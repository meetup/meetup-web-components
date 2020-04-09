// @flow
// $FlowFixMe
import React, { useState, useCallback } from 'react';
import TextInput from '../../../forms/TextInput';

type Props = {
	onSearchCallback: (value: string) => void,
};

export const NAVBAR_SEARCH_INPUT_ID = 'navbar_search_input_id';

export const NavbarSearchComponent = ({ onSearchCallback, ...other }: Props) => {
	const [value, setValue] = useState('');

	const onSearch = useCallback(
		(e: SyntheticInputEvent<EventTarget>): void => {
			const inputValue = e.target.value;
			// $FlowFixMe
			if (e.keyCode === 13 && inputValue) {
				onSearchCallback(inputValue);
			}
		},
		[onSearchCallback]
	);

	const onChange = useCallback((e: SyntheticInputEvent<EventTarget>): void => {
		setValue(e.target.value);
	}, []);

	return (
		<TextInput
			id={NAVBAR_SEARCH_INPUT_ID}
			name="navbar_search"
			iconShape="search"
			isSearch
			onKeyDown={onSearch}
			onChange={onChange}
			value={value}
			{...other}
		/>
	);
};

export default NavbarSearchComponent;
