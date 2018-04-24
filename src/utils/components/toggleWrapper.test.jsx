import React from 'react';
import { mount } from 'enzyme';

import ToggleWrapper from './ToggleWrapper';
import ConditionalWrap from './ConditionalWrap';

const PLAIN_COMPONENT_CLASS = 'plainComponent';

const onToggle = jest.fn();

/**
 * @module PlainComponent
 */
class PlainComponent extends React.PureComponent {
	render() {

		return(
			<ToggleWrapper
				onToggle={onToggle}
				tabIndex={this.props.tabIndex}
			>
				{({
					tabIndex,
					isActive,
					toggleActive,
					onKeyUp,
				}) => (
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
		return(
			<ToggleWrapper
				type={this.props.inputType}
				isActive={this.props.isActive}
			>
				{({
					tabIndex,
					isActive,
					toggleActive,
					onKeyUp,
				}) => (
					<input
						type={this.props.inputType}
						checked={isActive}
						onChange={toggleActive}
						onKeyUp={onKeyUp}
						tabIndex={tabIndex}
						value="lol nothing matters"
						{...this.props}
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
		let plainComponent, plainComponentNode;

		beforeEach(() => {
			plainComponent = mount(<PlainComponent />);
			plainComponentNode = plainComponent.find(`.${PLAIN_COMPONENT_CLASS}`);
		});
		afterEach(() => {
			plainComponent = null;
			plainComponentNode = null;
		});

		it('matches snapshot', () => {
			expect(plainComponent).toMatchSnapshot();
		});

		it('wraps children in an accessible wrapper component', () => {
			const wrapperComponent = plainComponent.find(ConditionalWrap).find('[role="button"]');

			expect(wrapperComponent.length).toBe(1);
		});

		it('passes props wrapper component', () => {
			const plainComponent = mount(<PlainComponent tabIndex="1" />);
			const wrapperComponent = plainComponent.find(ConditionalWrap).find('[role="button"]');

			expect(wrapperComponent.prop('tabIndex')).toBe("1");
		});

		it('isActive state updates using child component handler', () => {
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(false);
			plainComponentNode.simulate('click');
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(true);
		});

		it('isActive state updates on valid key press (Enter or Space bar)', () => {
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(false);
			plainComponentNode.simulate('keyUp', {key: 'Enter'});
			expect(plainComponent.find(ToggleWrapper).instance().state.isActive).toBe(true);
		});
	});

	describe('when this.props.type is checkbox', () => {
		let checkboxComponent;

		beforeEach(() => {
			checkboxComponent = mount(<InputComponent inputType="checkbox" />);
		});
		afterEach(() => {
			checkboxComponent = null;
		});

		it('matches snapshot', () => {
			expect(checkboxComponent).toMatchSnapshot();
		});

		it('isActive state updates onChange', () => {
			expect(checkboxComponent.find(ToggleWrapper).instance().state.isActive).toBe(false);
			checkboxComponent.find('input').simulate('change');
			expect(checkboxComponent.find(ToggleWrapper).instance().state.isActive).toBe(true);
		});

	});

	describe('when this.props.type is radio', () => {
		let radioComponent;

		beforeEach(() => {
			radioComponent = mount(<InputComponent inputType="radio" />);
		});
		afterEach(() => {
			radioComponent = null;
		});

		it('matches snapshot', () => {
			expect(radioComponent).toMatchSnapshot();
		});

		it('does not pass internal onKeyUp to children', () => {
			const checkboxKeyUp = radioComponent.find('input').prop('onKeyUp');
			const toggleWrapperKeyUp = radioComponent.find(ToggleWrapper).instance().onKeyUp;

			expect(checkboxKeyUp == toggleWrapperKeyUp).toBe(false);
		});
	});
});
