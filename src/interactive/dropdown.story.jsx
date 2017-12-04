import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithLocale } from '../utils/decorators';
import Dropdown from './Dropdown';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Button from '../forms/Button';

const dropdownContent = (
	<Section className='border--none'>
		<Chunk>
			<h2 className='text--big text--bold'>Dropdown content</h2>
		</Chunk>
		<Chunk className='runningText'>
			<p>
				This is a basic dropdown component.
				It accepts a `content` prop with which you
				can pass arbitrary JSX content.
			</p>
			<p>
				<a href='#'>Tab-focusable links</a> should
				work as if they're in normal document flow
			</p>
		</Chunk>
	</Section>
);

/**
 * @module DropdownWithToggle
 */
class DropdownWithToggle extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			dropdownToggled: false
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState(() => ({ dropdownToggled: !this.state.dropdownToggled }));
	}

	render() {

		return (
			<Dropdown
				align='right'
				isActive={this.state.dropdownToggled}
				manualToggle={this.toggleDropdown}
				trigger={
					<Button small>Open</Button>
				}
				content={
					<div>
						<Section>
							<Chunk>
								<h2 className='text--big text--bold'>Dropdown content</h2>
							</Chunk>
							<Chunk className="runningText">
								<p>
									This dropdown handles its own toggling
									in a function called toggleDropdown.
								</p>
							</Chunk>
							<Chunk>
								<Button onClick={this.toggleDropdown}>
									Toggle dropdown
								</Button>
							</Chunk>
						</Section>
					</div>
				}
			/>
		);

	}
}

storiesOf('Dropdown', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'Basic Dropdown component',
		'Aligned right by default',
		() => (
			<Flex justify='flexEnd'>
				<FlexItem shrink>
					<Dropdown
						align='right'
						trigger={
							<Button small>Open</Button>
						}
						content={dropdownContent}
					/>
				</FlexItem>
			</Flex>
		)
	)
	.addWithInfo(
		'Left aligned dropdown',
		'Use the `align` prop to change alignment to left',
		() => (
			<Dropdown
				align='left'
				trigger={
					<Button small>Open</Button>
				}
				content={dropdownContent}
			/>
		)
	).addWithInfo(
		'with custom toggle functionality',
		() => (
			<Flex justify='flexEnd'>
				<FlexItem shrink>
					<DropdownWithToggle />
				</FlexItem>
			</Flex>
		)
	);
