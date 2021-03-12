import PropTypes from 'prop-types';
import React from 'react';

import { TogglePill as SwarmUITogglePill } from '@meetup/swarm-components';
import DeprecationWarning from '../utils/components/DeprecationWarning';

/**
 * Toggle Pill component
 * @module TogglePill
 */
export class TogglePill extends React.PureComponent {
	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			isActive,
			labelClassName, // eslint-disable-line no-unused-vars
			onChange,
			onClick,
			...other
		} = this.props;

		return (
			<SwarmUITogglePill
				checked={isActive}
				onClick={onClick || onChange}
				{...other}
			/>
		);
	}
}

TogglePill.propTypes = {
	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: PropTypes.string.isRequired,

	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** The `value` attribute for the input */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,

	children: PropTypes.node.isRequired,

	/** Whether the pill is toggled on/selected */
	isActive: PropTypes.bool,

	/** Deprecated; use `onClick` */
	onChange: PropTypes.func,

	/** Custom callback when clicked */
	onClick: PropTypes.func,
};

TogglePill.defaultProps = {
	isActive: false,
};

export default DeprecationWarning(TogglePill);
