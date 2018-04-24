import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import FloatingPosition from '../utils/components/FloatingPosition';
import {
	C_COOLGRAYLIGHTTRANSP
} from 'swarm-constants/dist/js/colorConstants.js';

import bindAll from "../utils/bindAll";

export const DROPDOWN_MENU_ITEM_CLASS = 'dropdownMenu-item';

/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(
			this,
			"toggleContent",
			"closeContent",
			"onClick",
			"onKeyDown",
			"onBodyClick",
			"onBodyKeyDown"
		);

		this.state = {
			isActive: props.isActive || false,
		};

	}

	closeContent(e) {
		if (this.props.manualToggle && this.props.isActive) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: false }));
		}
	}

	toggleContent(e) {
		if (this.props.manualToggle) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({isActive: !this.state.isActive}));
		}
	}

	onClick(e) {
		e.preventDefault();
		this.toggleContent(e);

		if (this.props.onClick) {
			this.props.onClick(e);
		}
	}

	onKeyDown(e) {
		if (e.key === "Enter" && this.state.isActive) {
			this.closeContent();
		}
	}

	onBodyClick(e) {
		if (!this.contentRef || !this.triggerRef) {
			return;
		}

		const isNotDropdownClick = [this.contentRef, this.triggerRef].every(
			ref => !ref.contains(e.target)
		);

		if (isNotDropdownClick) {
			this.closeContent(e);
		}
	}

	onBodyKeyDown(e) {
		if (e.key === "Escape") {
			this.closeContent();
		}
	}

	componentDidMount() {
		document.body.addEventListener("click", this.onBodyClick);
		document.body.addEventListener("keydown", this.onBodyKeyDown);
	}

	componentWillUnmount() {
		document.body.removeEventListener("click", this.onBodyClick);
		document.body.removeEventListener("keydown", this.onBodyKeyDown);
	}

	render() {
		const {
			className,
			trigger,
			content,
			align, // eslint-disable-line no-unused-vars
			maxWidth,
			minWidth,
			noPortal,
			menuItems,
			onSelect,
			...other
		} = this.props;

		// Do not pass along to children
		delete other.manualToggle;
		delete other.isActive;

		const classNames = {
			dropdown: cx(
				className,
				"dropdown", {
					"dropdown--noPortal": noPortal
				}
			)
		};

		const isActive = this.props.manualToggle
			? this.props.isActive
			: this.state.isActive;

		const getTrigger = () => {
			return this.triggerRef;
		};

		return (
			<Downshift
				menuItems={menuItems}
				isOpen={isActive}
				onSelect={
					(selectedItem, stateAndHelpers)=>{
						onSelect(selectedItem, stateAndHelpers);
					}
				}
			>
				{({
					isOpen,
					getButtonProps,
					getItemProps,
					highlightedIndex,
					openMenu,
				}) => (
						<div
							className={classNames.dropdown}
							onKeyDown={this.onKeyDown}
							{...other}
						>
							<div
								{...getButtonProps()}
								ref={el => (this.triggerRef = el)}
								className={cx("dropdown-trigger", {
									"dropdown-trigger--active": isOpen
								})}
								onClick={this.onClick}
							>
								{trigger}
							</div>

							{ isOpen &&
								<FloatingPosition
									getTrigger={getTrigger}
									noPortal={noPortal}
									align={align}
								>
									{({
										top,
										left
									}) => (
										<div
											ref={el => (this.contentRef = el)}
											className={cx("dropdown-content dropdown-bubble", {
												"dropdown-content--right dropdown-bubble--right": align === "right",
												"dropdown-content--left dropdown-bubble--left": align === "left",
												"dropdown-content--center dropdown-bubble--center": align === "center",
												"display--none": !isOpen,
												"display--block": isOpen
											})}
											aria-hidden={!isOpen}
											style={{
												left: left,
												top: top,
												minWidth: minWidth,
												maxWidth: maxWidth
											}}
										>

											{
												menuItems
												?
													menuItems.map((item, index) => React.cloneElement(
														item,
														{
															...getItemProps({
																item,
																key: `menuItem-${index}`,
																className: cx(
																	item.props.className,
																	DROPDOWN_MENU_ITEM_CLASS,
																	'display--flex span--100'
																),
																style: {
																	backgroundColor: highlightedIndex === index && C_COOLGRAYLIGHTTRANSP
																}
															})
														}
													))
												:
													content
											}
										</div>
									)}
								</FloatingPosition>
							}
						</div>
					)
				}
			</Downshift>
		);
	}
}

Dropdown.defaultProps = {
	maxWidth: "384px",
	minWidth: "0px",
	noPortal: false
};

Dropdown.propTypes = {
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element,
	menuItems: PropTypes.arrayOf(PropTypes.element),
	align: PropTypes.oneOf(["left", "right", "center"]).isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.func,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	noPortal: PropTypes.bool,
};

export default Dropdown;
