import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import TogglePill from '../forms/TogglePill';

export const PANEL_CLASS = 'accordionPanel';
export const ACTIVEPANEL_CLASS = 'accordionPanel--active';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isOpen: this.props.isOpen
		};

		this._handleToggle = this._handleToggle.bind(this);
	}

	/**
	 * @parm {Boolean} isOpen (is panel open)
	 * @returns {Number} panel height
	 */
	getHeight(isOpen) {
		return `${isOpen * this.contentEl.getBoundingClientRect().height}px`;
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	_handleToggle(){
		if (this.props.setClickedPanel) {
			this.props.setClickedPanel(this);
		}

		this.setState({
			height: this.getHeight(!this.state.isOpen),
			isOpen: !this.state.isOpen
		});

	}

	/**
	 * Sets height of `AccordionPanel` to be appear open or closed when mounting
	 *
	 * @returns {undefined}
	 */
	componentDidMount() {
		this.setState({
			height: this.getHeight(this.state.isOpen)
		});
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isOpen !== this.state.isOpen) {
			this.setState({
				isOpen: nextProps.isOpen,
				height: this.getHeight(nextProps.isOpen)
			});
		}
	}

	/**
	 * @returns {String} icon shape
	 */
	getIconShape() {
		const {
			indicatorIcon,
			indicatorIconActive
		} = this.props;

		return this.state.isOpen && indicatorIconActive ?
			indicatorIconActive :
			indicatorIcon;
	}

	render() {
		const {
			panelContent,
			label,
			isOpen, // eslint-disable-line no-unused-vars
			setClickedPanel, // eslint-disable-line no-unused-vars
			indicatorAlign, // eslint-disable-line no-unused-vars
			indicatorIcon, // eslint-disable-line no-unused-vars
			indicatorIconActive, // eslint-disable-line no-unused-vars
			indicatorIconSize,
			indicatorSwitch,
			classNamesActive,
			className,
			// isActive,
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				PANEL_CLASS,
				{
					[ACTIVEPANEL_CLASS]: this.state.isOpen,
					[classNamesActive]: this.state.isOpen && classNamesActive
				},
				className
			),
			trigger: cx(
				className,
				'accordionPanel-label display--block span--100 padding--bottom'
			),
			content: cx(
				'accordionPanel-animator',
				{
					'accordionPanel-animator--collapse': !this.state.isOpen
				}
			)
		};

		// create valid attribute name from trigger label
		const ariaId = label.replace(/\s+/g, '').toLowerCase();

		// console.log(this.props);

		return(
			<Flex
				className={classNames.accordionPanel}
				rowReverse={indicatorAlign === 'left' && 'all'}
				{...other}
			>

				<FlexItem>
					<button
						role='tab'
						id={`label-${ariaId}`}
						aria-controls={`panel-${ariaId}`}
						aria-expanded={this.state.isOpen}
						aria-selected={this.state.isOpen}
						className={classNames.trigger}
						onClick={this._handleToggle}
					>
						{label}
					</button>

					<Chunk
						role='tabpanel'
						aria-labelledby={`label-${ariaId}`}
						aria-hidden={!this.state.isOpen}
						className={classNames.content}
						style={{height: this.state.height}}
					>
						<div
							className='accordionPanel-content'
							ref={(div) => { this.contentEl = div; }}
						>
							{panelContent}
						</div>
					</Chunk>
				</FlexItem>

				<FlexItem
					className='accordionPanel-icon'
					onClick={!indicatorSwitch && this._handleToggle}
					shrink
				>
					{
						!indicatorSwitch && indicatorIcon
							? <Icon shape={this.getIconShape()} size={indicatorIconSize} />
							: // TogglePill to be replaced by ToggleSwitch once https://github.com/meetup/meetup-web-components/pull/305 merges
							<TogglePill
								isActive={this.state.isOpen}
								id={`${ariaId}-switch`}
								name={ariaId}
								value='toggle-pill'
								onClick={this._handleToggle}
							>
								<span>{this.state.isOpen ? 'on' : 'off'}</span>
							</TogglePill>
					}
				</FlexItem>

			</Flex>
		);
	}
}

AccordionPanel.defaultProps = {
	isOpen: false,
	indicatorAlign: 'right',
	indicatorIcon: 'chevron-down',
	indicatorIconSize: 'xs'
};

AccordionPanel.propTypes = {
	classNamesActive: PropTypes.string,
	isOpen: PropTypes.bool,
	panelContent: PropTypes.element,
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	indicatorAlign: PropTypes.string,
	indicatorIcon: PropTypes.string,
	indicatorIconActive: PropTypes.string,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool
};

export default AccordionPanel;
