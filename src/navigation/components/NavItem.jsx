import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Button from '../../forms/Button';
import Dropdown from '../../interactive/Dropdown';
import FlexItem from '../../layout/FlexItem';

const NAV_ITEM_CLASS = 'navItemLink';

export const ActionItem = ({ navItemContent, action, attributes }) => (
	<Button
		reset
		className={cx(NAV_ITEM_CLASS, 'text--secondary', 'padding--none')}
		onClick={action}
		{...attributes}
	>
		{navItemContent}
	</Button>
);
export const LinkItem = ({
	linkTo,
	navItemContent,
	className,
	onLinkClick,
	isTargetBlank,
	attributes,
}) => (
	<a
		href={linkTo}
		className={cx(NAV_ITEM_CLASS, className)}
		onClick={onLinkClick}
		target={isTargetBlank ? '_blank' : ''}
		aria-label={NAV_ITEM_CLASS}
		title={NAV_ITEM_CLASS}
		{...attributes}
	>
		{navItemContent}
	</a>
);
export const DropdownItem = ({ navItemContent, dropdownContent, isNewNavActive }) => (
	<Dropdown
		noPortal
		align="right"
		maxWidth="544px"
		minWidth={isNewNavActive ? '190px' : '384px'}
		trigger={navItemContent}
		content={dropdownContent}
	/>
);

/**
 * NavItem
 *
 * Renders a dropdown if `dropdownContent` prop is passed,
 * otherwise relies on a `linkTo` prop to render a link item.
 *
 * @param {Object} props - React element props
 * @returns {React.element} - navigation segment of header
 */
export const NavItem = props => {
	const {
		linkTo,
		label,
		shrink,
		className,
		labelClassName,
		linkClassName,
		counterBadgeClassName,
		dropdownContent,
		icon,
		hasUpdates,
		onClickAction,
		onAction,
		updatesLabel,
		isNewNavActive,
		onLinkClick,
		isTargetBlank,
		actionAttributes,
		...other
	} = props;

	const classNames = {
		navItem: cx('navItem', className),
		label: cx('navItem-label', labelClassName),
		counterBadge: counterBadgeClassName || 'counterBadge',
	};

	const navItemContent = (
		<div>
			{icon}
			{label && <span className={classNames.label}>{label}</span>}
			{hasUpdates && (
				<span className={classNames.counterBadge}>
					<span className="visibility--a11yHide">{updatesLabel}</span>
				</span>
			)}
		</div>
	);

	const trigger = (
		<div
			role="button"
			aria-haspopup
			className={NAV_ITEM_CLASS}
			onClick={onClickAction}
			{...actionAttributes}
		>
			{navItemContent}
		</div>
	);

	return (
		<FlexItem shrink={shrink} className={classNames.navItem} {...other}>
			{linkTo && (
				<LinkItem
					className={linkClassName}
					linkTo={linkTo}
					navItemContent={navItemContent}
					onLinkClick={onLinkClick}
					isTargetBlank={isTargetBlank}
					attributes={actionAttributes}
				/>
			)}
			{dropdownContent && (
				<DropdownItem
					dropdownContent={dropdownContent}
					navItemContent={trigger}
					isNewNavActive={isNewNavActive}
				/>
			)}
			{onAction && (
				<ActionItem
					action={onAction}
					navItemContent={navItemContent}
					attributes={actionAttributes}
				/>
			)}
		</FlexItem>
	);
};

NavItem.propTypes = {
	linkTo: PropTypes.string,
	dropdownContent: PropTypes.element,
	onClickAction: PropTypes.func,
	onAction: PropTypes.func,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	shrink: PropTypes.bool,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	linkClassName: PropTypes.string,
	counterBadgeClassName: PropTypes.string,
	icon: PropTypes.element,
	hasUpdates: PropTypes.bool,
	isNewNavActive: PropTypes.bool,
	onLinkClick: PropTypes.func,
	isTargetBlank: PropTypes.bool,
	actionAttributes: PropTypes.object,
};

export default NavItem;
