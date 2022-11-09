import { StyleSheet } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const Picker = ({
	disabled,
	placeholderText,
	options,
	defaultOption,
	onSelect,
	clearable,
}) => {
	return (
		<Select
			disabled={disabled}
			placeholderText={placeholderText}
			options={options}
			defaultOption={defaultOption}
			onSelect={onSelect}
			clearable={clearable}
			placeholderTextColor='#94a1b2'
			selectControlClearOptionImageStyle={[styles.cancel]}
			selectControlStyle={styles.picker}
			selectControlArrowImageStyle={styles.arrow}
			selectControlTextStyle={[styles.text]}
			optionTextStyle={[styles.text]}
			optionSelectedStyle={[styles.optionsList]}
			optionsListStyle={[styles.optionsList]}
		/>
	);
};

export default Picker;

const styles = StyleSheet.create({
	picker: {
		width: '80%',
		height: 30,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.801)',
	},
	cancel: {
		tintColor: 'red',
	},
	arrow: {
		tintColor: 'whitesmoke',
	},
	text: {
		color: 'whitesmoke',
	},
	optionsList: {
		backgroundColor: 'rgba(0, 0, 0, 0.801)',
	},
});
