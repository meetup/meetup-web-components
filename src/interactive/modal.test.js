import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Button from '../forms/Button';
import Modal, {
	MODAL_CLOSE_BUTTON,
	DEFAULT_MARGIN_TOP,
	MARGIN_TOP_OFFSET,
	getModalPosition,
} from './Modal';
import {
	STRIPE_INVERTED_CLASS,
	STRIPE_HERO_CLASS,
} from '../layout/Stripe';

describe('Modal', () => {

	let modal, modalEl, spyable;
	const content = 'Test model content';

	beforeEach(() => {
		spyable = {
			onDismiss: (e) => {}
		};

		spyOn(spyable, 'onDismiss');

		modal = TestUtils.renderIntoDocument(
			<Modal onDismiss={spyable.onDismiss}>{content}</Modal>
		);
		modalEl = ReactDOM.findDOMNode(modal);
	});

	afterEach(() => {
		modalEl = null;
	});

	it('exists', () => {
		expect(modalEl).not.toBeNull();
	});

	it('has SQ2 modal styles', () => {
		expect(modalEl.classList).toContain('modal');
	});

	it('displays modal content', () => {
		expect(modalEl.innerHTML).toContain(content);
	});

	it('creates a Button component for dismissal', () => {
		const buttons = TestUtils.scryRenderedComponentsWithType(modal, Button);
		expect(buttons.filter(button => button.props.className.includes(MODAL_CLOSE_BUTTON)).length).toBe(1);
	});

	it('creates an svg icon with `svg--cross` for dismissal', () => {
		const closeButton = modalEl.getElementsByClassName(MODAL_CLOSE_BUTTON)[0];
		const icon = closeButton.getElementsByClassName('svg--cross');

		expect(icon.length).toBe(1);
	});


	it('executes onDismiss when dismiss button is clicked', () => {
		const closeButton = modalEl.getElementsByClassName(MODAL_CLOSE_BUTTON)[0];

		TestUtils.Simulate.click(closeButton);

		expect(spyable.onDismiss).toHaveBeenCalled();
	});

	it('executes onDismiss when Escape key is pressed', () => {
		TestUtils.Simulate.keyDown(modalEl, {key: 'Escape', keyCode: 27});

		expect(spyable.onDismiss).toHaveBeenCalled();
	});
});

describe('Modal hero header', () => {
	let modal, heroEl;
	const content = 'Test model content';
	const bgColor = 'rgb(55, 30, 172)';
	const bgImage = 'http://www.cheatsheet.com/wp-content/uploads/2016/09/Homemade-Meat-Gyro-with-French-Fries.jpg';
	const HERO_CONTENT_CLASS = 'heroContent';
	const heroContentHtml = <h1 className={HERO_CONTENT_CLASS}>I can be your hero</h1>;

	beforeEach(() => {
		modal = TestUtils.renderIntoDocument(
			<Modal
				inverted
				heroBgColor={bgColor}
				heroBgImage={bgImage}
				heroContent={heroContentHtml}
				onDismiss={(e) => {}}
			>
				{content}
			</Modal>
		);
		heroEl = TestUtils.findRenderedDOMComponentWithClass(modal, STRIPE_HERO_CLASS);
	});

	afterEach(() => {
		heroEl = null;
	});

	it('gets hero stripe styling', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(modal, STRIPE_HERO_CLASS)).not.toThrow();
	});

	it('sets a background color when supplied', () => {
		expect(heroEl.style.backgroundColor).toContain(bgColor);
	});

	it('sets a background image when supplied', () => {
		expect(heroEl.style.backgroundImage).toContain(bgImage);
	});

	it('sets the hero Stripe to inverted', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(modal, STRIPE_INVERTED_CLASS)).not.toThrow();
	});

	it('displays the hero content', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(modal, HERO_CONTENT_CLASS)).not.toThrow();
	});

});

describe('Narrow modal with custom zIndex', () => {
	let component, modal;
	const content = 'Test model content';
	const customZIndex = 50;

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(
			<Modal
				narrow
				zIndex={customZIndex}
				onDismiss={(e) => {}}
			>
				{content}
			</Modal>
		);
		modal = TestUtils.findRenderedDOMComponentWithClass(
			component,
			'view--modalSnap'
		);
	});

	afterEach(() => {
		component = null;
		modal = null;
	});

	it('contains the narrow modal class', () => {
		expect(() => TestUtils.findRenderedDOMComponentWithClass(
			component,
			'view--modalSnap--narrow'
		)).not.toThrow();
	});

	it('modal shim element has provided zIndex', () => {
		const shim = TestUtils.findRenderedDOMComponentWithClass(
			component,
			'overlayShim'
		);
		expect(shim.style.zIndex).toBe(customZIndex.toString());
	});

	it('modal dialog appears above the shim', () => {
		const expected = (customZIndex + 1).toString();
		expect(modal.style.zIndex).toBe(expected);
	});

});

describe('Modal positioning', () => {

	it('returns the default margin top if the user is not below the fold', () => {
		const calculatedPosition = getModalPosition(0, 400, false, false);
		expect(calculatedPosition).toBe(DEFAULT_MARGIN_TOP);
	});

	it('always returns 0px when full screen prop is set', () => {
		const calculatedPositionAtTop = getModalPosition(0, 400, true, false);
		const calculatedPositionBelowFold = getModalPosition(800, 400, true, false);

		expect(calculatedPositionAtTop).toBe('0px');
		expect(calculatedPositionBelowFold).toBe('0px');
	});

	it('returns scroll position + MARGIN_TOP_OFFSET when modal is not full screen and user is below fold', () => {
		const scrollPosition = 800;
		const calculatedPosition = getModalPosition(scrollPosition, 400, false, false);
		expect(calculatedPosition).toBe(scrollPosition + MARGIN_TOP_OFFSET);
	});

	it('returns scroll position *without gutter* when modal is below fold and viewport is mobile size', () => {
		const scrollPosition = 800;
		const calculatedPosition = getModalPosition(scrollPosition, 400, false, true);
		expect(calculatedPosition).toBe(scrollPosition);
	});

});
