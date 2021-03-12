import React from 'react';
import { shallow, mount } from 'enzyme';
import Link from 'react-router-dom/Link';
import { Button } from './Button';
import Icon from '../media/Icon';

describe('Button', () => {
	describe('is a HTML button element', () => {
		it('exists', () => {
			const button = shallow(<Button />);
			expect(button).toMatchSnapshot();
		});
	});

	it('has a default state', () => {
		const button = mount(<Button>Click Me</Button>);
		expect(
			button.getDOMNode().attributes.getNamedItem('data-swarm-button').value
		).toBe('default');
	});

	it('has a primary state', () => {
		const button = mount(<Button primary>Click Me</Button>);
		expect(
			button.getDOMNode().attributes.getNamedItem('data-swarm-button').value
		).toBe('primary');
	});

	it('has a neutral state', () => {
		const button = mount(<Button neutral>Click Me</Button>);
		expect(
			button.getDOMNode().attributes.getNamedItem('data-swarm-button').value
		).toBe('neutral');
	});

	it('has a bordered state', () => {
		const button = mount(<Button bordered>Click Me</Button>);
		expect(
			button.getDOMNode().attributes.getNamedItem('data-swarm-button').value
		).toBe('bordered');
	});

	it('executes onClick when clicked', () => {
		const onClick = jest.fn();
		const button = shallow(<Button onClick={onClick} />);

		button.simulate('click');
		expect(onClick).toHaveBeenCalled();
	});

	describe('Button with icon', () => {
		describe('right aligned', () => {
			it('should set icon container to reverse', () => {
				const icon = <Icon shape="arrow-right" />;
				const button = mount(
					<Button icon={icon} primary right>
						Click me
					</Button>
				);

				expect(
					button.getDOMNode().attributes.getNamedItem('data-icon').value
				).toBe('right');
			});
		});
		describe('right aligned icon on Link', () => {
			it('should set icon container to reverse', () => {
				const icon = <Icon shape="arrow-right" />;
				const button = mount(
					<Button icon={icon} component={Link} primary right>
						Click me
					</Button>
				);

				expect(
					button.getDOMNode().attributes.getNamedItem('data-icon').value
				).toBe('right');
			});
		});
	});

	describe('wrapper component prop', () => {
		const link = 'https://meetup.com/';
		const buttonTagComponent = shallow(<Button href={link}>Button label</Button>);

		it('should render the correct `href` value for anchor tag', () => {
			expect(buttonTagComponent.prop('href')).toBe(link);
		});

		it('should render the correct `to` value for <Link> component', () => {
			const buttonLinkComponent = shallow(
				<Button to={link} component={Link}>
					Button label
				</Button>
			);

			expect(buttonLinkComponent.prop('to')).toBe(link);
		});
	});
});
