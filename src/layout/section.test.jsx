import React from 'react';
import { shallow } from 'enzyme';

import {
	SectionComponent,
	SECTION_CLASS,
	SECTION_HASSEPARATOR_CLASS,
	VALID_BREAKPOINTS,
	SECTION_FLUSH_CLASS,
} from './Section';

describe('Section', function() {
	let section;

	beforeEach(() => {
		section = shallow(<SectionComponent />);
	});
	afterEach(() => {
		section = null;
	});
	it(`check that default component has '${SECTION_CLASS}' class`, function() {
		expect(section.hasClass(SECTION_CLASS)).toBe(true);
	});

	describe('Section hasSeparator', () => {
		it(`check that component has '${SECTION_HASSEPARATOR_CLASS}' class`, function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				section = shallow(<SectionComponent hasSeparator />);
				expect(section.hasClass(SECTION_CLASS)).toBe(true);
				expect(section.hasClass(SECTION_HASSEPARATOR_CLASS)).toBe(true);
			});
		});
		it(`check that component has '${SECTION_HASSEPARATOR_CLASS}' class with breakpoint`, function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				section = shallow(<SectionComponent hasSeparatorUntil={breakpoint} />);
				expect(section.hasClass(SECTION_CLASS)).toBe(true);
				expect(
					section.hasClass(
						`${VALID_BREAKPOINTS[breakpoint]}_${SECTION_HASSEPARATOR_CLASS}`
					)
				).toBe(true);
			});
		});
	});

	describe('Section flushUntil', () => {
		it(`check that component has '${SECTION_FLUSH_CLASS}' class`, function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				section = shallow(<SectionComponent flushUntil={breakpoint} />);
				expect(section.hasClass(SECTION_CLASS)).toBe(true);
				expect(
					section.hasClass(
						`${VALID_BREAKPOINTS[breakpoint]}_${SECTION_FLUSH_CLASS}`
					)
				).toBe(true);
			});
		});
	});
});
