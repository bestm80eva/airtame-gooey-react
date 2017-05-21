import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Select component. Renders a select element handles its behavior
 *
 * @export
 * @class Select
 * @extends {Component}
 */
export default class Select extends Component {
    /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * Select options
     * @type {array}
     */
    options: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * ID for the option
         * @type {string}
         */
        id: PropTypes.string.isRequired,
        /**
         * Optional text to be displayed as the option text instead of the value
         * @type {string}
         */
        label: PropTypes.string,
        /**
         * The value for the select field
         * @type {string}
         */
        value: PropTypes.string.isRequired,
        /**
         * Flag indicating if a the specific option is disabled
         */
        isDisabled: PropTypes.bool,
      })
    ).isRequired,
    /**
     * ID for the default selected option. Multiline will fallback to no default selection
     * @type string
     */
    selected: PropTypes.string,
    /**
     * Flag indicating if the select is a multiselect box
     * @type {boolean}
     */
    isMultiline: PropTypes.bool,
    /**
     * Flag indicating if the select is in a disabled state
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Flag indicating if the select is in an error state
     *@type {boolean}
     */
    isError: PropTypes.bool,
    /**
     * Optional callback function to trigger after the select value changes
     */
    onChange: PropTypes.func,
    /**
     * Class name for the component
     * @type {string | Array}
     */
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    /**
     * The id for the select. This should only be used if the field will be associated with a label
     * @type {string}
     */
    id: PropTypes.string,
  };

  static defaultProps = {
    selected: null,
    isMultiline: false,
    isDisabled: false,
    isError: false,
    id: null,
    onChange: null,
  };

  /**
   * Lifecycle Method
   * Sets the default selected state
   */
  componentWillMount() {
    this.setState({
      selected: this.getDefaultSelected(),
    });
  }

  /**
   * Finds the default option value for the select
   * @return {String|null} The id of the selected element or null
   */
  getDefaultSelected = () => {
    const { isMultiline, selected, options } = this.props;
    let selectedIndex = 0;
    options.map((o, i) => {
      if (o.id === selected) {
        selectedIndex = i;
      }
    });

    return isMultiline ? null : options[selectedIndex].value;
  }

  /**
   * Updates the state with the currently selected option
   * @param {Event} [evt] - The triggered event
   */
  updateSelected = evt => {
    this.setState({
      selected: evt.target.value,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(evt);
      }
    });
  }

  /**
   * The render method for the component
   * @return {JSX} The component's markup
   */
  render() {
    const {
      className,
      id,
      isDisabled,
      isError,
      isMultiline,
      options,
      selected,
    } = this.props;

    const componentClassNames = classNames(
      'gooey-select',
      {
        'gooey-select--disabled': isDisabled,
        'gooey-select--error': isError,
        'gooey-select--multiline': isMultiline,
      },
      className
    );

    return (
      <div className={componentClassNames}>
        <select
          className="gooey-select__select"
          disabled={isDisabled}
          onChange={this.updateSelected}
          id={id}
          multiple={isMultiline || null}
        >
          {
            options.map(option => (
              <option
                key={option.id}
                selected={option.value === selected ? true : null}
                disabled={option.isDisabled || null}
                value={option.value}
                label={option.label || null}
                className="gooey-select__option"
              >
                {option.value}
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}
