import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { InfoWrapper } from './utils/storyComponents';
import Avatar from './Avatar.jsx';

const MOCK_IMAGE_SRC = 'http://placekitten.com/g/400/400';

storiesOf('Avatar', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
        <Avatar src={MOCK_IMAGE_SRC}></Avatar>
			</InfoWrapper>
		)
	)
	.add('small', () => <Avatar src={MOCK_IMAGE_SRC} small></Avatar>)
	.add('big', () => <Avatar src={MOCK_IMAGE_SRC} big></Avatar>)
	.add('link to external URL', () => (
		<WithNotes notes='To link within the app, supply a `to` prop instead of `href`'>
			<Avatar
				href='http://google.com'
				onClick={(e) => {
					e.preventDefault();
					return action('go to http://google.com')(e);
				}}
				src={MOCK_IMAGE_SRC}>
			</Avatar>
		</WithNotes>
	));

