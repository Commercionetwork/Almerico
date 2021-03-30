const mockConversionRate = () => {
  const item = "1.000000000000000000";
  return item;
};

const mockParameters = () => {
  const item = {
    unbonding_time: "1814400000000000",
    max_validators: 100,
    max_entries: 7,
    historical_entries: 0,
    bond_denom: "ucommercio"
  };
  return item;
};

export { mockConversionRate, mockParameters };
