import React from 'react';
import { shallow } from 'enzyme';

import Hscroll, { HIDE_GRADIENT_CLASSNAME } from './Hscroll'; // HSCROLL_CLASSNAME

const listItems = [
	<div key={0}>item</div>,
	<div key={1}>item</div>,
	<div key={2}>item</div>,
	<div key={3}>item</div>,
	<div key={4}>item</div>,
	<div key={5}>item</div>,
	<div key={6}>item</div>,
	<div key={7}>item</div>,
	<div key={8}>item</div>,
];

describe('Default Hscroll', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Hscroll>{listItems}</Hscroll>);
	});

	afterEach(() => {
		component = null;
	});

	it('does not have graident class when `gradient` prop is not supplied', () => {
		const gradientEls = component.find('.hscrollGradientWrap');
		expect(gradientEls).toHaveLength;
	});
});

describe('Gradient Hscroll', () => {
	const component = shallow(<Hscroll hasGradient>{listItems}</Hscroll>);
	const gradientEls = component.find('.hscrollGradientWrap');
	const MOCK_EVENT = {
		target: {
			scrollLeft: '10px',
		},
	};

	it('has graident class when `gradient` prop is supplied', () => {
		expect(gradientEls.length).toBe(1);
	});

	it(`removes the className ${HIDE_GRADIENT_CLASSNAME} when the hscroll has been scrolled`, () => {
		component.instance().onScroll(MOCK_EVENT);
		component.update();
		expect(component.hasClass(HIDE_GRADIENT_CLASSNAME)).toBe(false);
	});
});

describe('Responsive Hscroll', () => {
	const component = shallow(<Hscroll unclipAt="large">{listItems}</Hscroll>);
	const hscrollElement = component.find('.hscroll');

	it('has correct media-conditional modifier on `hscroll` element', () => {
		expect(hscrollElement.hasClass('atLarge_hscroll--unclip')).toBe(true);
	});
});
