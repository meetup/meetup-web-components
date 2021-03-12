import React from 'react';
import { mount } from 'enzyme';
import TogglePill from './TogglePill';

describe('TogglePill', () => {
	const id = 'hikingCategory',
		name = 'meetupCategories',
		label = 'Hiking!',
		value = 'hiking';

	let togglePillComponent;
	const onChangeMock = jest.fn();

	beforeEach(() => {
		togglePillComponent = mount(
			<TogglePill onChange={onChangeMock} id={id} name={name} value={value}>
				{label}
			</TogglePill>
		);
	});

	afterEach(() => {
		togglePillComponent = null;
	});

	it('executes onChange when clicked', () => {
		expect(onChangeMock).not.toHaveBeenCalled();
		togglePillComponent.simulate('click');
		expect(onChangeMock).toHaveBeenCalled();
	});
});
