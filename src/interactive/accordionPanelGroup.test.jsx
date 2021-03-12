import React from 'react';
import { mount } from 'enzyme';

import AccordionPanelGroup, { getNewPanelState } from './AccordionPanelGroup';
import AccordionPanel, { ACCORDION_LABEL_CLASS } from './AccordionPanel';

describe('AccordionPanelGroup', () => {
	const accordionPanelsArr = [
		<AccordionPanel
			label="First Section"
			isOpen
			isDisabledPanelOpen
			panelContent={
				<div className="runningText">
					<p>
						Contrary to popular belief, Lorem Ipsum is not simply random text.
						It has roots in a piece of classical Latin literature from 45 BC,
						making it over 2000 years old. Richard McClintock, a Latin
						professor at Hampden-Sydney College in Virginia, looked up one of
						the more obscure Latin words, consectetur, from a Lorem Ipsum
						passage, and going through the cites of the word in classical
						literature, discovered the undoubtable source.
					</p>
				</div>
			}
		/>,
		<AccordionPanel
			label="Next Section"
			panelContent={
				<div>
					<div className="runningText">
						<p>Any kind of content can go in here, even inputs.</p>
					</div>
					<div className="chunk">
						<label htmlFor="test-textinput">Im a label</label>
						<input
							id="test-textinput"
							type="text"
							placeholder="Input placeholder"
						/>
					</div>
				</div>
			}
		/>,
		<AccordionPanel
			label="Third Section"
			panelContent={
				<div className="runningText">
					<p>
						Classical Latin literature from 45 BC, making it over 2000 years
						old. Richard McClintock, a Latin professor at Hampden-Sydney
						College in Virginia, looked up one of the more obscure Latin
						words, consectetur, from a Lorem Ipsum passage, and going through
						the cites of the word in classical literature, discovered the
						undoubtable source.
					</p>
				</div>
			}
		/>,
	];

	describe('getNewPanelState', () => {
		it('returns expected new panel state list when passed multiselectable accordionPanelGroup data', () => {
			const isMultiselect = true;
			const panelStates = [false, true, false];
			const clickedPanelData = { panelIndex: 0, isOpen: true };
			expect(
				getNewPanelState(isMultiselect, panelStates, clickedPanelData)
			).toEqual([true, true, false]);
		});
		it('returns expected new panel state list when passed non-multiselectable accordionPanelGroup data', () => {
			const isMultiselect = false;
			const panelStates = [false, true, false];
			const clickedPanelData = { panelIndex: 0, isOpen: true };
			expect(
				getNewPanelState(isMultiselect, panelStates, clickedPanelData)
			).toEqual([true, false, false]);
		});
	});

	describe('AccordionPanelGroup, multiselectable', () => {
		let accordionPanelGroup;

		beforeEach(() => {
			jest.spyOn(AccordionPanel.prototype, 'getPanelStyle').mockImplementation(
				() => {}
			);

			accordionPanelGroup = mount(
				<AccordionPanelGroup accordionPanels={accordionPanelsArr} />
			);
		});

		afterEach(() => {
			accordionPanelGroup = null;
		});

		it('renders all the panels given', function() {
			const panels = accordionPanelGroup.find(`.list-item`);
			expect(panels.length).toEqual(3);
		});

		it('gives panels a panelIndex', () => {
			const panels = accordionPanelGroup.find(AccordionPanel);
			expect(panels.at(0).prop('panelIndex')).not.toBeUndefined();
			expect(panels.at(1).prop('panelIndex')).not.toBeUndefined();
			expect(panels.at(2).prop('panelIndex')).not.toBeUndefined();
		});

		it('stores panel open states in state', () => {
			// this test will have one open panel to start based on isOpen prop
			const isOpenValues = Object.values(
				accordionPanelGroup.state('panelStatesList')
			);
			const openPanels = isOpenValues.filter((isOpen, i) => isOpen === true);
			const closedPanels = isOpenValues.filter((isOpen, i) => isOpen === false);

			expect(openPanels.length).toEqual(1);
			expect(closedPanels.length).toEqual(2);
		});

		it('changes panel open state with handlePanelClick', () => {
			const panels = accordionPanelGroup.find(AccordionPanel);
			const panelIndex = panels.at(0).prop('panelIndex');
			const isOpen = panels.at(0).prop('isOpen');

			expect(accordionPanelGroup.state('panelStatesList')[panelIndex]).toEqual(
				isOpen
			);
			accordionPanelGroup
				.instance()
				.handlePanelClick({}, { panelIndex: panelIndex, isOpen: !isOpen });
			expect(accordionPanelGroup.state('panelStatesList')[panelIndex]).toEqual(
				!isOpen
			);
		});
	});

	describe('AccordionPanelGroup, not multiselectable', () => {
		let accordionPanelGroup, setPanelStatesMock;

		beforeEach(() => {
			setPanelStatesMock = jest.spyOn(
				AccordionPanelGroup.prototype,
				'handlePanelClick'
			);

			accordionPanelGroup = mount(
				<AccordionPanelGroup
					accordionPanels={accordionPanelsArr}
					multiSelectable={false}
				/>
			);
		});

		afterEach(() => {
			accordionPanelGroup = null;
			setPanelStatesMock = null;
		});

		it('supports opening panels one-at-a-time', function() {
			const panelWrappers = accordionPanelGroup.find(AccordionPanel);
			let openPanels = panelWrappers.filterWhere(
				panel => panel.prop('isOpen') === true
			);

			// there is one panel in our test with prop isOpen at first render
			expect(openPanels.length).toBe(1);

			const panel1 = panelWrappers.at(1);
			panel1.find(`.${ACCORDION_LABEL_CLASS}`).simulate('click');
			openPanels = accordionPanelGroup
				.find(AccordionPanel)
				.filterWhere(panel => panel.prop('isOpen') === true);
			expect(openPanels.length).toBe(1);
			expect(openPanels.at(0).prop('panelIndex')).toEqual(
				panel1.prop('panelIndex')
			);

			const panel2 = panelWrappers.at(2);
			panel2.find(`.${ACCORDION_LABEL_CLASS}`).simulate('click');
			openPanels = accordionPanelGroup
				.find(AccordionPanel)
				.filterWhere(panel => panel.prop('isOpen') === true);
			expect(openPanels.length).toBe(1);
			expect(openPanels.at(0).prop('panelIndex')).toEqual(
				panel2.prop('panelIndex')
			);
		});

		it('has state where isOpen is true for only one panel at-a-time', () => {
			const panelWrappers = accordionPanelGroup.find(AccordionPanel);
			const openPanels = panelWrappers.filterWhere(
				panel => panel.prop('isOpen') === true
			);
			expect(openPanels.length).toBe(1);

			let panelStates = accordionPanelGroup.state('panelStatesList');
			let openPanelIds = Object.keys(panelStates).filter(
				(key, i) => panelStates[key] === true
			);
			expect(openPanelIds.length).toBe(1);

			expect(parseInt(openPanelIds[0])).toEqual(
				openPanels.at(0).prop('panelIndex')
			);

			// we have one with prop isOpen
			const panel1 = panelWrappers.at(1);
			panel1.find(`.${ACCORDION_LABEL_CLASS}`).simulate('click');
			expect(setPanelStatesMock).toHaveBeenCalled();

			// assert only one key in panelStates with isOpen and matching panelIndex
			panelStates = accordionPanelGroup.state('panelStatesList');
			openPanelIds = Object.keys(panelStates).filter(
				(key, i) => panelStates[key] === true
			);
			expect(openPanelIds.length).toBe(1);
			expect(parseInt(openPanelIds[0])).toEqual(panel1.prop('panelIndex'));
		});
	});
});
