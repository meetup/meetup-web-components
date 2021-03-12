import React from 'react';
import { mount } from 'enzyme';

import ToggleWrapper from './ToggleWrapper';

const PLAIN_COMPONENT_CLASS = 'plainComponent';

const onToggle = jest.fn();

/**
 * @module PlainComponent
 */
class PlainComponent extends React.PureComponent {
	render() {
		return (
			<ToggleWrapper onToggle={onToggle} tabIndex={this.props.tabIndex}>
				{({ tabIndex, isActive, toggleActive, onKeyUp }) => (
					<div
						aria-pressed={isActive}
						onClick={toggleActive}
						className={PLAIN_COMPONENT_CLASS}
						{...this.props}
					/>
				)}
			</ToggleWrapper>
		);
	}
}

/**
 * @module InputComponent
 */
class InputComponent extends React.PureComponent {
	render() {
		const { inputType, isActive, other } = this.props;

		return (
			<ToggleWrapper type={inputType} isActive={isActive}>
				{({ tabIndex, isActive, toggleActive, onKeyUp }) => (
					<input
						type={inputType}
						checked={isActive}
						onChange={toggleActive}
						onKeyUp={onKeyUp}
						tabIndex={tabIndex}
						value="lol nothing matters"
						{...other}
					/>
				)}
			</ToggleWrapper>
		);
	}
}

describe('withLoading', function() {
	it('calls onToggle if it is passed', () => {
		const plainComponent = mount(<PlainComponent />);
		const plainComponentNode = plainComponent.find(`.${PLAIN_COMPONENT_CLASS}`);

		expect(onToggle).not.toHaveBeenCalled();
		plainComponentNode.simulate('click');
		expect(onToggle).toHaveBeenCalled();
	});

	describe('when this.props.type is not checkbox or radio', () => {
		it('isActive state updates using child component handler', () => {
			const plainComponent = mount(<PlainComponent />);
			const plainComponentNode = plainComponent.find(`.${PLAIN_COMPONENT_CLASS}`);
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(
				false
			);
			plainComponentNode.simulate('click');
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(
				true
			);
		});

		it('isActive state updates on valid key press (Enter or Space bar)', () => {
			const plainComponent = mount(<PlainComponent />);
			const plainComponentNode = plainComponent.find(`.${PLAIN_COMPONENT_CLASS}`);
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(
				false
			);
			plainComponentNode.simulate('keyUp', { key: 'Enter' });
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(
				true
			);
		});
	});

	describe('when this.props.type is checkbox', () => {
		it('isActive state updates onChange', () => {
			const checkboxComponent = mount(<InputComponent inputType="checkbox" />);
			expect(checkboxComponent.find(ToggleWrapper).instance().state.isActive).toBe(
				false
			);
			checkboxComponent.find('input').simulate('change');
			expect(checkboxComponent.find(ToggleWrapper).instance().state.isActive).toBe(
				true
			);
		});
	});

	describe('when this.props.type is radio', () => {
		it('does not pass internal onKeyUp to children', () => {
			const radioComponent = mount(<InputComponent inputType="radio" />);
			const checkboxKeyUp = radioComponent.find('input').prop('onKeyUp');
			const toggleWrapperKeyUp = radioComponent.find(ToggleWrapper).instance()
				.onKeyUp;

			expect(checkboxKeyUp == toggleWrapperKeyUp).toBe(false);
		});
	});
});
