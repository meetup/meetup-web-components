import React from 'react';
import PageActionButton from './PageActionButton';
import PageAction from './PageAction';
import PageActions from './PageActions';
import { storiesOf } from '@kadira/storybook';

storiesOf('PageActions', module)
	.add('Row (default)', () => (
		<div style={{width: '100%'}}>
			<PageActions>
				<PageAction>
					<PageActionButton icon='magnifying-glass' label='Search' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='edit' label='Edit' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='share' label='Share' />
				</PageAction>
			</PageActions>
		</div>
	))
	.add('Column', () => (
		<div style={{width: '100%'}}>
			<PageActions direction='column'>
				<PageAction>
					<PageActionButton icon='magnifying-glass' label='Search' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='edit' label='Edit' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='share' label='Share' />
				</PageAction>
			</PageActions>
		</div>
	));
