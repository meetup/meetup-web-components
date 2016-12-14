import React from 'react';
import cx from 'classnames';
import {
	Chunk,
	// Flex,
	FlexItem,
	// Section,
} from './layoutUtils';
/**
 * @module PageTitle
 */
class PageTitle extends React.Component {
	render() {
		const {
			children,
			className,
			title,
			...other
		} = this.props;

		const classNames = cx(
			'pageTitle',
			className
		);

		return (
			<FlexItem
				className={classNames}
				{...other}>
				<Chunk className='align--center atMedium_align--left'>
					<h1 className='text--display1'>{title}</h1>
					{children}
				</Chunk>
			</FlexItem>
		);
	}
}

PageTitle.propTypes = {
};

export default PageTitle;
