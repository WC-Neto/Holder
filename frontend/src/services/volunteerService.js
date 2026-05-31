import { mockOrders } from "../data/mockOrders.js";
import {
  acceptOrder as acceptAvailableOrder,
  buildAvailableOrdersSearchParams,
  fetchAvailableOrderDetails,
  finishOrder as finishAvailableOrder,
  searchAvailableOrders,
} from "./availableOrders.js";
import { getNearbyElderly as getMockNearbyElderly } from "./nearbyElderly.js";
import { getVolunteerHistory as getMockVolunteerHistory } from "./volunteerHistory.js";
import {
  getVolunteerProfile as getMockVolunteerProfile,
  updateVolunteerAvailability as updateMockVolunteerAvailability,
  updateVolunteerProfile as updateMockVolunteerProfile,
} from "./volunteerProfile.js";

/**
 * @typedef {Object} VolunteerServiceResponse
 * @property {*} data
 * @property {string|null} error
 * @property {boolean} success
 * @property {boolean} loading
 */

/**
 * @typedef {Object} AvailableOrder
 * @property {string|number} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} neighborhood
 */

/**
 * @typedef {Object} NearbyElderly
 * @property {string|number} id
 * @property {string} name
 * @property {string} distance
 */

/**
 * @typedef {Object} VolunteerProfile
 * @property {string|number} id
 * @property {string} name
 * @property {string[]} availability
 */

function createServiceSuccess(data) {
  return {
    data,
    error: null,
    success: true,
    loading: false,
  };
}

export function handleVolunteerServiceError(error) {
  return {
    data: null,
    error: error?.message ?? "Não foi possível completar a solicitação",
    success: false,
    loading: false,
  };
}

async function runVolunteerServiceRequest(request) {
  try {
    const data = await request();

    return createServiceSuccess(data);
  } catch (error) {
    return handleVolunteerServiceError(error);
  }
}

export function buildVolunteerServiceRequestState({ loading = true } = {}) {
  return {
    data: null,
    error: null,
    success: false,
    loading,
  };
}

export async function getAvailableOrders({
  volunteerId,
  searchTerm = "",
  activeFilter = "all",
} = {}) {
  return runVolunteerServiceRequest(async () => {
    const searchParams = buildAvailableOrdersSearchParams({
      searchTerm,
      activeFilter,
      volunteerId,
    });

    // Futuramente: GET /voluntarios/{volunteerId}/pedidos-disponiveis com searchParams.
    return searchAvailableOrders(mockOrders, searchParams);
  });
}

export async function getOrderDetails({ orderId } = {}) {
  return runVolunteerServiceRequest(async () => {
    // Futuramente: GET /pedidos/{orderId}.
    const order = await fetchAvailableOrderDetails(mockOrders, orderId);

    if (!order) {
      throw new Error("Pedido não encontrado");
    }

    return order;
  });
}

export async function acceptOrder({ orderId, volunteerId, shouldFail = false } = {}) {
  return runVolunteerServiceRequest(() =>
    acceptAvailableOrder({ orderId, volunteerId, shouldFail }),
  );
}

export async function finishOrder({
  orderId,
  volunteerId,
  report,
  shouldFail = false,
} = {}) {
  return runVolunteerServiceRequest(() =>
    finishAvailableOrder({ orderId, volunteerId, report, shouldFail }),
  );
}

export async function getNearbyElderly({ volunteerId, empty = false } = {}) {
  return runVolunteerServiceRequest(() =>
    getMockNearbyElderly({ volunteerId, empty }),
  );
}

export async function getVolunteerHistory({ volunteerId, empty = false } = {}) {
  return runVolunteerServiceRequest(() =>
    getMockVolunteerHistory({ volunteerId, empty }),
  );
}

export async function getVolunteerProfile({ volunteerId } = {}) {
  return runVolunteerServiceRequest(async () => {
    const profile = await getMockVolunteerProfile({ volunteerId });

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    return profile;
  });
}

export async function updateVolunteerProfile({
  volunteerId,
  updates = {},
  shouldFail = false,
} = {}) {
  return runVolunteerServiceRequest(() =>
    updateMockVolunteerProfile({ volunteerId, updates, shouldFail }),
  );
}

export async function updateVolunteerAvailability({
  volunteerId,
  availability = [],
  shouldFail = false,
} = {}) {
  return runVolunteerServiceRequest(() =>
    updateMockVolunteerAvailability({ volunteerId, availability, shouldFail }),
  );
}
