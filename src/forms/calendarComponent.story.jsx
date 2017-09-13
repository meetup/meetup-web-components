import React from 'react';
import CalendarComponent from './CalendarComponent';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';

storiesOf('CalendarComponent', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'renders a calendar component',
		() => (
			<InfoWrapper>
				<div className='span--50'>
					<CalendarComponent
						name='event_time'
						label='Start at'
						value={new Date()}
						datepickerOptions={{ allowInput: true }}
					/>
				</div>
			</InfoWrapper>
		)
	)
	.add('required', () => {
		return (<div className='span--50'>
			<CalendarComponent
				name='event_time'
				label='Start at'
				value={new Date()}
				required
			/>
		</div>);
	})
	.add('sets a valid date range', () => {
		const min = new Date(),
			max = new Date(),
			now = Date.now();
		min.setDate(min.getDate() - 2);
		max.setDate(max.getDate() + 7);

		const opts = {
			allowInput: true,
			minDate: min,
			maxDate: max
		};
		return (<div className='span--50'>
			<CalendarComponent
				name='event_time'
				label='From 2 days ago to 1 week from now'
				value={now}
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('sets a default date and time', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = new Date(3000,1,1,15,0,0);
		return (<div className='span--50'>
			<CalendarComponent
				name='event_time'
				label='In the year 3000'
				value={date}
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('error state', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = new Date(3000,1,1,15,0,0);
		return (
			<div className='span--50'>
				<CalendarComponent
					name='event_time'
					label='Start at'
					value={date}
					error={'Woops, something went wrong.'}
					datepickerOptions={opts}
				/>
			</div>
		);
	});
