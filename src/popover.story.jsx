import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateWithLocale } from './utils/decorators';
import { Link } from 'react-router';
import Popover from './Popover';
import Button from './Button';
import { TestIconSprite } from './utils/storyComponents';

const logSelection = e => {
	action(`Selected option ${e.target}`);
};

storiesOf('Popover', module)
	.addDecorator(decorateWithLocale)
	.add('Button trigger with Link options', () => {
		return (
			<div>
				<TestIconSprite />
				<Popover
					trigger={
						<Button>Open</Button>
					}
					options={[
						<Link to='somepath/' onClick={logSelection}>First option</Link>,
						<Link to='somepath/' onClick={logSelection}>Second option</Link>,
						<Link to='somepath/' onClick={logSelection}>Third option</Link>,
					]}
				/>
			</div>
		);
	})
	.add('DIV trigger with SPAN options', () => {
		return (
			<div>
				<TestIconSprite />
				<Popover
					trigger={<div>Open</div>}
					options={[
						<span onClick={logSelection}>First option</span>,
						<span to='somepath/' onClick={logSelection}>Second option</span>,
						<span to='somepath/' onClick={logSelection}>Third option</span>,
					]}
				/>
			</div>
		);
	});
