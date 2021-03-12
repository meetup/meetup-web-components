import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

storiesOf('Forms/TextInput', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTable: TextInput } })
	.add('type "password"', () => (
		<TextInput type="password" label="Password" value="password" id="password" />
	))
	.add('type "tel"', () => (
		<TextInput type="tel" label="Telephone Number" id="telephone" />
	))
	.add('default', () => (
		<TextInput
			label="Your name"
			id="fullname"
			name="name"
			placeholder="enter your name here"
		/>
	))
	.add('with value', () => (
		<TextInput
			label="Your name"
			id="fullname"
			name="name"
			defaultValue="Phife Dawg"
		/>
	))
	.add('disabled', () => (
		<TextInput
			label="Your name"
			id="fullname"
			name="name"
			defaultValue="Cannot focus"
			disabled
		/>
	))
	.add('error state', () => (
		<TextInput
			label="Your name"
			id="fullname"
			name="name"
			defaultValue="#$%!$%!"
			error="Not so fast. You have an error."
		/>
	))
	.add('error state as element', () => {
		return (
			<TextInput
				label="Your name"
				id="fullname"
				name="name"
				error={<span>This error is an element</span>}
				placeholder="not your email"
			/>
		);
	})
	.add('with helper text', () => (
		<TextInput
			label="Your name"
			id="fullname"
			name="name"
			helperText="Names cannot contain special characters"
		/>
	))
	.add('required', () => {
		return (
			<form>
				<TextInput
					label="Your name"
					id="fullname"
					name="name"
					placeholder="Not your email"
					required
					requiredText="(required)"
				/>
				<Button contrast fullWidth>
					Submit
				</Button>
			</form>
		);
	})
	.add('search', () => {
		return (
			<form>
				<TextInput
					label="Search the world wide web"
					id="search"
					name="search"
					placeholder="What will it be?"
					isSearch
				/>
				<Button contrast fullWidth>
					Submit
				</Button>
			</form>
		);
	})
	.add('with icon', () => (
		<TextInput
			label="Your name"
			id="fullname"
			name="name"
			defaultValue="Phife Dawg"
			placeholder="Not your email"
			iconShape="search"
		/>
	))
	.add(
		'with char counter if you provide maxLength',
		() => {
			const rules = {
				maxLength: 20,
				pattern: '.{5,10}',
			};
			return (
				<TextInput
					label="Your name"
					id="fullname"
					name="name"
					value="how long is this"
					error="this is an error"
					{...rules}
				/>
			);
		},
		{
			info: {
				text: `Note: updating field with charcounter relies on parent to give value,
            thats why you cant interact with the field in this story`,
			},
		}
	)
	.add('has a pattern for min length', () => {
		const rules = {
			pattern: '.{5,10}',
		};
		return (
			<form>
				<TextInput
					label="Your name"
					id="fullname"
					name="name"
					defaultValue=">5"
					validityMessage="Must be more than 5 characters and less than 10"
					{...rules}
				/>
				<Button contrast fullWidth>
					Submit
				</Button>
			</form>
		);
	});
