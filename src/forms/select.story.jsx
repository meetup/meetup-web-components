import React from 'react';
import Select from './Select';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

storiesOf('Forms/Select', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
		<Select label="Select a name for your horse" id="horsename" name="horsename">
			<option value="geoffrey">Geoffrey</option>
			<option value="drhorse">Doctor Horse, MD Junior</option>
			<option value="chompyhorse">Mister Chompy</option>
		</Select>
	))
	.add('with default selection using `value`', () => (
		<Select
			defaultValue="drhorse"
			label="Select a name for your horse"
			id="horsename"
			name="horsename"
		>
			<option value="geoffrey">Geoffrey</option>
			<option value="drhorse">Doctor Horse, MD Junior</option>
			<option value="chompyhorse">Mister Chompy</option>
		</Select>
	))
	.add('required', () => (
		<Select
			label="Select a name for your horse"
			id="horsename"
			name="horsename"
			error="You forgot to name your horse!"
			required
		>
			<option value="geoffrey">Geoffrey</option>
			<option value="drhorse">Doctor Horse, MD Junior</option>
			<option value="chompyhorse">Mister Chompy</option>
		</Select>
	))
	.add('with disabled options', () => (
		<Select label="Select a name for your horse" id="horsename" name="horsename">
			<option value="geoffrey" disabled>
				Geoffrey
			</option>
			<option value="drhorse">Doctor Horse, MD Junior</option>
			<option value="chompyhorse">Mister Chompy</option>
		</Select>
	))
	.add('error message', () => (
		<Select
			error="I'm a single lady, I'm a single lady"
			label="Select a name for your horse"
			id="horsename"
			name="horsename"
		>
			<option value="geoffrey" disabled>
				Geoffrey
			</option>
			<option value="drhorse">Doctor Horse, MD Junior</option>
			<option value="chompyhorse">Mister Chompy</option>
		</Select>
	))
	.add('with helper text', () => (
		<Select
			helperText="Lorem ipsum is simply dummy text"
			label="Select a name for your horse"
			id="horsename"
			name="horsename"
		>
			<option value="geoffrey" disabled>
				Geoffrey
			</option>
			<option value="drhorse">Doctor Horse, MD Junior</option>
			<option value="chompyhorse">Mister Chompy</option>
		</Select>
	));
