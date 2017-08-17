import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module CalendarComponent
 * inits flatpickr js date picker over a text input
*/
class CalendarComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);
		this.updateFlatpickr = this.updateFlatpickr.bind(this);
	}

	/**
	* @description init the js date flatpickr component
	*/
	componentDidMount() {
		// flatpickr uses `window` on import,
		// which breaks on server-sider render.
		// lazy-loading flatpickr ensures it is
		// imported only in clientside envs.
		const Flatpickr = require('flatpickr');
		const options = {
			onChange: this.onChange,
			onOpen: this.onOpen,
			onClose: this.onClose,
			altInput: true,
			allowInput: true,
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value,
			nextArrow: `<span class="svg svg--chevron-right">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
					<use xlink:href="#icon-chevron-right" />
				</svg>
			</span>`,
			prevArrow: `<span class="svg svg--chevron-left">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
					<use xlink:href="#icon-chevron-left" />
				</svg>
			</span>`
		};

		Object.assign(options, this.props.opts);
		this.flatpickr = new Flatpickr(this.inputEl, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	/**
	* @function onChange
	* @param Array selectedDates
	* @param dateStr
	* @param Object instance the calendar instance
	* @description signature conforms to the onChange handler flatpickr expects
	* calls the callback with the selectedDates value (callback used in wrapping components)
	*/
	onChange(selectedDates, dateStr, instance) {
		this.setState({ value: selectedDates[0] });
		this.props.onChangeCallback && this.props.onChangeCallback(selectedDates[0]);
	}

	/**
	* @function onOpen
	* @description event hook for flatpickr, used to call onFocus
	* and apply focus highlight if this is a DateTimePicker
	*/
	onOpen() {
		this.props.onFocus && this.props.onFocus();
	}

	/**
	* @function onClose
	* @description event hook for flatpickr, used to call onBlur
	* and remove focus highlight if this is a DateTimePicker
	*/
	onClose() {
		this.props.onBlur && this.props.onBlur();
	}

	/**
	* @function updateFlatpickr
	* @description event hook for flatpickr, used to update Flatpickr
	* input when state changes
	*/
	updateFlatpickr() {
		if (this.flatpickr) {
			this.flatpickr.setDate(this.state.value);
		}
	}


	render() {
		const {
			onChangeCallback,	// eslint-disable-line no-unused-vars
			className,
			id,
			name,
			label,
			required,
			value,		// eslint-disable-line no-unused-vars
			error,
			opts,		// eslint-disable-line no-unused-vars
			hideLabel,
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimePicker',
			{ 'visibility--a11yHide' : hideLabel },
			className
		);


		const labelClassNames = cx(
			{required},
			{ 'visibility--a11yHide' : hideLabel },
			className
		);

		return (
			<span>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				<input
					id={id}
					type='text'
					name={name}
					defaultValue={this.state.value}
					className={classNames}
					ref={ input => this.inputEl = input }
					{...other} />

				{ error && <p className='text--error'>{error}</p> }
			</span>
		);
	}
}

CalendarComponent.propTypes = {
	name: PropTypes.string.isRequired,
	onChangeCallback: PropTypes.func
};

export default CalendarComponent;

