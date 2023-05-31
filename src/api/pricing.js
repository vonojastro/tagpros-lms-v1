import { api } from '../api';
import { onLoadingScreen, offLoadingScreen } from '../redux/actions/ui-elements';
import { getPricingSuccess } from '../redux/actions/pricing';

const PRICING_ENDPOINT = '/pricing';

export const getAllPricing = async (dispatch, callback, query) => {
  try {
    dispatch(onLoadingScreen());
    const response = await api.get(PRICING_ENDPOINT, { params: query });

    dispatch(getPricingSuccess(response.data));
    callback(true, response.data);
  } catch (error) {
    console.log('(getAllPricing) Status:', error);
    callback(false);
    dispatch(offLoadingScreen());
  } finally {
    dispatch(offLoadingScreen());
  }
};

export const getActivePricing = async (callback, classType) => {
  try {
    const response = await api.get(PRICING_ENDPOINT + `/active/${classType}`);
    // dispatch(getPricingSuccess(response.data));
    callback(true, response.data);
  } catch (error) {
    console.log('(getActivePricing) Status:', error);
    callback(false);
    // dispatch(offLoadingScreen());
  }
};

export const getLiveClassPricing = async callback => {
  try {
    const response = await api.get(PRICING_ENDPOINT + '/live');
    // dispatch(getPricingSuccess(response.data));
    callback(true, response.data);
  } catch (error) {
    console.log('(getActivePricing) Status:', error);
    callback(false);
    // dispatch(offLoadingScreen());
  }
};

export const getRecordedClassPricing = async callback => {
  try {
    const response = await api.get(PRICING_ENDPOINT + '/recorded');
    // dispatch(getPricingSuccess(response.data));
    callback(true, response.data);
  } catch (error) {
    console.log('(getActivePricing) Status:', error);
    callback(false);
    // dispatch(offLoadingScreen());
  }
};

export const savePricing = async args => {
  try {
    const response = await api.post(PRICING_ENDPOINT, args);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePricing = async args => {
  try {
    if (!!args.CREATED_BY) delete args.CREATED_BY;
    const response = await api.patch(PRICING_ENDPOINT + `/${args.ID}`, args);
    return response;
  } catch (error) {
    throw error;
  }
};

export const removePricing = async ID => {
  try {
    const response = await api.delete(PRICING_ENDPOINT + `/${ID}`);
    return response;
  } catch (error) {
    throw error;
  }
};
