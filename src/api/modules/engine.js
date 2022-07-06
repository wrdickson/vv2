import axios from 'axios'

const engine = {
  addReservation: (user, reservation) => {
    const promise = axios({
      data: {
        user: user,
        reservation: reservation
      },
      method: 'post',
      url: '/api-ezbook/reservations/'
    })
    return promise
  },
  addReservationNote: (user, reservationId, note) => {
    const promise = axios({
      data: {
        user: user,
        note: note
      },
      method: 'post',
      url: '/api-ezbook/reservationNotes/' + reservationId
    })
    return promise
  },
  checkAvailability: (resId, user, isNewReservation, start, end, spaceId, people, beds) => {
    const promise = axios({
      data: {
        res_id: resId,
        user: user,
        is_new_res: isNewReservation,
        start: start,
        end: end,
        space_id: spaceId,
        people: people,
        beds: beds
      },
      method: 'post',
      url: '/api-ezbook/checkAvailability/'
    })
    return promise
  },
  checkAvailabilityByDates: (start, end, resId) => {
    if (!resId) {
      resId = null
    }
    const promise = axios({
      method: 'get',
      url: '/api-ezbook/checkAvailabilityByDates/' + start + '/' + end
    })
    return promise
  },
  checkinReservation: (user, resId) => {
    const promise = axios({
      data: {
        user: user,
        resId: resId
      },
      method: 'put',
      url: '/api-ezbook/reservation/checkin/' + resId
    })
    return promise
  },
  checkoutReservation: (user, resId) => {
    const promise = axios({
      data: {
        user: user,
        resId: resId
      },
      method: 'put',
      url: '/api-ezbook/reservation/checkout/' + resId
    })
    return promise
  },
  createCustomer: (user, customer) => {
    const promise = axios({
      data: {
        user: user,
        customer: customer
      },
      method: 'post',
      url: '/api-ezbook/customers/'
    })
    return promise
  },
  getFolio: (user, folioId) => {
    const request = axios({
      data: {
        user: user
      },
      method: 'post',
      url: '/api-ezbook/folios/' + folioId
    })
    return request
  },
  getReservation: (id) => {
    const request = axios({
      method: 'get',
      url: '/api-ezbook/reservations/' + id
    })
    return request
  },
  getReservations: () => {
    const request = axios({
      method: 'get',
      url: '/api-ezbook/reservations/'
    })
    return request
  },
  getSpaces: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/spaces/'
    })
  },
  getSpaceData: () => {
    return axios.all([axios.get('/api/spaces/'), axios.get('api/types/')])
      .then(axios.spread(function (spaces, types) {
        return {
          spaces: spaces,
          types: types
        }
      }))
  },
  getSelectGroups: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/selectGroups/'
    })
  },
  getSpaceTypes: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/types/'
    })
  },
  getTaxTypes: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/tax-types/'
    })
  },
  searchCustomers: (lastName, firstName) => {
    const request = axios({
      method: 'post',
      data: {
        lastName: lastName,
        firstName: firstName
      },
      url: '/api-ezbook/customerSearch/'
    })
    return request
  },
  updateCustomer: (args) => {
    const request = axios({
      url: '/api-ezbook/customers/' + args.id,
      data: args,
      method: 'post'
    })
    return request
  },
  updateReservation: (user, reservation) => {
    const request = axios({
      url: '/api-ezbook/reservations/' + reservation.id,
      data: {
        user: user,
        reservation: reservation
      },
      method: 'put'
    })
    return request
  }
}
export default engine
