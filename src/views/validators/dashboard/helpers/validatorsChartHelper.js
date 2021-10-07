const BONDED_STATUS = 2;
const BACKGROUND_COLOR = ['rgba(48, 63, 159, 1)', 'rgba(92, 107, 192, 1)'];
const BORDER_COLOR = ['rgba(98, 113, 208, 1)', 'rgba(163, 172, 219, 1)'];
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.label;
        },
      },
    },
  },
};

const validatorsChartHelper = {
  /**
   *
   * @param {Array.<Object>} validators
   * @returns {Object}
   */
  getChartData(validators) {
    const definedValidators = _defineValidators(validators);
    return {
      labels: [
        `${definedValidators.bondedValidators} Bonded`,
        `${definedValidators.notBondedValidators} Not Bonded`,
      ],
      datasets: [
        {
          data: [
            definedValidators.bondedValidators,
            definedValidators.notBondedValidators,
          ],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  /**
   *
   * @param {Array.<Object>} validators
   * @returns {String}
   */
  getChartLabel(validators) {
    return !validators.length
      ? 'Validators'
      : `Validators: ${validators.length}`;
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default validatorsChartHelper;

/**
 *
 * @param {Array.<Object>} validators
 * @returns {Object}
 */
const _defineValidators = (validators) => {
  const bondedValidators = validators.filter(
    (validator) => validator.status === BONDED_STATUS,
  ).length;
  const notBondedValidators = validators.length - bondedValidators;
  return { bondedValidators, notBondedValidators };
};
