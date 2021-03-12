import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Icon from './Icon';

describe('Icon', () => {
	const label = 'Icon Label',
		shape = 'camera';

	describe('is a Icon element', () => {
		let iconEl;

		beforeEach(() => {
			const icon = TestUtils.renderIntoDocument(
				<Icon aria-label={label} shape={shape} />
			);

			iconEl = ReactDOM.findDOMNode(icon);
		});

		afterEach(() => {
			iconEl = null;
		});

		it('exists', () => {
			expect(iconEl).not.toBeNull();
		});

		it('creates a first-child svg element', () => {
			const svgEl = iconEl.firstChild;
			expect(svgEl.nodeName).toBe('svg');
		});
	});
});
