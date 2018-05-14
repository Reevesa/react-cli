import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import { deepMerge } from '../utils';
import Icon from './Icon';

function Rotate ({
	direction,
	icon,
	onClick,
	size,
	...props,
},
{
	theme,
}) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<button
			type="button"
			className={css(classes.rotate, classes['rotate__direction__' + direction], size && classes['rotate__size__' + size])}
			onClick={onClick}
			onTouchEnd={onClick}
			{...props}
		>
			<Icon fill={!!theme.rotate && theme.rotate.fill || defaults.rotate.fill} type={icon} />
		</button>
	);
}

Rotate.propTypes = {
	direction: PropTypes.oneOf(['left', 'right']),
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['medium', 'small']).isRequired,
};
Rotate.defaultProps = {
	size: 'medium',
};
Rotate.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	rotate: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		outline: 'none',
		padding: 10, // increase hit area
		position: 'absolute',
		top: '50%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},

	// sizees
	rotate__size__medium: {
		height: 70,
		marginTop: defaults.arrow.height / -2,
		width: 40,

		'@media (min-width: 768px)': {
			width: 70,
		},
	},
	rotate__size__small: {
		height: 70,
		marginTop: defaults.thumbnail.size / -2,
		width: 30,

		'@media (min-width: 500px)': {
			width: 40,
		},
	},

	// direction
	rotate__direction__right: {
		right: defaults.container.gutter.horizontal,
	},
	rotate__direction__left: {
		left: defaults.container.gutter.horizontal,
	},
};

module.exports = Rotate;
