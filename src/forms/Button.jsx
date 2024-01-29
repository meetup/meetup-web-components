import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../media/Icon';

import { LinkButton as SwarmLink } from '@meetup/swarm-components';

import {
	getButtonType,
	getSwarmSize,
	getIconPosition,
} from '@meetup/swarm-components/lib/utils/buttonUtils';

const ChildrenWithIcon = ({ children, right, iconShape, iconProps }) => {
	if (iconShape) {
		return right ? (
			<React.Fragment>
				{children}
				<Icon shape={iconShape} size="xs" {...iconProps} />
			</React.Fragment>
		) : (
			<React.Fragment>
				<Icon shape={iconShape} size="xs" {...iconProps} />
				{children}
			</React.Fragment>
		);
	}

	return children;
};

import DeprecationWarning from '../utils/components/DeprecationWarning';
/**
 * @module Button
 */
export class Button extends React.PureComponent {
	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			fullWidth,
			component,
			icon,
			hasHoverShadow, // eslint-disable-line no-unused-vars
			to,
			children,
			forwardedRef,
			right,
			iconProps,
			...other
		} = this.props;

		// checking for the icon component signature if passed as icon={<Icon shape="search"/>} and grabbing the shape prop
		const iconShape = icon && icon.props && icon.props.shape;

		if (!!component && to == undefined && this.props.href == undefined) {
			console.error(
				'Invalid component prop for <Button>. All Swarm UI v2 Button components are button, anchor, or Link elements.'
			);
		}

		// support for react-router Link component
		if (!!component && to !== undefined) {
			const {
				children,
				right,
				primary, // eslint-disable-line no-unused-vars
				small, // eslint-disable-line no-unused-vars
				bordered, // eslint-disable-line no-unused-vars
				neutral, // eslint-disable-line no-unused-vars
				inverted, // eslint-disable-line no-unused-vars
				grow, // eslint-disable-line no-unused-vars
				...linkProps
			} = other;
			const buttonType = getButtonType(this.props);

			const Component = component;

			return (
				<Component
					data-swarm-button={buttonType}
					data-swarm-size={getSwarmSize(this.props)}
					data-icon={getIconPosition(this.props)}
					data-swarm-width={fullWidth ? 'grow' : 'default'}
					to={to}
					{...linkProps}
				>
					<ChildrenWithIcon
						children={children}
						iconShape={iconShape}
						right={right}
						iconProps={iconProps}
					/>
				</Component>
			);
		} else if (component === 'a') {
			return <SwarmLink icon={iconShape} grow={fullWidth} {...other} />;
		}

		const buttonType = getButtonType(this.props);
		const width = fullWidth ? 'grow' : 'default';

		return (
			<button
				data-swarm-button={buttonType}
				data-swarm-size={getSwarmSize(this.props)}
				data-icon={getIconPosition(this.props)}
				data-swarm-width={width}
				type="button"
				ref={forwardedRef}
				{...other}
			>
				<ChildrenWithIcon
					children={children}
					iconShape={iconShape}
					right={right}
					iconProps={iconProps}
				/>
			</button>
		);
	}
}

Button.propTypes = {
	/** Used to highlight the most important action on a screen. Not intended to be used more than once on a screen/modal/section. */
	primary: PropTypes.bool,

	/** The standard button for most use cases. Other styles are available for buttons that need more visual weight */
	neutral: PropTypes.bool,

	/** Takes an `Icon` element to render inside of the button */
	icon: PropTypes.element,

	/** Renders the icon on the right side of the button text */
	right: PropTypes.bool,

	/** Reduces the size of the button */
	small: PropTypes.bool,

	/** Sometimes used in place of a Neutral button on shaded backgrounds to maintain the appropriate visual weight */
	bordered: PropTypes.bool,

	/** Which component or html element type to use */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	/** Whether to use disabled attribute and disabled button styles */
	disabled: PropTypes.bool,
};
export default DeprecationWarning(Button);
