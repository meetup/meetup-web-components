// @flow
import * as React from 'react';

import { default as SwarmSelect } from '@meetup/swarm-components/lib/Select';

import withErrorList from '../utils/components/withErrorList';

type Props = React.ElementConfig<HTMLSelectElement> & {
	/** Optional `id` attribute for the input, and associates it with the `<label />` */
	id?: string,

	/** The `name` attribute for the input, and associates it with the `<label />` */
	name: string, // required - will be used as 'id' as well if `id` attribute is not provied

	/** Required - this component is stateless. A callback that happens when the input changes */
	onChange: (e: SyntheticInputEvent<*>) => void,

	/** Supplied by withErrorList */
	error?: React.Node,

	/** An additional piece of helpful info rendered with the field */
	helperText?: string,

	/** What we render into the input's `<label />` */
	label?: string,

	/** What to render in order to indicate the field is required. Supply a string for a custom error message */
	required?: boolean | string,

	/** DEPRECATED */
	labelClassName?: string,
};

/*
 * MWC custom <select> component
 */
export class SelectInput extends React.PureComponent<Props> {
	componentDidCatch(error: any, info: any) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			labelClassName, // eslint-disable-line no-unused-vars
			id,
			label,
			name,
			error,
			helperText,
			required,
			...other
		} = this.props;

		const requiredProps = required
			? { requiredText: typeof required === 'string' ? required : '*' }
			: {};

		return (
			<SwarmSelect
				id={id || name}
				label={label}
				name={name}
				error={error}
				helperText={helperText}
				{...requiredProps}
				{...other}
			/>
		);
	}
}

const SelectWithErrors = withErrorList(SelectInput);
SelectWithErrors.displayName = 'Select';

export default SelectWithErrors;
