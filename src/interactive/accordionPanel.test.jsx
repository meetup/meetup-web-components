import React from 'react';
import { shallow, mount } from 'enzyme';

import AccordionPanel, { ACTIVEPANEL_CLASS } from './AccordionPanel';
import Icon from '../media/Icon';
import ToggleSwitch from '../forms/ToggleSwitch';
import { textContent1 } from '../../__mocks__/textContentMocks';

describe('AccordionPanel', function() {
	let panel, openPanel;

	const customIcon = 'plus';
	const customIconActive = 'minus';

	let handlePanelClickCallback, onClickCallback;

	beforeEach(() => {
		handlePanelClickCallback = jest.fn();
		onClickCallback = jest.fn();

		panel = shallow(
			<AccordionPanel
				label="First Section"
				setClickedPanel={handlePanelClickCallback}
				onClickCallback={onClickCallback}
				panelContent={
					<div className="runningText">
						<p>{textContent1}</p>
					</div>
				}
			/>
		);

		openPanel = shallow(
			<AccordionPanel
				isOpen
				label="First Section"
				panelContent={
					<div className="runningText">
						<p>{textContent1}</p>
					</div>
				}
			/>
		);
	});

	afterEach(() => {
		panel = null;
		openPanel = null;
		onClickCallback = null;
		handlePanelClickCallback = null;
	});

	describe('Panel basic behavior', () => {
		it('exists and renders with mock props', () => {
			expect(panel).toMatchSnapshot();
		});

		it(`has the class ${ACTIVEPANEL_CLASS} when props is open`, function() {
			const node = openPanel.find(`.${ACTIVEPANEL_CLASS}`);
			expect(node.length).toBe(1);
		});

		it('calls handlePanelClick callback onClick', function() {
			const accPanel = panel.find('[aria-controls="panel-firstsection"]');
			const isOpen = panel.prop('isOpen');
			const mockClick = {
				target: accPanel,
				preventDefault: jest.fn(),
				stopPropagation: jest.fn(),
			};

			expect(handlePanelClickCallback).not.toHaveBeenCalled();
			accPanel.simulate('click', mockClick);
			expect(handlePanelClickCallback).toHaveBeenCalledWith(mockClick, {
				panelIndex: panel.prop('panelIndex'),
				isOpen: !isOpen,
			});
		});

		it('calls setPanelState callback onKeyUp', function() {
			const accPanel = panel.find('[aria-controls="panel-firstsection"]');
			const isOpen = panel.prop('isOpen');
			const mockKeyUp = { key: 'Enter', preventDefault: jest.fn() };

			expect(handlePanelClickCallback).not.toHaveBeenCalled();
			accPanel.simulate('keyUp', mockKeyUp);
			expect(handlePanelClickCallback).toHaveBeenCalledWith(mockKeyUp, {
				panelIndex: panel.prop('panelIndex'),
				isOpen: !isOpen,
			});
		});

		it('calls onClickCallback onClick', function() {
			const accPanel = panel.find('[aria-controls="panel-firstsection"]');
			const isOpen = panel.prop('isOpen');
			const fakeEvent = {
				target: panel,
				preventDefault: jest.fn(),
				stopPropagation: jest.fn(),
			};

			expect(onClickCallback).not.toHaveBeenCalled();
			accPanel.simulate('click', fakeEvent);
			expect(onClickCallback).toHaveBeenCalledWith(fakeEvent, !isOpen);
		});

		it('renders an icon component', function() {
			const node = panel.find(Icon);
			expect(node.length).toBe(1);
		});
	});

	describe('Panel with right aligned icon', () => {
		let panelLeftIcon;

		beforeEach(() => {
			panelLeftIcon = mount(
				<AccordionPanel
					label="First Section"
					indicatorAlign="left"
					panelContent={
						<div className="runningText">
							<p>{textContent1}</p>
						</div>
					}
				/>
			);
		});

		afterEach(() => {
			panelLeftIcon = null;
		});

		it('exists and renders icon left', () => {
			expect(panelLeftIcon).toMatchSnapshot();
		});

		it('reverses Flex direction when icon is right-aligned', () => {
			const node = panelLeftIcon.find('.atAll_flex--rowReverse');
			expect(node.length).toBe(1);
		});
	});

	describe('Panel with custom icon', () => {
		let panelCustomIcon;

		beforeEach(() => {
			panelCustomIcon = shallow(
				<AccordionPanel
					label="First Section"
					indicatorAlign="left"
					indicatorIcon={customIcon}
					indicatorIconActive={customIconActive}
					panelContent={
						<div className="runningText">
							<p>{textContent1}</p>
						</div>
					}
				/>
			);
		});

		afterEach(() => {
			panelCustomIcon = null;
		});

		it('exists and renders a custom icon', function() {
			expect(panelCustomIcon).toMatchSnapshot();
		});
	});

	describe('Panel with toggle switch', () => {
		let panelSwitch, handleToggleSpy;

		beforeEach(() => {
			handleToggleSpy = jest
				.spyOn(AccordionPanel.prototype, '_handleToggle')
				.mockImplementation(() => {});

			panelSwitch = mount(
				<AccordionPanel
					indicatorSwitch
					label="First Section"
					indicatorAlign="left"
					panelContent={
						<div className="runningText">
							<p>{textContent1}</p>
						</div>
					}
				/>
			);
		});

		afterEach(() => {
			panelSwitch = null;
			handleToggleSpy.mockRestore();
		});

		it('exists and renders a toggle switch', function() {
			expect(panelSwitch).toMatchSnapshot();
		});

		it('calls handleToggle when toggle switch is clicked', function() {
			const switchNode = panelSwitch.find(ToggleSwitch);
			expect(handleToggleSpy).not.toHaveBeenCalled();
			switchNode.find('button').simulate('click');
			expect(handleToggleSpy).toHaveBeenCalled();
		});

		it('calls custom function and does not call handleToggle when toggle switch is clicked and onToggleClick is specified', function() {
			const onToggleClickCallback = jest.fn();
			const onToggleClickSpy = jest.spyOn(
				AccordionPanel.prototype,
				'onToggleClick'
			);
			const panelOnToggleClick = mount(
				<AccordionPanel
					indicatorSwitch
					onToggleClick={onToggleClickCallback}
					label="First Section"
					indicatorAlign="left"
					panelContent={
						<div className="runningText">
							<p>{textContent1}</p>
						</div>
					}
				/>
			);
			const switchNode = panelOnToggleClick.find(ToggleSwitch);
			expect(onToggleClickSpy).not.toHaveBeenCalled();
			switchNode.find('button').simulate('click');
			expect(handleToggleSpy).not.toHaveBeenCalled();
			expect(onToggleClickSpy).toHaveBeenCalled();
		});
		it('ToggleSwitch should be disabled if disableAndOpen params passed', () => {
			const panelOnToggleClick = mount(
				<AccordionPanel
					indicatorSwitch
					disableAndOpen
					label="First Section"
					indicatorAlign="left"
					panelContent={
						<div className="runningText">
							<p>{textContent1}</p>
						</div>
					}
				/>
			);
			const switchNode = panelOnToggleClick.find(ToggleSwitch);
			expect(switchNode.props().disabled).toBe(true);
		});
	});

	describe('Locked panel with toggle switch', () => {
		let panelToggleSwitchLocked;
		const onLockedLabelClickMock = jest.fn();
		const onClickCallbackMock = jest.fn();

		beforeEach(() => {
			panelToggleSwitchLocked = mount(
				<AccordionPanel
					indicatorSwitch
					label="First Section"
					indicatorAlign="left"
					panelContent={
						<div className="runningText">
							<p>{textContent1}</p>
						</div>
					}
					isLocked
					lockedLabel="Unlock me!"
					onLockedLabelClick={onLockedLabelClickMock}
					onClickCallback={onClickCallbackMock}
				/>
			);
		});

		afterEach(() => {
			panelToggleSwitchLocked = null;
			onLockedLabelClickMock.mockClear();
		});

		it('renders locked toggle panel', () => {
			expect(panelToggleSwitchLocked).toMatchSnapshot();
		});

		it('should call onLockedLabelClick callback when user clicks on locked label', () => {
			const lockedLabel = panelToggleSwitchLocked.find('.lockedBadge-badge');
			lockedLabel.simulate('click');
			expect(onLockedLabelClickMock).toHaveBeenCalledTimes(1);
		});

		it('shouln`t call onClickCallback when user clicks and panel is locked', () => {
			const switchNode = panelToggleSwitchLocked.find(ToggleSwitch);
			switchNode.find('button').simulate('click');
			expect(onClickCallback).toHaveBeenCalledTimes(0);
		});
	});
});
