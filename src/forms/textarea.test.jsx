import React from 'react';
import {
	FieldLabel,
	FieldHelper,
	Textarea as SwarmTextarea,
} from '@meetup/swarm-components';
import { Textarea, overrideValue } from './Textarea';
import { shallow, mount } from 'enzyme';

const onChange = jest.fn();

let mountedComponent, shallowComponent;

describe('Textarea', function() {
	const props = {
		value: 'Batman',
		name: 'superhero',
		id: 'super',
		rows: 3,
		minHeight: 100,
		maxHeight: 300,
	};

	beforeEach(() => {
		mountedComponent = mount(<Textarea {...props} required />);
		shallowComponent = shallow(<Textarea {...props} required />);
	});

	it('should set state to value on `overrideValue`', function() {
		shallowComponent.setProps({ value: undefined });
		expect(shallowComponent.state().value).toBe('');
		expect(overrideValue({})).toEqual({ value: '' });
	});

	it('should have a name attribute', () => {
		// hostNodes needed because mount traverses the tree and renders each node,
		// since this attribute is nested on the child node it would be rendered twice
		expect(mountedComponent.find('[name="superhero"]').hostNodes().length).toBe(1);
	});

	it('should have an id', () => {
		// hostNodes needed because mount traverses the tree and renders each node,
		// since this attribute is nested on the child node it would be rendered twice
		expect(mountedComponent.find('#super').hostNodes().length).toBe(1);
	});

	it('should have a value when one is specified', () => {
		expect(mountedComponent.find('textarea').text()).toBe('Batman');
	});

	it('should have a label when label is given', () => {
		const component = shallow(<Textarea {...props} label="Super Hero" />);
		expect(component.find(FieldLabel).length).toBe(1);
	});

	it('should have helper text when helper text is given', () => {
		const component = shallow(
			<Textarea
				{...props}
				label="Super Hero"
				helperText="Enter your favorite hero"
			/>
		);
		expect(component.find(FieldHelper).length).toBe(1);
	});

	it('should have a required attribute when specified', () => {
		expect(mountedComponent.props().required).toBe(true);
	});

	// skipping becuase it will be tested in https://meetup.atlassian.net/browse/SDS-744
	it('should call onChange with input change', function() {
		const value = 'New text value!';
		shallowComponent.setProps({ value });
		expect(shallowComponent.state().value).toBe(value);
	});

	it('should call onChange `props` function when input is changed', function() {
		const onChange = jest.fn();
		const component = shallow(<Textarea {...props} onChange={onChange} />);
		expect(onChange).not.toHaveBeenCalled();
		component
			.find('#super')
			.simulate('change', { target: { value: 'New text value!' } });
		expect(onChange).toHaveBeenCalled();
	});

	it('should be able to set min and max height', function() {
		const component = shallow(<Textarea {...props} onChange={onChange} />);
		expect(component.find(SwarmTextarea).get(0).props.style).toEqual({
			minHeight: 100,
			maxHeight: 300,
			resize: 'auto',
		});
	});
});
